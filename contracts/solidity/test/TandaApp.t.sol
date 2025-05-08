// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.29;

import "forge-std/Test.sol";
import "../src/TandaApp.sol";

// Mock token implementation
contract MockERC20 {
    mapping(address => uint256) public balances;
    mapping(address => mapping(address => uint256)) public allowances;

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool) {
        require(balances[from] >= amount, "Insufficient balance");
        require(
            allowances[from][msg.sender] >= amount,
            "Insufficient allowance"
        );
        balances[from] -= amount;
        balances[to] += amount;
        return true;
    }

    function transfer(address to, uint256 amount) external returns (bool) {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        balances[to] += amount;
        return true;
    }

    function mint(address to, uint256 amount) external {
        balances[to] += amount;
    }

    function approve(address spender, uint256 amount) external {
        allowances[msg.sender][spender] = amount;
    }
}

contract TandaAppTest is Test {
    event TandaReady();
    TandaApp public tanda;
    address public alice = address(1);
    address public bob = address(2);
    address public mxnb = address(100); // mock token

    uint256 constant AMOUNT = 100 * 1e6;

    MockERC20 public token;

    function setUp() public {
        token = new MockERC20();
        tanda = new TandaApp(address(this), address(token), AMOUNT, 4);

        // Mint and approve for Alice and Bob
        token.mint(alice, AMOUNT);
        token.mint(bob, AMOUNT);

        vm.prank(alice);
        token.approve(address(tanda), AMOUNT);

        vm.prank(bob);
        token.approve(address(tanda), AMOUNT);
    }

    function testUserCanJoin() public {
        vm.prank(alice);
        tanda.joinTanda();

        assertEq(tanda.tandaSize(), 1);
    }

    function testCannotJoinTwice() public {
        vm.prank(alice);
        tanda.joinTanda();

        vm.prank(alice);
        vm.expectRevert(TandaApp.TandaApp__AlreadyJoined.selector);
        tanda.joinTanda();
    }

    function testOnlyTurnUserCanWithdraw() public {
        address user3 = address(3);
        address user4 = address(4);

        address[4] memory users = [alice, bob, user3, user4];
        for (uint256 i = 0; i < 4; i++) {
            token.mint(users[i], AMOUNT);
            vm.prank(users[i]);
            token.approve(address(tanda), AMOUNT);
            vm.prank(users[i]);
            tanda.joinTanda();
        }

        // Alice (turn 0) puede retirar
        vm.prank(alice);
        tanda.withdrawMyTurn();

        // Bob (turn 1) aún no puede
        vm.prank(bob);
        vm.expectRevert(TandaApp.TandaApp__NotYourTurn.selector);
        tanda.withdrawMyTurn();
    }

    function testOnlyOwnerCanAdvanceTurn() public {
        address user3 = address(3);
        address user4 = address(4);

        // Preparar tokens y approves
        address[4] memory users = [alice, bob, user3, user4];
        for (uint256 i = 0; i < 4; i++) {
            token.mint(users[i], AMOUNT);
            vm.prank(users[i]);
            token.approve(address(tanda), AMOUNT);
            vm.prank(users[i]);
            tanda.joinTanda();
        }

        // Bob (not owner) no puede avanzar
        vm.prank(bob);
        vm.expectRevert(TandaApp.TandaApp__NotOwner.selector);
        tanda.advanceTurn();

        // Owner (this contract) sí puede
        tanda.advanceTurn();
    }

    function testCannotJoinMoreThan4() public {
        address user3 = address(3);
        address user4 = address(4);
        address user5 = address(5);

        // Preparar usuarios y aprobar tokens
        address[3] memory users = [user3, user4, user5];
        for (uint256 i = 0; i < 3; i++) {
            token.mint(users[i], AMOUNT);
            vm.prank(users[i]);
            token.approve(address(tanda), AMOUNT);
        }

        // Llenar tanda con 4 personas
        vm.prank(alice);
        tanda.joinTanda();

        vm.prank(bob);
        tanda.joinTanda();

        vm.prank(user3);
        tanda.joinTanda();

        vm.expectEmit(true, false, false, false);
        emit TandaReady(); // Verificamos que se emita

        vm.prank(user4);
        tanda.joinTanda();

        // Usuario 5 no debería poder entrar
        vm.prank(user5);
        vm.expectRevert(TandaApp.TandaApp__GroupFull.selector);
        tanda.joinTanda();
    }

    function testCannotWithdrawIfNot4Participants() public {
        vm.prank(alice);
        tanda.joinTanda();

        // solo 1 persona, no debería poder retirar
        vm.prank(alice);
        vm.expectRevert(TandaApp.TandaApp__InvalidGroupSize.selector);
        tanda.withdrawMyTurn();
    }

    function testCannotAdvanceTurnIfNot4Participants() public {
        vm.prank(alice);
        tanda.joinTanda();
        vm.expectRevert(TandaApp.TandaApp__InvalidGroupSize.selector);
        tanda.advanceTurn();
    }

    // function testRefundAllDeposits() public {
    //     address user3 = address(3);
    //     address user4 = address(4);

    //     address[4] memory users = [alice, bob, user3, user4];

    //     for (uint256 i = 0; i < 4; i++) {
    //         token.balances[users[i]] = 0; // Reinicia balances manualmente
    //         token.mint(users[i], AMOUNT);
    //         vm.prank(users[i]);
    //         token.approve(address(tanda), AMOUNT);
    //         vm.prank(users[i]);
    //         tanda.joinTanda();
    //     }

    //     // Ejecutar refund como owner (el test contract es el owner)
    //     tanda.refundAllDeposits();

    //     // Validar que cada uno tiene de nuevo su depósito
    //     for (uint256 i = 0; i < 4; i++) {
    //         assertEq(token.balances[users[i]], AMOUNT);
    //     }
    // }

    function testRefundFailsIfNotOwner() public {
        vm.prank(alice);
        tanda.joinTanda();

        vm.prank(alice);
        vm.expectRevert(TandaApp.TandaApp__NotOwner.selector);
        tanda.refundAllDeposits();
    }
}

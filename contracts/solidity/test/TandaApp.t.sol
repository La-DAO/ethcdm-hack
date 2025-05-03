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
    TandaApp public tanda;
    address public alice = address(1);
    address public bob = address(2);
    address public mxnb = address(100); // mock token

    uint256 constant AMOUNT = 100 * 1e18;

    MockERC20 public token;

    function setUp() public {
        token = new MockERC20();
        tanda = new TandaApp(address(token), AMOUNT);

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
        vm.expectRevert(TandaApp__AlreadyJoined.selector);
        tanda.joinTanda();
    }

    function testOnlyTurnUserCanWithdraw() public {
        vm.prank(alice);
        tanda.joinTanda();

        vm.prank(bob);
        tanda.joinTanda();

        // Alice (turn 0) can withdraw
        vm.prank(alice);
        tanda.withdrawMyTurn();

        // Bob (turn 1) should revert
        vm.prank(bob);
        vm.expectRevert(TandaApp__NotYourTurn.selector);
        tanda.withdrawMyTurn();
    }

    function testOnlyOwnerCanAdvanceTurn() public {
        vm.prank(alice);
        tanda.joinTanda();

        vm.prank(bob);
        tanda.joinTanda();

        vm.prank(bob);
        vm.expectRevert(TandaApp__NotOwner.selector);
        tanda.advanceTurn();

        tanda.advanceTurn(); // msg.sender is test contract = owner
    }
}

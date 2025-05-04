// SPDX-License-Identifier: MIT
pragma solidity 0.8.29;

interface IERC20 {
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    function transfer(address to, uint256 amount) external returns (bool);
}

// ---------------------
// Errors
// ---------------------
error TandaApp__ZeroAddress();
error TandaApp__AlreadyJoined();
error TandaApp__NotYourTurn();
error TandaApp__AlreadyWithdrawn();
error TandaApp__InvalidGroupSize();
error TandaApp__NoParticipants();
error TandaApp__AllTurnsCompleted();
error TandaApp__NotOwner();
error TandaApp__GroupFull();

contract TandaApp {
    address public immutable i_owner;
    address public immutable i_stableToken;
    uint256 public immutable i_contributionAmount;

    uint256 public s_currentTurn;
    uint256 public constant MAX_PARTICIPANTS = 4;

    struct Participant {
        address wallet;
        bool hasWithdrawn;
    }

    Participant[] public s_participants;
    mapping(address => bool) public s_joined;

    event Joined(address indexed user, uint256 index);
    event Payout(address indexed to, uint256 amount, uint256 turn);
    event TurnAdvanced(uint256 newTurn);
    event FundsReceived(address indexed from, uint256 amount);
    event FundsSent(address indexed to, uint256 amount);
    event RefundIssued(address indexed to, uint256 amount);
    event TandaReady();

    modifier onlyOwner() {
        if (msg.sender != i_owner) revert TandaApp__NotOwner();
        _;
    }

    constructor(
        address _owner,
        address _stableToken,
        uint256 _contributionAmount
    ) {
        if (_owner == address(0)) revert TandaApp__ZeroAddress();
        if (_stableToken == address(0)) revert TandaApp__ZeroAddress();
        if (_contributionAmount == 0) revert TandaApp__InvalidGroupSize();

        i_owner = _owner;
        i_stableToken = _stableToken;
        i_contributionAmount = _contributionAmount;
        s_currentTurn = 0;
    }

    function joinTanda() external {
        if (s_joined[msg.sender]) revert TandaApp__AlreadyJoined();
        if (s_participants.length >= MAX_PARTICIPANTS)
            revert TandaApp__GroupFull();

        IERC20(i_stableToken).transferFrom(
            msg.sender,
            address(this),
            i_contributionAmount
        );

        s_participants.push(
            Participant({wallet: msg.sender, hasWithdrawn: false})
        );
        s_joined[msg.sender] = true;

        emit Joined(msg.sender, s_participants.length - 1);
        emit FundsReceived(msg.sender, i_contributionAmount);

        if (s_participants.length == MAX_PARTICIPANTS) {
            emit TandaReady();
        }
    }

    function withdrawMyTurn() external {
        if (s_participants.length != MAX_PARTICIPANTS)
            revert TandaApp__InvalidGroupSize();
        if (s_currentTurn >= s_participants.length)
            revert TandaApp__AllTurnsCompleted();

        Participant storage p = s_participants[s_currentTurn];
        if (p.wallet != msg.sender) revert TandaApp__NotYourTurn();
        if (p.hasWithdrawn) revert TandaApp__AlreadyWithdrawn();

        p.hasWithdrawn = true;
        uint256 payout = i_contributionAmount * s_participants.length;
        IERC20(i_stableToken).transfer(msg.sender, payout);

        emit Payout(msg.sender, payout, s_currentTurn);
        emit FundsSent(msg.sender, payout);
    }

    function advanceTurn() external onlyOwner {
        if (s_participants.length != MAX_PARTICIPANTS)
            revert TandaApp__InvalidGroupSize();
        if (s_currentTurn >= s_participants.length - 1)
            revert TandaApp__AllTurnsCompleted();
        s_currentTurn += 1;

        emit TurnAdvanced(s_currentTurn);
    }

    function refundAllDeposits() external onlyOwner {
        for (uint256 i = 0; i < s_participants.length; i++) {
            Participant memory p = s_participants[i];
            IERC20(i_stableToken).transfer(p.wallet, i_contributionAmount);
            emit RefundIssued(p.wallet, i_contributionAmount);
        }
    }

    function getParticipants() external view returns (Participant[] memory) {
        return s_participants;
    }

    function tandaSize() external view returns (uint256) {
        return s_participants.length;
    }
}

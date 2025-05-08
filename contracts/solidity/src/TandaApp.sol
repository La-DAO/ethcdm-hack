// SPDX-License-Identifier: MIT
pragma solidity ^0.8.29;

interface IERC20 {
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    function transfer(address to, uint256 amount) external returns (bool);
}

/// @title TandaApp - A ROSCA-style decentralized savings group
contract TandaApp {
    enum Frequency {
        WEEKLY,
        BIWEEKLY,
        MONTHLY
    }

    struct Participant {
        address wallet;
        bool hasWithdrawn;
    }

    address public immutable i_owner;
    address public immutable i_stableToken;
    uint256 public immutable i_contributionAmount;
    uint256 public immutable i_maxParticipants;
    uint256 public immutable i_depositAmount;

    Participant[] public s_participants;
    mapping(address => bool) public s_joined;
    mapping(address => uint8) public s_missedContributions;
    mapping(address => bool) public s_blacklisted;
    mapping(uint256 => mapping(address => bool)) public s_contributions;

    uint256 public s_currentTurn;
    uint256 public s_startTimestamp;
    Frequency public s_frequency;
    bool public s_started;

    /// Custom errors
    error TandaApp__ZeroAddress();
    error TandaApp__AlreadyJoined();
    error TandaApp__NotYourTurn();
    error TandaApp__AlreadyWithdrawn();
    error TandaApp__InvalidGroupSize();
    error TandaApp__NoParticipants();
    error TandaApp__AllTurnsCompleted();
    error TandaApp__NotOwner();
    error TandaApp__GroupFull();
    error TandaApp__NotStarted();
    error TandaApp__Blacklisted();
    error TandaApp__AlreadyContributed();
    error TandaApp__ContributionNotOpen();

    /// Events
    event Joined(address indexed user, uint256 index);
    event Payout(address indexed to, uint256 amount, uint256 turn);
    event TurnAdvanced(uint256 newTurn);
    event FundsReceived(address indexed from, uint256 amount);
    event FundsSent(address indexed to, uint256 amount);
    event RefundIssued(address indexed to, uint256 amount);
    event TandaReady();
    event TandaStarted(uint256 timestamp, Frequency frequency);
    event ContributionReceived(address indexed from, uint256 round);
    event ParticipantBlacklisted(address indexed user);

    modifier onlyOwner() {
        if (msg.sender != i_owner) revert TandaApp__NotOwner();
        _;
    }

    constructor(
        address _owner,
        address _stableToken,
        uint256 _contributionAmount,
        uint256 _maxParticipants
    ) {
        if (_owner == address(0) || _stableToken == address(0))
            revert TandaApp__ZeroAddress();
        if (
            _contributionAmount == 0 ||
            _maxParticipants == 0 ||
            _maxParticipants > 12
        ) revert TandaApp__InvalidGroupSize();

        i_owner = _owner;
        i_stableToken = _stableToken;
        i_contributionAmount = _contributionAmount;
        i_maxParticipants = _maxParticipants;
        i_depositAmount = _contributionAmount;
    }

    function joinTanda() external {
        if (s_joined[msg.sender]) revert TandaApp__AlreadyJoined();
        if (s_participants.length >= i_maxParticipants)
            revert TandaApp__GroupFull();

        IERC20(i_stableToken).transferFrom(
            msg.sender,
            address(this),
            i_depositAmount
        );

        s_participants.push(
            Participant({wallet: msg.sender, hasWithdrawn: false})
        );
        s_joined[msg.sender] = true;

        emit Joined(msg.sender, s_participants.length - 1);
        emit FundsReceived(msg.sender, i_depositAmount);

        if (s_participants.length == i_maxParticipants) emit TandaReady();
    }

    function startTanda(Frequency _frequency) external onlyOwner {
        if (s_participants.length != i_maxParticipants)
            revert TandaApp__InvalidGroupSize();
        if (s_started) revert TandaApp__ContributionNotOpen();

        s_started = true;
        s_frequency = _frequency;
        s_startTimestamp = block.timestamp;

        emit TandaStarted(block.timestamp, _frequency);
    }

    function contributeForRound() external {
        if (!s_started) revert TandaApp__NotStarted();
        if (s_blacklisted[msg.sender]) revert TandaApp__Blacklisted();
        if (s_contributions[s_currentTurn][msg.sender])
            revert TandaApp__AlreadyContributed();

        IERC20(i_stableToken).transferFrom(
            msg.sender,
            address(this),
            i_contributionAmount
        );
        s_contributions[s_currentTurn][msg.sender] = true;

        emit ContributionReceived(msg.sender, s_currentTurn);
    }

    function withdrawMyTurn() external {
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
        if (s_currentTurn >= s_participants.length - 1)
            revert TandaApp__AllTurnsCompleted();
        s_currentTurn++;
        emit TurnAdvanced(s_currentTurn);
    }

    function penalizeAndBlacklist(address user) external onlyOwner {
        s_missedContributions[user]++;
        if (s_missedContributions[user] >= 2) {
            s_blacklisted[user] = true;
            emit ParticipantBlacklisted(user);
        }
    }

    function refundAllDeposits() external onlyOwner {
        for (uint256 i = 0; i < s_participants.length; i++) {
            Participant memory p = s_participants[i];
            IERC20(i_stableToken).transfer(p.wallet, i_depositAmount);
            emit RefundIssued(p.wallet, i_depositAmount);
        }
    }

    function getParticipants() external view returns (Participant[] memory) {
        return s_participants;
    }

    function tandaSize() external view returns (uint256) {
        return s_participants.length;
    }
}

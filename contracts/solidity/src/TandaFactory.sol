// SPDX-License-Identifier: MIT
pragma solidity ^0.8.29;

import "./TandaApp.sol";

/// @title TandaFactory - Deploys and tracks Tanda contracts
contract TandaFactory {
    /// @notice Maps user address to their deployed Tanda addresses
    mapping(address => address[]) public userTandas;

    /// @notice Emitted when a new Tanda is created
    event TandaCreated(
        address indexed owner,
        address tandaAddress,
        string name,
        string description
    );

    /// @notice Deploy a new Tanda contract
    /// @param _stableToken Address of the stablecoin to be used
    /// @param _contributionAmount Amount each participant must contribute per round
    /// @param _maxParticipants Maximum number of participants in the Tanda (1–12)
    /// @param _name Name of the Tanda (stored in event only)
    /// @param _description Description of the Tanda (stored in event only)
    function createTanda(
        address _stableToken,
        uint256 _contributionAmount,
        uint256 _maxParticipants,
        string calldata _name,
        string calldata _description
    ) external returns (address) {
        TandaApp newTanda = new TandaApp(
            msg.sender,
            _stableToken,
            _contributionAmount,
            _maxParticipants
        );

        userTandas[msg.sender].push(address(newTanda));

        emit TandaCreated(msg.sender, address(newTanda), _name, _description);
        return address(newTanda);
    }

    /// @notice Retrieve all Tandas created by the caller
    function getMyTandas() external view returns (address[] memory) {
        return userTandas[msg.sender];
    }
}

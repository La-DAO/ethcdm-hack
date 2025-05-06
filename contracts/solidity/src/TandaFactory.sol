// SPDX-License-Identifier: MIT
pragma solidity ^0.8.29;

import "./TandaApp.sol";

contract TandaFactory {
    // Guarda todas las tandas creadas por un usuario
    mapping(address => address[]) public userTandas;

    event TandaCreated(address indexed owner, address tandaAddress);

    function createTanda(
        address _stableToken,
        uint256 _contributionAmount
    ) external returns (address) {
        TandaApp newTanda = new TandaApp(
            msg.sender,
            _stableToken,
            _contributionAmount
        );

        // Transfer ownership to the caller (the frontend user)
        // El owner será el contrato factory si no ajustamos la lógica

        userTandas[msg.sender].push(address(newTanda));

        emit TandaCreated(msg.sender, address(newTanda));
        return address(newTanda);
    }

    function getMyTandas() external view returns (address[] memory) {
        return userTandas[msg.sender];
    }
}

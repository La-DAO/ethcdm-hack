// SPDX-License-Identifier: MIT
pragma solidity ^0.8.29;

import "forge-std/Script.sol";
import "../src/TandaFactory.sol";

contract DeployFactory is Script {
    function run() external {
        vm.startBroadcast();
        TandaFactory factory = new TandaFactory();
        vm.stopBroadcast();

        console2.log("TandaFactory deployed at:", address(factory));
    }
}

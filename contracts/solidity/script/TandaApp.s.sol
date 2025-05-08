// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/TandaApp.sol";

contract DeployTandaApp is Script {
    function run() external {
        // Replace with the stable token address on your target network
        address mxnb = 0x82B9e52b26A2954E113F94Ff26647754d5a4247D;

        uint256 contributionAmount = 100 * 1e6;
        uint256 maxParticipants = 12;

        address owner = msg.sender; // or specify manually

        vm.startBroadcast();
        TandaApp tanda = new TandaApp(
            owner,
            mxnb,
            contributionAmount,
            maxParticipants
        );
        vm.stopBroadcast();

        console2.log("TandaApp deployed to:", address(tanda));
    }
}

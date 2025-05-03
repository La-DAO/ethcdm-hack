// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/TandaApp.sol";

contract DeployTandaApp is Script {
    function run() external {
        address mxnb = 0x82B9e52b26A2954E113F94Ff26647754d5a4247D; // MXNB (testnet)

        uint256 contributionAmount = 100 * 1e6;

        vm.startBroadcast();
        TandaApp tanda = new TandaApp(mxnb, contributionAmount);
        vm.stopBroadcast();

        console2.log("TandaApp deployed to:", address(tanda));
    }
}

// ethcdm-hack/wagmiConfig.ts

// Import `createConfig` from `@privy-io/wagmi`
import { createConfig } from '@privy-io/wagmi';

// Import the chains you want to support
import { arbitrumSepolia  } from 'viem/chains';

// Import the HTTP transport from `wagmi`
import { http } from 'wagmi';

// Create the wagmi configuration
export const config = createConfig({
  chains: [ arbitrumSepolia], // Specify the chains your app supports
  transports: {
    [arbitrumSepolia.id]: http(), // Set up HTTP transport for sepolia
    // Add additional chains and transports as needed
  },
});

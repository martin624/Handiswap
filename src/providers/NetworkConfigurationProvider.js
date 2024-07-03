import { useLocalStorage } from "@solana/wallet-adapter-react";
import React, { createContext, useContext } from "react";

export const NetworkConfigurationContext = createContext({
  networkConfiguration: "mainnet-beta",
  setNetworkConfiguration: () => {},
});

export function useNetworkConfiguration() {
  return useContext(NetworkConfigurationContext);
}

export const NetworkConfigurationProvider = ({ children }) => {
  const [networkConfiguration, setNetworkConfiguration] = useLocalStorage(
    "network",
    "mainnet-beta"
  );

  return (
    <NetworkConfigurationContext.Provider value={{ networkConfiguration, setNetworkConfiguration }}>
      {children}
    </NetworkConfigurationContext.Provider>
  );
};

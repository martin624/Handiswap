import React, { FC, ReactNode, useCallback, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { WalletAdapterNetwork, WalletError } from '@solana/wallet-adapter-base';
// import {
//     PhantomWalletAdapter,
//     SolflareWalletAdapter,
//     TorusWalletAdapter,
// } from '@solana/wallet-adapter-wallets';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { SolflareWalletAdapter } from '@solana/wallet-adapter-solflare';
import { clusterApiUrl } from '@solana/web3.js';
import {NetworkConfigurationProvider, useNetworkConfiguration} from './NetworkConfigurationProvider';
import {AutoConnectProvider, useAutoConnect} from './AutoConnectProvider'
import { toast } from 'sonner';

// Default styles for @solana/wallet-adapter-react-ui
require('@solana/wallet-adapter-react-ui/styles.css');

const WalletContextProvider: FC<{children: ReactNode}> = ({ children }) => {
    // Set the network to Devnet
    // const network = 'devnet';

    // // Create a connection to the cluster
    // const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    // // Set up wallet adapters
    // const wallets = useMemo(
    //     () => [
    //         new PhantomWalletAdapter(),
    //         new SolflareWalletAdapter(),
    //         // new SolflareWalletAdapter({ network }),
    //         // new TorusWalletAdapter(),
    //     ],
    //     [network]
    // );

    const {autoConnect} = useAutoConnect();
    const {networkConfiguration} = useNetworkConfiguration();
    const network = networkConfiguration as WalletAdapterNetwork;

    const originalEndPoint = useMemo(()=> clusterApiUrl(network), [network]);

    let endpoint;
    

    if(network === "mainnet-beta"){
        endpoint = "https://solana-mainnet.g.alchemy.com/v2/ot2SqvTF7lQNbysKkQdokKawiRJm3HY1"
    }else if(network === "devnet"){
        endpoint = originalEndPoint;
    }else {
        endpoint = originalEndPoint;
    }

    

    // Set up wallet adapters
    // Set up wallet adapters
    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SolflareWalletAdapter(),
        ],
        []
    );

    const onError = useCallback((error: WalletError) => {
        toast.error(error.message ? `${error.name}: ${error.message}` : error.name);
        console.log(error);
    }, []);




    return (

        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} onError={onError} autoConnect={autoConnect}>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>

    );
};

export const ContextProvider: FC<{children: ReactNode}> = ({children,})=>{
    return (
        <>
            <NetworkConfigurationProvider>
                <AutoConnectProvider>
                    <WalletContextProvider>{children}</WalletContextProvider>
                </AutoConnectProvider>
            </NetworkConfigurationProvider>
        </>
    )
}


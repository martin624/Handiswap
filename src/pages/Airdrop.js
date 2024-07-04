import styled from "styled-components";
import useUserSOLBalance from "../store/useUserSOLBalanceStore.tsx";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import React, { useCallback, useEffect, useState } from "react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";   
// import { LAMPORTS_PER_SOL, TransactionSignature } from "@solana/web3.js";   
import { toast } from "sonner";
import { Helmet } from "react-helmet";
import ConnectWalletModal from "../components/ConnectWalletModal";
import { useNetworkConfiguration } from "../providers/NetworkConfigurationProvider";

// Function to detect mobile environment
const isMobile = () => {
    const userAgent = typeof navigator === 'undefined' ? '' : navigator.userAgent;
    return /iPhone|iPad|iPod|Android/i.test(userAgent);
};

const Container = styled.div`
    padding: 20px;
    margin: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    text-align:center;
    background: var(--light_transparent_black);
    border-radius: 10px;

    @media screen and (max-width: 500px){
        padding: 10px;
        margin: 10px;
    }
`;

const Button = styled.button`
    border:none;
    background: rgba(0, 255, 0, 0.2);
    color: var(--primary_color);
    padding: 15px 20px;
    border-radius: 10px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
`;


const LoginButton = styled.button`
    border:none;
    background: var(--dark_color);
    color: var(--white_color);
    padding: 15px 20px;
    border-radius: 10px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
`;

const Airdrop = () => {
    const wallet = useWallet();
    const {connection} = useConnection();
    const {publicKey, select, wallets} = useWallet();
    const [openWallets, setOpenWallets] = useState(false);

    const balance = useUserSOLBalance((s)=> s.balance);
    const {getUserSOLBalance} = useUserSOLBalance();
    const { networkConfiguration, setNetworkConfiguration } = useNetworkConfiguration();

    useEffect(()=>{
        if(wallet.publicKey){
            getUserSOLBalance(wallet.publicKey, connection);
        }
    },[wallet.publicKey, connection, getUserSOLBalance]);

    
    const onClick = useCallback(async()=>{
        if(!publicKey){
            toast.error("Wallet not connected!")
            return;
        }
        let signature = "";
        // let signature: TransactionSignature = "";

        try {
            signature = await connection.requestAirdrop(publicKey, LAMPORTS_PER_SOL);
            toast.success("You have successfully claim 1 airdrop");

            const latestBlockHash = await connection.getLatestBlockhash();
            await connection.confirmTransaction({
                blockhash: latestBlockHash.blockhash,
                lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
                signature,
            });

            getUserSOLBalance(publicKey, connection);
        } catch (error) {
            toast.error("You have requested too many airdrops. Wait 24 hours for a refill.");
            // if (error.code === 429) {
            //     toast.error("You have requested too many airdrops. Wait 24 hours for a refill.");
            // } else {
            //     toast.error(error?.message || "An unknown error occurred");
            // }
        }
    },[publicKey, connection, getUserSOLBalance]);

    
    const openModal = () => {
        setOpenWallets(true);
    };

    const closeModal = (e) => {
        setOpenWallets(false);
    };

    const handleWalletSelect = async (walletName) => {
        // setNetworkConfiguration('testnet');
        if (walletName) {
            // setNetworkConfiguration('testnet');
            try {
                select(walletName);
                setOpenWallets(false);
                // setNetworkConfiguration('testnet');
            } catch (error) {
                toast.error("Wallet connectio failed")
                // console.log("wallet connection err : ", error);
            }
        }

        // setNetworkConfiguration('testnet');
    };

    if(openWallets){
        document.body.style.overflow = 'hidden';
    }else{
        document.body.style.overflow = '';
    }
    
    return (
        <>
            <Container>
                <Helmet>
                    <title>Handiswap - faucet airdrop</title>
                </Helmet>
                <h1 style={{color:'var(--dark_color)'}}>Claim 1 Airdrop SOL for free daily, you have to be on the testnet network.</h1>
                {wallet &&(
                    <h4 style={{display:'flex', alignItems:'center', gap: '10px', color:'var(--dark_color)', justifyContent:'center'}}>SOL Balance: <h2 style={{color:'var(--primary_color)'}}>{(balance || 0).toLocaleString()}</h2></h4>
                )}

                <p style={{color:'var(--dark_color)'}}>You can now claim your 1 Airdrop and use it to test and create your token on our platfrom</p>
                <h2 style={{color:'#EF4444'}}>This tool does *NOT* give real $SOL or Solana tokens.</h2>
                <div>
                    {publicKey?<Button onClick={onClick}>Claim 1 SOL</Button>
                    :<LoginButton onClick={openModal}>Login</LoginButton>}
                </div>
            </Container>
            <ConnectWalletModal openWallets={openWallets} closeModal={closeModal} isMobile={isMobile} wallets={wallets} handleWalletSelect={handleWalletSelect} networkConfiguration={networkConfiguration} setNetworkConfiguration={setNetworkConfiguration}/>
        </>
    )
}

export default Airdrop;










































// import React, { FC, useCallback, useEffect, useState } from "react";
// import styled from "styled-components";
// import { useConnection, useWallet } from "@solana/wallet-adapter-react";
// import { LAMPORTS_PER_SOL, PublicKey, TransactionSignature } from "@solana/web3.js";
// import { toast } from "sonner";
// import useUserSOLBalance from "../store/useUserSOLBalanceStore.tsx";

// const Container = styled.div``;

// const Airdrop: FC = () => {
//     const wallet = useWallet();
//     const {connection} = useConnection();
//     const {publicKey} = useWallet();

//     const balance = useUserSOLBalance((s)=> s.balance);
//     const {getUserSOLBalance} = useUserSOLBalance();

//     useEffect(()=>{
//         if(wallet.publicKey){
//             getUserSOLBalance(wallet.publicKey, connection);
//         }
//     },[wallet.publicKey, connection, getUserSOLBalance]);

//     const [lastClaimed, setLastClaimed] = useState<number | null>(null);
//     const [canClaim, setCanClaim] = useState<boolean>(true);

//     useEffect(() => {
//         const lastClaimedTimestamp = localStorage.getItem("lastClaimed");
//         if (lastClaimedTimestamp) {
//             const lastClaimedDate = parseInt(lastClaimedTimestamp, 10);
//             setLastClaimed(lastClaimedDate);
//             const now = Date.now();
//             const hoursPassed = (now - lastClaimedDate) / (1000 * 60 * 60);
//             if (hoursPassed < 24) {
//                 setCanClaim(false);
//             }
//         }
//     }, []);

//     const onClick = useCallback(async () => {
//         if (!publicKey) {
//             toast.error("Wallet not connected!");
//             return;
//         }

//         if (!canClaim) {
//             toast.error("You can only claim 1 airdrop every 24 hours.");
//             return;
//         }

//         try {
//             const signature: TransactionSignature = await connection.requestAirdrop(
//                 new PublicKey(publicKey),
//                 LAMPORTS_PER_SOL
//             );

//             const latestBlockHash = await connection.getLatestBlockhash();
//             await connection.confirmTransaction({
//                 blockhash: latestBlockHash.blockhash,
//                 lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
//                 signature,
//             });

//             // Update last claimed timestamp in local storage
//             const now = Date.now();
//             localStorage.setItem("lastClaimed", now.toString());
//             setLastClaimed(now);
//             setCanClaim(false); // Disable claiming until 24 hours pass
//             toast.success("You have successfully claimed 1 airdrop.");
//         } catch (error) {
//             if (error.code === 429) {
//                 toast.error("You have requested too many airdrops. Wait 24 hours for a refill.");
//             } else {
//                 toast.error(error?.message || "An unknown error occurred.");
//             }
//         }
//     }, [publicKey, connection, canClaim]);

//     return (
//         <Container>
//             <h1>Claim 1 TESTNET SOL for free daily on the testnet network.</h1>
//             {wallet && <p>SOL Balance: {(balance || 0).toLocaleString()}</p>}
//             <p>You can now claim your 1 Airdrop and use it to test and create your token on our platform.</p>
//             <button disabled={!publicKey || !canClaim} onClick={onClick}>
//                 Claim 1 SOL
//             </button>
//         </Container>
//     );
// };

// export default Airdrop;

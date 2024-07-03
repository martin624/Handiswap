import styled from "styled-components";
import useUserSOLBalance from "../store/useUserSOLBalanceStore.tsx";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import React, { FC, useCallback, useEffect, useState } from "react";
import { LAMPORTS_PER_SOL, TransactionSignature, PublicKey, Transaction, SystemProgram } from "@solana/web3.js";   
import { toast } from "sonner";
import LoaderSpinner from "../components/LoaderSpinner.js";
import { Helmet } from "react-helmet";


const Container = styled.div`
    padding: 20px;
    display:flex;
    justify-content: center;
    position: fixed;
    align-items: center;
    top:0;
    bottom:0;
    left:0;
    right:0;

    @media screen and (max-width: 500px){
        padding: 10px;
    }
`;
const InputContainer = styled.div`
    display:flex;
    padding: 10px;
    background: var(--light_transparent_black);
    border-radius: 10px;
    width: 300px;
    margin: auto;

    @media screen and (max-width: 500px){
        width: 100%;
    }
`;
const Input = styled.input`
    /* Chrome, Safari, Edge, Opera */
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    /* Firefox */
    -moz-appearance: textfield;

    flex: 1;
    width: 100%;
    background: none;
    border:none;
    outline:none;
    color: var(--dark_color);
    padding: 10px;
`;
const SubmitButton = styled.button`
    background: rgba(0, 255, 0, 0.1);
    color: var(--primary_color);
    padding: 15px 20px;
    border-radius: 10px;
    border:none;
    cursor: pointer;
    font-weight: 600;
`;

const BlackDiv = styled.div`
    position: fixed;
    top:0;
    bottom:0;
    left:0;
    right:0;
    background: rgb(0,0,0,0.5);
    z-index:10;
    align-items:center;
    justify-content:center;
    display: flex;
    backdrop-filter: blur(5px);
    opacity: ${(props) => (props.isVisible ? '1' : '0')};
    visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')};
    transition: opacity 0.3s ease, visibility 0.3s ease;
`;


const SendTransaction = () => {
    const [isLoading, setIsLoading] = useState(false);
    const wallet = useWallet();
    const {connection} = useConnection();
    const {publicKey, sendTransaction} = useWallet();

    const balance = useUserSOLBalance((s)=> s.balance);
    const {getUserSOLBalance} = useUserSOLBalance();
    const [donationAmount, setDonationAmount] = useState("");

    useEffect(()=>{
        if(wallet.publicKey){
            getUserSOLBalance(wallet.publicKey, connection);
        }
    },[wallet.publicKey, connection, getUserSOLBalance]);

    const onClick = useCallback(async()=>{
        setIsLoading(true);
        if(!publicKey){
            toast.error("Wallet not connected!")
            setIsLoading(false);
            return;
        }

        if(!donationAmount){
            toast.error("Please enter a valid amount!")
            setIsLoading(false);
            return;
        }

        if(Number(donationAmount)<0.1){
            toast.error("Please enter an amount greater than 0!")
            setIsLoading(false);
            return;
        }

        const creatorAddress = new PublicKey(process.env.REACT_APP_SOLANA_ADDRESS);
        let signature = "";
        // let signature: TransactionSignature = "";
        try {

            // use this to send money
            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: publicKey,
                    toPubkey: creatorAddress,
                    lamports: LAMPORTS_PER_SOL * Number(donationAmount),
                })
            )
            signature = await sendTransaction(transaction, connection);
            toast.success(`You have successfully donated ${donationAmount} SOL`)
            setIsLoading(false);
            
        } catch (error) {
            toast.error("Transaction failed, please try again.");
            setIsLoading(false);
            return;
        }
        setIsLoading(false);
    },[publicKey, donationAmount, sendTransaction, connection])

  return (
    <>
        <Helmet>
            <title>Donate to - Handiswap</title>
        </Helmet>
        <Container>
            <InputContainer>
                <Input placeholder="Donation amount in SOL" name="donationAmount" onChange={(e)=> setDonationAmount(e.target.value)} type="number" />

                <SubmitButton onClick={onClick} disabled={!publicKey}>Donate</SubmitButton>
            </InputContainer>
        </Container>
        
        <BlackDiv isVisible={isLoading}><LoaderSpinner color='white' height={30} width={30}/></BlackDiv>
    </>
    
  )
}

export default SendTransaction
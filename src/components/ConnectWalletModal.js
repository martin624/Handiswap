import React from 'react'
import styled from 'styled-components';
import { MdCancel } from "react-icons/md";


const ConnectWalletModalCon = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgb(0,0,0,0.5); /* Semi-transparent background */
    z-index: 999; /* Adjust as necessary */
    backdrop-filter: blur(10px);
    opacity: ${(props) => (props.openWallets ? '1' : '0')};
    visibility: ${(props) => (props.openWallets ? 'visible' : 'hidden')};
    transition: opacity 0.3s ease, visibility 0.3s ease;
`;
const ConnectWalletCon = styled.div`
    width: 300px;
    background-color: var(--white_color); /* Example background color */
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Example box shadow */
`;


const WalletNameCon = styled.div`
    display:flex;
    align-items:center;
    gap:20px;
    cursor:pointer;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 10px;

    &:hover{
        background: var(--light_transparent_black);
    }
`;
const Label = styled.h1`
    font-size:20px;
    display:flex;
    justify-content:space-between;
    color:var(--dark_color);
`;
const LabelSub = styled.h4`
    font-size:13px;
    color:grey;
    margin-top:10px;
    margin-bottom:20px;
    font-weight:500;
`;
const WalletName = styled.div`
    color:var(--dark_color);
`;
const WalletIcon = styled.img`
    width:30px;
    height:30px;
`;

const ConnectWalletModal = ({openWallets, closeModal, isMobile, wallets, handleWalletSelect, networkConfiguration, setNetworkConfiguration}) => {
  return (
    <ConnectWalletModalCon openWallets={openWallets} onClick={closeModal}>
        <ConnectWalletCon onClick={(e) => e.stopPropagation()}>
            <Label>
                Connect Wallet 
                    <MdCancel 
                        style={{cursor:'pointer'}} 
                        onClick={closeModal} 
                        color="var(--dark_color)"
                    />
            </Label>
            <LabelSub>You need to connect a Solana wallet.</LabelSub>
            {wallets.map((wallet) =>(
                <>
                    {!isMobile() || wallet.adapter.name !== 'Phantom' ? (
                        <WalletNameCon key={wallet.adapter.name} onClick={() => {
                            handleWalletSelect(wallet.adapter.name);

                            if(isMobile()){
                                setTimeout(() => {
                                    if(networkConfiguration=='testnet'){
                                        setNetworkConfiguration('mainnet-beta');
                                    }else if(networkConfiguration=='mainnet-beta'){
                                        setNetworkConfiguration('testnet');
                                    }else if(networkConfiguration=='devnet'){
                                        setNetworkConfiguration('mainnet-beta');
                                    }
                                }, 1000);
                            }
                            
                        }}>
                            <WalletIcon src={wallet.adapter.icon} />
                            <WalletName>{wallet.adapter.name}</WalletName>
                        </WalletNameCon>
                    ) : null}
                </>
            ))}

        </ConnectWalletCon>
    </ConnectWalletModalCon>
  )
}

export default ConnectWalletModal
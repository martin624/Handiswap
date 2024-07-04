import styled from "styled-components"
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { shortenTextWithParentheses } from "./AddressShortner.js";
import DarkMode from "./DarkMode.js";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io5";
import { FaDiscord } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import useUserSOLBalance from "../store/useUserSOLBalanceStore.tsx";
import { IoWalletOutline } from "react-icons/io5";
import { FaDonate } from "react-icons/fa";
import { TbCurrencySolana } from "react-icons/tb";
import { IoDocumentTextOutline } from "react-icons/io5";
import { useNetworkConfiguration } from "../providers/NetworkConfigurationProvider.js";
import ConnectWalletModal from "./ConnectWalletModal.js";
import { IoCreateOutline } from "react-icons/io5";
import { FaRegCircleCheck } from "react-icons/fa6";
import HandiswapLogo from "../images/handiswaplogo.png";

const NetworkSwitcher = React.lazy(() => import('./NetworkSwitcher.tsx'));

// const toFixed = (num, fixed) => {
//     // Convert num to string
//     const numStr = num.toString();
    
//     // Create regular expression dynamically
//     const re = new RegExp(`^-?\\d+(?:\\.\\d{0,${fixed || -1}})?`);
    
//     // Match against the regular expression
//     const match = numStr.match(re);
    
//     // Return the first match or an empty string if no match
//     return match ? match[0] : '';
// };


// Function to detect mobile environment
const isMobile = () => {
    const userAgent = typeof navigator === 'undefined' ? '' : navigator.userAgent;
    return /iPhone|iPad|iPod|Android/i.test(userAgent);
};

const Container = styled.div`
    position: sticky;
    left:0;
    right:0;
    top:0;
    z-index:10;
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:space-between;
    padding: 10px 20px;
    background: var(--white_color); /* White with some transparency */
    backdrop-filter: blur(10px); /* Adjust the blur intensity */
    // overflow:hidden;

    @media screen and (max-width: 500px){
        padding: 5px 10px;
    }
`;

const InnerContainer = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:space-between;
    gap:20px;
`;

const Logo = styled.h1`
    color: var(--dark_color);
    font-size:20px;
    font-weight:600;
    display: flex;
    align-items: center;
    gap: 5px;
`;

const LogoImageCon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 5px;

    @media screen and (max-width: 500px){
        width: 30px;
        height: 30px;
    }
`;



const LogoImage = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 5px;
`;


const LogoText = styled.div`
    @media screen and (max-width: 500px){
        display: none;
    }
`;

const MenuItemsContainer = styled.ul`
    padding:0;
    display: flex;
    gap: 10px;
    align-items:center;
`;
const MenuItem = styled.li`
    list-style:none;
    padding: 15px;
    border-radius: 10px;
    background: var(--light_transparent_black);
    font-weight:600;
    cursor:pointer;
    font-size: 15px;
    color: var(--dark_color);
    display: flex;
    gap: 10px;
    align-items:center;

    @media screen and (max-width: 500px){
        padding: 10px;
        font-weight:500;
    }
`;
const MenuItem2 = styled.li`
    list-style:none;
    padding: 10px;
    border-radius: 10px;
    background: rgba(0, 255, 0, 0.1);
    font-weight:600;
    cursor:pointer;
    color: var(--dark_color);

    @media screen and (max-width: 500px){
        padding: 10px;
    }
`;
const MenuToggle = styled.div`
    padding:15px;
    background:var(--primary_color);
    border-radius:100%;

    @media screen and (max-width: 500px){
        padding: 10px;
    }
`;


const ConnectWalletButton = styled.div`
    cursor:pointer;
    // background: var(--dark_color);
    color: var(--dark_color);
    font-size: 15px;
    font-weight: 600;
    padding: 15px;
    border-radius:10px;
    text-align: center;
    display:flex;
    align-items:center;
    gap: 20px;

    &:hover{
        background: var(--light_transparent_black);
    }
`;


const SecondaryNav = styled.div`
    padding: 10px;
    position: fixed;
    top:100px;
    background: var(--white_color);
    box-shadow: 0 0 10px var(--light_transparent_black); /* Example box shadow */
    border-radius:10px;
    transition: 0.3s ease-in-out;
    width: 250px;
    z-index: 10;
    right: ${(props) => (props.isOpen ? '20px' : '-300px')};
    // display:flex;
    top:70px;
    


    @media screen and (max-width:500px){
        right: ${(props) => (props.isOpen ? '10px' : '-300px')};
        top:50px;
    }
`;

const InnerSecondaryNav = styled.div`

`;



const SocialIconsCon = styled.div`
    display:flex;
    justify-content:space-between;
    color: var(--dark_color);
    align-items:center;
    padding: 15px;
    
`;

const LogoutButton = styled.div`
    cursor:pointer;
    // background: var(--dark_color);
    color: var(--dark_color);
    font-size: 15px;
    font-weight: 600;
    padding: 15px;
    border-radius:10px;
    text-align: center;
    display:flex;
    align-items:center;
    gap: 20px;

    &:hover{
        background: var(--light_transparent_black);
    }
`;


const Header = () => {
    const { connection } = useConnection();
    const { select, wallets, publicKey, disconnect, connecting } = useWallet();
    const [openWallets, setOpenWallets] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const wallet = useWallet();
    const [copyAddress, setCopyAddress] = useState(false);

    const balance = useUserSOLBalance((s)=> s.balance);
    const {getUserSOLBalance} = useUserSOLBalance();

    const { networkConfiguration, setNetworkConfiguration } = useNetworkConfiguration();



    useEffect(()=>{
        if(wallet.publicKey){
            getUserSOLBalance(wallet.publicKey, connection);
        }
    },[wallet.publicKey, connection, getUserSOLBalance]);

    const toggleSideBar = () => {
        // document.body.style.overflow = 'hidden';
        if(isSidebarOpen){
            setIsSidebarOpen(false);
        }else{
            setIsSidebarOpen(true);
        }
        
    };

    const closeSidebar = () => {
        // document.body.style.overflow = '';
        setIsSidebarOpen(false);
    };
    
      

    if(openWallets || isSidebarOpen){
        document.body.style.overflow = 'hidden';
    }else{
        document.body.style.overflow = '';
    }

    

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
                console.log("wallet connection err : ", error);
            }
        }

        // setNetworkConfiguration('testnet');
    };

    const handleDisconnect = async () => {
        closeSidebar();
        disconnect();
    };

    const showCopyAddress=()=>{
        setCopyAddress(true);
        setTimeout(() => {
            setCopyAddress(false);
        }, 2000);
    }


    

    return (
        <>
            <Container>
                <Link onClick={()=>closeSidebar()} to='/' style={{textDecoration:'none'}}>
                    <Logo>
                        <LogoImageCon>
                            <LogoImage src={HandiswapLogo}/>
                        </LogoImageCon>
                        <LogoText>Handiswap</LogoText>
                    </Logo>
                </Link>
                {/* <ToggleButton>Tog</ToggleButton> */}

                <InnerContainer>
                    {/* <NavigationLinkCon>
                        {menu.map((route, index)=>(
                            <NavLink className='nav-link' activeClassName='nav-link-active' key={index} to={route.link}><NavigationLinkLink>{route.name}</NavigationLinkLink></NavLink>
                        ))}
                    </NavigationLinkCon> */}
                    <NetworkSwitcher/>

                    <MenuItemsContainer>
                        {publicKey?<MenuItem><IoWalletOutline style={{color:"var(--dark_color)"}} />{(balance || 0).toLocaleString()} SOL</MenuItem>:<MenuItem onClick={openModal}><IoWalletOutline style={{color:"var(--dark_color)"}}/>Login</MenuItem>}
                        <MenuItem2 onClick={toggleSideBar}>
                            <MenuToggle/>
                        </MenuItem2>
                    </MenuItemsContainer>
                    
                                        
                </InnerContainer>

                
                
            </Container>

            <SecondaryNav isOpen={isSidebarOpen}>
            {/* <SecondaryNav style={{right: isSidebarOpen?'20px':'-500px'}}> */}
                                    
                    <InnerSecondaryNav>
                        {/* <Secondarynavlink2>{menu.map((route, index)=>(
                            <NavLink onClick={(e)=>setIsSidebarOpen(false)} className='nav-link' activeClassName='nav-link-active' key={index} to={route.link}><NavigationLinkLink>{route.name}</NavigationLinkLink></NavLink>
                        ))}</Secondarynavlink2> */}

                        {/* {balance!=null&& (<div style={{display:'flex', gap:'20px', alignItems:'center', padding:'15px', fontWeight:'bold', color:'var(--dark_color)', fontSize:'15px'}}>Wallet balance: {toFixed(balance, 2)} SOL</div>) } */}

                        {publicKey?<ConnectWalletButton onClick={()=>{navigator.clipboard.writeText(publicKey?.toBase58()); showCopyAddress()}}><IoWalletOutline style={{color:"var(--dark_color)"}}/>{shortenTextWithParentheses(publicKey?.toBase58(), 15)}{copyAddress&&<FaRegCircleCheck />}</ConnectWalletButton>:<ConnectWalletButton onClick={openModal}><IoWalletOutline style={{color:"var(--dark_color)"}}/>{connecting ? "connecting..." : "Login"}</ConnectWalletButton>}
                        <Link onClick={()=>closeSidebar()} to='/token-mint' style={{textDecoration:'none'}}><ConnectWalletButton><IoCreateOutline style={{color:"var(--dark_color)"}}/>Create</ConnectWalletButton></Link>
                        <Link onClick={()=>closeSidebar()} to='/donate' style={{textDecoration:'none'}}><ConnectWalletButton><FaDonate style={{color:"var(--dark_color)"}}/>Donate</ConnectWalletButton></Link>
                        <Link onClick={()=>closeSidebar()} to='/testnet-sol' style={{textDecoration:'none'}}><ConnectWalletButton><TbCurrencySolana style={{color:"var(--dark_color)"}}/>Free Testnet SOL</ConnectWalletButton></Link>
                        <Link onClick={()=>closeSidebar()} to='/token-metadata' style={{textDecoration:'none'}}><ConnectWalletButton><IoDocumentTextOutline style={{color:"var(--dark_color)"}}/>View Token Metadata</ConnectWalletButton></Link>
                        <DarkMode/>
                    </InnerSecondaryNav>

                    

                    

                    {publicKey&&<LogoutButton onClick={handleDisconnect}><FiLogOut style={{color:"var(--dark_color)"}}/>Log Out</LogoutButton>}
                    <SocialIconsCon>
                        <a href="https://x.com/Handiswap" target="_blank" rel="noreferrer"><FaXTwitter style={{cursor:'pointer', color:'var(--dark_color)'}} /></a>
                        <IoLogoInstagram style={{cursor:'pointer', color:'var(--dark_color)'}} />
                        <FaDiscord style={{cursor:'pointer', color:'var(--dark_color)'}} />
                        <FaTelegramPlane style={{cursor:'pointer', color:'var(--dark_color)'}} />
                        
                        
                        
                    </SocialIconsCon>

            </SecondaryNav>

            {/* <BlackDiv isVisible={isSidebarOpen}/> */}

            <ConnectWalletModal openWallets={openWallets} closeModal={closeModal} isMobile={isMobile} wallets={wallets} handleWalletSelect={handleWalletSelect} networkConfiguration={networkConfiguration} setNetworkConfiguration={setNetworkConfiguration}/>
        </>
    )
}

export default Header
import styled from "styled-components"
import React from 'react'
import { useWallet } from '@solana/wallet-adapter-react';
import { shortenTextWithParentheses } from "./AddressShortner.js";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io5";
import { FaDiscord } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { Link } from "react-router-dom";

const Container = styled.div`
    padding: 20px;
    display: flex;
    justify-content: space-between;
    flex-wrap:wrap;
    border-top: solid 1px var(--light_transparent_white);
    gap: 20px;

    @media screen and (max-width: 500px){
        padding: 10px;
        flex-direction:column;

    }
`;

const SolanaImage = styled.img`
    width: 25px;
    height: 25px;
    border-radius: 50px;
`;
const Copyrighttext = styled.div`
    color: var(--dark_color);
`;
const MainText = styled.div`
    display: flex;
    align-items:center;
    gap: 10px;
    color: var(--dark_color);
`;
const MenuContainer = styled.ul`
    display: inline-flex;
    gap: 20px;

    @media screen and (max-width: 500px){
        flex-direction:column;
    }
`;
const MenuItem = styled.li`
    list-style:none;
    cursor: pointer;
    color: var(--dark_color);
`;

const SocialIconsCon = styled.div`
    display:flex;
    justify-content:space-between;
    color: var(--dark_color);
    align-items:center;
    gap: 20px;

    @media screen and (max-width: 500px){
        width: 200px;        
    }
    
`;

const Footer = () => {

  return (
    <Container>
        <MainText><SolanaImage src='https://cryptologos.cc/logos/solana-sol-logo.svg?v=032'/> Powered by Solana Blockchain</MainText>
        <Copyrighttext>© 2024 Handiswap</Copyrighttext>
        {/* <MenuContainer>
            <Link style={{textDecoration:'none'}} to='/terms-of-service'><MenuItem>Terms of service</MenuItem></Link>
            <Link style={{textDecoration:'none'}} to='/privacy-policy'><MenuItem>Privacy policy</MenuItem></Link>
        </MenuContainer> */}
        <SocialIconsCon>
            <FaXTwitter style={{cursor:'pointer', color:'var(--dark_color)'}} />
            <IoLogoInstagram style={{cursor:'pointer', color:'var(--dark_color)'}} />
            <FaDiscord style={{cursor:'pointer', color:'var(--dark_color)'}} />
            <FaTelegramPlane style={{cursor:'pointer', color:'var(--dark_color)'}} />
        </SocialIconsCon>
    </Container>
  )
}

export default Footer
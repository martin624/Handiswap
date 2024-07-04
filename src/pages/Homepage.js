import styled from "styled-components"
import React, { useEffect, useState } from 'react'
// import { useWallet } from '@solana/wallet-adapter-react';
import ContactUs from "./ContactUs";
import { FaArrowRightLong } from "react-icons/fa6";
// import SleekImage from "../images/sleek_image.jpeg"
import { Link } from "react-router-dom";
import RoundOffNumber from "../components/RoundOffNumber";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";
const Container = styled.div`
    // padding: 20px;

    // @media screen and (max-width: 500px){
    //     padding: 10px;
    // }
`;

const InnerContainer = styled.div`
    padding: 20px 100px 20px 50px;
    border-radius: 10px;
    background: var(--light_transparent_black);
    margin: 20px;

    @media screen and (max-width: 500px){
        margin: 10px;
    }

    @media screen and (max-width: 500px){
        padding: 20px;
    }
`;

const Bigtext = styled.h1`
    color: var(--dark_color);
    margin-bottom: 20px;

    @media screen and (max-width: 500px){
        font-size: 25px;
    }
`;

const Smalltext = styled.p`
    color: var(--transparent_black);
    font-weight:500;
    font-size: 18px;
    line-height: 25.2px;
    // letter-spacing: -0.1px;
    margin-bottom: 20px;

    @media screen and (max-width: 500px){
        font-size: 15px;
    }
`;

const GetStartedButton = styled.div`
    display: inline-flex;
    align-items: center;
    padding: 10px 20px;
    background: var(--primary_color);
    color: white;
    border-radius: 20px;
    cursor: pointer;

    &:hover {
        background: #0A2540;
    }

    &:hover .arrow-icon {
        opacity: 1;
        transform: translateX(5px);
    }

    .arrow-icon {
        opacity: 0;
        margin-left: 5px;
        transition: opacity 0.3s ease, transform 0.3s ease;
    }
`;

const CreatedTokensSection = styled.div`
    padding: 10px;
    display: flex;
    gap: 50px;
    margin: 20px;

    
    margin-top: 50px;

    @media screen and (max-width: 900px){
        flex-direction: column;
    }

    @media screen and (max-width: 500px){
        margin: 10px;
    }
`;
const LeftCreatedTokensSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
`;
const RightCreatedTokensSection = styled.div`
    flex: 1;
    display: flex;
    gap: 20px;

    @media screen and (max-width: 900px){
        flex-direction: column;
    }
`;
const LeftConItem = styled.div``;
const Image = styled.img`
    width:100%;
    height:100%;
`;
const NumberText = styled.h1`
    margin-bottom: 10px;
    color: var(--dark_color);
`;
const NumberExplanantion = styled.div`
    color: var(--dark_color);
`;
const RightIconItem = styled.div`
    flex:1;
    padding: 20px;
    background: var(--light_transparent_black);
    border-radius:20px;
    display:flex;
    flex-direction: column;
    gap: 20px;


    transition: transform 0.3s ease;

    &:hover{
        transform: scale(1.1)
    }
`;
const RightIconBigtext = styled.h1`
    font-size: 20px;
    color: var(--dark_color);
    background: linear-gradient(90deg, #0082fb, #00ff00, #0000ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
`;
const RightIconSmalltext = styled.div`
    font-size: 17px;
    color: var(--transparent_black);
`;

const ContactArea = styled.div`
    padding: 50px 20px;
    // clip-path: polygon(0 20%, 100% 0, 100% 76%, 0% 100%);
    background: var(--light_transparent_black);
    display: flex;
    margin-top: 50px;
`;
const ContactTextCon = styled.div`
    
`;
const ContactText = styled.h1`
    color: var(--dark_color);
    margin-bottom:20px;
`;
const ContactTextExplanation = styled.p`
    color: var(--dark_color);
    margin-bottom:20px;
`;
const ContactImage = styled.div``;

const Homepage = () => {
    // const { publicKey } = useWallet();
    const [tokensCreatedCount, setTokensCreatedCount] = useState(0);
    const [usersCount, setUsersCount] = useState(0);
    const tokensLimit = 1100;
    const usersLimit = 1000;
    const duration = 2000;
    const tokensIncrementTime = Math.floor(duration/tokensLimit);
    const usersIncrementTime = Math.floor(duration/usersLimit);

    useEffect(()=>{
        let currentCount = 0;
        let usersurrentCount = 0;
        const tokensIncrementCounter = ()=>{
            setTokensCreatedCount(++currentCount);

            if(currentCount<tokensLimit){
                setTimeout(tokensIncrementCounter, tokensIncrementTime)
            }
        }

        const usersIncrementCounter = ()=>{
            setUsersCount(++usersurrentCount);

            if(usersurrentCount<usersLimit){
                setTimeout(usersIncrementCounter, usersIncrementTime)
            }
        }

        tokensIncrementCounter();
        usersIncrementCounter();
    },[tokensIncrementTime, usersIncrementTime])

    return (
        <Container>
            <Helmet>
                <title>Handiswap - Create Solana Token</title>
            </Helmet>
            <InnerContainer>
                <Bigtext>Solana token creation made easy</Bigtext>
                <Smalltext>Handiswap is the premier platform for creating Solana tokens, offering an intuitive interface, robust security, and seamless integration with Solana’s ecosystem. With Handiswap, users can effortlessly create and manage tokens, benefit from low fees, and access expert support, making it the best choice for both beginners and seasoned developers.</Smalltext>
                <Link to='/token-mint'><GetStartedButton>Create Token <FaArrowRightLong className="arrow-icon"/></GetStartedButton></Link>
            </InnerContainer>

            <CreatedTokensSection>
                <LeftCreatedTokensSection>
                    <LeftConItem>
                        <NumberText>{RoundOffNumber(tokensCreatedCount)}+</NumberText>
                        <NumberExplanantion>Tokens created on Handiswap</NumberExplanantion>
                    </LeftConItem>
                    <LeftConItem>
                        <NumberText>{RoundOffNumber(usersCount)}+</NumberText>
                        <NumberExplanantion>Users</NumberExplanantion>
                    </LeftConItem>
                </LeftCreatedTokensSection>
                <RightCreatedTokensSection>
                    <RightIconItem>
                        <RightIconBigtext>Easy Token Creation</RightIconBigtext>
                        <RightIconSmalltext>Create tokens quickly with our user-friendly interface.</RightIconSmalltext>
                    </RightIconItem>
                    <RightIconItem>
                        <RightIconBigtext>No Code</RightIconBigtext>
                        <RightIconSmalltext>Handiswap has got you covered if you can't code a solana token on your own.</RightIconSmalltext>
                    </RightIconItem>
                    <RightIconItem>
                        <RightIconBigtext>Mint And Freeze</RightIconBigtext>
                        <RightIconSmalltext>You have 100% control over your tokens, you can decide to revoke freeze or mint authority.</RightIconSmalltext>
                    </RightIconItem>
                </RightCreatedTokensSection>
            </CreatedTokensSection>


            <ContactArea>
                <ContactTextCon>
                    <ContactText>Need help?</ContactText>
                    <ContactTextExplanation>We have a 24/7 customer support waiting to help you anytime of the day.</ContactTextExplanation>
                    <ContactUs/>
                </ContactTextCon>
                <ContactImage>
                    <Image />
                </ContactImage>
            </ContactArea>

            <Footer/>

            
        </Container>
    )
}

export default Homepage
import React from 'react'
import styled from 'styled-components';


const Container = styled.div`
    width: 600px;
    padding: 20px;
    margin: auto;
    display: flex;
    flex-direction:column;
    gap: 20px;

    @media screen and (max-width: 500px){
        width: auto;
        padding: 10px
    }
`;
const ListCon = styled.ul``;
const List = styled.li``;
const BigText = styled.h1``;
const Paragraph = styled.p``;


const Privacypolicy = () => {
    return (
        <Container>
            <BigText>Handswap Privacy Policy</BigText>

            <Paragraph>Last modified: June 3, 2024</Paragraph>

            <Paragraph>
                This Privacy Policy (the “Policy”) explains how Universal Navigation Inc. ("Handiswap”, the “Company”, “we”, “us” or “our”) collects, uses, and shares data in connection with the Uniswap web app (handiswap.com), <a href='http://localhost:3000'>www.handiswap.com</a> website and all of our other properties, products, and services (the “Services”). Your use of the Services is subject to this Policy as well as our <a href='http://localhost:3000/terms-of-service'>Terms of Service</a>.
            </Paragraph>

            <BigText>High Level Summary</BigText>

            <ListCon>
                <List>
                    Handiswap Labs is an incorporated company based in the United States that operates <a href='http://localhost:3000'>https://handiswap.com</a> among other products and services. Handiswap complies with American laws and regulations.
                </List>
            </ListCon>
        </Container>
    )
}

export default Privacypolicy
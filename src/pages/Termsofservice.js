import React from 'react'
import styled from 'styled-components';


const Container = styled.div`
    width: 600px;

    @media screen and (max-width: 500px){
        width: auto;
    }
`;
const ListCon = styled.ul``;
const List = styled.li``;
const BigText = styled.h1``;
const Paragraph = styled.p``;


const Termsofservice = () => {
  return (
    <Container>
        <BigText>Handswap Privacy Policy</BigText>

        <Paragraph>Last modified: June 3, 2024</Paragraph>
    </Container>
  )
}

export default Termsofservice
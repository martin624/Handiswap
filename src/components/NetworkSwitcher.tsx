import React from 'react';
import { useNetworkConfiguration } from '../providers/NetworkConfigurationProvider';
import styled from 'styled-components';

const Container = styled.div`

`;

const Labelcon = styled.label`

`;
const Selectt = styled.select`
    border-radius:10px;
    outline:none;
    width:100%;
    background: var(--light_transparent_black);
    border: none;
    cursor: pointer;
    color: var(--dark_color);
    font-weight: 600;
    padding: 15px;

    @media screen and (max-width: 500px){
        padding: 10px;
    }
`;
const Optionn = styled.option`
    padding: 15px;
    color:white;
    // color: var(--dark_color);
    font-weight: 500;
    background: black;

    @media screen and (max-width: 500px){
        padding: 10px;
    }
`;

const NetworkSwitcher = () => {
    const { networkConfiguration, setNetworkConfiguration } = useNetworkConfiguration();

    return (
        <Container>
            <input style={{display:'none'}} type='checkbox' id='checkbox' />
            <Labelcon htmlFor='checkbox'>
                <Selectt 
                    value={networkConfiguration}
                    onChange={(e) => setNetworkConfiguration(e.target.value || 'devnet')}
                >
                    <Optionn value='devnet'>Devnet</Optionn>
                    <Optionn value='testnet'>Testnet</Optionn>
                    <Optionn value='mainnet-beta'>Mainnet</Optionn>
                </Selectt>
            </Labelcon>
        </Container>
    );
};

export default NetworkSwitcher;

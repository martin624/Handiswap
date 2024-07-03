import { useState, useCallback } from "react";
import { useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { Metadata, PROGRAM_ID } from "@metaplex-foundation/mpl-token-metadata";
import styled from "styled-components";
import { toast } from "sonner";
import { getMint } from "@solana/spl-token"; // Import the getMint function
import LoaderSpinner from "../components/LoaderSpinner";
import { FaRegCopy } from "react-icons/fa6";
import { FaRegCircleCheck } from "react-icons/fa6";
import { Helmet } from "react-helmet";


const Container = styled.div`
    padding: 20px;


    @media screen and (max-width: 500px){
        padding: 10px;
    }
`;

const InnnerContainer = styled.div`
    // width: 500px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
    


    @media screen and (max-width: 500px){
        width: 100%;
    }
`;
const InputContainer = styled.div`
    display:flex;
    padding: 10px;
    background: var(--light_transparent_black);
    border-radius: 10px;
    margin-top: 50px;
    // width: 100%;
    // margin: auto;
    // width: 300px;
    // position:absolute;
    // right: 20px;

    // @media screen and (max-width: 500px){
    //     width: auto;
    // }
`;
const Input = styled.input`

    flex: 1;
    width: 80%;
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

const MetadataContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    background: var(--light_transparent_black);
    border-radius: 10px;
    margin-top: 20px;
    gap: 10px;
    overflow-x: auto;
    white-space: nowrap; /* Prevent wrapping */

    /* Optional: Hide scrollbar */
    &::-webkit-scrollbar {
        display: none;
    }

    @media screen and (max-width: 500px){
        gap: 5px;
    }

    // max-height: 80vh;
    // overflow-y:scroll;
    // /* Hide scrollbar for WebKit browsers */
    // &::-webkit-scrollbar {
    //     display: none;
    // }

    // /* Hide scrollbar for Firefox */
    // scrollbar-width: none; /* Firefox */

    // /* Hide scrollbar for IE and Edge */
    // -ms-overflow-style: none; /* IE and Edge */
`;
const MetadataAddress = styled.div`

    color:var(--dark_color);
`;
const MetadataDetail = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    color:var(--dark_color);
    // word-break: break-all;
    justify-content:space-between;
    padding: 15px;
    // width: 100%;
`;
const MetadataImage = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 10px;
`;

const AddressToken = styled.div`
    padding: 10px;
    background: rgba(0, 255, 0, 0.1);
    font-size: 14px;
    display: inline-flex;
    gap: 10px;
    align-items: center;
    border-radius: 10px;
    color: var(--primary_color);
    font-weight: bold;
    text-align:center;
    cursor: pointer;
`;
// Utility function to remove null characters from a string
const trimNullCharacters = (str) => {
    return str.replace(/\0/g, '');
};

// Utility function to format supply based on decimals
const formatSupply = (supply, decimals) => {
    if (decimals === 0) {
        return Number(supply).toLocaleString();
    } else {
        return (Number(supply) / Math.pow(10, decimals)).toLocaleString();
    }
};

const TokenMetadata = () => {
    const { connection } = useConnection();
    const [tokenAddress, setTokenAddress] = useState('');
    const [isTokenAddress, setIsTokenAddress] = useState('');
    const [tokenMetadata, setTokenMetadata] = useState(null);
    const [logo, setLogo] = useState(null);
    const [decimals, setDecimals] = useState(null); // Add state for decimals
    const [isLoading, setIsLoading] = useState(false);
    const [mintAuthority, setMintAuthority] = useState(null); // Add state for mint authority
    const [freezeAuthority, setFreezeAuthority] = useState(null); // Add state for freeze authority
    const [supply, setSupply] = useState(null); // Add state for supply
    const [copyAddress, setCopyAddress] = useState(false); // Add state for supply
    const [copyMintAddres, setCopyMintAddress] = useState(false); // Add state for supply
    const [copyFreezeAddres, setCopyFreezeAddress] = useState(false); // Add state for supply

    const getMetadata = useCallback(async (address) => {
        setIsLoading(true);
        try {
            const tokenMint = new PublicKey(address);
            const metadataPDA = PublicKey.findProgramAddressSync([
                Buffer.from("metadata"),
                PROGRAM_ID.toBuffer(),
                tokenMint.toBuffer(),
            ], PROGRAM_ID)[0];

            const metadataAccount = await connection.getAccountInfo(metadataPDA);
            if (!metadataAccount) {
                throw new Error("Failed to fetch metadata account.");
            }

            // console.log("Raw metadata account data:", metadataAccount.data);

            const [metadata, _] = await Metadata.deserialize(metadataAccount.data);
            // console.log("Deserialized metadata:", metadata);

            let metadataRes = await fetch(metadata.data.uri);
            if (!metadataRes.ok) {
                throw new Error("Failed to fetch metadata URI.");
            }
            let metadataJson = await metadataRes.json();
            // console.log("Metadata JSON:", metadataJson);
            let { image, social_links } = metadataJson;

            // Trim null characters from the token name and symbol
            const trimmedName = trimNullCharacters(metadata.data.name);
            const trimmedSymbol = trimNullCharacters(metadata.data.symbol);
            // const trimmedSupply = trimNullCharacters(metadata.data.amount);
            const trimmedUri = trimNullCharacters(metadata.data.uri);

            // Fetching decimals from the mint account
            const mintAccount = await getMint(connection, tokenMint);
            const tokenDecimals = mintAccount.decimals;
            const tokenMintAuthority = mintAccount.mintAuthority?.toString();
            const tokenFreezeAuthority = mintAccount.freezeAuthority?.toString();
            const tokenSupply = mintAccount.supply.toString();

            // Convert the supply to a human-readable format
            const formattedSupply = formatSupply(tokenSupply, tokenDecimals);
            // console.log("Token Decimals:", tokenDecimals);

            setTokenMetadata({ ...metadata.data, name: trimmedName, symbol: trimmedSymbol, uri: trimmedUri, social_links });
            setIsTokenAddress(address)
            setLogo(image);
            setDecimals(tokenDecimals);
            setMintAuthority(tokenMintAuthority);
            setFreezeAuthority(tokenFreezeAuthority);
            setSupply(formattedSupply);
            // toast.success("Successfully fetched token metadata");
        } catch (error) {
            toast.error("Token metadata fetch failed.");
            console.error("Error fetching token metadata:", error);
        } finally {
            setIsLoading(false);
        }
    }, [connection]);

    const showCopyAddress=()=>{
        setCopyAddress(true);
        setTimeout(() => {
            setCopyAddress(false);
        }, 2000);
    }
    const showCopyMintAddress=()=>{
        setCopyMintAddress(true);
        setTimeout(() => {
            setCopyMintAddress(false);
        }, 2000);
    }
    const showCopyFreezeAddress=()=>{
        setCopyFreezeAddress(true);
        setTimeout(() => {
            setCopyFreezeAddress(false);
        }, 2000);
    }

    return (
        <>
            <Helmet>
                <title>Token metadata - Handiswap</title>
            </Helmet>
            <Container>
                <InputContainer>
                    <Input 
                        value={tokenAddress} 
                        onChange={(e) => setTokenAddress(e.target.value)} 
                        type='text' 
                        placeholder="Enter token address"
                    />
                    <SubmitButton onClick={() => getMetadata(tokenAddress)}>Get Metadata</SubmitButton>
                </InputContainer>
                <InnnerContainer>
                    

                    {tokenMetadata && (
                        <MetadataContainer>
                            {logo && <MetadataImage src={logo} alt="Token logo" />}
                            <MetadataDetail><div>SPL Token Address:</div> <strong style={{color: 'var(--dark_color)'}}>{<AddressToken onClick={(e)=>{navigator.clipboard.writeText(isTokenAddress);showCopyAddress();}}>{copyAddress?<>copied<FaRegCircleCheck /></>:<FaRegCopy />}{isTokenAddress} </AddressToken> || 'No isTokenAddress available'}</strong></MetadataDetail>
                            <MetadataDetail>Name: <strong style={{color: 'var(--dark_color)'}}>{tokenMetadata.name || 'No name available'}</strong></MetadataDetail>
                            <MetadataDetail>Symbol: <strong style={{color: 'var(--dark_color)'}}>{tokenMetadata.symbol || 'No symbol available'}</strong></MetadataDetail>
                            <MetadataDetail>Supply: <strong style={{color: 'var(--dark_color)'}}>{supply || 'No supply available'}</strong></MetadataDetail>
                            <MetadataDetail>Decimals: <strong style={{color: 'var(--dark_color)'}}>{decimals !== null ? `Decimals: ${decimals}` : 'No decimals available'}</strong></MetadataDetail>
                            <MetadataDetail>Mint Authority: <div style={{color: 'var(--dark_color)'}}>{mintAuthority&&<AddressToken onClick={(e)=>{navigator.clipboard.writeText(mintAuthority); showCopyMintAddress()}}>{copyMintAddres?<>copied<FaRegCircleCheck /></>:<FaRegCopy />}{mintAuthority}</AddressToken> || 'No mint authority available'}</div></MetadataDetail>
                            <MetadataDetail>Freeze Authority: <div style={{color: 'var(--dark_color)'}}>{freezeAuthority&&<AddressToken onClick={(e)=>{navigator.clipboard.writeText(freezeAuthority); showCopyFreezeAddress()}}>{copyFreezeAddres?<>copied<FaRegCircleCheck /></>:<FaRegCopy />}{freezeAuthority}</AddressToken> || 'No freeze authority available'}</div></MetadataDetail>
                            <a style={{color:'var(--dark_color)'}} href={tokenMetadata.uri} target="_blank" rel="noopener noreferrer"><MetadataDetail>view raw data</MetadataDetail></a>
                            
                            {/* {tokenMetadata.social_links && (
                                <div>
                                    {tokenMetadata.social_links.twitter && (
                                        <div>
                                            <a href={tokenMetadata.social_links.twitter} target="_blank" rel="noopener noreferrer">Twitter</a>
                                        </div>
                                    )}
                                    {tokenMetadata.social_links.discord && (
                                        <div>
                                            <a href={tokenMetadata.social_links.discord} target="_blank" rel="noopener noreferrer">Discord</a>
                                        </div>
                                    )}
                                    {tokenMetadata.social_links.website && (
                                        <div>
                                            <a href={tokenMetadata.social_links.website} target="_blank" rel="noopener noreferrer">Website</a>
                                        </div>
                                    )}
                                    {tokenMetadata.social_links.telegram && (
                                        <div>
                                            <a href={tokenMetadata.social_links.telegram} target="_blank" rel="noopener noreferrer">Telegram</a>
                                        </div>
                                    )}
                                </div>
                            )} */}
                        </MetadataContainer>
                    )}
                </InnnerContainer>
            </Container>
            <BlackDiv isVisible={isLoading}><LoaderSpinner color='white' height={30} width={30}/></BlackDiv>
        </>
    );
};

export default TokenMetadata;

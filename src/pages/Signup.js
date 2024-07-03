import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair, LAMPORTS_PER_SOL, TransactionSignature, PublicKey, Transaction, SystemProgram } from "@solana/web3.js";   
import { MINT_SIZE, TOKEN_PROGRAM_ID, createInitializeMintInstruction, getMinimumBalanceForRentExemptMint, getAssociatedTokenAddress, createMintToInstruction, createAssociatedTokenAccountInstruction } from "@solana/spl-token";
import { PROGRAM_ID, createCreateMetadataAccountV3Instruction, createCreateMetadataAccountInstruction } from "@metaplex-foundation/mpl-token-metadata";
import axios from "axios";
import styled from "styled-components";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";
import LoaderSpinner from "../components/LoaderSpinner";
import { useNetworkConfiguration } from "../providers/NetworkConfigurationProvider";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useDropzone } from "react-dropzone";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaRegCopy } from "react-icons/fa6";
import CheckImage from "../images/check.png"


// Function to detect mobile environment
const isMobile = () => {
    const userAgent = typeof navigator === 'undefined' ? '' : navigator.userAgent;
    return /iPhone|iPad|iPod|Android/i.test(userAgent);
};



const CreateToken = () => {
    const wallet = useWallet();
    const { connection, } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const { networkConfiguration } = useNetworkConfiguration();

    const [tokenUrl, setTokenUrl] = useState('');
    const [tokenMintAddress, setTokenMintAddress] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isImageUploading, setIsImageUploading] = useState(false);

    if(isLoading || isImageUploading){
        document.body.style.overflow = 'hidden';
    }else{
        document.body.style.overflow = '';
    }


    // USING REACT DROPZONE TO UPLOAD IMAGE TO IPFS
    const onDrop = useCallback(async(acceptedFile)=>{
        const file = acceptedFile[0];
        

        if(file){
            const imageURL = await uploadImagePinata(file);
            setToken({...token, image: imageURL});
        }
    },[])

    const {getRootProps, acceptedFiles, getInputProps, isDragActive} = useDropzone({onDrop})

    const [token, setToken] = useState({
        name: "",
        symbol: "",
        decimals: "",
        amount: "",
        image: "",
        description: "",
        twitter: "",
        discord: "",
        website: "",
        telegram: "",
    });

    const selecetedTheme = localStorage.getItem('selectedTheme');
    const inputRef = useRef(null);

    
  
    const handleWheel = (event) => {
      // Prevent the default behavior (scrolling to change the value)
      event.preventDefault();
      if (document.activeElement === inputRef.current) {
        inputRef.current.blur();
      }
    };

    const handleFormFieldChange = (fieldName, e)=>{
        setToken({...token, [fieldName]: e.target.value});
    }


    const collectPayment = useCallback(async(token)=>{
        setIsLoading(true);
        const creatorAddress = new PublicKey("29dUZotm9PV3Va2e9qXi8aB6SqZD7wbbn82yPh9E9WX8");
        let signature: TransactionSignature = "";

        try {

            // use this to send money
            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: publicKey,
                    toPubkey: creatorAddress,
                    lamports: LAMPORTS_PER_SOL * Number(0.2),
                })
            )

            // console.log(token);
            signature = await sendTransaction(transaction, connection);


            createToken(token);
            // toast.success(`You have successfully donated ${0.2} SOL`)
            
        } catch (error) {
            toast.error("Transaction failed, please try again.");
            return;
        }
        // setIsLoading(false);
    },[])

    // CREATE TOKEN FUNCTION HERE
    const createToken = useCallback(
        async(token)=>{
            console.log(`token data here: ${token}`)
            const lamports = await getMinimumBalanceForRentExemptMint(connection);
            const mintKeypair = Keypair.generate();
            const tokenATA = await getAssociatedTokenAddress(
                mintKeypair.publicKey,
                publicKey
            );

            try {
                const metadataURL = await uploadMetadata(token);
                console.log(metadataURL);

                const createMetadataInstruction = createCreateMetadataAccountV3Instruction({
                    metadata: PublicKey.findProgramAddressSync(
                        [
                            Buffer.from("metadata"),
                            PROGRAM_ID.toBuffer(),
                            mintKeypair.publicKey.toBuffer(),
                        ],
                        PROGRAM_ID
                    )[0],
                    mint: mintKeypair.publicKey,
                    mintAuthority: publicKey,
                    payer: publicKey,
                    updateAuthority: publicKey,
                },
                {
                    createMetadataAccountArgsV3: {
                        data: {
                            name: token.name,
                            symbol: token.symbol,
                            uri: metadataURL,
                            creators: null,
                            sellerFeeBasisPoints: 0,
                            uses: null,
                            collection: null,
                        },
                        isMutable: false,
                        collectionDetails: null,
                    },
                });

                const createNewTokenTransaction = new Transaction().add(
                    SystemProgram.createAccount({
                        fromPubkey: publicKey,
                        newAccountPubkey: mintKeypair.publicKey,
                        space: MINT_SIZE,
                        lamports: lamports,
                        programId: TOKEN_PROGRAM_ID,
                    }),
                    createInitializeMintInstruction(
                        mintKeypair.publicKey,
                        Number(token.decimals),
                        publicKey,
                        publicKey,
                        TOKEN_PROGRAM_ID
                    ),
                    createAssociatedTokenAccountInstruction(
                        publicKey,
                        tokenATA,
                        publicKey,
                        mintKeypair.publicKey
                    ),
                    createMintToInstruction(
                        mintKeypair.publicKey,
                        tokenATA,
                        publicKey,
                        Number(token.amount) * Math.pow(10, Number(token.decimals))
                    ),
                    createMetadataInstruction
                );

                // CALL SIGNATURE HERE 
                const signature = await sendTransaction(
                    createNewTokenTransaction,
                    connection, 
                    {
                        signers: [mintKeypair]
                    }
                );

                setTokenMintAddress(mintKeypair.publicKey.toString());
                toast.success("Token created successfully, check dashboard for more info")
                toast.success(`Transaction ID: ${signature}`)

            } catch (error) {
                toast.error("Token creation failed, try later")
            }
            setIsLoading(false);

        },[publicKey, connection, sendTransaction ])

    
    
    // IMAGEULOAD TO IPFS FUNCTION HERE
    const handleImageChange = async(event)=>{
        const file = event.target.files[0];

        if(file){
            const imageURL = await uploadImagePinata(file);
            setToken({...token, image: imageURL});
        }
    };

    
    const uploadImagePinata = async(file)=>{
        setIsImageUploading(true);
        if(file){
            try {
                const formData = new FormData();
                formData.append("file", file);

                const response = await axios({
                    method: "post",
                    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data: formData,
                    headers: {
                        pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
                        pinata_secret_api_key: process.env.REACT_APP_PINATA_SECRET_KEY,
                        "Content-Type": "multipart/form-data",
                    },
                });

                const ImageHash = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
                setIsImageUploading(false)
                return ImageHash;
            } catch (error) {
                toast.error("Image upload failed");
                setIsImageUploading(false)
            }
            setIsImageUploading(false)
        }
    }

    // UPLOADING METADATA
    const uploadMetadata = async(token)=>{
        setIsLoading(true);
        const {name, symbol, description, image, twitter, discord, website, telegram } = token;

        if(!name || !symbol || !description || !image){
            toast.error("Data is missing!")
            setIsLoading(false);
            return;
        }

        const data = JSON.stringify({
            name: name,
            symbol: symbol,
            description: description,
            image: image,
            social_links: {
                twitter: twitter,
                discord: discord,
                website: website,
                telegram: telegram,
            }
        });

        try {
            const response = await axios({
                method: "POST",
                url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
                data: data,
                headers: {
                    pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
                    pinata_secret_api_key: process.env.REACT_APP_PINATA_SECRET_KEY,
                    "Content-Type": "application/json",
                },
            });

            const url = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
            return url;
        } catch (error) {
            toast.error("Upload to pinata Json failed")
        }
        setIsLoading(false)

    }

    return (
        <Container>
            {!tokenMintAddress&&<MainText>
                Handiswap Solana token creator.
                <SubMainText>Cheap, easy and reliable.</SubMainText>
            </MainText>}
            
            {!tokenMintAddress?
                // <TokenCreateSection>

                    // {/* {token.image?<TokenImage src={token.image}/>:(
                    //     <div style={{flex:'1'}}>
                    //         <label htmlFor="file">
                    //             <PickImage>
                    //                 <AiOutlineCloudUpload color="var(--dark_color)" size={50}/>
                    //                 Click to upload token image
                    //                 <span style={{color:'#0082fb'}}>Browse files</span>
                    //                 <span style={{color:'var(--grey_color', fontSize:'14px', fontWeight:'500'}}>JPEG, PNG</span>
                    //             </PickImage> 
                    //         </label>
                    //         <input accept="image/jpeg, image/png" style={{display:'none'}} onChange={handleImageChange} id="file" type="file"/>
                    //     </div>)
                    // } */}

                    <TokenInputSection>
                        <div style={{display:'flex', gap:'20px'}}>
                            <div style={{flex:'1'}}>
                                <TokenInputLabel>Token name *</TokenInputLabel>
                                <br/>
                                <br/>
                                <TokenInputDiv>
                                    <TokenInput value={token.name} placeholder="Token name" type="text" onChange={(e)=> handleFormFieldChange("name", e)}/>
                                </TokenInputDiv>
                            </div>

                            <div style={{flex:'1'}}>
                                <TokenInputLabel>Token Symbol *</TokenInputLabel>
                                <br/>
                                <br/>
                                <TokenInputDiv>
                                    <TokenInput value={token.symbol} placeholder="Token symbol. E.g: HANDISWAP" type="text" onChange={(e)=> handleFormFieldChange("symbol", e)}/>
                                </TokenInputDiv>
                            </div>
                        </div>


                        <div style={{display:'flex', gap:'20px', width:'100%'}}>
                            <div style={{flex:'1'}}>
                                <TokenInputLabel>Decimals *</TokenInputLabel>
                                <br/>
                                <br/>
                                <TokenInputDiv>
                                    <TokenInput value={token.decimals} placeholder="Decimals E.g: 9" type="number" onChange={(e)=> handleFormFieldChange("decimals", e)}/>
                                </TokenInputDiv>
                                <br/>

                                <TokenInputLabel>Amount *</TokenInputLabel>
                                <br/>
                                <br/>
                                <TokenInputDiv>
                                    <TokenInput min='0'onWheel={() => document.activeElement.blur()} value={token.amount} placeholder="Amount E.g: 1000000" type="number" onChange={(e)=> handleFormFieldChange("amount", e)}/>
                                </TokenInputDiv>
                            </div>
                            <div style={{flex:'1'}}>
                                {token.image
                                    ?<TokenImagediv><TokenImage src={token.image} alt="token image"/><TokenImageHoverdiv className="hidden-content"><RiDeleteBinLine style={{margin:'20px', cursor:'pointer'}} color="white" onClick={(e)=>{setToken({...token, image: ''}); setIsImageUploading(false)}} size={20}/></TokenImageHoverdiv></TokenImagediv>

                                // :(
                                //     <>
                                //         {
                                //             isImageUploading
                                //             ?<DivPickImage>
                                //                 <PickImage>
                                //                     <LoaderSpinner color='white' height={40} width={40}/>
                                //                 </PickImage>
                                //             </DivPickImage>
                                //             :<DivPickImage>
                                //                 {!isDragActive?<label htmlFor="">
                                //                     <PickImage {...getRootProps()}>
                                //                         <AiOutlineCloudUpload color="var(--dark_color)" size={50}/>
                                //                         {isMobile()?'Select image':'Drag and drop image'}
                                //                         {/* <span style={{color:'#0082fb'}}>Browse files</span> */}
                                //                         <span style={{color:'#B3B3B3', fontSize:'14px', fontWeight:'600'}}>JPEG, PNG</span>
                                //                     </PickImage> 
                                //                 </label>:
                                //                 <label htmlFor="file">
                                //                 <PickImage {...getRootProps()}>
                                //                     <AiOutlineCloudUpload color="var(--dark_color)" size={100}/>
                                //                 </PickImage> 
                                //                 </label>}
                                //                     <input {...getInputProps()} accept="image/jpeg, image/png" style={{display:'none'}}  id="file" type="file"/>
                                //                 </DivPickImage>
                                //         }
                                //     </>
                                // )

                                :(
                                    <DivPickImage>
                                        {!isDragActive?<label htmlFor="">
                                            <PickImage {...getRootProps()}>
                                                <AiOutlineCloudUpload color="var(--dark_color)" size={50}/>
                                                {isMobile()?'Select image':'Drag and drop image'}
                                                {/* <span style={{color:'#0082fb'}}>Browse files</span> */}
                                                <span style={{color:'#B3B3B3', fontSize:'14px', fontWeight:'600'}}>JPEG, PNG</span>
                                            </PickImage> 
                                        </label>:
                                        <label htmlFor="file">
                                        <PickImage {...getRootProps()}>
                                            <AiOutlineCloudUpload color="var(--dark_color)" size={100}/>
                                        </PickImage> 
                                        </label>}
                                            <input {...getInputProps()} accept="image/jpeg, image/png" style={{display:'none'}}  id="file" type="file"/>
                                    </DivPickImage>
                                    
                                )
                                }
                            </div>
                            
                        </div>


                        
                        <TokenInputLabel>Description *</TokenInputLabel>
                        <TokenInputDiv>
                            <TokenTextarea value={token.description} rows={6} placeholder="Description of your token" type="text" onChange={(e)=> handleFormFieldChange("description", e)}/>
                        </TokenInputDiv>

                        <br/>
                        <MainText>Optional social links</MainText>

                        

                        

                        <TokenInputLabel>Twitter</TokenInputLabel>
                        <TokenInputDiv>
                            <TokenInput value={token.twitter} placeholder="Twitter link" type="text" onChange={(e) => handleFormFieldChange("twitter", e)}/>
                        </TokenInputDiv>

                        <TokenInputLabel>Discord</TokenInputLabel>
                        <TokenInputDiv>
                            <TokenInput value={token.discord} placeholder="Discord link" type="text" onChange={(e) => handleFormFieldChange("discord", e)}/>
                        </TokenInputDiv>

                        <TokenInputLabel>Website</TokenInputLabel>
                        <TokenInputDiv>
                            <TokenInput value={token.website} placeholder="Website link" type="text" onChange={(e) => handleFormFieldChange("website", e)}/>
                        </TokenInputDiv>

                        <TokenInputLabel>Telegram Channel</TokenInputLabel>
                        <TokenInputDiv>
                            <TokenInput value={token.telegram} placeholder="Telegram link" type="text" onChange={(e) => handleFormFieldChange("telegram", e)}/>
                        </TokenInputDiv>

                        {/* <CreateButtonDiv>
                            {token.image&&token.name&&token.description&&token.amount&&token.symbol&&token.decimals
                                ?<>{isLoading
                                    ?<CreateButton><LoaderSpinner color='white' height={30} width={30}/></CreateButton>
                                    :<CreateButton type='submit'  onClick={()=>collectPayment(token)}>Create Token</CreateButton>
                                }</>
                                :<CreateButtonDisabled type='submit' >Create Token</CreateButtonDisabled>
                            }
                        </CreateButtonDiv> */}
                        <CreateButtonDiv>
                            {token.image&&token.name&&token.description&&token.amount&&token.symbol&&token.decimals
                                ?<CreateButton type='submit'  onClick={()=>collectPayment(token)}>Create Token</CreateButton>
                                :<CreateButtonDisabled type='submit' >Create Token</CreateButtonDisabled>
                            }
                        </CreateButtonDiv>
                        {/* <CreateButton type='submit'  onClick={()=>collectPayment(token)}>Create Token</CreateButton> */}

                    </TokenInputSection>

                // </TokenCreateSection>

                

            :<TokenSuccssDiv>

                <SuccessHeadeing>Token successfully created  <img style={{width:'30px', height:'30px'}} src={CheckImage}/></SuccessHeadeing>
                
                <NewTokenLinkDiv onClick={()=>{navigator.clipboard.writeText(tokenMintAddress); toast.success('copied')}}>
                    Token address: <AddressToken>{tokenMintAddress.toString()} <FaRegCopy /></AddressToken>
                </NewTokenLinkDiv>
                {/* <small style={{color:'green', fontWeight:'600'}}>*make sure you save this address, because it won't be shown again.</small> */}

                <TokenDetail>Name: <strong style={{color: 'var(--dark_color)'}}>{token.name}</strong></TokenDetail>
                <TokenDetail>Symbol: <strong style={{color: 'var(--dark_color)'}}>{token.symbol}</strong></TokenDetail>

                <a style={{color: 'var(--dark_color)'}} href={`https://explorer.solana.com/address/${tokenMintAddress}?cluster=${networkConfiguration}`} target="_blank" rel="noreferrar"><TokenViewLink>View token on Solana</TokenViewLink></a>
            </TokenSuccssDiv>}

            <BlackDiv isVisible={isLoading || isImageUploading}><LoaderSpinner color='white' height={30} width={30}/></BlackDiv>
            

            {/* {selecetedTheme==='dark'?<LoaderSpinner color='white' width='50px' height='50px'/>
            :<LoaderSpinner color='black' width='50px' height='50px'/>} */}
        </Container>
    )
}

export default CreateToken;
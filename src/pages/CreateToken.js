// import { useConnection, useWallet } from "@solana/wallet-adapter-react";
// import { Keypair, LAMPORTS_PER_SOL, TransactionSignature, PublicKey, Transaction, SystemProgram } from "@solana/web3.js";   
// import { MINT_SIZE, TOKEN_PROGRAM_ID, createInitializeMintInstruction, getMinimumBalanceForRentExemptMint, getAssociatedTokenAddress, createMintToInstruction, createAssociatedTokenAccountInstruction } from "@solana/spl-token";
// import { PROGRAM_ID, createCreateMetadataAccountV3Instruction, createCreateMetadataAccountInstruction } from "@metaplex-foundation/mpl-token-metadata";
// import axios from "axios";
// import styled from "styled-components";
// import { useCallback, useRef, useState } from "react";
// import { toast } from "sonner";
// import LoaderSpinner from "../components/LoaderSpinner";
// import { useNetworkConfiguration } from "../providers/NetworkConfigurationProvider";
// import { AiOutlineCloudUpload } from "react-icons/ai";
// import { useDropzone } from "react-dropzone";
// import { RiDeleteBinLine } from "react-icons/ri";
// import { FaRegCopy } from "react-icons/fa6";
// import CheckImage from "../images/check.png"


// // Function to detect mobile environment
// const isMobile = () => {
//     const userAgent = typeof navigator === 'undefined' ? '' : navigator.userAgent;
//     return /iPhone|iPad|iPod|Android/i.test(userAgent);
// };

// const Container = styled.div`
//     padding: 20px;

//     @media screen and (max-width: 500px){
//         padding: 10px;
//     }
// `;

// const MainText = styled.h1`
//     font-size: 25px;

//     width: 500px;
//     margin:auto;
//     margin-bottom:50px;

//     @media screen and (max-width: 900px){
//         width: 100%;
//     }


// `;

// const SubMainText = styled.h4`
//     font-size: 17px;
//     margin-top: 20px;
//     color: #B3B3B3;
// `;
// const TokenCreateSection = styled.div`
//     // display: flex;
//     // flex-direction: column;
//     // gap:20px;
//     // text-align: center;
//     // padding: 10px;
//     // width: 500px;
//     // margin: auto;
//     // margin-top: 20px;
//     // margin-bottom: 100px;

    
    

//     // @media screen and (max-width: 900px){
//     //     width: 100%;
//     //     // justify-content:center;
//     // }
// `;

// const TokenImagediv = styled.div`
//         // padding:40px;
//     width: 100%;
//     height: 200px;
//     max-width: 600px;
//     min-height: unset;
//     max-height: 600px;
//     // background: rgb(0,0,0,0.1);
//     border-radius:10px;
//     display:inline-flex;
//     text-align:center;
//     flex-direction:column;
//     align-items:center;
//     gap:10px;
//     cursor:pointer;
//     color: var(--dark_color);
//     font-weight:600;
//     font-size: 15px;
//     border: 1px dashed var(--dark_color);
//     flex:1;
//     justify-content:center;
//     // margin:auto;
//     position: relative;

//     &:hover {
//         background-color: var(--light_transparent_black);
//     }

//     &:hover .hidden-content {
//         opacity: 1;
//         transition: opacity 0.3s ease, visibility 0.3s ease;
//         // transform: translateY(0);
//     }
// `;
// const TokenImage = styled.img`
//     height: 100%;
//     width: 100%;
//     border-radius:10px;
// `;

// const TokenImageHoverdiv = styled.div`
//     opacity: 0;
//     // transform: translateY(100%);
//     transition: opacity 0.3s ease, transform 0.3s ease;
//     height: 100%;
//     width: 100%;
//     background: rgb(0,0,0,0.5);
//     position: absolute;
//     top:0;
//     text-align: right;
//     border-radius:10px;
// `;

// const DivPickImage = styled.div`
//     flex: 1;
//     text-align: left;

//     @media screen and (max-width: 766px){
//         text-align:center;

//     }
// `;
// const PickImage = styled.div`
//     // padding:40px;
//     width: 100%;
//     height: 200px;
//     max-width: 600px;
//     min-height: unset;
//     max-height: 600px;
//     // background: rgb(0,0,0,0.1);
//     border-radius:10px;
//     display:inline-flex;
//     text-align:center;
//     flex-direction:column;
//     align-items:center;
//     gap:10px;
//     cursor:pointer;
//     color: var(--dark_color);
//     font-weight:600;
//     font-size: 15px;
//     border: 1px dashed var(--dark_color);
//     flex:1;
//     justify-content:center;
//     // margin:auto;

//     &:hover {
//         background-color: var(--light_transparent_black);
//     }


//     // @media screen and (max-width: 766px){
//     //     max-width: 400px;
//     //     min-height: 400px;
//     // }
            
// `;

// const TokenInputSection = styled.div`
//     // flex:1;
//     display:flex;
//     flex-direction:column;
//     gap: 20px;
//     text-align:left;
//     width: 500px;
//     margin:auto;
//     margin-bottom:100px;
//     margin-top: 20px;

//     @media screen and (max-width: 900px){
//         width: 100%;
//     }
// `;

// const TokenInputLabel = styled.label`
//     color: var(--dark_color);
// `;
// const TokenInputDiv = styled.div`
//     display:flex;
//     padding: 10px;
//     background: var(--light_transparent_black);
//     border-radius: 10px;
// `;
// const TokenInput = styled.input`
//     /* Chrome, Safari, Edge, Opera */
//     &::-webkit-outer-spin-button,
//     &::-webkit-inner-spin-button {
//         -webkit-appearance: none;
//         margin: 0;
//     }

//     /* Firefox */
//     -moz-appearance: textfield;

//     flex: 1;
//     width: 100%;
//     background: none;
//     border:none;
//     outline:none;
//     color: var(--dark_color);
//     padding: 10px;
// `;
// const TokenTextarea = styled.textarea`
//     /* Chrome, Safari, Edge, Opera */
//     &::-webkit-outer-spin-button,
//     &::-webkit-inner-spin-button {
//         -webkit-appearance: none;
//         margin: 0;
//     }

//     /* Firefox */
//     -moz-appearance: textfield;

//     flex: 1;
//     width: 100%;
//     background: none;
//     border:none;
//     outline:none;
//     color: var(--dark_color);
//     padding: 10px;
//     resize: none;
// `;


// const CreateButtonDiv = styled.div`
//     position: fixed;
//     bottom:0;
//     left:0;
//     right:0;
//     padding: 10px 20px;
//     background: var(--white_color);
//     border-top: 0.5px solid grey;
// `;
// const CreateButtonDisabled = styled.div`
//     background: rgba(0, 0, 0, 0.1);
//     color: grey;
//     padding: 15px;
//     text-align:center;
//     display:inline-block;
//     float: right;
//     border-radius: 10px;
//     cursor:pointer;
//     font-weight:600;
//     font-size: 15px;
//     cursor: not-allowed;
    
//     @media screen and (max-width:900px){
//         display: block;
//         float: none;
//     }
// `;

// const CreateButton = styled.div`
//     background: rgba(0, 255, 0, 0.1);
//     color: var(--primary_color);
//     padding: 15px;
//     text-align:center;
//     display:inline-block;
//     float: right;
//     border-radius: 10px;
//     cursor:pointer;
//     font-weight:600;
//     font-size: 15px;

//     @media screen and (max-width:900px){
//         display: block;
//         float: none;
//     }
// `;


// const BlackDiv = styled.div`
//     position: fixed;
//     top:0;
//     bottom:0;
//     left:0;
//     right:0;
//     background: rgb(0,0,0,0.5);
//     z-index:10;
//     align-items:center;
//     justify-content:center;
//     display: flex;
//     backdrop-filter: blur(5px);
//     opacity: ${(props) => (props.isVisible ? '1' : '0')};
//     visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')};
//     transition: opacity 0.3s ease, visibility 0.3s ease;
// `;

// const TokenSuccssDiv = styled.div`
//     display: flex;
//     flex-direction: column;
//     gap: 20px;
//     width: 600px;
//     border: solid 2px var(--dark_color);
//     word-break: break-all;
//     padding: 20px;
//     border-radius: 10px;
//     margin: auto;

//     @media screen and (max-width:900px){
//         width: auto;
//     }
// `;



// const SuccessHeadeing = styled.h2`
//     color: var(--dark_color);
//     text-align: center;
//     margin-bottom: 30px;
//     display: flex;
//     align-items: center;
//     gap: 10px;
// `;
// const NewTokenLinkDiv = styled.div`
//     cursor: pointer;
//     color: var(--dark_color);
//     font-size: 15px;
//     display: flex;
//     align-items: center;
//     gap: 10px;
    
// `;
// const AddressToken = styled.div`
//     padding: 10px;
//     background: rgba(0, 255, 0, 0.1);
//     font-size: 14px;
//     display: flex;
//     gap: 10px;
//     align-items: center;
//     border-radius: 10px;
//     color: var(--primary_color);
//     font-weight: bold;
// `;
// const TokenDetail = styled.div`
//     color: var(--dark_color);
//     font-size: 15px;
// `;
// const TokenViewLink = styled.div`
//     background: rgba(0, 255, 0, 0.1);
//     color: var(--primary_color);
//     font-size: 15px;
//     padding: 10px;
//     border-radius: 10px;
//     display: inline-block;

// `;



// const CreateToken = () => {
//     const wallet = useWallet();
//     const { connection, } = useConnection();
//     const { publicKey, sendTransaction } = useWallet();
//     const { networkConfiguration } = useNetworkConfiguration();

//     const [tokenUrl, setTokenUrl] = useState('');
//     const [tokenMintAddress, setTokenMintAddress] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const [isImageUploading, setIsImageUploading] = useState(false);
//     const [includeMintAuthority, setIncludeMintAuthority] = useState(false);
//     const [includeFreezeAuthority, setIncludeFreezeAuthority] = useState(false);

//     if(isLoading || isImageUploading){
//         document.body.style.overflow = 'hidden';
//     }else{
//         document.body.style.overflow = '';
//     }


//     // USING REACT DROPZONE TO UPLOAD IMAGE TO IPFS
//     const onDrop = useCallback(async(acceptedFile)=>{
//         const file = acceptedFile[0];
        

//         if(file){
//             const imageURL = await uploadImagePinata(file);
//             setToken({...token, image: imageURL});
//         }
//     },[])

//     const {getRootProps, acceptedFiles, getInputProps, isDragActive} = useDropzone({onDrop})

//     const [token, setToken] = useState({
//         name: "",
//         symbol: "",
//         decimals: "",
//         amount: "",
//         image: "",
//         description: "",
//         twitter: "",
//         discord: "",
//         website: "",
//         telegram: "",
//     });

//     const selecetedTheme = localStorage.getItem('selectedTheme');
//     const inputRef = useRef(null);

    
  
//     const handleWheel = (event) => {
//       // Prevent the default behavior (scrolling to change the value)
//       event.preventDefault();
//       if (document.activeElement === inputRef.current) {
//         inputRef.current.blur();
//       }
//     };

//     const handleFormFieldChange = (fieldName, e)=>{
//         setToken({...token, [fieldName]: e.target.value});
//     }


//     const collectPayment = useCallback(async(token)=>{
//         setIsLoading(true);
//         const creatorAddress = new PublicKey("29dUZotm9PV3Va2e9qXi8aB6SqZD7wbbn82yPh9E9WX8");
//         let signature: TransactionSignature = "";

//         try {

//             // use this to send money
//             const transaction = new Transaction().add(
//                 SystemProgram.transfer({
//                     fromPubkey: publicKey,
//                     toPubkey: creatorAddress,
//                     lamports: LAMPORTS_PER_SOL * Number(0.2),
//                 })
//             )

//             // console.log(token);
//             signature = await sendTransaction(transaction, connection);


//             createToken(token);
//             // toast.success(`You have successfully donated ${0.2} SOL`)
            
//         } catch (error) {
//             toast.error("Transaction failed, please try again.");
//             return;
//         }
//         // setIsLoading(false);
//     },[])

//     // CREATE TOKEN FUNCTION HERE
//     const createToken = useCallback(
//         async(token)=>{
//             console.log(`token data here: ${token}`)
//             const lamports = await getMinimumBalanceForRentExemptMint(connection);
//             const mintKeypair = Keypair.generate();
//             const tokenATA = await getAssociatedTokenAddress(
//                 mintKeypair.publicKey,
//                 publicKey
//             );

//             try {
//                 const metadataURL = await uploadMetadata(token);
//                 console.log(metadataURL);

//                 const createMetadataInstruction = createCreateMetadataAccountV3Instruction({
//                     metadata: PublicKey.findProgramAddressSync(
//                         [
//                             Buffer.from("metadata"),
//                             PROGRAM_ID.toBuffer(),
//                             mintKeypair.publicKey.toBuffer(),
//                         ],
//                         PROGRAM_ID
//                     )[0],
//                     mint: mintKeypair.publicKey,
//                     mintAuthority: publicKey,
//                     payer: publicKey,
//                     updateAuthority: publicKey,
//                 },
//                 {
//                     createMetadataAccountArgsV3: {
//                         data: {
//                             name: token.name,
//                             symbol: token.symbol,
//                             uri: metadataURL,
//                             creators: null,
//                             sellerFeeBasisPoints: 0,
//                             uses: null,
//                             collection: null,
//                         },
//                         isMutable: false,
//                         collectionDetails: null,
//                     },
//                 });

//                 const createNewTokenTransaction = new Transaction().add(
//                     SystemProgram.createAccount({
//                         fromPubkey: publicKey,
//                         newAccountPubkey: mintKeypair.publicKey,
//                         space: MINT_SIZE,
//                         lamports: lamports,
//                         programId: TOKEN_PROGRAM_ID,
//                     }),
//                     createInitializeMintInstruction(
//                         mintKeypair.publicKey,
//                         Number(token.decimals),
//                         publicKey,
//                         publicKey,
//                         TOKEN_PROGRAM_ID
//                     ),
//                     createAssociatedTokenAccountInstruction(
//                         publicKey,
//                         tokenATA,
//                         publicKey,
//                         mintKeypair.publicKey
//                     ),
//                     createMintToInstruction(
//                         mintKeypair.publicKey,
//                         tokenATA,
//                         publicKey,
//                         Number(token.amount) * Math.pow(10, Number(token.decimals))
//                     ),
//                     createMetadataInstruction
//                 );

//                 // CALL SIGNATURE HERE 
//                 const signature = await sendTransaction(
//                     createNewTokenTransaction,
//                     connection, 
//                     {
//                         signers: [mintKeypair]
//                     }
//                 );

//                 setTokenMintAddress(mintKeypair.publicKey.toString());
//                 toast.success("Token created successfully, check dashboard for more info")
//                 toast.success(`Transaction ID: ${signature}`)

//             } catch (error) {
//                 toast.error("Token creation failed, try later")
//             }
//             setIsLoading(false);

//         },[publicKey, connection, sendTransaction ])

    
    
//     // IMAGEULOAD TO IPFS FUNCTION HERE
//     const handleImageChange = async(event)=>{
//         const file = event.target.files[0];

//         if(file){
//             const imageURL = await uploadImagePinata(file);
//             setToken({...token, image: imageURL});
//         }
//     };

    
//     const uploadImagePinata = async(file)=>{
//         setIsImageUploading(true);
//         if(file){
//             try {
//                 const formData = new FormData();
//                 formData.append("file", file);

//                 const response = await axios({
//                     method: "post",
//                     url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
//                     data: formData,
//                     headers: {
//                         pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
//                         pinata_secret_api_key: process.env.REACT_APP_PINATA_SECRET_KEY,
//                         "Content-Type": "multipart/form-data",
//                     },
//                 });

//                 const ImageHash = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
//                 setIsImageUploading(false)
//                 return ImageHash;
//             } catch (error) {
//                 toast.error("Image upload failed");
//                 setIsImageUploading(false)
//             }
//             setIsImageUploading(false)
//         }
//     }

//     // UPLOADING METADATA
//     const uploadMetadata = async(token)=>{
//         setIsLoading(true);
//         const {name, symbol, description, image, twitter, discord, website, telegram } = token;

//         if(!name || !symbol || !description || !image){
//             toast.error("Data is missing!")
//             setIsLoading(false);
//             return;
//         }

//         const data = JSON.stringify({
//             name: name,
//             symbol: symbol,
//             description: description,
//             image: image,
//             social_links: {
//                 twitter: twitter,
//                 discord: discord,
//                 website: website,
//                 telegram: telegram,
//             }
//         });

//         try {
//             const response = await axios({
//                 method: "POST",
//                 url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
//                 data: data,
//                 headers: {
//                     pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
//                     pinata_secret_api_key: process.env.REACT_APP_PINATA_SECRET_KEY,
//                     "Content-Type": "application/json",
//                 },
//             });

//             const url = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
//             return url;
//         } catch (error) {
//             toast.error("Upload to pinata Json failed")
//         }
//         setIsLoading(false)

//     }

//     return (
//         <Container>
//             {!tokenMintAddress&&<MainText>
//                 Handiswap Solana token creator.
//                 <SubMainText>Cheap, easy and reliable.</SubMainText>
//             </MainText>}
            
//             {!tokenMintAddress?
//                 // <TokenCreateSection>

//                     // {/* {token.image?<TokenImage src={token.image}/>:(
//                     //     <div style={{flex:'1'}}>
//                     //         <label htmlFor="file">
//                     //             <PickImage>
//                     //                 <AiOutlineCloudUpload color="var(--dark_color)" size={50}/>
//                     //                 Click to upload token image
//                     //                 <span style={{color:'#0082fb'}}>Browse files</span>
//                     //                 <span style={{color:'var(--grey_color', fontSize:'14px', fontWeight:'500'}}>JPEG, PNG</span>
//                     //             </PickImage> 
//                     //         </label>
//                     //         <input accept="image/jpeg, image/png" style={{display:'none'}} onChange={handleImageChange} id="file" type="file"/>
//                     //     </div>)
//                     // } */}

//                     <TokenInputSection>
//                         <div style={{display:'flex', gap:'20px'}}>
//                             <div style={{flex:'1'}}>
//                                 <TokenInputLabel>Token name *</TokenInputLabel>
//                                 <br/>
//                                 <br/>
//                                 <TokenInputDiv>
//                                     <TokenInput value={token.name} placeholder="Token name" type="text" onChange={(e)=> handleFormFieldChange("name", e)}/>
//                                 </TokenInputDiv>
//                             </div>

//                             <div style={{flex:'1'}}>
//                                 <TokenInputLabel>Token Symbol *</TokenInputLabel>
//                                 <br/>
//                                 <br/>
//                                 <TokenInputDiv>
//                                     <TokenInput value={token.symbol} placeholder="Token symbol. E.g: HANDISWAP" type="text" onChange={(e)=> handleFormFieldChange("symbol", e)}/>
//                                 </TokenInputDiv>
//                             </div>
//                         </div>


//                         <div style={{display:'flex', gap:'20px', width:'100%'}}>
//                             <div style={{flex:'1'}}>
//                                 <TokenInputLabel>Decimals *</TokenInputLabel>
//                                 <br/>
//                                 <br/>
//                                 <TokenInputDiv>
//                                     <TokenInput value={token.decimals} placeholder="Decimals E.g: 9" type="number" onChange={(e)=> handleFormFieldChange("decimals", e)}/>
//                                 </TokenInputDiv>
//                                 <br/>

//                                 <TokenInputLabel>Amount *</TokenInputLabel>
//                                 <br/>
//                                 <br/>
//                                 <TokenInputDiv>
//                                     <TokenInput min='0'onWheel={() => document.activeElement.blur()} value={token.amount} placeholder="Amount E.g: 1000000" type="number" onChange={(e)=> handleFormFieldChange("amount", e)}/>
//                                 </TokenInputDiv>
//                             </div>
//                             <div style={{flex:'1'}}>
//                                 {token.image
//                                     ?<TokenImagediv><TokenImage src={token.image} alt="token image"/><TokenImageHoverdiv className="hidden-content"><RiDeleteBinLine style={{margin:'20px', cursor:'pointer'}} color="white" onClick={(e)=>{setToken({...token, image: ''}); setIsImageUploading(false)}} size={20}/></TokenImageHoverdiv></TokenImagediv>

//                                 // :(
//                                 //     <>
//                                 //         {
//                                 //             isImageUploading
//                                 //             ?<DivPickImage>
//                                 //                 <PickImage>
//                                 //                     <LoaderSpinner color='white' height={40} width={40}/>
//                                 //                 </PickImage>
//                                 //             </DivPickImage>
//                                 //             :<DivPickImage>
//                                 //                 {!isDragActive?<label htmlFor="">
//                                 //                     <PickImage {...getRootProps()}>
//                                 //                         <AiOutlineCloudUpload color="var(--dark_color)" size={50}/>
//                                 //                         {isMobile()?'Select image':'Drag and drop image'}
//                                 //                         {/* <span style={{color:'#0082fb'}}>Browse files</span> */}
//                                 //                         <span style={{color:'#B3B3B3', fontSize:'14px', fontWeight:'600'}}>JPEG, PNG</span>
//                                 //                     </PickImage> 
//                                 //                 </label>:
//                                 //                 <label htmlFor="file">
//                                 //                 <PickImage {...getRootProps()}>
//                                 //                     <AiOutlineCloudUpload color="var(--dark_color)" size={100}/>
//                                 //                 </PickImage> 
//                                 //                 </label>}
//                                 //                     <input {...getInputProps()} accept="image/jpeg, image/png" style={{display:'none'}}  id="file" type="file"/>
//                                 //                 </DivPickImage>
//                                 //         }
//                                 //     </>
//                                 // )

//                                 :(
//                                     <DivPickImage>
//                                         {!isDragActive?<label htmlFor="">
//                                             <PickImage {...getRootProps()}>
//                                                 <AiOutlineCloudUpload color="var(--dark_color)" size={50}/>
//                                                 {isMobile()?'Select image':'Drag and drop image'}
//                                                 {/* <span style={{color:'#0082fb'}}>Browse files</span> */}
//                                                 <span style={{color:'#B3B3B3', fontSize:'14px', fontWeight:'600'}}>JPEG, PNG</span>
//                                             </PickImage> 
//                                         </label>:
//                                         <label htmlFor="file">
//                                         <PickImage {...getRootProps()}>
//                                             <AiOutlineCloudUpload color="var(--dark_color)" size={100}/>
//                                         </PickImage> 
//                                         </label>}
//                                             <input {...getInputProps()} accept="image/jpeg, image/png" style={{display:'none'}}  id="file" type="file"/>
//                                     </DivPickImage>
                                    
//                                 )
//                                 }
//                             </div>
                            
//                         </div>


                        
//                         <TokenInputLabel>Description *</TokenInputLabel>
//                         <TokenInputDiv>
//                             <TokenTextarea value={token.description} rows={6} placeholder="Description of your token" type="text" onChange={(e)=> handleFormFieldChange("description", e)}/>
//                         </TokenInputDiv>

//                       


//                         <br/>
//                         <MainText>Optional social links</MainText>

                        

                        

//                         <TokenInputLabel>Twitter</TokenInputLabel>
//                         <TokenInputDiv>
//                             <TokenInput value={token.twitter} placeholder="Twitter link" type="text" onChange={(e) => handleFormFieldChange("twitter", e)}/>
//                         </TokenInputDiv>

//                         <TokenInputLabel>Discord</TokenInputLabel>
//                         <TokenInputDiv>
//                             <TokenInput value={token.discord} placeholder="Discord link" type="text" onChange={(e) => handleFormFieldChange("discord", e)}/>
//                         </TokenInputDiv>

//                         <TokenInputLabel>Website</TokenInputLabel>
//                         <TokenInputDiv>
//                             <TokenInput value={token.website} placeholder="Website link" type="text" onChange={(e) => handleFormFieldChange("website", e)}/>
//                         </TokenInputDiv>

//                         <TokenInputLabel>Telegram Channel</TokenInputLabel>
//                         <TokenInputDiv>
//                             <TokenInput value={token.telegram} placeholder="Telegram link" type="text" onChange={(e) => handleFormFieldChange("telegram", e)}/>
//                         </TokenInputDiv>

//                         {/* <CreateButtonDiv>
//                             {token.image&&token.name&&token.description&&token.amount&&token.symbol&&token.decimals
//                                 ?<>{isLoading
//                                     ?<CreateButton><LoaderSpinner color='white' height={30} width={30}/></CreateButton>
//                                     :<CreateButton type='submit'  onClick={()=>collectPayment(token)}>Create Token</CreateButton>
//                                 }</>
//                                 :<CreateButtonDisabled type='submit' >Create Token</CreateButtonDisabled>
//                             }
//                         </CreateButtonDiv> */}
//                         <CreateButtonDiv>
//                             {token.image&&token.name&&token.description&&token.amount&&token.symbol&&token.decimals
//                                 ?<CreateButton type='submit'  onClick={()=>collectPayment(token)}>Create Token</CreateButton>
//                                 :<CreateButtonDisabled type='submit' >Create Token</CreateButtonDisabled>
//                             }
//                         </CreateButtonDiv>
//                         {/* <CreateButton type='submit'  onClick={()=>collectPayment(token)}>Create Token</CreateButton> */}

//                     </TokenInputSection>

//                 // </TokenCreateSection>

                

//             :<TokenSuccssDiv>

//                 <SuccessHeadeing>Token successfully created  <img style={{width:'30px', height:'30px'}} src={CheckImage}/></SuccessHeadeing>
                
//                 <NewTokenLinkDiv onClick={()=>{navigator.clipboard.writeText(tokenMintAddress); toast.success('copied')}}>
//                     Token address: <AddressToken>{tokenMintAddress.toString()} <FaRegCopy /></AddressToken>
//                 </NewTokenLinkDiv>
//                 {/* <small style={{color:'green', fontWeight:'600'}}>*make sure you save this address, because it won't be shown again.</small> */}

//                 <TokenDetail>Name: <strong style={{color: 'var(--dark_color)'}}>{token.name}</strong></TokenDetail>
//                 <TokenDetail>Symbol: <strong style={{color: 'var(--dark_color)'}}>{token.symbol}</strong></TokenDetail>

//                 <a style={{color: 'var(--dark_color)'}} href={`https://explorer.solana.com/address/${tokenMintAddress}?cluster=${networkConfiguration}`} target="_blank" rel="noreferrar"><TokenViewLink>View token on Solana</TokenViewLink></a>
//             </TokenSuccssDiv>}

//             <BlackDiv isVisible={isLoading || isImageUploading}><LoaderSpinner color='white' height={30} width={30}/></BlackDiv>
            

//             {/* {selecetedTheme==='dark'?<LoaderSpinner color='white' width='50px' height='50px'/>
//             :<LoaderSpinner color='black' width='50px' height='50px'/>} */}
//         </Container>
//     )
// }

// export default CreateToken;


import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair, LAMPORTS_PER_SOL, TransactionSignature, PublicKey, Transaction, SystemProgram } from "@solana/web3.js";   
import { MINT_SIZE, TOKEN_PROGRAM_ID, createInitializeMintInstruction, getMinimumBalanceForRentExemptMint, getAssociatedTokenAddress, createMintToInstruction, createAssociatedTokenAccountInstruction, freezeAccount } from "@solana/spl-token";
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
import ToggleSwitch from "../components/ToggleSwitch";
import ConnectWalletModal from "../components/ConnectWalletModal";
import { FaRegCircleCheck } from "react-icons/fa6";
import { Helmet } from "react-helmet";


// Function to detect mobile environment
const isMobile = () => {
    const userAgent = typeof navigator === 'undefined' ? '' : navigator.userAgent;
    return /iPhone|iPad|iPod|Android/i.test(userAgent);
};

const Container = styled.div`
    padding: 20px;

    @media screen and (max-width: 500px){
        padding: 10px;
    }
`;

const MainText = styled.h1`
    font-size: 25px;
    color: var(--dark_color);
    width: 500px;
    margin:auto;
    margin-bottom:50px;

    @media screen and (max-width: 900px){
        width: 100%;
    }


`;

const SubMainText = styled.h4`
    font-size: 17px;
    margin-top: 20px;
    color: var(--transparent_black);
`;
const TokenCreateSection = styled.div`
    // display: flex;
    // flex-direction: column;
    // gap:20px;
    // text-align: center;
    // padding: 10px;
    // width: 500px;
    // margin: auto;
    // margin-top: 20px;
    // margin-bottom: 100px;

    
    

    // @media screen and (max-width: 900px){
    //     width: 100%;
    //     // justify-content:center;
    // }
`;

const TokenImagediv = styled.div`
        // padding:40px;
    width: 100%;
    height: 200px;
    max-width: 600px;
    min-height: unset;
    max-height: 600px;
    // background: rgb(0,0,0,0.1);
    border-radius:10px;
    display:inline-flex;
    text-align:center;
    flex-direction:column;
    align-items:center;
    gap:10px;
    cursor:pointer;
    color: var(--dark_color);
    font-weight:600;
    font-size: 15px;
    border: 1px dashed var(--dark_color);
    flex:1;
    justify-content:center;
    // margin:auto;
    position: relative;

    &:hover {
        background-color: var(--light_transparent_black);
    }

    &:hover .hidden-content {
        opacity: 1;
        transition: opacity 0.3s ease, visibility 0.3s ease;
        // transform: translateY(0);
    }
`;
const TokenImage = styled.img`
    height: 100%;
    width: 100%;
    border-radius:10px;
`;

const TokenImageHoverdiv = styled.div`
    opacity: 0;
    // transform: translateY(100%);
    transition: opacity 0.3s ease, transform 0.3s ease;
    height: 100%;
    width: 100%;
    background: rgb(0,0,0,0.5);
    position: absolute;
    top:0;
    text-align: right;
    border-radius:10px;
`;

const DivPickImage = styled.div`
    flex: 1;
    text-align: left;

    @media screen and (max-width: 766px){
        text-align:center;

    }
`;
const PickImage = styled.div`
    // padding:40px;
    width: 100%;
    height: 200px;
    max-width: 600px;
    min-height: unset;
    max-height: 600px;
    // background: rgb(0,0,0,0.1);
    border-radius:10px;
    display:inline-flex;
    text-align:center;
    flex-direction:column;
    align-items:center;
    gap:10px;
    cursor:pointer;
    color: var(--dark_color);
    font-weight:600;
    font-size: 15px;
    border: 1px dashed var(--dark_color);
    flex:1;
    justify-content:center;
    // margin:auto;

    &:hover {
        background-color: var(--light_transparent_black);
    }


    // @media screen and (max-width: 766px){
    //     max-width: 400px;
    //     min-height: 400px;
    // }
            
`;

const TokenInputSection = styled.div`
    // flex:1;
    display:flex;
    flex-direction:column;
    gap: 20px;
    text-align:left;
    width: 500px;
    margin:auto;
    margin-bottom:100px;
    margin-top: 20px;

    @media screen and (max-width: 900px){
        width: 100%;
    }
`;

const TokenInputLabel = styled.label`
    color: var(--dark_color);
`;
const TokenInputDiv = styled.div`
    display:flex;
    padding: 10px;
    background: var(--light_transparent_black);
    border-radius: 10px;
`;
const TokenInput = styled.input`
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
const TokenTextarea = styled.textarea`
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
    resize: none;
`;

const TokenCreationFeeTotal = styled.h1`
    font-size: 20px;
    margin-top: 10px;
    font-weight: bold;
    color: var(--dark_color);
`;

const CreateButtonDiv = styled.div`
    position: fixed;
    bottom:0;
    left:0;
    right:0;
    padding: 10px 20px;
    background: var(--white_color);
    border-top: 0.5px solid grey;
`;
const CreateButtonDisabled = styled.div`
    background: rgba(0, 0, 0, 0.1);
    color: grey;
    padding: 15px 20px;
    text-align:center;
    display:inline-block;
    float: right;
    border-radius: 10px;
    cursor:pointer;
    font-weight:600;
    font-size: 15px;
    cursor: not-allowed;
    
    @media screen and (max-width:900px){
        display: block;
        float: none;
    }
`;

const CreateButton = styled.div`
    background: rgba(0, 255, 0, 0.2);
    color: var(--primary_color);
    padding: 15px 20px;
    text-align:center;
    display:inline-block;
    float: right;
    border-radius: 10px;
    cursor:pointer;
    font-weight:600;
    font-size: 15px;

    @media screen and (max-width:900px){
        display: block;
        float: none;
    }
`;


const LoginButton = styled.div`
    background: var(--dark_color);
    color: var(--white_color);
    padding: 15px 20px;
    text-align:center;
    display:inline-block;
    float: right;
    border-radius: 10px;
    cursor:pointer;
    font-weight:600;
    font-size: 15px;

    @media screen and (max-width:900px){
        display: block;
        float: none;
    }
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

const TokenSuccssDiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 600px;
    // border: solid 2px var(--dark_color);
    word-break: break-all;
    padding: 20px;
    border-radius: 10px;
    margin: auto;
    background:var(--light_transparent_black);
    overflow-x: auto;
    white-space: nowrap; /* Prevent wrapping */

    @media screen and (max-width:900px){
        width: auto;
    }
`;



const SuccessHeadeing = styled.h2`
    color: var(--dark_color);
    text-align: center;
    margin-bottom: 30px;
    display: flex;
    align-items: center;
    gap: 10px;
`;
const NewTokenLinkDiv = styled.div`
    // cursor: pointer;
    color: var(--dark_color);
    font-size: 15px;
    display: flex;
    align-items: center;
    gap: 10px;
    
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
    cursor:pointer;
`;
const TokenDetail = styled.div`
    color: var(--dark_color);
    font-size: 15px;
`;
const TokenViewLink = styled.div`
    background: rgba(0, 255, 0, 0.1);
    color: var(--primary_color);
    font-size: 15px;
    padding: 10px;
    border-radius: 10px;
    display: inline-block;

`;



const CreateToken = () => {
    const wallet = useWallet();
    const { connection, } = useConnection();
    const { networkConfiguration, setNetworkConfiguration } = useNetworkConfiguration();

    const [tokenUrl, setTokenUrl] = useState('');
    const [tokenMintAddress, setTokenMintAddress] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isImageUploading, setIsImageUploading] = useState(false);
    const [revokeMintAuthority, setRevokeMintAuthority] = useState(false);
    const [revokeFreezeAuthority, setRevokeFreezeAuthority] = useState(true);
    const [tokenCreationFeeAmount, setTokenCreationFeeAmount] = useState(0.6)
    const { select, wallets, publicKey, disconnect, connecting, sendTransaction } = useWallet();
    const [openWallets, setOpenWallets] = useState(false);
    const [copyAddress, setCopyAddress] = useState(false);

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
            setToken(prevToken => ({
                ...prevToken,
                image: imageURL,
            }));
            // setToken({...token, image: imageURL});
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
        const creatorAddress = new PublicKey(process.env.REACT_APP_SOLANA_ADDRESS);
        let signature: TransactionSignature = "";

        try {

            // use this to send money
            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: publicKey,
                    toPubkey: creatorAddress,
                    lamports: LAMPORTS_PER_SOL * Number(tokenCreationFeeAmount),
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
    },[tokenCreationFeeAmount])

    // CREATE TOKEN FUNCTION HERE
    const createToken = useCallback(
        async(token)=>{
            // console.log(`token data here: ${token}`)
            const lamports = await getMinimumBalanceForRentExemptMint(connection);
            const mintKeypair = Keypair.generate();
            const tokenATA = await getAssociatedTokenAddress(
                mintKeypair.publicKey,
                publicKey
            );

            try {
                const metadataURL = await uploadMetadata(token);
                // console.log(metadataURL);

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
                        revokeMintAuthority ? null : publicKey, // Conditionally include mint authority
                        revokeFreezeAuthority ? null: publicKey, // Conditionally include freeze authority
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

        },[publicKey, connection, sendTransaction, revokeMintAuthority, revokeFreezeAuthority ])

    
    
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

    const handleFreezeToggle = () => {
        setRevokeFreezeAuthority(!revokeFreezeAuthority);
        setTokenCreationFeeAmount((prev)=> revokeFreezeAuthority? prev - 0.1 : prev + 0.1)
    }

    const handleMintToggle = () => {
        setRevokeMintAuthority(!revokeMintAuthority);
        setTokenCreationFeeAmount((prev)=> revokeMintAuthority? prev - 0.1 : prev + 0.1)
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
                toast.error("Wallet connectio failed")
                // console.log("wallet connection err : ", error);
            }
        }

        // setNetworkConfiguration('testnet');
    };

    if(openWallets){
        document.body.style.overflow = 'hidden';
    }else{
        document.body.style.overflow = '';
    }

    const showCopyAddress=()=>{
        setCopyAddress(true);
        setTimeout(() => {
            setCopyAddress(false);
        }, 2000);
    }

    

    return (
        <Container>
            <Helmet>
                <title>Token mint - Handiswap</title>
            </Helmet>
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
                                                <AiOutlineCloudUpload color="var(--primary_color)" size={50}/>
                                                {isMobile()?'Select image':'Drag and drop image'}
                                                {/* <span style={{color:'#0082fb'}}>Browse files</span> */}
                                                <span style={{color:'var(--transparent_black)', fontSize:'14px', fontWeight:'600'}}>JPEG, PNG</span>
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

                        
                        <label style={{display:'flex', alignItems:'center', gap:'10px', cursor:'pointer', color:'var(--dark_color)', marginTop:'20px'}}>
                            <ToggleSwitch 
                                isChecked={revokeFreezeAuthority}
                                onChange={handleFreezeToggle}
                            />
                            Revoke Freeze Authority <strong style={{color:'var(--dark_color)'}}>(0.1) SOL</strong><br/>
                        </label>
                        <strong style={{fontSize:'13px', color:'var(--dark_color)'}}>*Revoking Freeze Authority enables you to establish a liquidity pool.</strong>

                        <label style={{display:'flex', alignItems:'center', gap:'10px', cursor:'pointer', color:'var(--dark_color)', marginTop:'20px'}}>
                        <ToggleSwitch 
                                isChecked={revokeMintAuthority}
                                onChange={handleMintToggle}
                            />
                            Revoke Mint Authority <strong style={{color:'var(--dark_color)'}}>(0.1) SOL</strong><br/>
                        </label>
                        <strong style={{fontSize:'13px', color:'var(--dark_color)'}}>*Revoking Mint Authority takes away your ability to increase the token supply.</strong>

                        <TokenCreationFeeTotal>Total Fee: <span style={{color:'var(--primary_color)'}}>({tokenCreationFeeAmount}) SOL</span></TokenCreationFeeTotal>
                        <strong style={{fontSize:'12px',color:'var(--transparent_black);'}}>*Gas charges do not apply.</strong>


                        <br/>
                        <MainText>Add optional social links</MainText>

                        

                        

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
                            {publicKey
                                ?<>{token.image&&token.name&&token.description&&token.amount&&token.symbol&&token.decimals
                                    ?<CreateButton type='submit'  onClick={()=>collectPayment(token)}>Create Token</CreateButton>
                                    :<CreateButtonDisabled type='submit' >Create Token</CreateButtonDisabled>
                                }</>
                                :<LoginButton onClick={openModal}>Login</LoginButton>
                            }
                            
                        </CreateButtonDiv>
                        {/* <CreateButton type='submit'  onClick={()=>collectPayment(token)}>Create Token</CreateButton> */}

                    </TokenInputSection>

                // </TokenCreateSection>

                

            :<TokenSuccssDiv>

                <SuccessHeadeing>Token successfully created  <img style={{width:'30px', height:'30px'}} src={CheckImage}/></SuccessHeadeing>
                
                <NewTokenLinkDiv >
                    Token address: <AddressToken onClick={()=>{navigator.clipboard.writeText(tokenMintAddress); showCopyAddress()}}>{copyAddress?<>copied<FaRegCircleCheck /></>:<FaRegCopy />}{tokenMintAddress.toString()}</AddressToken>
                </NewTokenLinkDiv>
                {/* <small style={{color:'green', fontWeight:'600'}}>*make sure you save this address, because it won't be shown again.</small> */}

                <TokenDetail>Name: <strong style={{color: 'var(--dark_color)'}}>{token.name}</strong></TokenDetail>
                <TokenDetail>Symbol: <strong style={{color: 'var(--dark_color)'}}>{token.symbol}</strong></TokenDetail>

                <a style={{color: 'var(--dark_color)'}} href={`https://explorer.solana.com/address/${tokenMintAddress}?cluster=${networkConfiguration}`} target="_blank" rel="noreferrar"><TokenViewLink>View token on Solana</TokenViewLink></a>
            </TokenSuccssDiv>}

            <BlackDiv isVisible={isLoading || isImageUploading}><LoaderSpinner color='white' height={30} width={30}/></BlackDiv>
            

            {/* {selecetedTheme==='dark'?<LoaderSpinner color='white' width='50px' height='50px'/>
            :<LoaderSpinner color='black' width='50px' height='50px'/>} */}

            <ConnectWalletModal openWallets={openWallets} closeModal={closeModal} isMobile={isMobile} wallets={wallets} handleWalletSelect={handleWalletSelect} networkConfiguration={networkConfiguration} setNetworkConfiguration={setNetworkConfiguration}/>
        </Container>
    )
}

export default CreateToken;
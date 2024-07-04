import styled from "styled-components";
import { useForm, ValidationError } from '@formspree/react';
import { toast } from "sonner";
import { useState } from "react";
import { MdCancel } from "react-icons/md";

const Container = styled.div`
    align-items: center;
    display: flex;
    transition: opacity 0.3s ease, visibility 0.3s ease;
    opacity: ${({ show }) => (show ? 1 : 0)};
    visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
    position:fixed;
    top: 0;
    left:0;
    right:0;
    bottom:0;
    justify-content:center;
    z-index: 50;
    background: rgb(0,0,0,0.2);
    backdrop-filter: blur(10px);
`;

const InnerContainer = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 400px;
    background: var(--white_color);
    // box-shadow: 0 0 10px var(--light_transparent_black);
    border-radius: 10px;
    padding: 20px;

    @media screen and (max-width: 500px){
        width: 90%;
    }
`;

const InputContainer = styled.div`
    display: flex;
    padding: 10px;
    background: var(--light_transparent_black);
    border-radius: 10px;
`;

const Input = styled.input`
    flex: 1;
    width: 100%;
    background: none;
    border: none;
    outline: none;
    color: var(--dark_color);
    padding: 10px;
`;

const TextArea = styled.textarea`
    flex: 1;
    width: 100%;
    background: none;
    border: none;
    outline: none;
    color: var(--dark_color);
    padding: 10px;
    resize: none;
`;

const SubmitButton = styled.button`
    background: rgba(0, 255, 0, 0.1);
    color: var(--primary_color);
    padding: 20px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    font-weight: 600;
    width: 100%;
`;

const ShowContactButton = styled.button`
    background: white;
    color: black;
    padding: 20px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    font-weight: 600;

    &:hover {
        background: white;
    }
`;

const ContactUs = () => {
    const [state, handleSubmit] = useForm("xqazzvkg");
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [showContact, setShowContact] = useState(false);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (state.succeeded) {
        setEmail('');
        setMessage('');
        toast.success("Thanks for submitting your message.");
    }

    const showHideContactForm = () => {
        setShowContact(!showContact);
    }

    return (
        <>
            <Container show={showContact} onSubmit={handleSubmit}>
                <InnerContainer>
                    <h2 style={{color:'var(--dark_color)', display:'flex',justifyContent:'space-between'}}>
                        Contact Us
                        <MdCancel 
                            style={{cursor:'pointer'}} 
                            onClick={showHideContactForm} 
                            color="var(--dark_color)"
                        />
                    </h2>
                    <label style={{color:'grey', fontWeight:'600'}} htmlFor="email">
                        Email Address
                    </label>
                    <InputContainer>
                        <Input 
                            onChange={(e) => setEmail(e.target.value)} 
                            value={email}
                            placeholder="email" 
                            name="email" 
                            id="email" 
                            type="email"
                        />
                    </InputContainer>
                    <ValidationError 
                        prefix="Email" 
                        field="email"
                        errors={state.errors}
                    />
                    
                    <label style={{color:'grey', fontWeight:'600'}} htmlFor="message">
                        Message
                    </label>
                    <InputContainer>
                        <TextArea 
                            onChange={(e) => setMessage(e.target.value)} 
                            value={message}
                            placeholder="message" 
                            rows={5} 
                            id="message" 
                            name="message"
                        />
                    </InputContainer>
                    <ValidationError 
                        prefix="Message" 
                        field="message"
                        errors={state.errors}
                    />
                    {email && message && emailPattern.test(email)
                        ? <SubmitButton disabled={state.submitting} type="submit">Submit</SubmitButton>
                        : <SubmitButton style={{cursor:'not-allowed'}} type="button">Submit</SubmitButton>
                    }
                </InnerContainer>
            </Container>
            {!showContact && (
                <ShowContactButton onClick={showHideContactForm}>
                    Contact Us
                </ShowContactButton>
            )}
        </>
    )
}

export default ContactUs;

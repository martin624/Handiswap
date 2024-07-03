import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import Homepage from './pages/Homepage';
import Update from './updates/Update';
import Header from './components/Header';
import { Toaster } from 'sonner';
import CreateToken from './pages/CreateToken';
import TokenMetadata from './pages/TokenMetadata';
import ContactUs from './pages/ContactUs';
import Airdrop from './pages/Airdrop.tsx';
import SendTransaction from './pages/SendTransaction.tsx';
import Footer from './components/Footer.js';
import Privacypolicy from './pages/Privacypolicy.js';
import Termsofservice from './pages/Termsofservice.js';

function App() {

    return (
        <div className="App">
            <Header/>
            <Routes>
                <Route path='/' element={<Homepage/>}/>
                <Route path='/token-mint' element={<CreateToken/>}/>
                <Route path='/token-metadata' element={<TokenMetadata/>}/>
                <Route path='/testnet-sol' element={<Airdrop/>}/>
                <Route path='/donate' element={<SendTransaction/>}/>
                {/* <Route path='/privacy-policy' element={<Privacypolicy/>}/>
                <Route path='/terms-of-service' element={<Termsofservice/>}/> */}
                {/* <Route path='/perform-update' element={<Update/>}/> */}
                {/* <Route path='/contact-us' element={<ContactUs/>}/> */}
                
                <Route path='*' element={<h1>Not found</h1>}/>
            </Routes>
            
            <Toaster/>
        </div>
    );
}

export default App;

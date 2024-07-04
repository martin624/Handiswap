import React, { useState } from 'react'
import { MdOutlineLightMode } from "react-icons/md";
import styled from 'styled-components';
import ToggleSwitch from './ToggleSwitch';


const DarkModeTogle = styled.div`
    // cursor:pointer;
    // // background: var(--dark_color);
    // color: var(--dark_color);
    // font-size: 15px;
    // font-weight: 600;
    // padding: 15px;
    // border-radius:10px;
    // text-align: center;

    // &:hover{
    //     background: var(--light_transparent_black);
    // }
`;

const Container = styled.label`
    display: flex;
    align-items:center;
    gap: 20px;
    cursor:pointer;
    color: var(--dark_color);
    cursor:pointer;
    // background: var(--dark_color);
    color: var(--dark_color);
    font-size: 15px;
    font-weight: 600;
    padding: 15px;
    border-radius:10px;
    text-align: center;

    &:hover{
        background: var(--light_transparent_black);
    }
`;

const DarkMode = () => {
    const selecetedTheme = localStorage.getItem('selectedTheme');
    const [currentMode, setCurrentMode] = useState(selecetedTheme==='dark'?'Dark Mode':'Light Mode')
    

    const setDarkMode = ()=>{
        document.querySelector("body").setAttribute('data-theme', 'dark')
        localStorage.setItem('selectedTheme', 'dark')
    }
    const setLightMode = ()=>{
        document.querySelector("body").setAttribute('data-theme', 'light')
        localStorage.setItem('selectedTheme', 'light')
    }


    

    if(selecetedTheme==='dark' || selecetedTheme === null){
        setDarkMode();
    }

    // const toggleTheme = (e)=>{
    //     if(e.target.checked){
    //         setDarkMode();
    //         setCurrentMode('Dark Mode');
    //     } else {
    //         setLightMode();
    //         setCurrentMode('Light Mode');
    //     }
    // }

    const toggleTheme = (e)=>{
        if(selecetedTheme!=='dark'){
            setDarkMode();
            setCurrentMode('Dark Mode');
        } else {
            setLightMode();
            setCurrentMode('Light Mode');
        }
    }
    
    return (
        <>
            {/* <input
                style={{display:'none'}}
                className='darkmodeinput'
                type='checkbox'
                id='themtoggle'
                onChange={toggleTheme}/>
            <Label for='themtoggle'>
                <DarkModeTogle onClick={()=>toggleTheme} className='darkmodetoggle'>
                    <Container><MdOutlineLightMode style={{cursor:'pointer', color:'var(--dark_color)'}}/>{currentMode}</Container>
                </DarkModeTogle>
            </Label> */}

                <DarkModeTogle onClick={()=>{}} className='darkmodetoggle'>
                    <Container>
                        <MdOutlineLightMode style={{cursor:'pointer', color:'var(--dark_color)'}}/>
                        {currentMode}
                        <ToggleSwitch
                            isChecked={selecetedTheme!=='dark'?false:true}
                            onChange={toggleTheme}
                        />
                    </Container>
                    
                </DarkModeTogle>
            
        </>
        
    )
}

export default DarkMode;
import React from 'react'
import BlackLoaderSpinner from '../images/blackloader.gif'
import WhiteLoaderSpinner from '../images/whiteloader.gif'
import styled from 'styled-components'

const Container = styled.div`
    margin:auto;
`

const Loader = styled.img`
    width:100%;
    height:100%;
`

const LoaderSpinner = ({color, height, width}) => {
  return color ==='white'?<Container style={{width:width, height:height}}><Loader src={WhiteLoaderSpinner}/></Container>:<Container style={{width:width,height:height}}><Loader src={BlackLoaderSpinner}/></Container>;
}

export default LoaderSpinner
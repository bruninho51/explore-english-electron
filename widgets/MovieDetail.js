import React from 'react'
import styled from "styled-components"

export const MoviesList = styled.div`
  box-sizing: border-box;
  width: 93vmax;
  height: 100%;
  background: #F8F8F8;
  padding: 15px;
  margin-left: 1vmax;
  border-left: 3px solid #DCDCDC;
  border-right: 3px solid #DCDCDC;
  border-bottom: 3px solid #DCDCDC;
  border-radius: 5px;
  top: 0px;
  overflow-x: hidden;
  overflow-y: scroll;
`

export const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow-x: hidden;
  overflow-y: hidden;
`

export const MovieTumbContainer = styled.div`
  box-sizing: border-box;
  width: 400px;
  height: 100px;
  background: #F8F8F8;
  margin-left: 1vmax;
  border-left: 3px solid #DCDCDC;
  border-right: 3px solid #DCDCDC;
  border-bottom: 3px solid #DCDCDC;
  border-radius: 5px;
  top: 0px;
  margin-bottom: 15px;
  margin-top: 15px;
  align-items: center;
  font-family: Roboto, sans-serif;
  position: relative;
  display: flex;
`

const ImageContainer = styled.div`
    height: 100%; 
    display: flex; 
    justify-content: start;
`
const Body = styled.div`
    padding: 10px 0px 0px 0px;
    display: flex;
    align-items: start;
    height: 100%;
    padding: 15px 0px 0px 0px;
    width: 800px;
    font-size: 12px;
    font-weight: bold;
`

const InlineBlockContainer = styled.div`
    display: inline-block;
`

const MovieImage = ({ alt, src }) => {
    return (
        <img style={{ height: '100%', marginRight: '10px' }} alt={alt} src={src ?? 'https://assets.papelpop.com/wp-content/uploads/2019/08/mr-roboto-4a-temporada-trailer.jpg'} />
    )
}

export const MovieTumb = ({ title, imageSrc, imageAlt }) => {
    return (
        <MovieTumbContainer>
            <ImageContainer>
                <MovieImage alt={imageAlt} src={imageSrc} />
            </ImageContainer>
            <Body>
                {title}
            </Body>
        </MovieTumbContainer>
    )
}

export const MovieDetail = ({ title, imageSrc, imageAlt }) => {
    return (
        <InlineBlockContainer>
            <FlexContainer>
                <MovieTumb 
                    title={title}
                    imageSrc={imageSrc}
                    imageAlt={imageAlt}
                />
            </FlexContainer>
        </InlineBlockContainer>
    )
}
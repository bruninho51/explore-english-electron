import React from 'react'
import styled from "styled-components"
import { Button } from './Button'


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
  width: 300px;
  height: 300px;
  background: #F8F8F8;
  padding: 20px;
  margin-left: 1vmax;
  border-left: 3px solid #DCDCDC;
  border-right: 3px solid #DCDCDC;
  border-bottom: 3px solid #DCDCDC;
  border-radius: 5px;
  top: 0px;
  margin-bottom: 15px;
  align-items: center;
  font-family: Roboto, sans-serif;
  position: relative;
`

const Footer = styled.div`
    display: flex;
    justify-content: flex-end;
    flex-align: center;
`

const Header = styled.div`
    width: 100%;
    height: 70%; 
    display: flex; 
    justify-content: center;
`
const Body = styled.div`
    padding: 10px 0px 0px 0px;
`

const InlineBlockContainer = styled.div`
    display: inline-block;
`

const MovieImage = ({ alt, src }) => {
    return (
        <img style={{ height: '100%' }} alt={alt} src={src ?? 'assets/movie.png'} />
    )
}

const TrashStyle = styled.div`
    position: absolute;
    top: 0px;
    right: 0px;
    padding: 5px 5px 0px 0px;
    cursor: pointer;
`

const Trash = ({ onRemove }) => {
    return (
        <TrashStyle>
            <img width="30px" src="assets/trash.svg" alt="trash" onClick={onRemove} />
        </TrashStyle>
    )
}

export const MovieTumb = ({ title, imageSrc, imageAlt, onStudy, onRemove }) => {
    return (
        <MovieTumbContainer>
            <Trash onRemove={onRemove} />
            <Header>
                <MovieImage alt={imageAlt} src={imageSrc} />
            </Header>
            <Body>
                {title}
            </Body>
            <Footer>
                <Button onClick={onStudy}>Estudar</Button>
            </Footer>
        </MovieTumbContainer>
    )
}

export const Movie = ({ title, imageSrc, imageAlt, onStudy, onRemove }) => {
    return (
        <InlineBlockContainer>
            <FlexContainer>
                <MovieTumb 
                    title={title}
                    imageSrc={imageSrc}
                    imageAlt={imageAlt}
                    onStudy={onStudy}
                    onRemove={onRemove}
                />
            </FlexContainer>
        </InlineBlockContainer>
    )
}
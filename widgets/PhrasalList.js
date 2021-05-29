import React from "react"
import styled from "styled-components"
import Scrollbars from "react-custom-scrollbars"
import { Card } from "./Card"

const Section = styled.section`
  box-sizing: border-box;
  min-height: 100px;
  background: #DCDCDC;
  border-left: 3px solid #DCDCDC;
  border-right: 3px solid #DCDCDC;
  padding: 5px 5px 5px 5px;

  border-bottom: 3px solid #DCDCDC;
  border-radius: 5px;
  display: flex;
`

const PhrasalListContainer = styled(Section)`
  width: 40%;
  display: block;
  height: 100%;
  overflow: hidden;
`

const PhrasalListContainerNoContent = styled(PhrasalListContainer)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  user-select: none;
`

const EmptyListIcon = () => (
  <img 
      alt="empty" 
      src="assets/noting.png" 
      style={{width: '200px'}}
    />
)

const NoContent = () => {
  return (
    <PhrasalListContainerNoContent>
        <EmptyListIcon />
    </PhrasalListContainerNoContent>
  )
}

const VerticalScroll = styled.div`
  background: rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  width: 6px;
`

export const PhrasalList = ({ phrases, onDelete }) => {
    return (
      phrases && phrases.length ?
      
        <PhrasalListContainer>
          <Scrollbars renderThumbVertical={() => (<VerticalScroll />)}>
          {phrases.map((phrase) => (
              <Card 
                  key={phrase.uuid} 
                  uuid={phrase.uuid}
                  wordIndex={phrase.wordIndex} 
                  sentence={phrase.sentence} 
                  onDelete={onDelete}
                  status={phrase.status}
              />
          ))}
          </Scrollbars>
        </PhrasalListContainer>  : <NoContent />)
}
import React, { useState } from "react"
import styled from "styled-components"
import { Button } from './Button'
import { CreateMovieDialog } from "./CreateMovieDialog"
import { Movie } from './Movie'

export const Container = styled.div`
  margin: 0 auto;
  box-sizing: border-box;
  width: 100%;
  height: 95vmin;
  background: #F8F8F8;
  border-left: 3px solid #DCDCDC;
  border-right: 3px solid #DCDCDC;
  padding:  5px 5px 5px 5px;
  border-bottom: 3px solid #DCDCDC;
  border-radius: 5px;
  display: flex;
`

export const Bar = styled.div`
  box-sizing: border-box;
  width: 4vmax;
  height: 100%;
  background: #F8F8F8;
  padding: 5px;
  border-left: 3px solid #DCDCDC;
  border-right: 3px solid #DCDCDC;
  border-bottom: 3px solid #DCDCDC;
  border-radius: 5px;
  top: 0px;
`

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
  padding: 5px;
  margin-left: 1vmax;
  border-left: 3px solid #DCDCDC;
  border-right: 3px solid #DCDCDC;
  border-bottom: 3px solid #DCDCDC;
  border-radius: 5px;
  top: 0px;
  margin-bottom: 15px;
  align-items: center;
`

export const MovieTumb = ({ title }) => {
    return (
        <MovieTumbContainer>
            <div style={{ width: '100%', height: '70%', display: 'flex', justifyContent: 'center' }}>
                <img style={{ height: '100%' }} alt="a cabana" src="https://images-na.ssl-images-amazon.com/images/I/71ydFW-qgQL.jpg" />
            </div>
            <div>{title}</div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button>Estudar</Button>
            </div>
        </MovieTumbContainer>
    )
}

export const MovieList = ({ movies, onHome }) => {
  const [createMovie, setCreateMovie] = useState(false)

    return (
      <React.Fragment>
        {createMovie ? <CreateMovieDialog onCancel={() => setCreateMovie(false)} onSave={() => alert('movie criado')} /> : <div />}
          <MoviesList>
              {movies.map((movie) => (
                <Movie
                  title={movie.title}
                  imageSrc={movie.imageSrc}
                  imageAlt={movie.imageAlt}
                  onRemove={movie.onRemove}
                  onStudy={movie.onStudy}
                />
              ))}
          </MoviesList>
      </React.Fragment>
    )
}
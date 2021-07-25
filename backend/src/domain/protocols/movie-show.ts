export interface MovieShow {
  show: (movieId: string) => Promise<MovieShow.Result>
}

export namespace MovieShow {
  export type Result = {
    id: string
    name: string
  }
}

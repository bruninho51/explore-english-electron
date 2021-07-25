export interface MoviesShow {
  show: () => Promise<MoviesShow.Result[]>
}

export namespace MoviesShow {
  export type Result = {
    id: string
    name: string
  }
}

export interface MovieDelete {
  delete: (movieId: string) => Promise<void>
}

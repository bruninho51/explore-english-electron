export type Connection<T> = {
  getConnection: () => Promise<T>
}

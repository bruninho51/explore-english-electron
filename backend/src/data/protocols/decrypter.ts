export interface Decrypter {
  decrypt: (ciphertext: string) => Promise<any>
}

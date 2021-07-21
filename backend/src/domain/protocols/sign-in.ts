import { User } from '../models/user'

export interface SignIn {
  signIn: (email: string, password: string) => Promise<SignIn.Result>
}

export namespace SignIn {
  export type Result = {
    user: User
    token: string
  }
}

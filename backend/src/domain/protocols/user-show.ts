import { User } from '../models/user'

export interface UserShow {
  show: (userId: string) => Promise<User>
}

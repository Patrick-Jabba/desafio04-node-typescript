import { IUser } from "../interface/IUser"


const db = [
  {
      id: 1,
      name: 'Patrick',
      email: 'patrick@email.com'
  }
]

export class UserService {
  db: IUser []

  constructor(database = db) {
    this.db = database
  }

  createUser = (id: number, name: string, email: string) => {
    const user = {
      id,
      name,
      email
    }

    this.db.push(user)
    console.log('DB Atualizado', this.db)
  }

  getAllUsers = () => {
    return this.db
  }

  // deleteUser = (id: number) => {
  //   db.map
  // }
}
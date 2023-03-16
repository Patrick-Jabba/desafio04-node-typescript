import { IUser } from "../interface/IUser"

const db = [
  {
      id: "1",
      name: 'Patrick',
      email: 'patrick@email.com'
  }
]

export class UserService {
  db: IUser []

  constructor(database = db) {
    this.db = database
  }

  createUser = (id: string, name: string, email: string) => {
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

  deleteUser = (id: string) => {
    if(id === null) {
      console.log('Bad Request! Usuário não achado.')
      return;
    }

    this.db = this.db.filter(user => user.id != id )
    
    console.log('DB atualizado', this.db)
  }
}
import { EntityManager } from "typeorm";
import { User } from "../entitities/User";

export class UserRepository {
  private manager: EntityManager

  constructor( manager: EntityManager){
    this.manager = manager;
  }

  createUser = async (user: User): Promise<User> => {
    return this.manager.save(user)
  }

  getUserById = async (userId: string):Promise<User | null>  => {
    return this.manager.findOne(User, {
      where: {
        user_id: userId
      }
    })
  }

  getUserByEmailAndPassword = async (email: string, password: string):Promise<User | null>  => {
    return this.manager.findOne(User, {
      where: {
        email,
        password
      }
    })
  }

  deleteUser = async (userId: string):Promise<void> => {
    await this.manager.delete(User, {user_id: userId})

  }
}
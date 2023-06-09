import { sign } from "jsonwebtoken"
import { AppDataSource } from "../database"
import { User } from "../entitities/User"
import { UserRepository } from "../repositories/UserRepository"

export class UserService {
  private userRepository: UserRepository
  
  constructor(userRepository = new UserRepository(AppDataSource.manager)) {
    this.userRepository = userRepository
  }

  createUser = async (name: string, email: string, password: string): Promise<User> => {
    const user = new User(name, email, password)
    return this.userRepository.createUser(user)
  }

  getUserById = async (userId:string): Promise<User | null> => {
    return this.userRepository.getUserById(userId);
  }

  getAuthenticatedUser = (email: string, password: string): Promise<User | null> => {
    return this.userRepository.getUserByEmailAndPassword(email, password)
  }

  getToken = async (email: string, password: string):Promise<string> => {
    const user = await this.getAuthenticatedUser(email, password)

    if(!user) {
      throw new Error('Email/password invalid!')
    }

    const tokenData = {
      name: user?.name,
      email: user?.email
    }

    const tokenKey = '123456789'

    const tokenOptions = {
      subject: user?.user_id
    }

    const token = sign(tokenData, tokenKey, tokenOptions)

    return token
  }

  deleteUser = (id: string) => {
    this.userRepository.deleteUser(id )
  }
}
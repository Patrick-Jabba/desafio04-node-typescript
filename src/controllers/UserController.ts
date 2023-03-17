import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

export class UserController {
  userService: UserService

  constructor(userService = new UserService()) {
    this.userService = userService
  }

  createUser = (request: Request, response: Response) => {
    
    const user = request.body

    if(!user.name || !user.email || !user.password) {
      return response.status(400).json({message: 'Bad request! Todos os campos são obrigatórios!'})
    }
    
    this.userService.createUser(user.name, user.email, user.password)
    return response.status(201).json({
      message: 'Usuário criado'
    });
  }

  getUserById = async (request: Request, response: Response) => {
    const { userId } = request.params
    const user  = await this.userService.getUserById(userId)
    
    return response.status(200).json({
      userId: user?.user_id,
      name: user?.name,
      email: user?.email
    })
  }

  deleteUser = (request: Request, response: Response) => {
    const { id } = request.params

    if(id === null) {
      console.log('Bad Request! Usuário não achado.')
      return;
    }

    this.userService.deleteUser(id)
    return response.status(204).json({
      message: 'Usuário removido com sucesso!'
    })
  }
}
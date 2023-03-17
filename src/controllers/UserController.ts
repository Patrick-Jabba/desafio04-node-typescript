import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

export class UserController {
  userService: UserService

  constructor(userService = new UserService()) {
    this.userService = userService
  }

  createUser = (request: Request, response: Response) => {
    
    const user = request.body

    if(!user.name) {
      return response.status(400).json({message: 'Bad request! Nome obrigatório!'})
    }

    if(!user.email) {
      return response.status(400).json({
        message: 'Bad request! E-mail obrigatório!'
      })
    }
    
    this.userService.createUser(user.id, user.name, user.email)
    return response.status(201).json({
      message: 'Usuário criado'
    });
  }

  getAllUsers = (request: Request, response: Response) => {
    const users = this.userService.getAllUsers()

    return response.status(200).json(users)
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
import { UserService } from "../services/UserService";
import { UserController } from "./UserController";

import { Request } from "express";
import { makeMockResponse } from "../__mocks__/mockResponse";

const mockResponse = makeMockResponse()

describe('UserController', () => {
  const mockUserService: Partial<UserService> = {
    createUser: jest.fn(),
    getAllUsers: jest.fn(),
    deleteUser: jest.fn()
  }

  const userController = new UserController(mockUserService as UserService);

  it('should add a new user', () => {
    const mockRequest = {
      body: {
        name: 'Nath',
        email: 'nath@email.com'
      }
    } as Request
    
    userController.createUser(mockRequest, mockResponse)
    
    expect(mockResponse.state.status).toBe(201)
    expect(mockResponse.state.json).toMatchObject({
      message: 'Usuário criado'
    })
  })

  it('should show an error message when the user does not inform the name', () => {
    const mockRequest = {
      body: {
        name: '',
        email: 'nath@email.com'
      }
    } as Request

    userController.createUser(mockRequest, mockResponse)
    
    expect(mockResponse.state.status).toBe(400)
    expect(mockResponse.state.json).toMatchObject({
      message: 'Bad request! Nome obrigatório!'
    })
  })
  
  it('should bring all users when requested', () => {
    const mockRequest = {
    } as Request

    userController.getAllUsers(mockRequest, mockResponse)
  })

  it('should show an error when the email field is not informed', () => {
    const mockRequest = {
      body: {
        name: 'Moreira Castro',
        email: ''
      }
    } as Request

    userController.createUser(mockRequest, mockResponse)

    expect(mockResponse.state.status).toBe(400)
    expect(mockResponse.state.json).toMatchObject({
      message:
      'Bad request! E-mail obrigatório!'
    })
  })

  // it('should delete an user', () => {
  //   const mockRequest = {
  //     "1": Params,
  //   } as Request

  //   userController.deleteUser(MockRequest, mockResponse)
  //   expect(mockResponse.state.status).toBe(200)
  // })

  
})
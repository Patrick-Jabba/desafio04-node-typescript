import { Request } from "express";
import { UserController } from "./UserController";
import { makeMockResponse } from "../__mocks__/mockResponse";
import { makeMockRequest } from "../__mocks__/mockRequest";


const mockUserService = {
  createUser: jest.fn(),
  getUserById: jest.fn(),
  deleteUser: jest.fn()
}

jest.mock('../services/UserService', () => {
  return {
    UserService: jest.fn().mockImplementation(() => {
      return mockUserService
    })
  }
})

const mockResponse = makeMockResponse()
describe('UserController', () => {
  const userController = new UserController();
  
  it('should add a new user', () => {
    const mockRequest = {
      body: {
        name: 'Nath',
        email: 'nath@email.com',
        password: '123456'
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
        email: 'nath@email.com',
        password: '123456'
      }
    } as Request

    userController.createUser(mockRequest, mockResponse)
    
    expect(mockResponse.state.status).toBe(400)
    expect(mockResponse.state.json).toMatchObject({
      message: 'Bad request! Todos os campos são obrigatórios!'
    })
  })
  
  it('should bring the user by the id', async () => {
    const mockRequest = makeMockRequest({
      params: {
        userId: '123456'
      }
    })

    userController.getUserById(mockRequest, mockResponse)
    expect(mockUserService.getUserById).toHaveBeenCalledWith('123456')
    expect(mockResponse.state.status).toBe(200)
  })

  it('should show an error when the email field is not informed', () => {
    const mockRequest = {
      body: {
        name: 'Moreira Castro',
        email: '',
        password: '123456'
      }
    } as Request

    userController.createUser(mockRequest, mockResponse)

    expect(mockResponse.state.status).toBe(400)
    expect(mockResponse.state.json).toMatchObject({
      message:
      'Bad request! Todos os campos são obrigatórios!'
    })
  })

  it('should show an error when the password field is not informed', () => {
    const mockRequest = {
      body: {
        name: 'Moreira Castro',
        email: 'moreira@email.com',
        password: ''
      }
    } as Request

    userController.createUser(mockRequest, mockResponse)

    expect(mockResponse.state.status).toBe(400)
    expect(mockResponse.state.json).toMatchObject({
      message:
      'Bad request! Todos os campos são obrigatórios!'
    })
  })

  it('should delete an user', () => {
    const mockRequest = {
      params: {
        
      }
    } as Request

    userController.deleteUser(mockRequest, mockResponse)
    expect(mockResponse.state.status).toBe(204)
    expect(mockResponse.state.json).toMatchObject({
      message: 'Usuário removido com sucesso!'
    })
  })

  
})
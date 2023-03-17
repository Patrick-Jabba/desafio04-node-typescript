import { UserService } from "./UserService";
import * as jwt from 'jsonwebtoken';

jest.mock('../repositories/UserRepository')
jest.mock('../database', () => {
  initialize: jest.fn()
})
jest.mock('jsonwebtoken')

const mockUserRepository = require('../repositories/UserRepository')

describe('UserService', () => {
  const userService = new UserService(mockUserRepository);

  const mockUser = {
    user_id: '1234',
    name: 'Patrick',
    email: 'patrick@email.com',
    password: '123456'
  }

  it('should add a new user', async () => {
    mockUserRepository.createUser = jest.fn().mockImplementation(() => Promise.resolve(mockUser))
    const response = await userService.createUser('Patrick', 'patrick@email.com', '123456');
    expect(mockUserRepository.createUser).toHaveBeenCalled()
    expect(response).toMatchObject({
      user_id: '1234',
      name: 'Patrick',
      email: 'patrick@email.com',
      password: '123456'
    })
  })
  
  it('should return a token from an user', async() => {
    jest.spyOn(userService, 'getAuthenticatedUser').mockImplementation(() => Promise.resolve(mockUser))
    jest.spyOn(jwt, 'sign').mockImplementation(() => 'token')
    const token = await userService.getToken('patrick@email.com', '123456')
    expect(token).toBe('token')
  })

  it('should return an error when user not found', async() => {
    jest.spyOn(userService, 'getAuthenticatedUser').mockImplementation(() => Promise.resolve(null))
    await expect(userService.getToken('invalid@test.com', '123456')).rejects.toThrowError(new Error('Email/password invalid!'))
  })

  it('should delete an user', () => {
    // const mockConsole = jest.spyOn(global.console, 'log')
    mockUserRepository.deleteUser = jest.fn().mockImplementation(() => Promise.resolve(''))
    mockUserRepository.deleteUser("1")
  })
})
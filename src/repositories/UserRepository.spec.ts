import { EntityManager } from "typeorm"
import { User } from "../entitities/User"
import { getMockEntityManager } from "../__mocks__/mockEntityManager.mock"
import { UserRepository } from "./UserRepository"

describe('UserRepository', () => {
  let userRepository: UserRepository
  let managerMock: Partial<EntityManager>

  const mockUser: User = {
    user_id: '12345',
    name: 'Test User',
    email: 'teste@email.com',
    password: '123456'
  }

  beforeAll(async () => {
    managerMock = await getMockEntityManager({
      saveReturn: mockUser
    })

    userRepository = new UserRepository(managerMock as EntityManager)
  })

  it('should register a new user at database', async() =>{
    const response = await userRepository.createUser(mockUser)
    expect(managerMock.save).toHaveBeenCalled()
    expect(response).toMatchObject(mockUser)
  })

  it('should delete an user from the database', async() => {
    await userRepository.deleteUser(mockUser.user_id)
    expect(managerMock.delete).toHaveBeenCalled()
  })
})
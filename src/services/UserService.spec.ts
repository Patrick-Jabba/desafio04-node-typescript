import { IUser } from "../interface/IUser";
import { UserService } from "./UserService"

const mockConsole = jest.spyOn(global.console, 'log')
describe('UserService', () => {
  const mockDb: IUser[] = []
  const userService = new UserService(mockDb);
  it('should add a new user', () => {
    userService.createUser("3", 'Pedro', 'pedro@email.com');
    expect(mockConsole).toHaveBeenCalledWith('DB Atualizado', mockDb)
  })
  
  it('should delete an user', () => {
    const mockDb: IUser[] = []
    const userService = new UserService(mockDb);

    userService.deleteUser("1")
    expect(mockConsole).toHaveBeenCalledWith('DB atualizado', mockDb)
  })
})
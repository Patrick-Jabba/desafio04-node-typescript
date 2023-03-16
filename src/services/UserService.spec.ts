import { IUser } from "../interface/IUser";
import { UserService } from "./UserService"
describe('UserService', () => {
  const mockDb: IUser[] = []
  const userService = new UserService(mockDb);
  it('should add a new user', () => {
    const mockConsole = jest.spyOn(global.console, 'log')
    userService.createUser(3, 'Pedro', 'pedro@email.com');
    expect(mockConsole).toHaveBeenCalledWith('DB Atualizado', mockDb)
  })
})
import { EntityManager } from "typeorm";

interface MockManagerArgs {
  saveReturn?: object | [object],
  findOneReturn?: object,
  deleteUserReturn?: void
}

export const getMockEntityManager = async ({
  saveReturn = undefined,
  findOneReturn = undefined,
  deleteUserReturn = undefined
}:MockManagerArgs):Promise<EntityManager> => {
  const manager: Partial<EntityManager> = {}

  manager.save = jest.fn().mockImplementation(() => Promise.resolve(saveReturn))
  manager.findOne = jest.fn().mockImplementation(() => Promise.resolve(findOneReturn))
  manager.delete = jest.fn().mockImplementation(() => Promise.resolve(deleteUserReturn))

  return manager as EntityManager;
}
import { DataSource } from "typeorm"
import { User } from "../entitities/User"

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./src/database/db.sqlite",
  entities: [
    User
  ],
  migrations: [
    "./src/database/migrations/*.ts"
  ],
}) 

AppDataSource.initialize()
    .then(() => {
        console.log("🔥🔥🔥 Data Source has been initialized!")
    })
    .catch((err) => {
        console.error(err)
    })
import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config();


const sequelize = new Sequelize({
    dialect: 'mysql',
    database: process.env.DB_NAME,
    username: "root",
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: 3306
})

export default sequelize;
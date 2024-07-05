import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    // process.env.DB_DATABASE_NAME,
    // process.env.DB_USERNAME,
    // process.env.DB_PASSWORD,
    // {
    //     host: process.env.DB_HOST,
    //     port: process.env.DB_PORT,
    //     dialect: process.env.DB_DIALECT,
    //     logging: false
    // }

    'ETL_TOOL_VALIDATE',
    'vinc02',
    '12345',
    {
        host: '10.10.12.93',
        port: 3306,
        dialect: 'mysql',
        logging: false
    }
)

let testConnectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully. ");
    } catch (error) {
        console.error("Unable to connect to the database: ", error)
    }
}

export { sequelize, testConnectDB }
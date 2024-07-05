import { Sequelize } from "sequelize";

const sequelize = new Sequelize('ETL_TOOL_VALIDATE', 'vinc02', '12345', {
    host: '10.10.12.93',
    dialect: 'mysql' // Loại cơ sở dữ liệu
});

export let connectDB = async () => {
    console.log("hhi")
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully. ");
    } catch (error) {
        console.error("Unable to connect to the database: ", error)
    }
}



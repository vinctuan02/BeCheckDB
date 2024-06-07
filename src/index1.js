import express from 'express';
import { connectDB } from './DB/connectDB'
import mysql from 'mysql2/promise';
// import { sendMessage } from './Kafka/producer'
// import { getAllUsers } from './Service/getAllUser'

const app = express();
const PORT = process.env.PORT || 3000;

connectDB()

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// let users = await getAllUsers()


const dbConfig = {
    host: '10.10.12.93',
    user: 'vinc02',
    password: '12345',
    database: 'vinc02'
};

// const dbConfig2 = {
//     host: '10.10.12.93',
//     user: 'vinc02',
//     password: '12345',
//     database: 'vinc02'
// };


let test = async () => {
    const connection = await mysql.createConnection(dbConfig);

    // await connection.execute(`SELECT COUNT(*) AS total_rows FROM ${tableName}`);
    let res = await connection.execute(`SELECT * FROM users`);
    // console.log("res: ", res)
    // console.table(res[0])

    let res2 = await connection.execute(`SELECT * FROM users2`);
    // console.log("res: ", res2[0])
    // console.table(res2[0])

    const [rows] = await connection.execute('SHOW TABLES');

    // console.log("rows: ", rows)

    // Chuyển đổi kết quả truy vấn thành một mảng các tên bảng

    const tables = rows.map(row => Object.values(row)[0]);

    // const tables = rows.map(row => {
    //     // Lấy ra tên của bảng từ mỗi hàng kết quả
    //     const tableNameArray = Object.values(row);
    //     console.log("tableNameArray: ", tableNameArray)
    //     const tableName = tableNameArray[0]; // Lấy phần tử đầu tiên của mảng
    //     return tableName; // Trả về tên của bảng
    // });
    // console.log("tables: ", tables)

    // Hiển thị danh sách các bảng
    // console.table(tables.map(table => ({ Table: table })));
}

test()

let getAllTable = async () => {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SHOW TABLES');
    const tables = rows.map((row) => {
        return Object.values(row)[0]
    })

    return tables
}

let tables = await getAllTable()
console.log("tables: ", tables)
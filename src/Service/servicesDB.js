import mysql from 'mysql2/promise';

const dbConfig = {
    host: '10.10.12.93',
    user: 'vinc02',
    password: '12345',
};

let compareTable = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // console.log("data: ", data)
            let { nameTable1 = "users", nameTable2 = "users2" } = data
            // console.log("nameTable1: ", nameTable1)
            // console.log("nameTable2: ", nameTable2)
            const connection = await mysql.createConnection(dbConfig); l

            const [table1] = await connection.execute(`SELECT * FROM ${nameTable1}`)
            console.log(table1)
            const [table2] = await connection.execute(`SELECT * FROM ${nameTable2}`)
            // console.log(table2)

            const [rowCountTable1] = await connection.execute(`SELECT COUNT(*) AS rowCount FROM ${nameTable1}`)
            const [rowCountTable2] = await connection.execute(`SELECT COUNT(*) AS rowCount FROM ${nameTable2}`)

            let rowCount1 = rowCountTable1.map((rowCountTable1) => {
                return Object.values(rowCountTable1)[0]
            })

            let rowCount2 = rowCountTable2.map((rowCountTable2) => {
                return Object.values(rowCountTable2)[0]
            })

            // console.log("da: ", Object.values(rowCountTable1))
            // console.log("rowCountTable1: ", rowCount1)
            // console.log("rowCountTable2: ", rowCount2)

            const res = {
                inforTable1: {
                    rowCount1: rowCount1,
                    table1: table1
                },
                inforTable2: {
                    rowCount2: rowCount2,
                    table2: table2
                },
            }

            resolve(res)
        } catch (e) {
            // console.log(e)
            reject()
        }
    })
}

let getAllNameDB = () => {
    return new Promise(async (resolve, reject) => {
        try {
            // console.log("get all name db")
            const connection = await mysql.createConnection(dbConfig);
            const [allNameDB] = await connection.execute('SHOW DATABASES');
            resolve({
                status: 'Ok',
                message: 'Get All Name DB Success',
                data: allNameDB
            })
        } catch (e) {
            reject(e)
        }
    })
}

let getAllNameTableOfDB = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { nameDB } = data
            const connection = await mysql.createConnection(dbConfig);
            const [allNameDB] = await connection.execute(`SHOW TABLES FROM ${nameDB}`);

            resolve({
                status: 'Ok',
                message: 'Get All Name Table of DB Success',
                data: allNameDB
            })
        } catch (e) {
            reject(e)
        }
    })
}


let getATable = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let { nameDB, nameTable } = data
            // console.log("get a table")
            const connection = await mysql.createConnection(dbConfig);
            const [table] = await connection.execute(`SELECT * FROM ${nameDB}.${nameTable}`);
            // console.log(table)
            resolve({
                status: 'Ok',
                message: 'Get All Name DB Success',
                data: table
            })
        } catch (e) {
            reject(e)
        }
    })
}

let getInforATable = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let { nameDB, nameTable, isASC, limit } = data

            if (nameDB && nameTable && limit) {
                const connection = await mysql.createConnection(dbConfig);
                const [dataTable] = await connection.execute(`SELECT * FROM ${nameDB}.${nameTable} ORDER BY id ${isASC ? 'ASC' : 'DESC'} LIMIT ${limit} `);
                const [describeTable] = await connection.execute(`DESCRIBE ${nameDB}.${nameTable}`);

                resolve({
                    status: 'Ok',
                    message: 'Get Infor A Table Success',
                    data: {
                        dataTable: dataTable,
                        describeTable: describeTable
                    }
                })
            }

            if (nameDB && nameTable && !isASC && !limit) {
                const connection = await mysql.createConnection(dbConfig);
                const [dataTable] = await connection.execute(`SELECT * FROM ${nameDB}.${nameTable}`);
                const [describeTable] = await connection.execute(`DESCRIBE ${nameDB}.${nameTable}`);

                resolve({
                    status: 'Ok',
                    message: 'Get Infor A Table Success',
                    data: {
                        dataTable: dataTable,
                        describeTable: describeTable
                    }
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

export const serviceDB = {
    compareTable,

    getAllNameDB,
    getAllNameTableOfDB,
    getATable,
    getInforATable
}

// export default getAllTable
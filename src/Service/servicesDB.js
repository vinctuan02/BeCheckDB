import mysql from 'mysql2/promise';

const dbConfig = {
    host: '10.10.11.149',
    user: 'vinc',
    password: 'oracle_4U',
    timezone: 'Asia/Ho_Chi_Minh'
};

let getAllNameDB = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const connection = await mysql.createConnection(dbConfig);
            const sql = 'SHOW DATABASES'
            const [allNameDB] = await connection.execute(sql);

            const filteredDatabases = allNameDB
                .filter(row => !['information_schema', 'my_database', 'mysql', 'performance_schema'].includes(row.Database))
                .map(row => ({ Database: row.Database }));

            connection.end(err => {
                if (err) {
                    console.error('Error closing the connection:', err);
                    return;
                }
                console.log('Connection closed successfully.');
            });

            resolve({
                status: 'Ok',
                message: 'Get All Name DB Success',
                data: filteredDatabases
            })
        } catch (e) {
            reject(e)
        }
    })
}

let getAllNameTBOfDB = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { nameDB } = data
            const connection = await mysql.createConnection(dbConfig);
            const sql = `SHOW TABLES FROM ${nameDB}`
            const [allNameDB] = await connection.execute(sql);

            connection.end(err => {
                if (err) {
                    console.error('Error closing the connection:', err);
                    return;
                }
                console.log('Connection closed successfully.');
            });

            resolve({
                status: 'Ok',
                message: 'Get All Name TB of DB Success',
                data: allNameDB
            })
        } catch (e) {
            reject(e)
        }
    })
}

let getDataTB = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let { nameDB, nameTB, isASC = 'true', limit = 100 } = data

            if (nameDB && nameTB && limit) {
                const connection = await mysql.createConnection(dbConfig);
                let sql = `SELECT * FROM ${nameDB}.${nameTB} ORDER BY id ${isASC === 'true' ? 'ASC' : 'DESC'} LIMIT ${limit} `
                const [dataTable] = await connection.execute(sql);

                connection.end(err => {
                    if (err) {
                        console.error('Error closing the connection:', err);
                        return;
                    }
                    console.log('Connection closed successfully.');
                });

                resolve({
                    status: 'Ok',
                    message: 'Get Data Table Success',
                    data: dataTable
                })
            }

        } catch (e) {
            reject(e)
        }
    })
}

let getDescribeTB = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let { nameDB, nameTB } = data

            if (nameDB && nameTB) {
                const connection = await mysql.createConnection(dbConfig);
                const sql = `DESCRIBE ${nameDB}.${nameTB}`

                const [describeTable] = await connection.execute(sql);

                connection.end(err => {
                    if (err) {
                        console.error('Error closing the connection:', err);
                        return;
                    }
                    console.log('Connection closed successfully.');
                });

                resolve({
                    status: 'Ok',
                    message: 'Get Describe Table Success',
                    data: describeTable
                })
            }

        } catch (e) {
            reject(e)
        }
    })
}

let getColumnsINT = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let { nameDB, nameTB } = data
            // console.log("get a table")
            const connection = await mysql.createConnection(dbConfig);
            const sql = `
                SELECT COLUMN_NAME, DATA_TYPE 
                FROM INFORMATION_SCHEMA.COLUMNS
                WHERE
                    (DATA_TYPE = 'int' OR DATA_TYPE = 'bigint') AND
                    TABLE_NAME = '${nameTB}' AND
                    TABLE_SCHEMA = '${nameDB}'
                `
            const [result] = await connection.execute(sql);

            connection.end(err => {
                if (err) {
                    console.error('Error closing the connection:', err);
                    return;
                }
                console.log('Connection closed successfully.');
            });

            resolve({
                status: 'Ok',
                message: 'Get Columns INT Success',
                data: result
            })
        } catch (e) {
            reject(e)
        }
    })
}

let getCountRecords = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let { nameDB, nameTB } = data

            if (nameDB && nameTB) {
                const connection = await mysql.createConnection(dbConfig);
                let sql = `SELECT COUNT(*) AS countRecords FROM ${nameDB}.${nameTB}`
                const [countRecords] = await connection.execute(sql);

                connection.end(err => {
                    if (err) {
                        console.error('Error closing the connection:', err);
                        return;
                    }
                    console.log('Connection closed successfully.');
                });

                resolve({
                    code: 0,
                    status: 'Ok',
                    message: 'Get countRecords Table Success',
                    data: countRecords
                })
            }

            resolve({
                code: -1,
                status: 'Ok',
                message: '',
            })

        } catch (e) {
            reject(e)
        }
    })
}

let getTable = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let { nameDB, nameTB, fieldName, fieldValue, isASC = true, limit = 100, startValue, endValue } = data

            if (nameDB && nameTB) {
                const connection = await mysql.createConnection(dbConfig);

                let sql = ``
                if (fieldName && fieldValue) {
                    sql = `
                            SELECT *
                            FROM ${nameDB}.${nameTB}
                            WHERE ${fieldName} = '${fieldValue}'
                            ORDER BY id ${isASC === 'true' ? 'ASC' : 'DESC'} LIMIT ${limit}
                        `
                } else if (fieldName && startValue && endValue) {
                    sql = `
                        SELECT *
                        FROM ${nameDB}.${nameTB}
                        WHERE ${fieldName} BETWEEN '${startValue}' AND '${endValue}'
                        ORDER BY id ${isASC === 'true' ? 'ASC' : 'DESC'} LIMIT ${limit}
                    `
                    // console.log(sql);

                } else {
                    sql = `
                        SELECT * FROM ${nameDB}.${nameTB} 
                        ORDER BY id ${isASC === 'true' ? 'ASC' : 'DESC'} LIMIT ${limit}
                    `
                }


                try {

                    console.log(sql);
                    const [table] = await connection.execute(sql);

                    connection.end(err => {
                        if (err) {
                            console.error('Error closing the connection:', err);
                            return;
                        }
                        console.log('Connection closed successfully.');
                    });

                    resolve({
                        code: 0,
                        status: 'Ok',
                        message: 'Get Table Success',
                        data: table
                    })
                } catch (error) {
                    // Xử lý lỗi khi truy vấn thất bại
                    console.error('Error executing SQL query:', error.message);
                    resolve({
                        code: 0,
                        status: 'fail',
                        message: error.message,
                    })
                }
            }

            resolve({
                code: -1,
                status: 'Ok',
                message: '',
            })

        } catch (e) {
            reject(e)
        }
    })
}


export const serviceDB = {
    getAllNameDB,
    getAllNameTBOfDB,
    getDataTB,
    getDescribeTB,
    getColumnsINT,
    getCountRecords,

    getTable
}

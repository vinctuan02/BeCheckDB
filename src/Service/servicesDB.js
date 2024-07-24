import mysql from 'mysql2/promise';

const dbConfig = {
    host: '10.10.11.149',
    user: 'vinc',
    password: 'oracle_4U',
    timezone: 'Asia/Ho_Chi_Minh'
};

let createConnection = (configDB) => {
    return new Promise(async (resolve, reject) => {
        try {
            const allNameDB = await getAllNameDB(configDB)
            console.log(allNameDB);
            resolve({
                errCode: 0,
                status: 'Ok',
                message: 'Create connection success',
                allNameDB: allNameDB.data
            })
        } catch (e) {
            reject(e)
        }
    })
}

let getAllNameDB = (configDB) => {
    return new Promise(async (resolve, reject) => {
        try {
            const connection = await mysql.createConnection(configDB);
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

            try {
                const [allNameDB] = await connection.execute(sql);
                resolve({
                    status: 'Ok',
                    message: 'Get All Name TB of DB Success',
                    data: allNameDB
                })
            } catch (error) {
                resolve({
                    status: 'Ok',
                    message: 'Get All Name TB of DB Success',
                    data: []
                })
            }


            connection.end(err => {
                if (err) {
                    console.error('Error closing the connection:', err);
                    return;
                }
                console.log('Connection closed successfully.');
            });

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

                const sqlGetColumns = `SHOW COLUMNS FROM ${nameDB}.${nameTB}`
                const [columns] = await connection.execute(sqlGetColumns)

                const nameColumns = columns.map((item, index) => {
                    return item.Field
                })

                let sql = ``
                if (fieldName && fieldValue) {
                    sql = `
                            SELECT *
                            FROM ${nameDB}.${nameTB}
                            WHERE ${fieldName} = '${fieldValue}'
                            ORDER BY ${nameColumns[0]} ${isASC === 'true' ? 'ASC' : 'DESC'} LIMIT ${limit}
                        `
                } else if (fieldName && startValue && endValue) {
                    sql = `
                        SELECT *
                        FROM ${nameDB}.${nameTB}
                        WHERE ${fieldName} BETWEEN '${startValue}' AND '${endValue}'
                        ORDER BY ${nameColumns[0]} ${isASC === 'true' ? 'ASC' : 'DESC'} LIMIT ${limit}
                    `
                    // console.log(sql);

                } else {
                    sql = `
                        SELECT * FROM ${nameDB}.${nameTB} 
                        ORDER BY ${nameColumns[0]} ${isASC === 'true' ? 'ASC' : 'DESC'} LIMIT ${limit}
                    `
                }


                try {
                    const [table] = await connection.execute(sql);
                    console.log(sql);
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

let groupByColumn = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let { nameDB, nameTB, nameColumn } = data

            if (nameDB && nameTB && nameColumn) {
                const connection = await mysql.createConnection(dbConfig);

                let sql = `
                        SELECT ${nameColumn} , COUNT(*)
                        FROM ${nameDB}.${nameTB} 
                        GROUP BY ${nameColumn};
                    `

                try {

                    console.log(sql);
                    const [result] = await connection.execute(sql);

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
                        data: result
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

let autoCompareTable = (input) => {
    return new Promise(async (resolve, reject) => {
        try {
            // const resultCompareRecord = await compareTotalRecord(input)
            const checkCountRecord = await compareCountRecord(input)
            const checkCompareGroups = await compareGroups(input)

            resolve({
                code: 0,
                status: 'Ok',
                message: 'Auto compare oke',
                result: {
                    checkCountRecord: checkCountRecord,
                    checkCompareGroups: checkCompareGroups
                }
            })
        } catch (e) {

        }
    })

}


let compareCountRecord = async (input) => {
    const { schemaSource, schemaSink, tableSource, tableSink } = input
    if (schemaSource, schemaSink, tableSource, tableSink) {
        const sql = `
                    SELECT COUNT(*) as c
                    FROM ${schemaSource}.${tableSource} 
                    except
                    SELECT COUNT(*) as c
                    FROM ${schemaSink}.${tableSink}
                `
        try {
            const connection = await mysql.createConnection(dbConfig);
            const [result] = await connection.execute(sql);
            if (result.length > 0) {
                return false
            } else {
                return true
            }
        } catch (e) {
            console.log(e);
        }

    }
}

let isArrayEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) {
        return false
    } else {
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i])
                return false
        }
    }
    return true
}

let compareGroupByColumn = async (input, column) => {
    const connection = await mysql.createConnection(dbConfig);
    const { schemaSource, schemaSink, tableSource, tableSink } = input
    const sql = `
                    WITH 
                        countSource as (
                            SELECT ${column}, COUNT(*) as c
                            FROM ${schemaSource}.${tableSource} 
                            GROUP BY ${column} ASC
                        ),
                        countSink as (
                            SELECT ${column}, COUNT(*) as c
                            FROM ${schemaSink}.${tableSink} 
                            GROUP BY ${column} ASC
                        )

                    SELECT * FROM countSource
                    except
                    SELECT * FROM countSink
                `
    try {
        await connection.execute(`USE ${schemaSource}`)
        const [result] = await connection.execute(sql);
        if (result.length > 0) {
            return false
        } else {
            return true
        }
    } catch (e) {
        console.log(e);
    }
}

let compareGroups = async (input) => {
    const { schemaSource, schemaSink, tableSource, tableSink } = input
    if (schemaSource, schemaSink, tableSource, tableSink) {

        const connection = await mysql.createConnection(dbConfig);

        const sqlGetColumnsSource = `SHOW COLUMNS FROM ${schemaSource}.${tableSource}`
        const sqlGetColumnsSink = `SHOW COLUMNS FROM ${schemaSink}.${tableSink}`

        const [columnsSource] = await connection.execute(sqlGetColumnsSource)
        const [columnsSink] = await connection.execute(sqlGetColumnsSink)

        const nameColumnsSource = columnsSource.map((item, index) => {
            return item.Field
        })

        const nameColumnsSink = columnsSink.map((item, index) => {
            return item.Field
        })

        if (isArrayEqual(nameColumnsSource, nameColumnsSink)) {
            for (let i = 0; i < nameColumnsSource.length; i++) {
                // console.log(column)
                // console.log(await compareGroupByColumn(input, column));
                if (await compareGroupByColumn(input, nameColumnsSource[i]) === false) {
                    console.log(nameColumnsSource[i]);
                    return false
                }
            }
            return true
        } else {
            return 'Table structure does not match'
        }

    }
}



// result = {
//     resultCompare: {

//     }
// }

let compareTotalRecord = (input) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { schemaSource, schemaSink, tableSource, tableSink } = input
            if (schemaSource, schemaSink, tableSource, tableSink) {
                const connection = await mysql.createConnection(dbConfig);
                let sql = `
                    WITH 
                        Table1 as (
                            SELECT COUNT(*) as countRecord
                            FROM ${schemaSource}.${tableSource}
                        ),
                        Table2 as (
                            SELECT COUNT(*) as countRecord
                            FROM ${schemaSink}.${tableSink}
                        )
	
                    SELECT 
                        t1.countRecord as countRecordSource,
                        t2.countRecord as countRecordSink,
                        CASE 
                            WHEN
                                t1.countRecord = t2.countRecord THEN 'Match'
                                ELSE 'Missmatch'
                        END
                        as result
                    FROM Table1 t1
                    CROSS JOIN Table2 t2
                `
                try {
                    const [result] = await connection.execute(sql);
                    // console.log("result: ", result);

                    resolve({
                        code: 0,
                        status: 'Ok',
                        message: 'Compare count record Success',
                        data: result
                    })
                } catch (error) {
                    console.log(error);
                    resolve({
                        code: -1,
                        // status: 'Ok',
                        // message: 'Get Table Success',
                        // data: table
                    })
                }

            } else {
                resolve({
                    code: -1,
                    // status: 'Ok',
                    message: 'Missing input',
                    // data: table
                })
            }



        } catch (e) {
            reject(e)
        }
    })
}


let countRecordTablesSchema = (input) => {
    return new Promise(async (resolve, reject) => {
        try {
            const connection = await mysql.createConnection(dbConfig);
            const { nameDB } = input
            const sql = `
                    SELECT table_name, table_rows
                    FROM information_schema.tables
                    WHERE table_schema = '${nameDB}'
                    ORDER BY table_rows DESC
                `
            try {
                await connection.execute(`USE ${nameDB}`)
                const [result] = await connection.execute(sql);
                resolve({
                    errCode: 0,
                    status: 'Ok',
                    message: 'Get count all table',
                    data: result
                })
            } catch (e) {
                console.log(e);
                resolve({
                    errCode: -1,
                    message: e.message
                })
            }

        } catch (e) {
            resolve({
                errCode: -1,
                status: 'fail',
                message: e.message
            })
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

    getTable,
    groupByColumn,
    autoCompareTable,
    createConnection,
    countRecordTablesSchema
}

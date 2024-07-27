import mysql from 'mysql2/promise';

const dbConfig = {
    host: '10.10.11.149',
    user: 'vinc',
    password: 'oracle_4U',
    // timezone: 'Asia/Ho_Chi_Minh'
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

let getAllNameDB = (infoJDBC) => {
    return new Promise(async (resolve, reject) => {
        try {
            const connection = await mysql.createConnection(infoJDBC);
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

let getAllNameTBOfDB = (nameDB, infoJDBC) => {
    return new Promise(async (resolve, reject) => {
        try {
            const connection = await mysql.createConnection(infoJDBC);
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
            let { nameDB, nameTB, isASC = 'true', limit = 200 } = data

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


let getCountRecords = (nameDB, nameTB, infoJDBC) => {
    return new Promise(async (resolve, reject) => {
        if (!nameDB || !nameTB || !infoJDBC) {
            resolve({
                code: -1,
                message: 'Missing input',
            });
            return;
        }

        let connection;
        try {
            connection = await mysql.createConnection(infoJDBC);
            let sql = `SELECT COUNT(*) AS countRecords FROM ${nameDB}.${nameTB}`;
            const [countRecords] = await connection.execute(sql);
            resolve({
                code: 0,
                status: 'Ok',
                message: 'Get countRecords Table Success',
                data: countRecords
            });
        } catch (error) {
            resolve({
                code: -2,
                message: error.message
            });
        } finally {
            if (connection) {
                connection.end(err => {
                    if (err) {
                        console.error('Error closing the connection:', err);
                    } else {
                        console.log('Connection closed successfully.');
                    }
                });
            }
        }
    });
};

const getTable = (nameDB, nameTB, infoJDBC, filter = {}) => {
    return new Promise(async (resolve, reject) => {
        let connection
        try {
            const { fieldName, fieldValue, isASC = true, limit = 200, startValue, endValue } = filter;

            console.log(nameDB, nameTB, infoJDBC, filter);

            if (!nameDB || !nameTB) {
                resolve({
                    code: -2,
                    status: 'fail',
                    message: 'Database or table name is missing',
                })
            }

            connection = await mysql.createConnection(infoJDBC);

            const sqlGetColumns = `SHOW COLUMNS FROM ${nameDB}.${nameTB}`;
            const [columns] = await connection.execute(sqlGetColumns);

            const nameColumns = columns.map(item => item.Field);

            let sql = `
                    SELECT * 
                    FROM ${nameDB}.${nameTB} 
                    ORDER BY ${nameColumns[0]} ${isASC === 'true' ? 'ASC' : 'DESC'} 
                    LIMIT ${limit}
                `

            if (fieldName && fieldValue) {
                sql = `
                    SELECT * 
                    FROM ${nameDB}.${nameTB} 
                    WHERE ${fieldName} = '${fieldValue}' 
                    ORDER BY ${nameColumns[0]} ${isASC === 'true' ? 'ASC' : 'DESC'} 
                    LIMIT ${limit}
                `
            } else if (fieldName && startValue && endValue) {
                sql = `
                SELECT *
                FROM ${nameDB}.${nameTB} 
                WHERE ${fieldName} BETWEEN '${startValue}' AND '${endValue}' 
                ORDER BY ${nameColumns[0]} ${isASC === 'true' ? 'ASC' : 'DESC'} 
                LIMIT ${limit}
            `
            }

            const [table] = await connection.execute(sql);

            resolve({
                code: 0,
                // infoJDBC: infoJDBC,
                sql: sql.replace(/\s+/g, ' ').trim(),
                message: 'Get Table Success',
                data: table,
            })
        } catch (error) {
            console.error('Error:', error.message);
            reject({
                code: -1,
                status: 'fail',
                message: error.message,
            });
        }
        finally {
            if (connection) {
                connection.end(err => {
                    if (err) {
                        console.error('Error closing the connection:', err);
                    } else {
                        console.log('Connection closed successfully.');
                    }
                });
            }
        }
    })
};


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

let autoCompareTable = (infoSource, infoSink) => {
    return new Promise(async (resolve, reject) => {
        try {

            const resCompareDescribe = await compareDescribe(infoSource, infoSink)
            const resCompareCountRecords = await compareCountRecords(infoSource, infoSink)
            const resCompareGroupRecords = await compareGroupRecords(infoSource, infoSink)

            let resultFinal = true

            if (resCompareCountRecords.resultFinal !== true || resCompareCountRecords.resultFinal !== true || resCompareGroupRecords.resultFinal !== true) {
                resultFinal = false
            }

            resolve({
                code: 0,
                status: 'Ok',
                message: 'Auto compare oke',
                resultFinal: true,
                testCase: {
                    resCompareDescribe: resCompareDescribe,
                    resCompareCountRecords: resCompareCountRecords,
                    resCompareGroupRecords: resCompareGroupRecords
                }
            })
        } catch (e) {
            reject({
                code: -1,
                message: e.message
            })
        }
    })

}


let compareDescribe = (infoSource, infoSink) => {
    return new Promise(async (resolve, reject) => {
        try {

            const { infoJDBCSource, schemaSource, tableSource } = infoSource
            const { infoJDBCSink, schemaSink, tableSink } = infoSink

            const connectionSource = await mysql.createConnection(infoJDBCSource);
            const sqlGetDescribeTableSource = `DESCRIBE ${schemaSource}.${tableSource}`
            const [describeTableSource] = await connectionSource.execute(sqlGetDescribeTableSource);

            const connectionSink = await mysql.createConnection(infoJDBCSink);
            const sqlGetDescribeTableSink = `DESCRIBE ${schemaSink}.${tableSink}`
            const [describeTableSink] = await connectionSink.execute(sqlGetDescribeTableSink);

            const resultFinal = JSON.stringify(describeTableSource) === JSON.stringify(describeTableSink) ? true : false

            await connectionSource.end()
            await connectionSink.end()

            resolve({
                code: 0,
                status: 'Ok',
                message: 'Compare describe oke',
                resultFinal: resultFinal,
                describe: {
                    describeTableSource: describeTableSource,
                    describeTableSink: describeTableSink
                },

            })
        } catch (e) {
            reject({
                code: -1,
                message: e.message
            })
        }
    })

}

let compareCountRecords = (infoSource, infoSink) => {
    return new Promise(async (resolve, reject) => {
        try {

            const { infoJDBCSource, schemaSource, tableSource } = infoSource
            const { infoJDBCSink, schemaSink, tableSink } = infoSink

            const connectionSource = await mysql.createConnection(infoJDBCSource);
            const sqlGetCountRecordsTableSource = `
                                                SELECT COUNT(*) AS countRecords
                                                FROM ${schemaSource}.${tableSource}
                                            `
            const [countRecordsTableSource] = await connectionSource.execute(sqlGetCountRecordsTableSource);

            const connectionSink = await mysql.createConnection(infoJDBCSink);
            const sqlGetCountRecordsTableSink = `
                                                SELECT COUNT(*) AS countRecords
                                                FROM ${schemaSink}.${tableSink}
                                            `
            const [countRecordsTableSink] = await connectionSink.execute(sqlGetCountRecordsTableSink);

            const resultFinal = JSON.stringify(countRecordsTableSource) === JSON.stringify(countRecordsTableSink) ? true : false

            await connectionSource.end()
            await connectionSink.end()

            resolve({
                code: 0,
                status: 'Ok',
                message: 'Compare count records oke',
                resultFinal: resultFinal,
                countRecords: {
                    countRecordsTableSource: countRecordsTableSource,
                    countRecordsTableSink: countRecordsTableSink
                }
            })
        } catch (e) {
            reject({
                code: -1,
                message: e.message
            })
        }
    })

}

let compareGroupRecords = (infoSource, infoSink) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { infoJDBCSource, schemaSource, tableSource } = infoSource
            const { infoJDBCSink, schemaSink, tableSink } = infoSink

            const connectionSource = await mysql.createConnection(infoJDBCSource)
            const connectionSink = await mysql.createConnection(infoJDBCSink);


            // columns source === columns sink
            const sqlGetColumnsSource = `DESCRIBE ${schemaSource}.${tableSource}`
            const [describeSource] = await connectionSource.execute(sqlGetColumnsSource)
            // const columnsSource = describeSource.map((item) => item.Field)

            const columnsToGroup = []
            const arrResultGroupSourceSink = []
            let resultFinal = true

            for (const des of describeSource) {
                const column = des.Field
                const sqlCountDistinctSource = `
                    SELECT COUNT(DISTINCT ${column}) as distinctCount
                    FROM ${schemaSource}.${tableSource}
                `;
                const sqlCountDistinctSink = `
                    SELECT COUNT(DISTINCT ${column}) as distinctCount
                    FROM ${schemaSink}.${tableSink}
                `;

                const [[{ distinctCount: distinctCountSource }]] = await connectionSource.execute(sqlCountDistinctSource)
                const [[{ distinctCount: distinctCountSink }]] = await connectionSource.execute(sqlCountDistinctSink)

                if (distinctCountSource < 100 && distinctCountSink < 100) {
                    columnsToGroup.push(column)

                    const sqlGroupRecordsSourceByColumn = `
                    SELECT ${column}, COUNT(${column}) as count${column}
                    FROM ${schemaSource}.${tableSource}
                    GROUP BY ${column} 
                    ORDER BY count${column} DESC
                `
                    const sqlGroupRecordsSinkByColumn = `
                    SELECT ${column}, COUNT(${column}) as count${column}
                    FROM ${schemaSink}.${tableSink}
                    GROUP BY ${column} 
                    ORDER BY count${column} DESC
                `
                    const [groupRecordsSourceByColumn] = await connectionSource.execute(sqlGroupRecordsSourceByColumn)
                    const [groupRecordsSinkByColumn] = await connectionSink.execute(sqlGroupRecordsSinkByColumn)

                    if (JSON.stringify(groupRecordsSourceByColumn) == !JSON.stringify(groupRecordsSinkByColumn)) {
                        resultFinal = false
                    }

                    arrResultGroupSourceSink.push({ groupRecordsSourceByColumn, groupRecordsSinkByColumn })
                }
            }

            await connectionSource.end()
            await connectionSink.end()

            resolve({
                code: 0,
                status: 'Ok',
                message: 'Compare count records oke',
                resultFinal: resultFinal,
                columnsToGroup: columnsToGroup,
                arrGroupRecordsSourceSink: arrResultGroupSourceSink,

            })
        } catch (e) {
            reject({
                code: -1,
                message: e.message
            })
        }
    })

}

let countRecordTablesSchema = (nameDB, infoJDBC) => {

    // console.log(nameDB);
    // console.log(infoJDBC);

    return new Promise(async (resolve, reject) => {
        try {
            const connection = await mysql.createConnection(infoJDBC);
            const sql = `
                    SELECT table_name, table_rows as 'table_rows_estimate'
                    FROM information_schema.tables
                    WHERE table_schema = '${nameDB}'
                    ORDER BY table_rows DESC
                `
            try {
                // await connection.execute(`USE ${nameDB}`)
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
                    errCode: -2,
                    message: e.message
                })
            }

        } catch (e) {
            resolve({
                errCode: -1,
                status: 'fail',
                message: e.message
            })
        } finally {
            await connection.end();
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

    // compare
    autoCompareTable,
    compareDescribe,
    compareCountRecords,
    compareGroupRecords,

    createConnection,
    countRecordTablesSchema
}

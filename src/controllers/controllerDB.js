import { serviceDB } from "../Service/servicesDB"
import mysql from 'mysql2/promise';

const testConnection = async (req, res) => {
    try {
        const { host, user, password } = req.query;
        if (host && user && password) {
            const config = {
                host: host,
                user: user,
                password: password
            };

            // Tạo kết nối và kiểm tra kết nối
            const connection = await mysql.createConnection(config);

            // Kiểm tra kết nối
            try {
                await connection.query('SELECT 1'); // Thực hiện truy vấn đơn giản để kiểm tra kết nối
                await connection.end(); // Đóng kết nối

                return res.status(200).json({
                    errCode: 0,
                    message: 'Connected'
                });
            } catch (err) {
                console.log(err);
                await connection.end(); // Đóng kết nối nếu có lỗi
                return res.status(200).json({
                    errCode: -1,
                    message: 'Error connecting'
                });
            }
        } else {
            return res.status(200).json({
                errCode: -1,
                message: 'Missing input'
            });
        }
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message: error.message
        });
    }
};

const createConnection = async (req, res) => {
    try {
        const { host, user, password } = req.query;
        if (!host || !user || !password) {
            return res.status(200).json({
                errCode: -1,
                message: 'Missing input'
            });
        }

        const configDB = {
            host: host,
            user: user,
            password: password
        };

        const response = await serviceDB.createConnection(configDB)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message: error.message
        });
    }
};

const getAllNameDB = (async (req, res) => {
    try {
        const { infoJDBC } = req.body
        // console.log(infoConfig);
        let response = await serviceDB.getAllNameDB(infoJDBC)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message: error.message
        })
    }
})

const getAllNameTBOfDB = (async (req, res) => {
    try {
        const { nameDB, infoJDBC } = req.body
        if (!nameDB || !infoJDBC) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        let response = await serviceDB.getAllNameTBOfDB(nameDB, infoJDBC)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(200).json({
            message: error.message
        })
    }
})

const getDataTB = (async (req, res) => {
    try {
        const { nameDB, nameTB } = req.query
        // console.log("req.query: ", req.query)
        if (!nameDB || !nameTB) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        let response = await serviceDB.getDataTB(req.query)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
})

const getDescribeTB = (async (req, res) => {
    try {
        const { nameDB, nameTB } = req.query
        if (!nameDB || !nameTB) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        let response = await serviceDB.getDescribeTB(req.query)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
})

const getColumnsINT = (async (req, res) => {
    try {
        const { nameDB, nameTB } = req.query
        // console.log("req.query: ", req.query)
        if (!nameDB || !nameTB) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        let response = await serviceDB.getColumnsINT(req.query)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
})

const getCountRecords = (async (req, res) => {
    try {
        const { nameDB, nameTB, infoJDBC } = req.body
        if (!nameDB || !nameTB || !infoJDBC) {
            return res.status(400).json({
                code: -1,
                status: 'ERR',
                message: 'The input is required'
            })
        }
        let response = await serviceDB.getCountRecords(nameDB, nameTB, infoJDBC)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
})

const getTable = (async (req, res) => {
    try {
        const { nameDB, nameTB, infoJDBC, filter } = req.body
        console.log(nameDB, nameTB, infoJDBC, filter);
        // console.log(req.query);
        if (!nameDB || !nameTB || !infoJDBC) {
            return res.status(400).json({
                code: -2,
                status: 'ERR',
                message: 'The input is required'
            })
        }
        let response = await serviceDB.getTable(nameDB, nameTB, infoJDBC, filter)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
})

const groupByColumn = (async (req, res) => {
    try {
        const { nameDB, nameTB, nameColumn } = req.query
        // console.log(req.query);
        if (!nameDB || !nameTB || !nameColumn) {
            return res.status(400).json({
                code: -1,
                status: 'ERR',
                message: 'The input is required'
            })
        }

        let response = await serviceDB.groupByColumn(req.query)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
})

const autoCompareTable = (async (req, res) => {
    try {
        const {
            infoJDBCSource, schemaSource, tableSource,
            infoJDBCSink, schemaSink, tableSink
        } = req.body

        const infoSource = { infoJDBCSource, schemaSource, tableSource }
        const infoSink = { infoJDBCSink, schemaSink, tableSink }

        if (!infoJDBCSource || !schemaSource || !tableSource ||
            !infoJDBCSink || !schemaSink || !tableSink) {
            return res.status(400).json({
                code: -1,
                message: 'Missing input'
            })
        }

        let response = await serviceDB.autoCompareTable(infoSource, infoSink)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
})

const compareDescribe = (async (req, res) => {
    try {
        const {
            infoJDBCSource, schemaSource, tableSource,
            infoJDBCSink, schemaSink, tableSink
        } = req.body

        const infoSource = { infoJDBCSource, schemaSource, tableSource }
        const infoSink = { infoJDBCSink, schemaSink, tableSink }

        if (!infoJDBCSource || !schemaSource || !tableSource ||
            !infoJDBCSink || !schemaSink || !tableSink) {
            return res.status(400).json({
                code: -1,
                message: 'Missing input'
            })
        }

        let response = await serviceDB.compareDescribe(infoSource, infoSink)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
})

const compareCountRecords = (async (req, res) => {
    try {
        const {
            infoJDBCSource, schemaSource, tableSource,
            infoJDBCSink, schemaSink, tableSink
        } = req.body

        const infoSource = { infoJDBCSource, schemaSource, tableSource }
        const infoSink = { infoJDBCSink, schemaSink, tableSink }

        if (!infoJDBCSource || !schemaSource || !tableSource ||
            !infoJDBCSink || !schemaSink || !tableSink) {
            return res.status(400).json({
                code: -1,
                message: 'Missing input'
            })
        }

        let response = await serviceDB.compareCountRecords(infoSource, infoSink)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
})

const compareGroupRecords = (async (req, res) => {
    
    try {
        const {
            infoJDBCSource, schemaSource, tableSource,
            infoJDBCSink, schemaSink, tableSink
        } = req.body

        const infoSource = { infoJDBCSource, schemaSource, tableSource }
        const infoSink = { infoJDBCSink, schemaSink, tableSink }

        if (!infoJDBCSource || !schemaSource || !tableSource ||
            !infoJDBCSink || !schemaSink || !tableSink) {
            return res.status(400).json({
                code: -1,
                message: 'Missing input'
            })
        }

        let response = await serviceDB.compareGroupRecords(infoSource, infoSink)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
})


const countRecordTablesSchema = (async (req, res) => {
    try {
        const { nameDB, infoJDBC } = req.body
        // console.log(req.query);
        if (!nameDB || !infoJDBC) {
            return res.status(400).json({
                code: -1,
                status: 'ERR',
                message: 'The input is required'
            })
        }

        let response = await serviceDB.countRecordTablesSchema(nameDB, infoJDBC)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(400).json({
            errCode: -1,
            message: error.message
        })
    }
})




export const controllerDB = {
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


    testConnection,
    createConnection,
    countRecordTablesSchema
}
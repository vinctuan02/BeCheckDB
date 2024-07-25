import { serviceDB } from "../Service/servicesDB"
import mysql from 'mysql2/promise';

const testConnection = async (req, res) => {
    try {
        const { host, username, password } = req.query;
        if (host && username && password) {
            const config = {
                host: host,
                user: username,
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
        const { host, username, password } = req.query;
        if (!host || !username || !password) {
            return res.status(200).json({
                errCode: -1,
                message: 'Missing input'
            });
        }

        const configDB = {
            host: host,
            user: username,
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
        let response = await serviceDB.getAllNameDB()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(200).json({
            message: error
        })
    }
})

const getAllNameTBOfDB = (async (req, res) => {
    try {
        // console.log();
        const { nameDB } = req.query
        console.log("nameDB: ", nameDB);
        if (!nameDB) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        let response = await serviceDB.getAllNameTBOfDB(req.query)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
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
        const { nameDB, nameTB } = req.query
        if (!nameDB || !nameTB) {
            return res.status(400).json({
                code: -1,
                status: 'ERR',
                message: 'The input is required'
            })
        }
        let response = await serviceDB.getCountRecords(req.query)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
})

const getTable = (async (req, res) => {
    try {
        const { nameDB, nameTB } = req.query
        // console.log(req.query);
        if (!nameDB || !nameTB) {
            return res.status(400).json({
                code: -1,
                status: 'ERR',
                message: 'The input is required'
            })
        }
        let response = await serviceDB.getTable(req.query)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
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
        const { schemaSource, schemaSink, tableSource, tableSink } = req.query
        if (!schemaSource || !schemaSink || !tableSource || !tableSink) {
            return res.status(400).json({
                code: -1,
                status: 'ERR',
                message: 'The input is required'
            })
        }

        let response = await serviceDB.autoCompareTable(req.query)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
})


const countRecordTablesSchema = (async (req, res) => {
    try {
        const { nameDB } = req.query
        // console.log(req.query);
        if (!nameDB) {
            return res.status(400).json({
                code: -1,
                status: 'ERR',
                message: 'The input is required'
            })
        }

        let response = await serviceDB.countRecordTablesSchema(req.query)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
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

    autoCompareTable,
    testConnection,
    createConnection,
    countRecordTablesSchema
}
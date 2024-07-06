import { serviceDB } from "../Service/servicesDB"

const getAllNameDB = (async (req, res) => {
    try {
        let response = await serviceDB.getAllNameDB()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
})

const getAllNameTBOfDB = (async (req, res) => {
    try {
        const { nameDB } = req.query
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
        console.log("req.query: ", req.query)
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
        console.log("req.query: ", req.query)
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

export const controllerDB = {
    getAllNameDB,
    getAllNameTBOfDB,
    getDataTB,
    getDescribeTB,
    getColumnsINT,
    getCountRecords
}
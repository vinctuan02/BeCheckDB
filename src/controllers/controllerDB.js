import { serviceDB } from "../Service/servicesDB"

const compareTable = (async (req, res) => {
    let response = await serviceDB.compareTable(req.body)
    // console.log("req.body: ", req.body)
    return res.status(200).json(response)
})

const getAllNameDB = (async (req, res) => {
    try {
        let response = await serviceDB.getAllNameDB()
        // console.log("req.body: ", req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }

})

const getAllNameTableOfDB = (async (req, res) => {
    // console.log("get table of db")
    try {
        const { nameDB } = req.body
        if (!nameDB) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        let response = await serviceDB.getAllNameTableOfDB(req.body)
        // console.log("req.body: ", req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }

})

const getATable = (async (req, res) => {
    try {
        const { nameDB, nameTable } = req.body
        if (!nameDB || !nameTable) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        let response = await serviceDB.getATable(req.body)
        // console.log("req.body: ", req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
})

const getInforATable = (async (req, res) => {
    try {
        const { nameDB, nameTable } = req.body
        if (!nameDB || !nameTable) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        let response = await serviceDB.getInforATable(req.body)
        // console.log("req.body: ", req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
})

export const controllerDB = {
    // getATable,
    compareTable,

    getAllNameDB,
    getAllNameTableOfDB,
    getATable,
    getInforATable
}
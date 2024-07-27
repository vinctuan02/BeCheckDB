import { serviceReport } from "../Service/serviceReport"

const getReports = (async (req, res) => {
    try {
        let { keySearch = '' } = req.query
        const input = { keySearch }
        let response = await serviceReport.getReports(input)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
})

const getReport = (async (req, res) => {
    try {
        const { report_id } = req.params
        // console.log(+report_id);
        if (!report_id) {
            return res.status(200).json({
                message: "Missing input"
            })
        }
        let response = await serviceReport.getReport(+report_id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
})


const getReportByReportName = (async (req, res) => {
    try {
        const { reportName } = req.params
        if (!reportName) {
            return res.status(200).json({
                message: "Missing input"
            })
        }
        let response = await serviceReport.getReportByReportName(reportName)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
})

const createReport = (async (req, res) => {
    try {
        const { reportName, fileName, status } = req.body
        if (!reportName || !fileName || !status) {
            return res.status(200).json({
                message: "Missing input"
            })
        }

        const report = { reportName, fileName, status }

        let response = await serviceReport.createReport(report)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
})

const updateReport = (async (req, res) => {
    try {
        const { report_id } = req.params
        const { reportName, fileName, status } = req.body
        if (!reportName || !fileName || !status) {
            return res.status(200).json({
                message: "Missing input"
            })
        }

        const report = { report_id: +report_id, reportName, fileName, status }
        let response = await serviceReport.updateReport(report)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
})

const deleteReport = (async (req, res) => {
    try {
        const { report_id } = req.params
        if (!report_id) {
            return res.status(200).json({
                message: "Missing input"
            })
        }
        let response = await serviceReport.deleteReport(+report_id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
})


const getReportDetails = (async (req, res) => {
    try {
        // let { keySearch = '' } = req.query
        // const input = { keySearch }
        let response = await serviceReport.getReportDetails()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
})


const getDetailBy_report_id = (async (req, res) => {
    try {
        const { report_id } = req.params
        // console.log(+report_id);
        if (!report_id) {
            return res.status(200).json({
                message: "Missing input"
            })
        }
        let response = await serviceReport.getDetailBy_report_id(+report_id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
})


// const getReportByReportName = (async (req, res) => {
//     try {
//         const { reportName } = req.params
//         if (!reportName) {
//             return res.status(200).json({
//                 message: "Missing input"
//             })
//         }
//         let response = await serviceReport.getReportByReportName(reportName)
//         return res.status(200).json(response)
//     } catch (error) {
//         return res.status(404).json({
//             message: error
//         })
//     }
// })

const createReportDetails = (async (req, res) => {
    try {
        const { report_id, schemaName, dataSourceName, dataSinkName } = req.body
        if (!report_id || !schemaName || !dataSourceName || !dataSinkName) {
            return res.status(200).json({
                message: "Missing input"
            })
        }

        const reportDetails = { report_id, schemaName, dataSourceName, dataSinkName }

        let response = await serviceReport.createReportDetails(reportDetails)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
})

const updateReportDetails = (async (req, res) => {
    try {
        const { report_id } = req.params
        const { reportName, fileName, status } = req.body
        if (!reportName || !fileName || !status) {
            return res.status(200).json({
                message: "Missing input"
            })
        }

        const report = { report_id: +report_id, reportName, fileName, status }
        let response = await serviceReport.updateReport(report)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
})

const deleteReportDetails = (async (req, res) => {
    try {
        const { report_id } = req.params
        if (!report_id) {
            return res.status(200).json({
                message: "Missing input"
            })
        }
        let response = await serviceReport.deleteReport(+report_id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
})

const bulkCreateReportDetails = (async (req, res) => {
    try {
        const arrayReportDetails = req.body
        if (!arrayReportDetails) {
            return res.status(200).json({
                message: "Missing input"
            })
        }

        let response = await serviceReport.bulkCreateReportDetails(arrayReportDetails)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
})

const getJDBCConnections = (async (req, res) => {
    try {
        let { id } = req.params
        // const input = { keySearch }
        if (!id) {
            return res.status(200).json({
                errCode: -1,
                message: 'Missing input'
            })
        }
        let response = await serviceReport.getJDBCConnections(id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
})

const getAllJDBCConnections = (async (req, res) => {
    try {
        // let { keySearch = '' } = req.query
        // const input = { keySearch }
        let response = await serviceReport.getAllJDBCConnections()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
})


const createJDBCConnections = (async (req, res) => {
    try {
        const { host, user, password } = req.body
        if (!host || !user || !password) {
            return res.status(200).json({
                message: "Missing input"
            })
        }

        const infoJDBC_Connections = { host, username, password }

        let response = await serviceReport.createJDBCConnections(infoJDBC_Connections)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            errCode: -1,
            message: error.message
        })
    }
})

const bulkCreateJDBCConnections = (async (req, res) => {
    try {
        const arrInfoJDBC_Connections = req.body
        if (!arrInfoJDBC_Connections || arrInfoJDBC_Connections.length <= 0) {
            return res.status(200).json({
                message: "Missing input"
            })
        }

        let response = await serviceReport.bulkCreateJDBCConnections(arrInfoJDBC_Connections)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            errCode: -1,
            message: error.message
        })
    }
})



export const controllerReport = {
    getReports,
    getReport,
    getReportByReportName,
    createReport,
    updateReport,
    deleteReport,

    getReportDetails,
    createReportDetails,
    getDetailBy_report_id,
    bulkCreateReportDetails,

    getJDBCConnections,
    getAllJDBCConnections,
    createJDBCConnections,
    bulkCreateJDBCConnections
}
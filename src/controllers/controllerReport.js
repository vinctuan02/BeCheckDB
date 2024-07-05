import { serviceReport } from "../service/serviceReport"

const getReports = (async (req, res) => {
    try {
        let response = await serviceReport.getReports()
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


export const controllerReport = {
    getReports,
    getReport,
    getReportByReportName,
    createReport,
    updateReport,
    deleteReport
}
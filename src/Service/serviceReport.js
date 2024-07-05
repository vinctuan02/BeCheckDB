
import Reports from '../models/Report';

let getReports = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const reports = await Reports.findAll();
            resolve({
                code: 0,
                status: 'Ok',
                message: 'Get reports oke',
                data: reports
            })
        } catch (e) {
            reject(e)
        }
    })
}

let getReport = (report_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const reportById = await Reports.findOne({
                where: { report_id }
            });

            if (!reportById) {
                resolve({
                    code: -1,
                    status: 'Ok',
                    message: 'Not found report',
                })
            }

            resolve({
                code: 0,
                status: 'Ok',
                message: 'Get report oke',
                data: reportById
            })
        } catch (e) {
            reject(e)
        }
    })
}

let getReportByReportName = (reportName) => {
    return new Promise(async (resolve, reject) => {
        try {
            const reportByName = await Reports.findOne({
                where: { reportName }
            });

            if (!reportByName) {
                resolve({
                    code: -1,
                    status: 'Ok',
                    message: 'Not found report',
                    isExist: 'false'
                })
            }

            resolve({
                code: 0,
                status: 'Ok',
                message: 'Get report oke',
                isExist: 'true'
            })
        } catch (e) {
            reject(e)
        }
    })
}

let createReport = (reportInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            const reportByName = await Reports.findOne({
                where: { reportName: reportInput.reportName }
            })

            if (reportByName) {
                resolve({
                    code: -1,
                    status: 'Ok',
                    message: 'Report already exist',
                })
            }

            const newReport = await Reports.create(reportInput);
            resolve({
                code: 0,
                status: 'Ok',
                message: 'Create report oke',
                data: newReport
            })
        } catch (e) {
            reject(e)
        }
    })
}

let updateReport = (reportInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            const reportById = await Reports.findOne({
                where: { report_id: reportInput.report_id }
            })

            if (!reportById) {
                resolve({
                    code: -1,
                    status: 'Ok',
                    message: 'Record not found',
                })
            }

            const reportByName = await Reports.findOne({
                where: { reportName: reportInput.reportName }
            })

            if (reportByName) {
                resolve({
                    code: -1,
                    status: 'Ok',
                    message: 'Report name already exits'
                })
            }

            reportById.reportName = reportInput.reportName
            reportById.fileName = reportInput.fileName
            reportById.status = reportInput.status

            reportById.save()
            resolve({
                code: 0,
                status: 'Ok',
                message: 'Update report oke',
                data: 'reportById'
            })
        } catch (e) {
            reject(e)
        }
    })
}

let deleteReport = (report_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const reportById = await Reports.findOne({
                where: { report_id }
            });

            if (!reportById) {
                resolve({
                    code: -1,
                    status: 'Ok',
                    message: 'Not found report',
                })
            }

            reportById.destroy()

            resolve({
                code: 0,
                status: 'Ok',
                message: 'Delete report oke',
            })
        } catch (e) {
            reject(e)
        }
    })
}

export const serviceReport = {
    getReports,
    getReport,
    getReportByReportName,
    createReport,
    updateReport,
    deleteReport
}
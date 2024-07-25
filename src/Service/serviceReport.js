import { Op } from 'sequelize'
import Report from '../models/Report';
import ReportDetails from '../models/ReportsDetails';
import JDBC_Connections from '../models/JDBC_Connections';

let getReports = (input) => {
    return new Promise(async (resolve, reject) => {
        let { keySearch = '' } = input
        try {
            const reports = await Report.findAll({
                where: {
                    reportName: {
                        [Op.like]: `%${keySearch}%`
                    },
                    // fileName: {
                    //     [Op.like]: `%${keySearch}%`
                    // },
                }
            });

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
            const reportById = await Report.findOne({
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
            const reportByName = await Report.findOne({
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
            const reportByName = await Report.findOne({
                where: { reportName: reportInput.reportName }
            })

            if (reportByName) {
                resolve({
                    code: -1,
                    status: 'Ok',
                    message: 'Report already exist',
                })
            }

            const newReport = await Report.create(reportInput);
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
            const reportById = await Report.findOne({
                where: { report_id: reportInput.report_id }
            })

            if (!reportById) {
                resolve({
                    code: -1,
                    status: 'Ok',
                    message: 'Record not found',
                })
            }

            const reportByName = await Report.findOne({
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
            const reportById = await Report.findOne({
                where: { report_id }
            });

            // console.log(reportById);

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

let getReportDetails = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const all_Report_Details = await ReportDetails.findAll();

            resolve({
                code: 0,
                status: 'Ok',
                message: 'Get report details oke',
                data: all_Report_Details
            })
        } catch (e) {
            reject(e)
        }
    })
}

let createReportDetails = (reportDetailsInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            const newReportDetails = await ReportDetails.create(reportDetailsInput);
            resolve({
                code: 0,
                status: 'Ok',
                message: 'Create report details oke',
                data: newReportDetails
            })
        } catch (e) {
            reject(e)
        }
    })
}

let getDetailBy_report_id = (report_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const reportDetailsById = await ReportDetails.findAll({
                where: { report_id }
            });

            if (!reportDetailsById) {
                resolve({
                    code: -1,
                    status: 'Ok',
                    message: 'Not found report',
                })
            }

            resolve({
                code: 0,
                status: 'Ok',
                message: 'Get report details by id oke',
                data: reportDetailsById
            })
        } catch (e) {
            reject(e)
        }
    })
}

let bulkCreateReportDetails = (arrayReportDetails) => {
    return new Promise(async (resolve, reject) => {
        try {
            const arrNewReportDetails = await ReportDetails.bulkCreate(arrayReportDetails);
            resolve({
                code: 0,
                status: 'Ok',
                message: 'Bulk Create report details oke',
                data: 'arrNewReportDetails'
            })
        } catch (e) {
            reject(e)
        }
    })
}

let getAllJDBCConnections = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allJDBCsConnections = await JDBC_Connections.findAll();

            resolve({
                code: 0,
                status: 'Ok',
                message: 'Get report details oke',
                data: allJDBCsConnections
            })
        } catch (e) {
            reject(e)
        }
    })
}

let createJDBCConnections = (infoJDBC_Connections) => {
    return new Promise(async (resolve, reject) => {
        try {
            const newJDBCConnections = await JDBC_Connections.create(infoJDBC_Connections);
            resolve({
                code: 0,
                status: 'Ok',
                message: 'Create report details oke',
                data: newJDBCConnections
            })
        } catch (e) {
            reject({
                code: -1,
                message: e.message
            })
        }
    })
}

let bulkCreateJDBCConnections = (arrInfoJDBC_Connections) => {
    return new Promise(async (resolve, reject) => {
        try {
            const newArrInfoJDBC_Connections = await JDBC_Connections.bulkCreate(arrInfoJDBC_Connections);
            resolve({
                code: 0,
                status: 'Ok',
                message: 'Bulk Create JDBCs Connections oke',
                data: newArrInfoJDBC_Connections
            })
        } catch (e) {
            reject({
                errCode: -1,
                message: e.message
            })
        }
    })
}



export const serviceReport = {
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

    getAllJDBCConnections,
    createJDBCConnections,
    bulkCreateJDBCConnections
}
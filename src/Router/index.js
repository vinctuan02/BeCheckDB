import express from "express"
import { controllerDB } from "../controllers/controllerDB"
import { controllerReport } from '../controllers/controllerReport'


let router = express.Router()

let initWebRouter = (app) => {


    router.get('/', (req, res) => {
        res.send("Call Api oke")
    })
    router.get('/hello-world', (req, res) => {
        res.send("hello world")
    })

    router.post('/get-all-name-db', controllerDB.getAllNameDB)
    router.post('/get-all-name-tb-of-db', controllerDB.getAllNameTBOfDB)
    router.get('/get-data-tb', controllerDB.getDataTB)
    router.get('/get-describe-tb', controllerDB.getDescribeTB)
    router.get('/get-columns-int-tb', controllerDB.getColumnsINT)
    router.post('/get-count-record-tb', controllerDB.getCountRecords)

    // router report
    router.get('/report/get-reports', controllerReport.getReports)
    router.get('/report/get-report-by-report-id/:report_id', controllerReport.getReport)
    router.get('/report/get-report-by-report-name/:reportName', controllerReport.getReportByReportName)
    router.get('/report/get-report-by-report-name/', controllerReport.getReportByReportName)
    router.post('/report/create-report', controllerReport.createReport)
    router.put('/report/update-report/:report_id', controllerReport.updateReport)
    router.delete('/report/delete-report/:report_id', controllerReport.deleteReport)

    //router report details
    router.get('/report-details/get-details', controllerReport.getReportDetails)
    // router.get('/report-details/get-details-by-id/:detail_id', controllerReport.getAReportDetails)
    router.get('/report-details/get-details-by-report_id/:report_id', controllerReport.getDetailBy_report_id)
    // router.get('/report-details/get-details-by-report-name/', controllerReport.getReportByReportName)
    router.post('/report-details/create-details', controllerReport.createReportDetails)
    router.post('/report-details/bulk-create-details', controllerReport.bulkCreateReportDetails)
    // router.put('/report-details/update-report-detail/:detail_id', controllerReport.updateReportDetails)
    // router.delete('/report-details/delete-report/:report_id', controllerReport.deleteReportDetails)


    // jdbc
    router.get('/jdbc/get-jdbc-connections/:id', controllerReport.getJDBCConnections)
    router.get('/jdbc/get-all-jdbcs-connections', controllerReport.getAllJDBCConnections)
    router.post('/jdbc/create-jdbc-connections', controllerReport.createJDBCConnections)
    router.post('/jdbc/bulk-create-jdbc-connections', controllerReport.bulkCreateJDBCConnections)

    // data
    router.post('/get-table', controllerDB.getTable)
    router.get('/group-by-column', controllerDB.groupByColumn)

    // compare
    router.post('/auto-compare', controllerDB.autoCompareTable)
    router.post('/compare-describe', controllerDB.compareDescribe)
    router.post('/compare-count-records', controllerDB.compareCountRecords)
    router.post('/compare-group-records', controllerDB.compareGroupRecords)

    //connection
    router.get('/test-connection', controllerDB.testConnection)
    router.get('/create-connection', controllerDB.createConnection)

    // to create report
    router.post('/count-record-tables', controllerDB.countRecordTablesSchema)

    return app.use('/', router)
}

export default initWebRouter;
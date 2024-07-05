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

    router.get('/get-all-name-db', controllerDB.getAllNameDB)
    router.get('/get-all-name-tb-of-db', controllerDB.getAllNameTBOfDB)
    router.get('/get-data-tb', controllerDB.getDataTB)
    router.get('/get-describe-tb', controllerDB.getDescribeTB)
    router.get('/get-columns-int-tb', controllerDB.getColumnsINT)
    router.get('/get-count-record-tb', controllerDB.getCountRecords)

    // router report
    router.get('/report/get-reports', controllerReport.getReports)
    router.get('/report/get-report-by-report-id/:report_id', controllerReport.getReport)
    router.get('/report/get-report-by-report-name/:reportName', controllerReport.getReportByReportName)
    router.get('/report/get-report-by-report-name/', controllerReport.getReportByReportName)
    router.post('/report/create-report', controllerReport.createReport)
    router.put('/report/update-report/:report_id', controllerReport.updateReport)
    router.delete('/report/delete-report/:report_id', controllerReport.deleteReport)


    return app.use('/', router)
}

export default initWebRouter;
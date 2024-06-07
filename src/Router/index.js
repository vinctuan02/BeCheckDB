import express from "express"
import { controllerDB } from "../controllers/controllerDB"


let router = express.Router()

let initWebRouter = (app) => {


    router.get('/', (req, res) => {
        res.send("Call Api oke")
    })
    router.get('/hello-world', (req, res) => {
        res.send("hello world")
    })

    router.post('/compare-table', controllerDB.compareTable)

    router.get('/get-all-name-db', controllerDB.getAllNameDB)
    router.post('/get-all-name-table-of-db', controllerDB.getAllNameTableOfDB)
    router.post('/get-a-table', controllerDB.getATable)
    router.post('/get-infor-a-table', controllerDB.getInforATable)

    return app.use('/', router)
}

export default initWebRouter;
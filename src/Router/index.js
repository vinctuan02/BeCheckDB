import express from "express"
import { controllerDB } from "../controllers/controllerDB"


let router = express.Router()

let initWebRouter = (app) => {


    router.get('/', (req, res) => {
        // console.log("call api")
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

    return app.use('/', router)
}

export default initWebRouter;
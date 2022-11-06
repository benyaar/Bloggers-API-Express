import  express, {Request, Response} from 'express'
import {videosRouter} from "./router/videosRouter";
import bodyParser from "body-parser";
import cors from "cors"
import {runDB} from "./repository/db";
import {deleteDataRouter} from "./router/deleteDataRouter";


const app = express()
const port = 3001 || process.env.PORT

app.use(bodyParser.json())
app.use(cors())
app.use("/videos", videosRouter)
app.use("/testing", deleteDataRouter)

const startApp = async ()=>{
    await runDB()
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}
startApp()
import  express, {Request, Response} from 'express'
import {videosRepository} from "./router/videosRepository";
import bodyParser from "body-parser";
import cors from "cors"


const app = express()
const port = 3001 || process.env.PORT

app.use(bodyParser())
app.use(cors())

app.use("/videos", videosRepository)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

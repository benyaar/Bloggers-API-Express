import  express  from 'express'
import {videosRouter} from "./router/videosRouter";
import bodyParser from "body-parser";
import cors from "cors"
import {runDB} from "./repository/db";
import {deleteDataRouter} from "./router/deleteDataRouter";
import {bloggersRouter} from "./router/bloggersRouter";
import {postsRouter} from "./router/postsRouter";
import {usersRouter} from "./router/usersRouter";


const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(cors())
app.use("/videos", videosRouter)
app.use("/testing", deleteDataRouter)
app.use("/blogs", bloggersRouter)
app.use("/posts", postsRouter)
app.use("/users", usersRouter)

const startApp = async ()=>{
    await runDB()
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}
startApp()
import  express  from 'express'
import {videosRouter} from "./router/videosRouter";
import bodyParser from "body-parser";
import cors from "cors"
import {runDB} from "./repository/db";
import {deleteDataRouter} from "./router/deleteDataRouter";
import {bloggersRouter} from "./router/bloggersRouter";
import {postsRouter} from "./router/postsRouter";
import {usersRouter} from "./router/usersRouter";
import {authRouter} from "./router/authRouter";
import {commentsRouter} from "./router/commentsRouter";
import cookieParser from "cookie-parser";
import {userSessionsRouter} from "./router/userSessionsRouter";


const app = express()
const port = process.env.PORT || 3000

const corsOptions ={
    origin:'http://localhost:3000',
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(bodyParser.json())

app.use(cookieParser())
app.use("/api/videos", videosRouter)
app.use("/api/testing", deleteDataRouter)
app.use("/api/blogs", bloggersRouter)
app.use("/api/posts", postsRouter)
app.use("/api/users", usersRouter)
app.use("/api/auth", authRouter)
app.use("/api/comments", commentsRouter)
app.use("/api/security", userSessionsRouter)
app.set('trust proxy', true)

const startApp = async ()=>{
    await runDB()
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}
startApp()
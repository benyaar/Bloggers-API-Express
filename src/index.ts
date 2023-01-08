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

// const corsOptions ={
//     origin:'http://localhost:3000',
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }
// app.use(cors(corsOptions));
app.use(bodyParser.json())

app.use(cookieParser())
app.use("/videos", videosRouter)
app.use("/testing", deleteDataRouter)
app.use("/blogs", bloggersRouter)
app.use("/posts", postsRouter)
app.use("/users", usersRouter)
app.use("/auth", authRouter)
app.use("/comments", commentsRouter)
app.use("/security", userSessionsRouter)
app.set('trust proxy', true)

const startApp = async ()=>{
    await runDB()
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}
startApp()

import {bloggersCollection, postsCollection, videosCollection} from "./db";

export const deleteDataRepository = {
    async deleteData(){
       await videosCollection.deleteMany({})
        await bloggersCollection.deleteMany({})
         await postsCollection.deleteMany({})
        return true
    }
}
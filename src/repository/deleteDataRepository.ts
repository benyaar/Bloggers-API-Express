
import {
    attemptsCollection,
    bloggersCollection,
    commentsCollection,
    postsCollection, tokenBlackListCollection,
    usersCollection,
    videosCollection
} from "./db";

export const deleteDataRepository = {
    async deleteData(){
       await videosCollection.deleteMany({})
        await bloggersCollection.deleteMany({})
         await postsCollection.deleteMany({})
        await usersCollection.deleteMany({})
        await commentsCollection.deleteMany({})
        await attemptsCollection.deleteMany({})
        await tokenBlackListCollection.deleteMany({})
        return true
    }
}
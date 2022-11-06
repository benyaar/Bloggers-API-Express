import {videosCollection} from "../repository/db";

export const queryRepository = {
    async getAllVideos () {
        return videosCollection.find({}).toArray()
    },
    async getVideoById(id: number) {
        return videosCollection.findOne({id})
    }
}
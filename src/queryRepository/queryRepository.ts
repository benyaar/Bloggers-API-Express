import {videosCollection} from "../repository/db";

export const queryRepository = {
    async getAllVideos () {
        return videosCollection.find({}, {projection: {_id:0}}).toArray()
    },
    async getVideoById(id: number) {
        return videosCollection.findOne({id})
    }
}
import {VideoDBType} from "../types/types";
import {videosRepository} from "../repository/videosRepository";
import {ObjectId} from "mongodb";

export const videosService = {
    async createNewVideo(title: string, author: string, availableResolutions: []){

        const newVideo:VideoDBType = {
            _id: new ObjectId(),
            id: +new Date(),
            title: title,
            author: author,
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: new Date(),
            publicationDate: new Date(Date.now() + (3600 * 1000  * 24)),
            availableResolutions: availableResolutions
        }
      return await videosRepository.createNewVideo(newVideo)
    },
    async updateVideo(videoId: number, title:string, author:string,
                      availableResolutions: [], canBeDownloaded: boolean, minAgeRestriction:number, publicationDate: Date){
        return videosRepository.updateVideo(videoId, title, author, availableResolutions, canBeDownloaded, minAgeRestriction, publicationDate)
    },
    async deleteVideo(id: number){
        return videosRepository.deleteVideo(id)
    }
}
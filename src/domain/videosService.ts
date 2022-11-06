import {VideoDBType} from "../types/types";
import {videosRepository} from "../repository/videosRepository";
import {ObjectId} from "mongodb";

export const videosService = {
    async createNewVideo(title: string, author: string, availableResolutions: []){
        const newVideo:VideoDBType = {
            id: +ObjectId,
            title: title,
            author: author,
            canBeDownloaded: true,
            minAgeRestriction: null,
            createdAt: new Date(),
            publicationDate: new Date(),
            availableResolutions: availableResolutions
        }
       await videosRepository.createNewVideo(newVideo)
        return newVideo
    },
    async updateVideo(videoId: number, title:string, author:string,
                      availableResolutions: [], canBeDownloaded: boolean, minAgeRestriction:number){
        return videosRepository.updateVideo(videoId, title, author, availableResolutions, canBeDownloaded, minAgeRestriction)
    },
    async deleteVideo(id: number){
        return videosRepository.deleteVideo(id)
    }
}
import {videosRepository} from "./videosRepository";
import {videosCollection} from "./db";

export const deleteDataRepository = {
    async deleteData(){
        const deleteDataVideo = await videosCollection.deleteMany({})
        return deleteDataVideo.deletedCount === 1
    }
}
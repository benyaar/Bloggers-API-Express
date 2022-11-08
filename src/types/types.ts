import {ObjectId} from "mongodb";

export type VideoDBType = {
    "id": number,
    "title": string,
    "author": string,
    "canBeDownloaded": boolean,
    "minAgeRestriction": null | number,
    "createdAt": Date,
    "publicationDate": Date,
    "availableResolutions": [],
    _id: ObjectId
}

export type BlogDBType = {
    "id": number,
    "name": string,
    "youtubeUrl": string
}




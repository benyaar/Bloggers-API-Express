import {ObjectId, WithoutId} from "mongodb";

export type VideoDBType = {
    id: number,
    title: string,
    author: string,
    canBeDownloaded: boolean,
    minAgeRestriction: null | number,
    createdAt: Date,
    publicationDate: Date,
    availableResolutions: [],
    _id: ObjectId
}


export type BlogDBType = {
    _id: ObjectId,
    id: string,
    name: string,
    youtubeUrl: string,
    createdAt: Date,
}

export type BlogViewModelType = WithoutId<BlogDBType>

export type PostDBType = {
    _id: ObjectId,
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: Date,
}

export type PostViewModelType = WithoutId<PostDBType>

export type PaginationItemsType =  BlogViewModelType[] | PostViewModelType[]

export type PaginationType = {
    pagesCount: number
    page: number,
    pageSize: number,
    totalCount: number,
    items: PaginationItemsType
}

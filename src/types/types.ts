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
    description: string,
    websiteUrl: string
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

export type PaginationType = {
    pagesCount: number
    page: number,
    pageSize: number,
    totalCount: number,
    items: PaginationItemsType
}

export type PaginationItemsType =  BlogViewModelType[] | PostViewModelType[] | UserViewModalType[] | CommentViewModalType[]

export type UserDBType = {
    _id: ObjectId,
    id: string,
    login: string,
    email: string,
    createdAt: Date,
    passwordHash: string
    emailConfirmation: {
        confirmationCode: string,
        expirationDate: Date,
        isConfirmed: boolean
    }
}
export type UserViewModalType = {
    id: string,
    login: string,
    email: string,
    createdAt: Date,
}

export type CommentDBModalType = {
    _id: ObjectId,
    id: string,
    content: string,
    userId: string,
    userLogin: string,
    createdAt: Date,
    postId: string
}
export type CommentViewModalType = {
    id: string,
    content: string,
    userId: string,
    userLogin: string,
    createdAt: Date
}

export type UserAboutInfoType = {
    email: string,
    login: string,
    userId: string
}

export type AttemptsType = {
    userIP: string,
    url: string,
    time: Date
}

export type TokenType = {
    refreshToken: string
}
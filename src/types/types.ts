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


// export type BlogDBType = {
//     _id: ObjectId,
//     id: string,
//     name: string,
//     description: string,
//     websiteUrl: string
//     createdAt: Date,
// }

export class BlogDBType {
    constructor(
        public _id: ObjectId,
        public id: string,
        public name: string,
        public description: string,
        public websiteUrl: string,
        public  createdAt: Date,
    ) {
    }
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
    extendedLikesInfo: {
        likesCount: number,
        dislikesCount: number,
        myStatus: string,
        newestLikes: []
    }
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
    postId: string,
    likesInfo: {
        likesCount: number,
        dislikesCount: number,
        myStatus: string
    },
}

export type CommentViewModalType = {
    id: string,
    content: string,
    userId: string,
    userLogin: string,
    createdAt: Date,
    likesInfo: {
        likesCount: number,
        dislikesCount: number,
        myStatus: string
    },
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

export type UserSessionsType = {
    ip: string,
    title: string,
    lastActiveDate: number,
    deviceId: string,
    userId: string,
}

export type TokenPairType = {
    accessToken: string,
    refreshToken: string
}

export type RecoveryCodeType = {
    email: string,
    recoveryCode: string
}

export type LikeStatus = {
    parentId: string,
    userId:string,
    login: string
    likeStatus: string,
    createdAt: Date,

}



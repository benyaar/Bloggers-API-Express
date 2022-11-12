import {PaginationItemsType, PaginationType} from "../types/types";


export const paginationResult = (pageNumber: number, pageSize: number, itemsCount: number, items: PaginationItemsType): PaginationType => {
    const pagesCount = Math.ceil(itemsCount/pageSize)
    return {
        pagesCount,
        page: pageNumber,
        pageSize,
        totalCount: itemsCount,
        items
    }
}
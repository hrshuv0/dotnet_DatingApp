export interface Pagination {
    currentPage: number;
    itmsPerPage: number;
    totalItems: number;
    totalPages: number;
}

export class PaginatedResult<T>{
    result!: T;
    pagination!: Pagination;
}
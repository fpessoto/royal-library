import internal from "stream"

export interface IBookType {
    id: number
    name: string
  }

  export interface ICategory {
    id: number
    name: string
  }

  export interface IBook {
    id: number
    title: string
    category:string
    bookType: string
    authorFirstName: string
    authorLastName: string
    isbn: string
    totalCopies: number
    copiesInUse: number
  }

  export interface IBookFilter{
    categoryId?: number
    bookTypeId?: number
    isbn?: string
    authorFirstName?: string
    authorLastName?: string
  }

  export interface IPageResult<T> {
    pageIndex: number
    pageSize: number
    totalCount: number
    totalPages: number
    items: T,
    hasPreviousPage: boolean
    hasNextPage: boolean
  }
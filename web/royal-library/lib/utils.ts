import ms from "ms";
import { IBook, IBookFilter, IBookType, ICategory, IPageResult } from "types";
import { API_ENDPOINT } from "./constants";

export async function getBookTypes(): Promise<IBookType[]> {
  const res = await fetch(`${API_ENDPOINT}/BookType`);
  const bookTypes: IBookType[] = await res.json();
  return bookTypes;
}

export async function getCategories(): Promise<ICategory[]> {
  const res = await fetch(`${API_ENDPOINT}/Category`);
  const bookTypes: ICategory[] = await res.json();
  return bookTypes;
}

export async function getBooks({
  categoryId,
  bookTypeId,
  isbn,
  authorFirstName,
  authorLastName,
}: IBookFilter): Promise<IBook[]> {
  const searchParams = new URLSearchParams();

  if (categoryId) searchParams.append("categoryId", `${categoryId}`);
  if (bookTypeId) searchParams.append("bookTypeId", `${bookTypeId}`);
  if (isbn) searchParams.append("isbn", `${isbn}`);
  if (authorFirstName)
    searchParams.append("authorFirstName", `${authorFirstName}`);
  if (authorLastName)
    searchParams.append("authorLastName", `${authorLastName}`);

  const res = await fetch(`${API_ENDPOINT}/Book/?${searchParams}`);

  const bookTypes: IBook[] = await res.json();
  return bookTypes;
}

export async function getBooksWithPagination(
  {
    categoryId,
    bookTypeId,
    isbn,
    authorFirstName,
    authorLastName,
  }: IBookFilter,
  page: number,
  size: number,
): Promise<IPageResult<IBook[]>> {
  const searchParams = new URLSearchParams([
    ["page", `${page}`],
    ["size", `${size}`],
  ]);

  if (categoryId) searchParams.append("categoryId", `${categoryId}`);
  if (bookTypeId) searchParams.append("bookTypeId", `${bookTypeId}`);
  if (isbn) searchParams.append("isbn", `${isbn}`);
  if (authorFirstName)
    searchParams.append("authorFirstName", `${authorFirstName}`);
  if (authorLastName)
    searchParams.append("authorLastName", `${authorLastName}`);

  const res = await fetch(
    `${API_ENDPOINT}/Book/WithPagination/?${searchParams}`,
  );

  const response: IPageResult<IBook[]> = await res.json();
  return response;
}

export const timeAgo = (timestamp: Date, timeOnly?: boolean): string => {
  if (!timestamp) return "never";
  return `${ms(Date.now() - new Date(timestamp).getTime())}${
    timeOnly ? "" : " ago"
  }`;
};

export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<JSON> {
  const res = await fetch(input, init);

  if (!res.ok) {
    const json = await res.json();
    if (json.error) {
      const error = new Error(json.error) as Error & {
        status: number;
      };
      error.status = res.status;
      throw error;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }

  return res.json();
}

export function nFormatter(num: number, digits?: number) {
  if (!num) return "0";
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "K" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits || 1).replace(rx, "$1") + item.symbol
    : "0";
}

export function capitalize(str: string) {
  if (!str || typeof str !== "string") return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const truncate = (str: string, length: number) => {
  if (!str || str.length <= length) return str;
  return `${str.slice(0, length)}...`;
};

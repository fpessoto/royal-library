import BooksTable from "@/components/home/books-table";
import Layout from "@/components/layout";
import Input from "@/components/shared/input";
import Label from "@/components/shared/label";
import Select from "@/components/shared/select";
import {
  getBooks,
  getBooksWithPagination,
  getBookTypes,
  getCategories,
} from "@/lib/utils";
import { motion } from "framer-motion";
import { InferGetStaticPropsType } from "next";
import { useState } from "react";
import { IBook, IBookFilter, IBookType, ICategory } from "types";
import ReactPaginate from "react-paginate";

const PAGE_SIZE = 5;

export default function Home({
  bookTypes,
  books,
  categories,
  totalPages,
}: InferGetStaticPropsType<typeof getServerSideProps>) {
  const [bookList, setBookList] = useState(books);
  const [inputTotalPages, setTotalPages] = useState(totalPages);

  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedType, setSelectedType] = useState(0);
  const [isbn, setIsbn] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  async function handleSearch() {
    await getBooks(currentPage);
  }

  async function getBooks(actualPage: number) {
    const filters: IBookFilter = {
      categoryId: selectedCategory,
      bookTypeId: selectedType,
      isbn: isbn,
      authorFirstName: firstName,
      authorLastName: lastName,
    };

    const { totalCount, totalPages, items } = await getBooksWithPagination(
      filters,
      actualPage,
      PAGE_SIZE
    );

    setBookList(items);
    setTotalPages(totalPages);
  }

  async function handleClear() {
    setSelectedCategory(0);
    setSelectedType(0);
    setIsbn(""), setFirstName("");
    setLastName("");
    setCurrentPage(1);

    const { items, totalPages } = await getBooksWithPagination(
      {},
      currentPage,
      PAGE_SIZE,
    );
    setBookList(items);
    setTotalPages(totalPages);
  }

  const paginate = async ({ selected }: { selected: number }) => {
    const newPage = selected + 1;
    setCurrentPage(newPage);

    await getBooks(newPage );
  };

  return (
    <Layout>
      <motion.h1 className="text-primary mt-0 mb-2 text-5xl font-medium leading-tight">
        Royal Library
      </motion.h1>

      <div className="flex w-full items-start">
        {/* CATEGORY */}
        <div className="m-2 flex-auto justify-center">
          <div className="relative mb-3" data-te-input-wrapper-init>
            <Label htmlFor="category" text="Category" />
            <Select
              list={categories}
              onChangeFunc={setSelectedCategory}
              selected={selectedCategory}
              optionName="name"
            />
          </div>
        </div>

        {/* BOOK TYPE */}
        <div className="m-2 flex-auto justify-center">
          <div className="relative mb-3" data-te-input-wrapper-init>
            <Label htmlFor="bookType" text="Book Type" />
            <Select
              list={bookTypes}
              onChangeFunc={setSelectedType}
              selected={selectedType}
              optionName="name"
            />
          </div>
        </div>

        {/* ISBNS */}
        <div className="m-2 flex-auto justify-center">
          <div className="relative mb-3 w-full" data-te-input-wrapper-init>
            <Label htmlFor="isbn" text="ISBN" />
            <Input
              name="isbn"
              placeholder="ISBN"
              value={isbn}
              onChangeCallback={setIsbn}
            />
          </div>
        </div>
      </div>

      <div className="flex w-full items-start">
        {/* FIRST NAME */}
        <div className="m-2 flex-auto justify-center">
          <Label htmlFor="firstName" text="Author First Name" />
          <div className="relative mb-3 w-full" data-te-input-wrapper-init>
            <Input
              name="firstName"
              placeholder=" Author First Name"
              value={firstName}
              onChangeCallback={setFirstName}
            />
          </div>
        </div>

        {/* LAST NAME */}
        <div className="m-2 flex-auto justify-center">
          <div className="relative mb-3 w-full" data-te-input-wrapper-init>
            <Label htmlFor="lastName" text="Author Last Name" />
            <Input
              name="lastNam"
              placeholder=" Author Last Name"
              value={lastName}
              onChangeCallback={setLastName}
            />
          </div>
        </div>
      </div>

      <div className="flex">
        {/* butons */}
        <div className="m-2 grid flex-auto grid-cols-2 gap-4">
          <button
            type="button"
            className="rounded bg-zinc-900 py-2 px-4 text-slate-50 shadow-[0_4px_9px_-4px_#fbfbfb] hover:bg-zinc-800"
            onClick={handleSearch}
          >
            SEARCH
          </button>

          <button
            type="button"
            className="rounded bg-zinc-100 py-2 px-4 text-neutral-900 hover:bg-zinc-200 "
            onClick={handleClear}
          >
            CLEAR
          </button>
        </div>
      </div>

      <div className="flex w-full flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <BooksTable bookList={bookList} />
            </div>
          </div>
        </div>

        <div className="flex justify-center w-full">
          <ReactPaginate
            onPageChange={paginate}
            pageCount={totalPages}
            previousLabel={"Prev"}
            nextLabel={"Next"}
            containerClassName={"pagination flex"}
            previousLinkClassName={"relative block rounded-full bg-transparent py-1.5 px-3 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-300  dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"}
            nextLinkClassName={"relative block rounded-full bg-transparent py-1.5 px-3 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100  dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"}
            pageLinkClassName={"relative block rounded-full bg-transparent py-1.5 px-3 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100  dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"}
            activeLinkClassName={"relative block rounded-full bg-zinc-300 py-1.5 px-3 text-sm font-medium text-primary-700 transition-all duration-300"}
          />
        </div>
     
      </div>
    </Layout>
  );
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API

  const bookTypes: IBookType[] = await getBookTypes();
  const categories: ICategory[] = await getCategories();

  const response = await getBooksWithPagination({}, 1, PAGE_SIZE);

  const {
    totalCount,
    totalPages,
    items,
  } = response;

  // Pass data to the page via props
  return {
    props: {
      bookTypes,
      categories,
      books: items,
      totalBooks: totalCount,
      totalPages,
    },
  };
}

import BooksTable from "@/components/home/books-table";
import Layout from "@/components/layout";
import Input from "@/components/shared/input";
import Label from "@/components/shared/label";
import Select from "@/components/shared/select";
import { getBooks, getBookTypes, getCategories } from "@/lib/utils";
import { motion } from "framer-motion";
import { InferGetStaticPropsType } from "next";
import { useState } from "react";
import { IBook, IBookFilter, IBookType, ICategory } from "types";

export default function Home({
  bookTypes,
  books,
  categories,
}: InferGetStaticPropsType<typeof getServerSideProps>) {
  const [bookList, setBookList] = useState(books);

  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedType, setSelectedType] = useState(0);
  const [isbn, setIsbn] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 5;
  

  async function handleSearch(data: any) {
    const filters: IBookFilter = {
      categoryId: selectedCategory,
      bookTypeId: selectedType,
      isbn: isbn,
      authorFirstName: firstName,
      authorLastName: lastName,
    };

    console.log(filters);

    const books: IBook[] = await getBooks(filters);
    setBookList(books);
  }

  async function handleClear() {
    setSelectedCategory(0);
    setSelectedType(0);
    setIsbn(""), setFirstName("");
    setLastName("");

    const books: IBook[] = await getBooks({});
    setBookList(books);
  }

  return (
    <Layout>
      <motion.h1 className="text-primary mt-0 mb-2 text-5xl font-medium leading-tight">
        Royal Library
      </motion.h1>

      <div className="flex items-start w-full">
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

      <div className="flex items-start w-full">
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
            className="hover:bg-zinc-800 text-slate-50 rounded bg-zinc-900 py-2 px-4 shadow-[0_4px_9px_-4px_#fbfbfb]"
            onClick={handleSearch}
          >
            SEARCH
          </button>

          <button
            type="button"
            className="hover:bg-zinc-200 text-neutral-900 rounded bg-zinc-100 py-2 px-4 "
            onClick={handleClear}
          >
            CLEAR
          </button>
        </div>
      </div>

      <div className="flex flex-col w-full">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <BooksTable bookList={bookList} />
            </div>
          </div>
        </div>

        {/* pagination */}
        <div className="m-2 flex-auto justify-center">
          <Label htmlFor="page" text="Page" />
          <div className="relative mb-3 w-full" data-te-input-wrapper-init>
            <Input
              name="page"
              placeholder="Set the page"
              value={page.toString()}
              onChangeCallback={setPage}
            />
          </div>
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
  const books: IBook[] = await getBooks({});

  // Pass data to the page via props
  return { props: { bookTypes, categories, books } };
}

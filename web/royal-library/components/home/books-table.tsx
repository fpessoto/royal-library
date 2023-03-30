import { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import Balancer from "react-wrap-balancer";
import { IBook } from "types";

export default function BooksTable({ bookList }: { bookList: IBook[] }) {
  return (
    <table className="min-w-full text-left text-sm font-light">
      <thead className="border-b font-medium dark:border-neutral-500">
        <tr>
          <th scope="col" className="px-6 py-4">
            Book Title
          </th>
          <th scope="col" className="px-6 py-4">
            Authors
          </th>
          <th scope="col" className="px-6 py-4">
            Type  
          </th>
          <th scope="col" className="px-6 py-4">
            ISBN
          </th>
          <th scope="col" className="px-6 py-4">
            Category
          </th>
          <th scope="col" className="px-6 py-4">
            Available Copies
          </th>
        </tr>
      </thead>
      <tbody>
        {bookList?.map((book) => {
          return (
            <tr key={book.id} className="border-b dark:border-neutral-500">
              <td className="whitespace-nowrap px-6 py-4">{book.title}</td>
              <td className="whitespace-nowrap px-6 py-4">
                {book.authorFirstName} {book.authorLastName}
              </td>
              <td className="whitespace-nowrap px-6 py-4">{book.bookType}</td>
              <td className="whitespace-nowrap px-6 py-4">{book.isbn}</td>
              <td className="whitespace-nowrap px-6 py-4">{book.category}</td>
              <td className="whitespace-nowrap px-6 py-4">
                {book.copiesInUse}/{book.totalCopies}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

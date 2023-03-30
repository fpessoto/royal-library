using System;
using Ardalis.Specification;

namespace RoyalLibrary.Core.BooksAggregate.Specifications
{
  public class BooksSpec : Specification<Book>
  {
    public BooksSpec(int? categoryId,
                     int? typeId,
                     string? authorFirstName,
                     string? authorLastName,
                     string? isbn,
                     int? page,
                     int? size)
    {
      Query.Include(t => t.Category)
           .Include(t => t.BookType);

      Query.OrderBy(t => t.Id);

      if (categoryId > 0)
        Query.Where(x => x.CategoryId == categoryId);

      if (typeId > 0)
        Query.Where(x => x.BookTypeId == typeId);

      if (!string.IsNullOrEmpty(authorFirstName))
        Query.Where(x => x.FirstName == authorFirstName);

      if (!string.IsNullOrEmpty(authorLastName))
        Query.Where(x => x.LastName == authorLastName);

      if (!string.IsNullOrEmpty(isbn))
        Query.Where(x => x.Isbn == isbn);
      
      if(page > 0 && size > 0)
        Query.Skip((int)page * (int)size).Take((int)size);
    }
  }
}


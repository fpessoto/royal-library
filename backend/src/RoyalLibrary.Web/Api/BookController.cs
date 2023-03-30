using RoyalLibrary.SharedKernel.Interfaces;
using RoyalLibrary.Web.ApiModels;
using Microsoft.AspNetCore.Mvc;
using RoyalLibrary.Core.BooksAggregate;
using RoyalLibrary.Core.BooksAggregate.Specifications;
using Swashbuckle.AspNetCore.Annotations;

namespace RoyalLibrary.Web.Api;

/// <summary>
/// Book Controllers
/// </summary>
public class BookController : BaseApiController
{
  private readonly IRepository<Book> _repository;

  public BookController(IRepository<Book> repository)
  {
    _repository = repository;
  }

  [HttpGet]
  [SwaggerOperation(
      Summary = "Gets a list of all Books",
      Description = "Gets a list of all Books",
      OperationId = "Book.List",
      Tags = new[] { "Books" })
  ]
  public async Task<IActionResult> List([FromQuery] BookFilter filter)
  {
    var books = (await _repository.ListAsync(new BooksSpec(filter.categoryId,
                                                           filter.bookTypeId,
                                                           filter.authorFirstName,
                                                           filter.authorLastName,
                                                           filter.isbn,
                                                           null, null)));

    var booksDTO = books
        .Select(book => new BookDTO
        (
            id: book.Id,
            title: book.Title,
            category: book.Category?.Name ?? "",
            bookType: book.BookType?.Name ?? "",
            authorFirstName: book.FirstName,            authorLastName: book.LastName,            isbn: book.Isbn,            totalCopies: book.TotalCopies,            copiesInUse: book.CopiesInUse        ))
        .ToList();

    return Ok(booksDTO);
  }

  [HttpGet("WithPagination")]
  [SwaggerOperation(
      Summary = "Gets a list of all Books",
      Description = "Gets a list of all Books",
      OperationId = "Book.ListWithPagination",
      Tags = new[] { "Books" })
  ]
  public async Task<IActionResult> ListwithPagination([FromQuery] BookFilter filter)
  {
    var count = (await _repository.CountAsync(new BooksSpec(filter.categoryId,
                                                           filter.bookTypeId,
                                                           filter.authorFirstName,
                                                           filter.authorLastName,
                                                           filter.isbn,
                                                           null,
                                                           null)));

    var books = (await _repository.ListAsync(new BooksSpec(filter.categoryId,
                                                           filter.bookTypeId,
                                                           filter.authorFirstName,
                                                           filter.authorLastName,
                                                           filter.isbn,
                                                           filter.page,
                                                           filter.size)));

    var booksDTO = books
        .Select(book => new BookDTO
        (
            id: book.Id,
            title: book.Title,
            category: book.Category?.Name ?? "",
            bookType: book.BookType?.Name ?? "",
            authorFirstName: book.FirstName,            authorLastName: book.LastName,            isbn: book.Isbn,            totalCopies: book.TotalCopies,            copiesInUse: book.CopiesInUse        ))
        .ToList();

    var paginationResponse = new PaginatedList<List<BookDTO>>(booksDTO, filter.page ?? 0, filter.size ?? 0, count);

    return Ok(paginationResponse);
  }


}

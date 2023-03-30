using RoyalLibrary.SharedKernel.Interfaces;
using RoyalLibrary.Web.ViewModels;
using Microsoft.AspNetCore.Mvc;
using RoyalLibrary.Core.BooksAggregate;
using RoyalLibrary.Core.BooksAggregate.Specifications;
using RoyalLibrary.Web.ApiModels;

namespace RoyalLibrary.Web.Controllers;

[Route("[controller]")]
public class BookController : Controller
{
  private readonly IRepository<Book> _repository;

  public BookController(IRepository<Book> projectRepository)
  {
    _repository = projectRepository;
  }

  // GET project/{projectId?}
  [HttpGet("{projectId:int}")]
  public async Task<IActionResult> Index(int projectId = 1)
  {

    var books = (await _repository.ListAsync());

    var booksDTO = books
        .Select(book => new BookDTO
        (
            id: book.Id,
            title: book.Title,
            category: book.Category?.Name ?? "",
            bookType: book.BookType?.Name ?? "",
            authorFirstName: book.FirstName,            authorLastName: book.LastName,            isbn: book.Isbn,            totalCopies: book.TotalCopies,            copiesInUse: book.CopiesInUse        ));


    var dto = new BookViewModel
    {
      Books = booksDTO.ToList()
    };

    return View(dto);
  }
}

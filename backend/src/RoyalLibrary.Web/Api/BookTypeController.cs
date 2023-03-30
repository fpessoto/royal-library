using RoyalLibrary.SharedKernel.Interfaces;
using RoyalLibrary.Web.ApiModels;
using Microsoft.AspNetCore.Mvc;
using RoyalLibrary.Core.BooksAggregate;

namespace RoyalLibrary.Web.Api;

/// <summary>
/// A sample API Controller. Consider using API Endpoints (see Endpoints folder) for a more SOLID approach to building APIs
/// https://github.com/ardalis/ApiEndpoints
/// </summary>
public class BookTypeController : BaseApiController
{
  private readonly IRepository<BookType> _repository;

  public BookTypeController(IRepository<BookType> repository)
  {
    _repository = repository;
  }

  // GET: api/BookTypes
  [HttpGet]
  public async Task<IActionResult> List()
  {
    var types = (await _repository.ListAsync())
        .Select(type => new BookTypeDTO
        (
            id: type.Id,
            name: type.Name
        ))
        .ToList();

    return Ok(types);
  }

}

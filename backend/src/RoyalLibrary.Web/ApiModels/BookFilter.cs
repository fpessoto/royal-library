using System;
namespace RoyalLibrary.Web.ApiModels
{
  public record BookFilter(int? categoryId,
                           int? bookTypeId,
                           string? isbn,
                           string? authorFirstName,
                           string? authorLastName,
                           int? page,
                           int? size
                           );
}


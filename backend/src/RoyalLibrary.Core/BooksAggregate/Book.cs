using System;
using Ardalis.GuardClauses;
using RoyalLibrary.SharedKernel;
using RoyalLibrary.SharedKernel.Interfaces;

namespace RoyalLibrary.Core.BooksAggregate
{
  public class Book : EntityBase, IAggregateRoot
  {
    public string Title { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public int TotalCopies { get; set; }
    public int CopiesInUse { get; set; }
    public string Isbn { get; set; }
    public int CategoryId { get; set; }
    public int BookTypeId { get; set; }

    public Category Category { get; set; } = null!;
    public BookType BookType { get; set; } = null!;

    public Book(string title,
      string firstName,
      string lastName,
      int totalCopies,
      int copiesInUse,
      string isbn,
      int bookTypeId,
      int categoryId)
    {
      Title = Guard.Against.NullOrEmpty(title, nameof(title));
      FirstName = Guard.Against.NullOrEmpty(firstName, nameof(firstName));
      LastName = Guard.Against.NullOrEmpty(lastName, nameof(lastName));
      Isbn = Guard.Against.NullOrEmpty(isbn, nameof(isbn));
      BookTypeId = Guard.Against.NegativeOrZero(bookTypeId, nameof(bookTypeId));
      CategoryId = Guard.Against.NegativeOrZero(categoryId, nameof(categoryId));

      SetTotalCopies(totalCopies);
      SetCopiesInUse(copiesInUse);
    }

    public void SetTotalCopies(int totalCopies)
    {
      TotalCopies = Guard.Against.Negative(totalCopies, nameof(totalCopies));
    }

    public void SetCopiesInUse(int copiesInUse)
    {
      CopiesInUse = Guard.Against.Negative(copiesInUse, nameof(copiesInUse));
    }
  }
}
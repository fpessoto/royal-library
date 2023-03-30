using System;
using Ardalis.GuardClauses;
using RoyalLibrary.SharedKernel;
using RoyalLibrary.SharedKernel.Interfaces;

namespace RoyalLibrary.Core.BooksAggregate
{
  public class BookType : EntityBase, IAggregateRoot
  {
    public string Name { get; set; }

    public virtual List<Book> Books { get; set; } = new();

    public BookType(string name)
    {
      Name = Guard.Against.NullOrEmpty(name, nameof(name));
    }
  }
}


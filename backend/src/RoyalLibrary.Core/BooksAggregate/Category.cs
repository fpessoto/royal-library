using System;
using Ardalis.GuardClauses;
using RoyalLibrary.SharedKernel;
using RoyalLibrary.SharedKernel.Interfaces;

namespace RoyalLibrary.Core.BooksAggregate
{
  public class Category : EntityBase, IAggregateRoot
  {
    public string Name { get; set; }

    public virtual List<Book>? Books { get; set; } = new();

    public Category(string name)
    {
      Name = Guard.Against.NullOrEmpty(name, nameof(name));
    }
  }
}
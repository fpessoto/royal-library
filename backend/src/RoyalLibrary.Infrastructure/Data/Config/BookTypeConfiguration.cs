using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RoyalLibrary.Core.BooksAggregate;

namespace RoyalLibrary.Infrastructure.Data.Config
{
  public class BookTypeConfiguration : IEntityTypeConfiguration<BookType>
  {
    public void Configure(EntityTypeBuilder<BookType> builder)
    {
      builder.HasKey(t => t.Id);

      builder.Property(t => t.Name)
        .IsRequired();
            
    }
  }
}


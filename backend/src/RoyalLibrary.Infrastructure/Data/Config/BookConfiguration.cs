using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RoyalLibrary.Core.BooksAggregate;

namespace RoyalLibrary.Infrastructure.Data.Config;

public class BookConfiguration : IEntityTypeConfiguration<Book>
{
  public void Configure(EntityTypeBuilder<Book> builder)
  {
    builder.HasKey(t=> t.Id);

    builder.Property(t => t.Title)
        .IsRequired();

    builder.Property(t => t.FirstName)
        .IsRequired();

    builder.Property(t => t.LastName)
        .IsRequired();

    builder.Property(t => t.TotalCopies)
        .IsRequired();

    builder.Property(t => t.CopiesInUse)
        .IsRequired();

    builder.Property(t => t.Isbn)
        .IsRequired();

    builder.Property(t => t.CategoryId)
          .IsRequired();

    builder.Property(t => t.BookTypeId)
          .IsRequired();

    builder.HasOne<BookType>(t => t.BookType)
           .WithMany()
           .HasForeignKey(t=> t.BookTypeId)
           .IsRequired();

    builder.HasOne<Category>(t => t.Category)
           .WithMany(t => t.Books)
           .HasForeignKey(t => t.CategoryId)
           .IsRequired();

  }
}

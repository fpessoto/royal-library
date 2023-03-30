using RoyalLibrary.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using RoyalLibrary.Core.BooksAggregate;

namespace RoyalLibrary.Web;

public static class SeedData
{
  public static readonly Category FictionCategory = new Category("Fiction");
  public static readonly Category NonFictionCategory = new Category("Non-Fiction");
  public static readonly Category BiographyCategory = new Category("Biography");
  public static readonly Category MysteryCategory = new Category("Mystery");

  public static readonly BookType PaperbackBookType = new BookType("Paperback");
  public static readonly BookType HardcoverBookType = new BookType("Hardcover");

  public static void Initialize(IServiceProvider serviceProvider)
  {
    using (var dbContext = new AppDbContext(
        serviceProvider.GetRequiredService<DbContextOptions<AppDbContext>>(), null))
    {
      if (dbContext.Books.Any())
      {
        return;   // DB has been seeded
      }

      PopulateTestData(dbContext);


    }
  }
  public static void PopulateTestData(AppDbContext dbContext)
  {
   
    foreach (var item in dbContext.Books)
    {
      dbContext.Remove(item);
    }
    foreach (var item in dbContext.BookTypes)
    {
      dbContext.Remove(item);
    }
    foreach (var item in dbContext.Categories)
    {
      dbContext.Remove(item);
    }

    dbContext.SaveChanges();

    dbContext.Add(FictionCategory);
    dbContext.Add(NonFictionCategory);
    dbContext.Add(BiographyCategory);
    dbContext.Add(MysteryCategory);
    dbContext.Add(PaperbackBookType);
    dbContext.Add(HardcoverBookType);

    dbContext.SaveChanges();
   
    dbContext.Books.Add(new Book("Pride and Prejudice", "Jane", "Austen", 100, 80,  "1234567891", HardcoverBookType.Id, FictionCategory.Id));
    dbContext.Books.Add(new Book("To Kill a Mockingbird", "Harper", "Lee", 75, 65,  "1234567892", PaperbackBookType.Id, FictionCategory.Id));
    dbContext.Books.Add(new Book("The Catcher in the Rye", "J.D.", "Salinger", 50, 45, "1234567893", HardcoverBookType.Id, FictionCategory.Id));
    dbContext.Books.Add(new Book("The Great Gatsby", "F. Scott", "Fitzgerald", 50, 22, "1234567894", HardcoverBookType.Id, NonFictionCategory.Id));
    dbContext.Books.Add(new Book("The Alchemist", "Paulo", "Coelho", 50, 35, "1234567895", HardcoverBookType.Id, BiographyCategory.Id));
    dbContext.Books.Add(new Book("The Book Thief", "Markus", "Zusak", 75, 11, "1234567896", HardcoverBookType.Id, MysteryCategory.Id));

    Random rnd = new Random();

    foreach (var category in dbContext.Categories )
    {
      foreach (var type in dbContext.BookTypes)
      {
        dbContext.Books.Add(new Book($"Awesome {category.Name} {type.Name}",
                                     "John",
                                     "Doe",
                                     rnd.Next(50, 9999),
                                     rnd.Next(1, 50),
                                     rnd.NextInt64(00000000000, 99999999999).ToString(),
                                     type.Id,
                                     category.Id));
      }
    }

    dbContext.SaveChanges();
  }
}

using Ardalis.Specification.EntityFrameworkCore;
using RoyalLibrary.SharedKernel.Interfaces;

namespace RoyalLibrary.Infrastructure.Data;

// inherit from Ardalis.Specification type
public class EfRepository<T> : RepositoryBase<T>, IReadRepository<T>, IRepository<T> where T : class, IAggregateRoot
{
  public EfRepository(AppDbContext dbContext) : base(dbContext)
  {
  }
}

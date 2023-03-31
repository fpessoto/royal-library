using System;
using System.Drawing;

namespace RoyalLibrary.Web.ApiModels
{
  public class PaginatedList<T> 
  {
    public int PageIndex { get; private set; }
    public int PageSize { get; private set; }
    public int TotalCount { get; private set; }
    public int TotalPages { get; private set; }
    public T Items { get; private set; }

    public PaginatedList(T source, int pageIndex, int pageSize, int totalCount)
    {
      PageIndex = (pageIndex - 1) * pageSize;
      PageSize = pageSize;
      TotalCount = totalCount;
      TotalPages = (int)Math.Ceiling(TotalCount / (double)PageSize);

      Items = source;
    }

    public bool HasPreviousPage
    {
      get
      {
        return (PageIndex > 0);
      }
    }

    public bool HasNextPage
    {
      get
      {
        return (PageIndex + 1 < TotalPages);
      }
    }
  }
}


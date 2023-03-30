namespace RoyalLibrary.Web.ApiModels;

public record BookDTO(int id,
                      string title,
                      string category,
                      string bookType,
                      string authorFirstName,
                      string authorLastName,
                      string isbn,
                      int totalCopies,
                      int copiesInUse);

public record BookTypeDTO(int id, string name);

public record CategoryDTO(int id, string name);
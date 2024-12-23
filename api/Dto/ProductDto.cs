namespace api.Dto;

public class ProductDto
{
    public String Name { get; set; } = string.Empty;
    public String Description { get; set; } = string.Empty;
    public float Price { get; set; } = 0;
    public String? ImageUrl { get; set; } = string.Empty;
    public int Stock { get; set; } = 0;
    public int CategoryId { get; set; } = 0;
    public int UserId { get; set; } = 0;
}
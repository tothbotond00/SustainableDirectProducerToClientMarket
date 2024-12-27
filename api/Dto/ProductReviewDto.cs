namespace api.Dto;

public class ProductReviewDto
{
    public string Description { get; set; } = string.Empty;
    public int Rating { get; set; }
    public int ProductId { get; set; }
}
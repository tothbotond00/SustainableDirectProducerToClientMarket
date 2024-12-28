namespace api.Dto;

public class ImageDto
{
    public IFormFile? Image { get; set; } = null!;
    // 0 -> Image_Profile, 1 -> Image_One, 2 -> Image_Two, 3 -> Image_Three
    public int imageID { get; set; } = 0;
}
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class AddRecipeCategoryRename : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Recipes_RecipeCategory_RecipeCategoryId",
                table: "Recipes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RecipeCategory",
                table: "RecipeCategory");

            migrationBuilder.RenameTable(
                name: "RecipeCategory",
                newName: "RecipeCategories");

            migrationBuilder.AddPrimaryKey(
                name: "PK_RecipeCategories",
                table: "RecipeCategories",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Recipes_RecipeCategories_RecipeCategoryId",
                table: "Recipes",
                column: "RecipeCategoryId",
                principalTable: "RecipeCategories",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Recipes_RecipeCategories_RecipeCategoryId",
                table: "Recipes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RecipeCategories",
                table: "RecipeCategories");

            migrationBuilder.RenameTable(
                name: "RecipeCategories",
                newName: "RecipeCategory");

            migrationBuilder.AddPrimaryKey(
                name: "PK_RecipeCategory",
                table: "RecipeCategory",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Recipes_RecipeCategory_RecipeCategoryId",
                table: "Recipes",
                column: "RecipeCategoryId",
                principalTable: "RecipeCategory",
                principalColumn: "Id");
        }
    }
}

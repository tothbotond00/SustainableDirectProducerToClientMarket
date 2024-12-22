using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class AddBasket : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BasketId",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Baskets",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Baskets", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ProductInBaskets",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    BasketId = table.Column<int>(type: "int", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductInBaskets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProductInBaskets_Baskets_BasketId",
                        column: x => x.BasketId,
                        principalTable: "Baskets",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ProductInBaskets_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Users_BasketId",
                table: "Users",
                column: "BasketId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ProductInBaskets_BasketId",
                table: "ProductInBaskets",
                column: "BasketId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductInBaskets_ProductId",
                table: "ProductInBaskets",
                column: "ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Baskets_BasketId",
                table: "Users",
                column: "BasketId",
                principalTable: "Baskets",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Baskets_BasketId",
                table: "Users");

            migrationBuilder.DropTable(
                name: "ProductInBaskets");

            migrationBuilder.DropTable(
                name: "Baskets");

            migrationBuilder.DropIndex(
                name: "IX_Users_BasketId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "BasketId",
                table: "Users");
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class AddOrderAgain : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Order_Users_ConsumerId",
                table: "Order");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductInOrder_Order_OrderId",
                table: "ProductInOrder");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductInOrder_Products_ProductId",
                table: "ProductInOrder");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProductInOrder",
                table: "ProductInOrder");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Order",
                table: "Order");

            migrationBuilder.RenameTable(
                name: "ProductInOrder",
                newName: "ProductInOrders");

            migrationBuilder.RenameTable(
                name: "Order",
                newName: "Orders");

            migrationBuilder.RenameIndex(
                name: "IX_ProductInOrder_ProductId",
                table: "ProductInOrders",
                newName: "IX_ProductInOrders_ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_ProductInOrder_OrderId",
                table: "ProductInOrders",
                newName: "IX_ProductInOrders_OrderId");

            migrationBuilder.RenameIndex(
                name: "IX_Order_ConsumerId",
                table: "Orders",
                newName: "IX_Orders_ConsumerId");

            migrationBuilder.AddColumn<float>(
                name: "TotalPrice",
                table: "ProductInOrders",
                type: "real",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProductInOrders",
                table: "ProductInOrders",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Orders",
                table: "Orders",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Users_ConsumerId",
                table: "Orders",
                column: "ConsumerId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductInOrders_Orders_OrderId",
                table: "ProductInOrders",
                column: "OrderId",
                principalTable: "Orders",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductInOrders_Products_ProductId",
                table: "ProductInOrders",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Users_ConsumerId",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductInOrders_Orders_OrderId",
                table: "ProductInOrders");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductInOrders_Products_ProductId",
                table: "ProductInOrders");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProductInOrders",
                table: "ProductInOrders");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Orders",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "TotalPrice",
                table: "ProductInOrders");

            migrationBuilder.RenameTable(
                name: "ProductInOrders",
                newName: "ProductInOrder");

            migrationBuilder.RenameTable(
                name: "Orders",
                newName: "Order");

            migrationBuilder.RenameIndex(
                name: "IX_ProductInOrders_ProductId",
                table: "ProductInOrder",
                newName: "IX_ProductInOrder_ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_ProductInOrders_OrderId",
                table: "ProductInOrder",
                newName: "IX_ProductInOrder_OrderId");

            migrationBuilder.RenameIndex(
                name: "IX_Orders_ConsumerId",
                table: "Order",
                newName: "IX_Order_ConsumerId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProductInOrder",
                table: "ProductInOrder",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Order",
                table: "Order",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Order_Users_ConsumerId",
                table: "Order",
                column: "ConsumerId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductInOrder_Order_OrderId",
                table: "ProductInOrder",
                column: "OrderId",
                principalTable: "Order",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductInOrder_Products_ProductId",
                table: "ProductInOrder",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id");
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SportsApp.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddedLogoToLevelTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte[]>(
                name: "Logo",
                table: "Levels",
                type: "varbinary(max)",
                nullable: false,
                defaultValue: new byte[0]);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Logo",
                table: "Levels");
        }
    }
}

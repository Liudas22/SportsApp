using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SportsApp.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddedTablesForLevelsAndBadges : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Badges",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Level = table.Column<int>(type: "int", nullable: false),
                    Logo = table.Column<byte[]>(type: "varbinary(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Badges", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Levels",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    LevelID = table.Column<int>(type: "int", nullable: false),
                    Pullups = table.Column<int>(type: "int", nullable: false),
                    Pushups = table.Column<int>(type: "int", nullable: false),
                    Dips = table.Column<int>(type: "int", nullable: false),
                    Squats = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Levels", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Badges");

            migrationBuilder.DropTable(
                name: "Levels");
        }
    }
}

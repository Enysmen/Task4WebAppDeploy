using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Task4_1.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddRoleCompanyToApplicationUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "RoleCompany",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RoleCompany",
                table: "AspNetUsers");
        }
    }
}

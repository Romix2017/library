using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Library.DataStorage.EF.Migrations
{
    public partial class AddForeignKeyForLibraryUserEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "LibraryUserId",
                table: "BookHistory",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_BookHistory_LibraryUserId",
                table: "BookHistory",
                column: "LibraryUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_BookHistory_LibraryUser_LibraryUserId",
                table: "BookHistory",
                column: "LibraryUserId",
                principalTable: "LibraryUser",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BookHistory_LibraryUser_LibraryUserId",
                table: "BookHistory");

            migrationBuilder.DropIndex(
                name: "IX_BookHistory_LibraryUserId",
                table: "BookHistory");

            migrationBuilder.DropColumn(
                name: "LibraryUserId",
                table: "BookHistory");
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Library.DataStorage.EF.Migrations
{
    public partial class RemoveUserForeignKey : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BookHistory_AspNetUsers_UserId",
                table: "BookHistory");

            migrationBuilder.DropIndex(
                name: "IX_BookHistory_UserId",
                table: "BookHistory");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "BookHistory");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "BookHistory",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_BookHistory_UserId",
                table: "BookHistory",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_BookHistory_AspNetUsers_UserId",
                table: "BookHistory",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}

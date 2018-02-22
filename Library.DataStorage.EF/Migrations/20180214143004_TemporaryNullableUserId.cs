using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Library.DataStorage.EF.Migrations
{
    public partial class TemporaryNullableUserId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BookHistory_AspNetUsers_UserId",
                table: "BookHistory");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "BookHistory",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_BookHistory_AspNetUsers_UserId",
                table: "BookHistory",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BookHistory_AspNetUsers_UserId",
                table: "BookHistory");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "BookHistory",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_BookHistory_AspNetUsers_UserId",
                table: "BookHistory",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

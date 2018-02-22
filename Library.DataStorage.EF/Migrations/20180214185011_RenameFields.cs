using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Library.DataStorage.EF.Migrations
{
    public partial class RenameFields : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DataReturned",
                table: "BookHistory",
                newName: "DateReturned");

            migrationBuilder.RenameColumn(
                name: "DataGiven",
                table: "BookHistory",
                newName: "DateGiven");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DateReturned",
                table: "BookHistory",
                newName: "DataReturned");

            migrationBuilder.RenameColumn(
                name: "DateGiven",
                table: "BookHistory",
                newName: "DataGiven");
        }
    }
}

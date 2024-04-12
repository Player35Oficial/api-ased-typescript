import { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.funcionario, (table) => {
      //COLUMNS
      table
        .bigIncrements("id_funcionario")
        .primary({ constraintName: "PK_FUNCIONARIO" })
        .index();
      table.string("nome", 75).index().notNullable();
      table.string("bio", 255).index().notNullable();
      table.bigInteger("id_cargo").notNullable();
      table.bigInteger("id_departamento").notNullable();

      // CONSTRAINTS
      table
        .foreign("id_cargo", "FK_CARGO_FUNCIONARIO")
        .references("cargo.id_cargo");
      table
        .foreign("id_departamento", "FK_DEPARTAMENTO_FUNCIONARIO")
        .references("departamento.id_departamento");
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.funcionario}`);
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTableIfExists(ETableNames.funcionario);
}

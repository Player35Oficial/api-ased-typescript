import { Knex } from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("funcionario", (table) => {
    table
      .bigIncrements("id_funcionario")
      .primary({ constraintName: "PK_FUNCIONARIO" })
      .index();
    table.string("nome", 75).index().notNullable();
    table.string("bio", 255).index().notNullable();
    table
      .foreign("id_cargo", "FK_CARGO_FUNCIONARIO")
      .references("id_cargo")
      .inTable("cargo");
    table
      .foreign("id_departamento", "FK_DEPARTAMENTO_FUNCIONARIO")
      .references("id_departamento")
      .inTable("departamento");
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTableIfExists("funcionario");
}

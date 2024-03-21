import { Knex } from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("evento_funcionario", (table) => {
    table
      .foreign("id_funcionario")
      .references("id_funcionario")
      .inTable("funcionario");
    table.foreign("id_evento").references("id_evento").inTable("evento");
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("evento_funcionario");
}

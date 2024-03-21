import { Knex } from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("departamento", (table) => {
    table
      .bigIncrements("id_departamento")
      .primary({ constraintName: "PK_DEPARTAMENTO" })
      .index();
    table.string("nome", 120).index().notNullable();
    table.string("descricao", 255).notNullable();
    table
      .enum("status", [
        "Disponível",
        "Ocupado",
        "Em reunião",
        "Ausente",
        "Em Atendimento",
      ])
      .notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTableIfExists("departamento");
}

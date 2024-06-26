import { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.evento_funcionario, (table) => {
      //COLUMNS
      table.bigInteger("id_funcionario").notNullable().unsigned();
      table.bigInteger("id_evento").notNullable().unsigned();

      // CONSTRAINTS
      table
        .foreign("id_funcionario", "FK_id_funcionario")
        .references("funcionario.id_funcionario")
        .onDelete("CASCADE");

      table
        .foreign("id_evento", "FK_id_evento")
        .references("evento.id_evento")
        .onDelete("CASCADE");

      table.unique(["id_evento", "id_funcionario"], {
        indexName: "UN_funcionario_evento",
        useConstraint: true,
      });
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.evento_funcionario}`);
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableNames.evento_funcionario);
}

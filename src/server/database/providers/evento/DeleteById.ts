import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";

export const deleteById = async (id_evento: number): Promise<void | Error> => {
  try {
    const associatedDeletedFuncionarios = deleteEventRelationalTable(id_evento);

    if (associatedDeletedFuncionarios instanceof Error) {
      return new Error(associatedDeletedFuncionarios.message);
    }

    const result = await Knex(ETableNames.evento)
      .where("id_evento", "=", id_evento)
      .del();

    if (result > 0) return;

    return new Error("Erro ao apagar registro");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao apagar registro");
  }
};

export const deleteEventRelationalTable = async (
  id_evento: number
): Promise<number | Error> => {
  try {
    const result = await Knex(ETableNames.evento_funcionario)
      .where("id_evento", "=", id_evento)
      .del();

    if (result > 0) return result;

    return new Error("Erro ao apagar registros");
  } catch (error) {
    return new Error("Erro ao apagar registros");
  }
};

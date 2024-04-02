import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";

export const deleteById = async (id_evento: number): Promise<void | Error> => {
  try {
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

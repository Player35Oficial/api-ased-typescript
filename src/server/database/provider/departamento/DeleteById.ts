import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";

export const deleteById = async (id: string): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.departamento)
      .where("id_departamento", "=", id)
      .del();

    if (result === 0) return;

    return new Error("Erro ao apagar registro");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao apagar registro");
  }
};

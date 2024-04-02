import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";

export const deleteById = async (id_cargo: number): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.cargo)
      .where("id_cargo", "=", id_cargo)
      .del();

    if (result > 0) return;

    return new Error("Erro ao apagar registro");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao apagar registro");
  }
};

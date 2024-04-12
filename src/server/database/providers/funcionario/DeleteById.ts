import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";

export const getById = async (
  id_funcionario: number
): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.funcionario)
      .where("id_funcionario", "=", id_funcionario)
      .del();

    if (result > 0) return;

    return new Error("Registro não encontrado");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao apagar registro");
  }
};

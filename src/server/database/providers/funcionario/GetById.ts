import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IFuncionario } from "../../models/Funcionario";

export const getById = async (
  id_funcionario: number
): Promise<IFuncionario | Error> => {
  try {
    const result = await Knex(ETableNames.funcionario)
      .select("*")
      .where("id_funcionario", "=", id_funcionario)
      .first();

    if (result) return result;

    return new Error("Registro não encontrado");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao recuperar registro");
  }
};

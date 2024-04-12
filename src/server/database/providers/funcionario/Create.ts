import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IFuncionario } from "../../models/Funcionario";

export const create = async (
  funcionario: Omit<IFuncionario, "id_funcionario">
): Promise<number | Error> => {
  try {
    const [result] = await Knex(ETableNames.funcionario)
      .insert(funcionario)
      .returning("id_funcionario");

    if (typeof result === "object") {
      return result.id;
    } else if (typeof result === "number") {
      return result;
    }

    return new Error("Erro ao criar registro");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao criar registro");
  }
};

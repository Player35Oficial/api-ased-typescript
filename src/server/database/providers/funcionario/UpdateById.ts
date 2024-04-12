import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IFuncionario } from "../../models/Funcionario";

export const updateById = async (
  id_funcionario: number,
  funcionario: Omit<IFuncionario, "id_funcionario">
): Promise<number | Error> => {
  try {
    const result = await Knex(ETableNames.funcionario)
      .update(funcionario)
      .where("id_funcionario", "=", id_funcionario);

    if (!result) return new Error("Registro não encontrado!");

    return result;
  } catch (error) {
    console.log(error);
    return new Error("Erro ao atualizar registro");
  }
};

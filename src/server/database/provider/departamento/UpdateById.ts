import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IGetDepartamento } from "../../models";

export const updateById = async (
  id_departamento: number,
  departamento: Omit<IGetDepartamento, "id_departamento" | "status">
): Promise<number | Error> => {
  try {
    const result = await Knex(ETableNames.departamento)
      .update(departamento)
      .where("id_departamento", "=", id_departamento);

    if (!result) {
      return new Error("Registro não encontrado");
    }

    return result;
  } catch (error) {
    console.log(error);
    return new Error("Erro ao atualizar o registro");
  }
};

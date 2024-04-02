import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IGetDepartamento } from "../../models";

export const getById = async (
  id_departamento: number
): Promise<IGetDepartamento | Error> => {
  try {
    const result = await Knex(ETableNames.departamento)
      .select("*")
      .where("id_departamento", "=", id_departamento)
      .first();

    if (result) return result;

    return new Error("Registro não encontrado");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao recuperar registro");
  }
};

import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IDepartamento } from "../../models";

export const create = async (
  departamento: IDepartamento
): Promise<number | Error> => {
  try {
    const [result] = await Knex(ETableNames.departamento)
      .insert(departamento)
      .returning("id_departamento");

    if (typeof result === "object") {
      return result.id;
    } else if (typeof result === "number") {
      return result;
    }

    return new Error("Erro ao cadastrar registro");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao cadastrar registro");
  }
};

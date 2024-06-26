import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICargo } from "../../models/Cargo";

export const getById = async (id_cargo: number): Promise<ICargo | Error> => {
  try {
    const result = await Knex(ETableNames.cargo)
      .select("*")
      .where("id_cargo", "=", id_cargo)
      .first();

    if (result) return result;

    return new Error("Registro não encontrado");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao recuperar registro");
  }
};

import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICargo } from "../../models/Cargo";

export const updateById = async (
  id_cargo: number,
  cargo: Omit<ICargo, "id_cargo">
): Promise<number | Error> => {
  try {
    const result = await Knex(ETableNames.cargo)
      .update(cargo)
      .where("id_cargo", "=", id_cargo);

    if (!result) return new Error("Registro não encontrado");

    return result;
  } catch (error) {
    console.log(error);
    return new Error("Erro ao atualizar registro");
  }
};

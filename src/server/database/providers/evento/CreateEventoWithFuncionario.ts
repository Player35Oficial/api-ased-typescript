import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IEvento } from "../../models/Evento";

export const createEventoWithFuncionario = async (
  evento: Omit<IEvento, "id_evento">,
  funcionarioIds: number[]
): Promise<number | Error> => {
  try {
    // Criar evento
    const result = await Knex(ETableNames.evento)
      .insert(evento)
      .returning("id_evento");

    console.log(result.id_evento);

    const [id_evento] = result; // Pega o id_evento retornado
    console.log(id_evento);

    if (id_evento) {
      try {
        await addFuncionario(id_evento, funcionarioIds); // Propaga o id_evento para a função
      } catch (error) {
        console.error("Erro ao adicionar funcionários ao evento", error);
        // Caso deseje, pode-se lançar uma exceção aqui
      }
    }

    return id_evento;
  } catch (error) {
    console.error("Erro ao criar registro", error);
    return new Error("Erro ao criar registro");
  }
};

const addFuncionario = async (id_evento: number, funcionarioIds: number[]) => {
  funcionarioIds.forEach(async (funcionarioId) => {
    await Knex(ETableNames.evento_funcionario).insert({
      id_evento,
      id_funcionario: funcionarioId,
    });
  });
};

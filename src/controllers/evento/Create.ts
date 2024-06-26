import { Request, Response } from "express";
import { IEvento } from "../../server/database/models";
import { validation } from "../../shared/middlewares";
import * as yup from "yup";
import { EventosProvider } from "../../server/database/providers/evento";
import { StatusCodes } from "http-status-codes";

interface IEventoFuncionario extends Omit<IEvento, "id_evento"> {
  funcionarioIds: number[];
}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IEventoFuncionario>(
    yup.object().shape({
      titulo: yup.string().required(),
      descricao: yup.string().required(),
      data_inicio: yup.date().required(),
      data_fim: yup.date().required(),
      funcionarioIds: yup.array(yup.number().required()).required(),
    })
  ),
}));

export const create = async (
  req: Request<{}, {}, IEventoFuncionario>,
  res: Response
) => {
  const { funcionarioIds, ...rest } = req.body;
  const evento_data = { ...rest };

  const result = await EventosProvider.createEventoWithFuncionario(
    evento_data,
    funcionarioIds
  );

  if (result instanceof Error) {
    return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.sendStatus(StatusCodes.OK).send(result);
};

import { Request, Response } from "express";
import { IEvento } from "../../server/database/models";
import { validation } from "../../shared/middlewares";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";
import { EventosProvider } from "../../server/database/providers/evento";

interface IParamProps {
  id_evento?: number;
}

export const updateByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(
    yup.object().shape({
      id_evento: yup.number().integer().positive().required(),
    })
  ),
  body: getSchema<Omit<IEvento, "id_evento">>(
    yup.object().shape({
      titulo: yup.string().required(),
      descricao: yup.string().required(),
      data_inicio: yup.date().required(),
      data_fim: yup.date().required(),
    })
  ),
}));

export const updateById = async (
  req: Request<IParamProps, {}, IEvento>,
  res: Response
) => {
  if (!req.params.id_evento) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: "O parâmetro 'id_evento' é obrigatório",
      },
    });
  }

  const id_evento = req.params.id_evento;
  const body = req.body;

  const result = await EventosProvider.updateById(id_evento, body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: result.message },
    });
  }

  return res.status(StatusCodes.OK).send(result);
};

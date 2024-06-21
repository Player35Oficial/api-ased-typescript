import { Request, Response } from "express";
import { validation } from "../../shared/middlewares";
import * as yup from "yup";
import { EventosProvider } from "../../server/database/providers/evento";
import { StatusCodes } from "http-status-codes";

interface IParamProps {
  id_evento?: number;
}

export const deleteByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(
    yup.object().shape({
      id_evento: yup.number().required().positive(),
    })
  ),
}));

export const deleteById = async (req: Request<IParamProps>, res: Response) => {
  const { id_evento } = req.params;

  if (!id_evento) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: { default: "O parâmetro 'id_evento' é obrigatório" },
    });
  }

  const result = await EventosProvider.deleteEventoWithFuncionario(id_evento);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.NO_CONTENT).end();
};

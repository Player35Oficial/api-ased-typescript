import { Request, Response } from "express";
import { validation } from "../../shared/middlewares";
import * as yup from "yup";
import { EventosProvider } from "../../server/database/providers/evento";
import { StatusCodes } from "http-status-codes";

interface IParamProps {
  id_evento: number;
}

export const getByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(
    yup.object().shape({
      id_evento: yup.number().required().positive(),
    })
  ),
}));

export const getById = async (req: Request<IParamProps>, res: Response) => {
  const result = await EventosProvider.getAll();

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: result.message },
    });
  }

  return res.status(StatusCodes.OK).send(result);
};

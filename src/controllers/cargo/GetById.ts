import { Request, Response } from "express";
import { CargoProvider } from "../../server/database/providers/cargo";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middlewares";
import * as yup from "yup";

interface IParamProps {
  id_cargo: number;
}

export const getByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(
    yup.object().shape({
      id_cargo: yup.number().integer().required(),
    })
  ),
}));

export const getById = async (req: Request<IParamProps>, res: Response) => {
  const result = await CargoProvider.getById(req.params.id_cargo);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.OK).send(result);
};

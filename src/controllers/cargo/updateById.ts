import { Request, Response } from "express";
import { ICargo } from "../../server/database/models/Cargo";
import { validation } from "../../shared/middlewares";
import * as yup from "yup";
import { CargoProvider } from "../../server/database/providers/cargo";
import { StatusCodes } from "http-status-codes";

interface IParamProps {
  id_cargo: number;
}

export const updateByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(
    yup.object().shape({
      id_cargo: yup.number().integer().required().moreThan(0),
    })
  ),
  body: getSchema<Partial<Omit<ICargo, "id_cargo">>>(
    yup.object().shape({
      nome: yup.string().optional().min(1),
      descricao: yup.string().optional().min(1),
    })
  ),
}));

export const updateById = async (req: Request<IParamProps>, res: Response) => {
  const result = await CargoProvider.updateById(req.params.id_cargo, req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.OK).send(result);
};
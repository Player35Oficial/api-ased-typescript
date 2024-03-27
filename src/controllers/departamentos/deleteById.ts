import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middlewares";
import * as yup from "yup";
import { DepartamentosProvider } from "../../server/database/provider/departamento";

interface IParamProps {
  id_departamento?: number;
}

export const deleteByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(
    yup.object().shape({
      id_departamento: yup.number().integer().required(),
    })
  ),
}));

export const deleteById = async (req: Request<IParamProps>, res: Response) => {
  if (!req.params.id_departamento) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: "O parâmetro 'id' precisa ser informado.",
      },
    });
  }

  const result = await DepartamentosProvider.deleteById(
    req.params.id_departamento.toString()
  );
  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.NO_CONTENT).send();
};

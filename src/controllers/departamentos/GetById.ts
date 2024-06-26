import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { DepartamentosProvider } from "../../server/database/providers/departamento";
import { validation } from "../../shared/middlewares";
import * as yup from "yup";

interface IParamProps {
  id_departamento?: number;
}

export const getByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(
    yup.object().shape({
      id_departamento: yup.number().integer().required().moreThan(0),
    })
  ),
}));

export const getById = async (req: Request<IParamProps>, res: Response) => {
  if (!req.params.id_departamento) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: "O parâmetro 'id_departamento' precisa ser informado.",
      },
    });
  }

  const result = await DepartamentosProvider.getById(
    req.params.id_departamento
  );
  if (result instanceof Error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        errors: {
          default: result.message,
        },
      })
      .end();
  }

  return res.status(StatusCodes.OK).send(result);
};

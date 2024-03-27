import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { IGetDepartamento } from "../../server/database/models";
import { validation } from "../../shared/middlewares";
import * as yup from "yup";
import { DepartamentosProvider } from "../../server/database/provider/departamento";

interface IParamProps {
  id_departamento?: number;
}

interface IBodyProps
  extends Omit<IGetDepartamento, "id_departamento" | "status"> {}

export const updateByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(
    yup.object().shape({
      id_departamento: yup.number().integer().moreThan(0).required(),
    })
  ),
  body: getSchema<IBodyProps>(
    yup.object().shape({
      nome: yup.string().required(),
      descricao: yup.string().required(),
    })
  ),
}));

export const updateById = async (
  req: Request<IParamProps, {}, IGetDepartamento>,
  res: Response
) => {
  if (!req.params.id_departamento) {
    return res.sendStatus(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: "O parâmetro 'id_departamento' precisa ser informado",
      },
    });
  }

  const result = await DepartamentosProvider.updateById(
    req.params.id_departamento,
    req.body
  );

  if (result instanceof Error) {
    return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  } else {
    res.sendStatus(StatusCodes.NO_CONTENT).send(result);
  }
};

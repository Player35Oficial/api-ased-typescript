import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

interface IDepartamento {
  nome: string;
}

const bodyValidation: yup.ObjectSchema<IDepartamento> = yup.object().shape({
  nome: yup.string().required(),
});

export const create = async (
  req: Request<{}, {}, IDepartamento>,
  res: Response
) => {
  let validatedData: IDepartamento | undefined = undefined;

  try {
    validatedData = await bodyValidation.validate(req.body, {
      abortEarly: false,
    });
  } catch (err) {
    const yupError = err as yup.ValidationError;
    const errors: Record<string, string> = {};

    yupError.inner.forEach((error) => {
      if (error.path === undefined) return;

      errors[error.path] = error.message;
    });

    return res.status(StatusCodes.BAD_REQUEST).json({
      errors,
    });
  }

  console.log(validatedData);

  return res.send("Create!");
};

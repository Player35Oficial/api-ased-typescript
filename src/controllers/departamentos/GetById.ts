import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

interface IParamProps {
  id: number;
}

export const getById = async (req: Request<IParamProps>, res: Response) => {
  console.log(req.body);

  return res.status(StatusCodes.METHOD_NOT_ALLOWED).send("Não implementado!");
};

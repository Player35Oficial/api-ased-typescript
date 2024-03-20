import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const deleteById = async (req: Request, res: Response) => {
  console.log(req.body);

  return res.status(StatusCodes.METHOD_NOT_ALLOWED).send("Não implementado!");
};

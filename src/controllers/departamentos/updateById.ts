import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const updateById = async (req: Request, res: Response) => {
  console.log(req.body);

  res.status(StatusCodes.METHOD_NOT_ALLOWED).send("Não implementado!");
};

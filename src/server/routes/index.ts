import { Router } from "express";
import { StatusCodes } from "http-status-codes";

const router = Router();

router.get("/teste", (req, res) => {
  console.log(req.body);

  return res.send("olá, Dev!").status(StatusCodes.OK);
});

export { router };

import { Router } from "express";
import { StatusCodes } from "http-status-codes";

import { DepartamentosController } from "../../controllers";
import { CargoController } from "../../controllers/cargo";
import { FuncionarioController } from "../../controllers/funcionario";
import { EventoController } from "../../controllers/evento";

const router = Router();

router.get("/", (req, res) => {
  console.log(req.body);

  return res.send("olá, Dev!").status(StatusCodes.OK);
});

// DEPARTAMENTO
router
  .route("/departamento")
  .post(
    DepartamentosController.createValidation,
    DepartamentosController.create
  )
  .get(DepartamentosController.getAll);

router
  .route("/departamento/:id_departamento")
  .delete(
    DepartamentosController.deleteByIdValidation,
    DepartamentosController.deleteById
  )
  .get(
    DepartamentosController.getByIdValidation,
    DepartamentosController.getById
  )
  .put(
    DepartamentosController.updateByIdValidation,
    DepartamentosController.updateById
  );

// CARGO
router
  .route("/cargo")
  .get(CargoController.getAll)
  .post(CargoController.createValidation, CargoController.create);

// FUNCIONARIO
router
  .route("/cargo/:id_cargo")
  .delete(CargoController.deleteByIdValidation, CargoController.deleteById)
  .put(CargoController.updateByIdValidation, CargoController.updateById);

router
  .route("/funcionario")
  .get(FuncionarioController.getAll)
  .post(FuncionarioController.createValidation, FuncionarioController.create);

router
  .route("/funcionario/:id_funcionario")
  .get(CargoController.getByIdValidation, CargoController.getById)
  .delete(
    FuncionarioController.deleteByIdValidation,
    FuncionarioController.deleteById
  )
  .put(
    FuncionarioController.updateByIdValidation,
    FuncionarioController.updateById
  );

// EVENTO
router
  .route("/evento")
  .get(EventoController.getAll)
  .post(EventoController.createValidation, EventoController.create);

router
  .route("/evento/:id_evento")
  .get(EventoController.getByIdValidation, EventoController.getById)
  .delete(EventoController.deleteByIdValidation, EventoController.deleteById)
  .put(EventoController.updateByIdValidation, EventoController.updateById);

export { router };

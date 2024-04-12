export interface IDepartamento {
  nome: string;
  descricao: string;
  status: string;
}

export interface IGetDepartamento extends IDepartamento {
  id_departamento: number;
  status: string;
}

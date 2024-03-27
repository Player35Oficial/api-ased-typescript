export interface IDepartamento {
  nome: string;
  descricao: string;
}

export interface IGetDepartamento extends IDepartamento {
  status: string;
}

export default interface UserInterface {
  ServidorSQL: string;
  BaseSQL: string;
  UsuarioSQL: string;
  PasswordSQL: string;

  IdUsuarioOLEI: string;
  PasswordOLEI?: string;

  RazonSocial: string;
  SwImagenes: string;
  Vigencia: string;
  userId?: string;
  userRol?: string;
  from: 'web' | 'mobil';

  TodosAlmacenes: number;
  Id_Almacen: number;
  AlmacenNombre?: string;

  SalidaSinExistencias: number;

  Id_TipoMovInv: ID_TIPO_MOVIMIENTO;

  Nombre?: string;
  Id_Usuario: string;
  Company?: string;

  serverConected: boolean;
  userConected: boolean;
}

export interface UserDBInterface {
  BaseSQL: string;
  RazonSocial: string;
}
export interface ID_TIPO_MOVIMIENTO {
  Id_TipoMovInv: number;
  Accion: number;
  Descripcion: string;
  Id_AlmDest?: number;
}
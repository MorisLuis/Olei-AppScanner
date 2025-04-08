export interface TipoMovimiento {
  Id_Perfil: number;
  Id_Almacen: number;
  TodosAlmacenes: number;
  Id_ListPre: number;
  InventarioW: boolean;
  TraspasosW: boolean;
  Descripcion: string;
  Id_TipoMovInv: number;
  Accion: number;
  Id_AlmDest: number;
  AlmacenNombre: string;
  SalidaSinExistencias: number;
}

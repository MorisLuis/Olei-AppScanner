import { api } from '../api/api';
import { AlmacenInterface } from '../interface/almacen';

const getAlmacenes = async (): Promise<{ almacenes: AlmacenInterface[] }> => {
  const { data: { almacenes } } = await api.get<{ almacenes: AlmacenInterface[] }>(`/api/almacenes`);
  return { almacenes };
};

const updateCurrentAlmacen = async (Id_Almacen: number): Promise<{ almacen?: AlmacenInterface }> => {
  const { data: { almacen } } = await api.get<{ almacen?: AlmacenInterface }>(`/api/almacenes/update?Id_Almacen=${Id_Almacen}`,);
  return { almacen };
};

export { getAlmacenes, updateCurrentAlmacen };

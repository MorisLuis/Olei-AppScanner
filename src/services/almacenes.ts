import { api } from '../api/api';
import { AlmacenInterface } from '../interface/almacen';

const getAlmacenes = async (): Promise<{ almacenes: AlmacenInterface[], error?: unknown }> => {
  try {
    const { data: { almacenes } } = await api.get<{ almacenes: AlmacenInterface[] }>(`/api/almacenes`);
    return { almacenes };
  } catch (error) {
    return { error, almacenes: [] };
  }
};

const updateCurrentAlmacen = async (Id_Almacen: number): Promise<{ almacen?: AlmacenInterface, error?: unknown }> => {
  try {
    const { data: { almacen } } = await api.get<{ almacen?: AlmacenInterface }>(`/api/almacenes/update?Id_Almacen=${Id_Almacen}`,);
    return { almacen };
  } catch (error) {
    return { error, almacen: undefined };
  }
};

export { getAlmacenes, updateCurrentAlmacen };

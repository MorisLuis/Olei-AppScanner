import {api} from '../api/api';

const getAlmacenes = async () => {
  try {
    const getAlmacenes = await api.get(`api/almacenes`);
    const almacenes = getAlmacenes.data.almacenes;
    return almacenes;
  } catch (error) {
    return {error: error};
  }
};

const updateCurrentAlmacen = async (Id_Almacen: number) => {
  try {
    const result = await api.get(
      `api/almacenes/update?Id_Almacen=${Id_Almacen}`,
    );
    return result.data;
  } catch (error) {
    return {error: error};
  }
};

export {getAlmacenes, updateCurrentAlmacen};

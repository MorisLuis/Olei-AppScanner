import { api } from '../api/api';
import { TipoMovimiento } from '../interface/TipoMovimiento';

const getTypeOfMovements = async (): Promise<{ TiposMovimiento: TipoMovimiento[], error?: unknown }> => {
  try {
    const { data: { TiposMovimiento } } = await api.get<{ TiposMovimiento: TipoMovimiento[] }>(`/api/typeofmovements`);
    return { TiposMovimiento };
  } catch (error) {
    return { error, TiposMovimiento: [] };
  }
};

export { getTypeOfMovements };

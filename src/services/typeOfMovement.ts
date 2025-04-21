import { api } from '../api/api';
import { TipoMovimiento } from '../interface/TipoMovimiento';

const getTypeOfMovements = async (): Promise<{ items: TipoMovimiento[] }> => {
  const { data: { TiposMovimiento } } = await api.get<{ TiposMovimiento: TipoMovimiento[] }>(`/api/typeofmovements`);
  return { items: TiposMovimiento };
};

export { getTypeOfMovements };

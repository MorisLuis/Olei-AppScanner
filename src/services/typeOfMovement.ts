import { api } from '../api/api';
import { TipoMovimiento } from '../interface/TipoMovimiento';

const getTypeOfMovements = async (): Promise<{ TiposMovimiento: TipoMovimiento[] }> => {
  const { data: { TiposMovimiento } } = await api.get<{ TiposMovimiento: TipoMovimiento[] }>(`/api/typeofmovements`);
  return { TiposMovimiento };
};

export { getTypeOfMovements };

import Toast from 'react-native-toast-message';

import { api } from '../api/api';
import CostosInterface from '../interface/costos';

interface CostosInterfaceExtend extends CostosInterface {
  codeRandom: string;
}

interface updateCostosInterface {
  codigoProps: string;
  Id_Marca: number;
  body?: Partial<CostosInterfaceExtend>;
}

const updateCodbar = async ({
  codigoProps,
  Id_Marca,
  body = {},
}: updateCostosInterface): Promise<{ codigo?: string, CodBar?: string, error?: unknown }> => {
  try {
    const { data: { codigo, CodBar } } = await api.put<{ codigo: string, CodBar: string }>(`/api/costos?codigo=${codigoProps}&Id_Marca=${Id_Marca}`, body);
    Toast.show({
      type: 'tomatoToast',
      text1: 'Se actualizó el codigo de barras!',
    });
    return { codigo, CodBar };
  } catch (error) {
    return { error };
  }
};

export { updateCodbar };

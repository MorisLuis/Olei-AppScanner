import Toast from "react-native-toast-message";
import { api } from "../api/api";
import CostosInterface from "../interface/costos";


interface CostosInterfaceExtend extends CostosInterface {
    codeRandom: string
}

interface updateCostosInterface {
    codigo: string;
    Id_Marca: number;
    body?: Partial<CostosInterfaceExtend>
}


const updateCodbar = async ({
    codigo,
    Id_Marca,
    body = {}
}: updateCostosInterface) => {
    
    try {
        await api.put(`/api/costos?codigo=${codigo}&Id_Marca=${Id_Marca}`, body);
        Toast.show({
            type: 'tomatoToast',
            text1: 'Se actualizó el codigo de barras!'
        })
    } catch (error: any) {
        console.log({ errorupdateCostos: error })
    }
}

export {
    updateCodbar
}
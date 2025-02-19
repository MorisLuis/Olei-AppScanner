import Toast from "react-native-toast-message";
import { api } from "../api/api";
import CostosInterface from "../interface/costos";
import { AxiosError } from "axios";


interface CostosInterfaceExtend extends CostosInterface {
    codeRandom: string
}

interface updateCostosInterface {
    codigo: string;
    Id_Marca: string;
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
        return { ok: true }
    } catch (error ) {
        return { error: error as AxiosError };
    }
}

export {
    updateCodbar
}
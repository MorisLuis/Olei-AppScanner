import { api } from "../api/api";

export interface Id_TipoMovInvInterface {
    Id_TipoMovInv: number;
    Accion: number;
    Descripcion: string,
    Id_AlmDest?: number
}

const getTypeOfMovements = async () => {

    try {
        const getTypeOfMovements = await api.get(`/api/typeofmovements`);
        const typeOfMov = getTypeOfMovements.data;
        return typeOfMov
    } catch (error: any) {
        return { error: error };
    }

    
}


export {
    getTypeOfMovements,
}
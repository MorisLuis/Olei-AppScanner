export default interface ProductInterface {
    Descripcion: string;
    Id_Familia: number
    Codigo: string;
    Familia: string;
    CodigoPrecio: string;
    Precio: number;
    CodigoExsitencia: string;
    Existencia: number;
    Id_Almacen: number;
    Marca: string;
    Id_Marca: number;
    Id_ListaPrecios: number;
    Cantidad: number;
    Impto: number;
    imagen: [{
        url: string,
        id: number
    }];

    CodBar?: string
}

export interface ProductInterfaceBag {
    Codigo: string;
    Id_Marca: number;
    Cantidad: number;
    Existencia: number;

    Id_Ubicacion?: number;
    Diferencia?: number;
    Descripcion?: string;
    Marca?: string;
    key?: number
}
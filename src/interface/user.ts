
export default interface UserInterface {

    ServidorSQL: string;
    BaseSQL: string;
    UsuarioSQL: string;
    PasswordSQL: string;

    IdUsuarioOLEI: string;
    PasswordOLEI?: string;

    RazonSocial: string;
    SwImagenes: string;
    Vigencia: string;
    userId?: string;
    userRol?: string;
    from: 'web' | 'mobil';

    TodosAlmacenes: number;
    Id_Almacen: number;
    AlmacenNombre?: string;

    SalidaSinExistencias?: Number

    Id_TipoMovInv?: {
        Id_TipoMovInv: number,
        Accion: number,
        Descripcion: string,
        Id_AlmDest?: number
    };

    Nombre?: string;
    Id_Usuario: string;
    Company?: string;
}

export interface UserDBInterface {
    BaseSQL: string;
    RazonSocial: string;
}



export default interface UserInterface {
    serverclientes: string;

    // have one or another
    baseclientes: string;
    BaseSQL?: string;

    PasswordSQL: string;
    UsuarioSQL: string;
    IdUsuarioOLEI: string;
    RazonSocial: string;
    SwImagenes: string;
    Vigencia: string;

    userId?: string;
    userRol?: string;

    from: 'web' | 'mobil';


    Id_TipoMovInv?: {
        Id_TipoMovInv: number,
        Accion: number,
        Descripcion: string,
        Id_AlmDest?: number
    };
    Nombre?: string;
    Id_Usuario: string;
    Company?: string;

    TodosAlmacenes: number;
    Id_Almacen: number;
    AlmacenNombre?: string;
}
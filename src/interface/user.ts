
export default interface UserInterface {
    serverclientes: string;
    baseclientes: string;
    PasswordSQL: string;
    UsuarioSQL: string;
    IdUsuarioOLEI: string;
    RazonSocial: string;
    SwImagenes: string;
    Vigencia: string;

    userId?: string;
    userRol?: string;

    from: 'web' | 'mobil'

    Id_TipoMovInv?: {
        Id_TipoMovInv: number,
        Accion: number,
        Descripcion: string,
        Id_AlmDest?: number
    };
    Id_Almacen: number;
    Nombre?: string;
    Id_Usuario: number;
    Company?: string;

}
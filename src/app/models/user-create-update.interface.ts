export interface UserCreateUpdate {
    userId: number;
    nombre: string;
    apellido: string;
    username: string;
    email: string;
    telefono: string;
    password: string;
    activo: boolean;
}
export interface MovieCreateUpdate {
    peliculaId: number;
    titulo: string;
    descripcion: string;
    duracion: number;
    genero: string;
    director: string;
    clasificacion: string;
    posterUrl: string;
    fechaEstreno: Date;
    activo: boolean;
    funcionesId: number[];
}
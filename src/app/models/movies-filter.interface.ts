export interface MoviesFilter {
  cineId?: number | null;
  direccionCine?: string | null;
  titulo?: string | null;
  descripcion?: string | null;
  genero?: string | null;
  director?: string | null;
  fechaFuncionInicio?: Date | null;
  fechaFuncionFin?: Date | null;
}
export interface IBorrow {
  numeropedido: number;
  fechaprestamo: Date;
  fechamaximadevolucion: Date;
  fechadevolucion: Date | null;
  librocodigo: number;
  usuariocodigo: number;
}
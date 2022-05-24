export interface IBorrow {
  numeropedido: number;
  fechaprestamo: Date;
  fechamaximadevolucion: Date;
  fechadevolucion: Date | null;
  librocodigo: number;
  usuariocodigo: number;
}

export interface ICreateBorrow {
  user_id: number;
  book_id: number;
}


export interface IReturnBook {
  user_id: number;
  book_id: number;
}
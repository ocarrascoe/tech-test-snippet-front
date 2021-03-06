import {IBorrow} from "./borrows";

export interface IBook {
  codigolibro: number;
  titulo: string;
  editorial: string;
  autor: string;
  genero: string;
  paisautor: string;
  numeropaginas: number;
  anoedicion: string;
  precio_currency: string;
  precio: string;
  eliminado: boolean;
  is_available: boolean;
  borrows?: IBorrow;
}

export interface ICreateBook {
  titulo: string;
  editorial: string;
  autor: string;
  genero: string;
  paisautor: string;
  numeropaginas: number;
  anoedicion: number;
  precio: number;
}

export interface IEditBook {
  titulo?: string;
  editorial?: string;
  autor?: string;
  genero?: string;
  paisautor?: string;
  numeropaginas?: number;
  anoedicion?: number;
  precio?: number;
}
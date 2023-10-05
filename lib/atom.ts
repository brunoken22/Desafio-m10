import {atom} from 'recoil';
export type Favorito = {
  name: string;
  price: number;
  id: string;
  img: string;
};
export const searchAll = atom({
  key: 'search',
  default: {
    results: [],
    pagination: {},
  },
});

export const user = atom({
  key: 'user',
  default: {
    email: '',
    nombre: '',
    direccion: '',
    telefono: '',
  },
});
export const favoritos = atom({
  key: 'favoritos',
  default: [] as Favorito[],
});

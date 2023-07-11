import { atom } from 'recoil';

export const destacados = atom({
  key: 'destacados',
  default: []
});

export const searchAll = atom({
  key: 'search',
  default: {
    results: [],
    pagination: {}
  }
});

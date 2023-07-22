import { atom } from "recoil";

export const searchAll = atom({
   key: "search",
   default: {
      results: [],
      pagination: {},
   },
});

export const user = atom({
   key: "user",
   default: {
      email: "",
      nombre: "",
      direccion: "",
      telefono: "",
   },
});

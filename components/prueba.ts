// Un método estático es un método que pertenece a una clase en lugar de pertenecer a una instancia
class Operacion {
  multi(a: number, b: number) {
    return a * b;
  }
  static sum(a: number, b: number) {
    return a + b;
  }
}
//Este seria instanciando el metodo Operacion
const newOperacion = new Operacion();
const multi = newOperacion.multi(2, 4);
console.log(multi);

//Este con el metodo statico

const suma = Operacion.sum(4, 6);
console.log(suma);

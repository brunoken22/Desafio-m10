import {FormularioSignin} from '@/components/signin';
import {Div} from '@/ui/container';
export default async function Signin() {
  return (
    <Div>
      <h2>Inicio de sesión</h2>
      <FormularioSignin />
    </Div>
  );
}

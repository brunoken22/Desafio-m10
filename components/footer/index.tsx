import Github from '@/ui/icons/github.svg';
import FacebookSVG from '@/ui/icons/facebook.svg';
import Linkedin from '@/ui/icons/linkedin.svg';
import Link from 'next/link';
import './style.css';

export function Footer() {
  return (
    <footer>
      <div className='footer_pagination'>
        <div>
          <p className='footer_navegation_title'>Navegación</p>
          <Link href={'/signin'}>
            <p>Login</p>
          </Link>
          <Link href={'/profile'}>
            <p>Mi Perfil</p>
          </Link>
          <Link href={'/search'}>
            <p>Buscar</p>
          </Link>
        </div>
        <div>
          <p className='footer_navegation_title'> Redes</p>
          <Link href={'#'}>
            <p>
              <FacebookSVG />
              Facebook
            </p>
          </Link>
          <Link href={'https://www.linkedin.com/in/brunoken18/'}>
            <p>
              <Linkedin /> Linkedin
            </p>
          </Link>
          <Link href={'https://github.com/brunoken22'}>
            <p>
              <Github /> GitGub
            </p>
          </Link>
        </div>
      </div>
      <div>
        <p className='footer_copy'>
          @2023 <strong>Bruno ken</strong>
        </p>
      </div>
    </footer>
  );
}

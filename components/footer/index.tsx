'use client';
import {Body} from '@/ui/typography';
import Github from '@/ui/icons/github.svg';
import FacebookSVG from '@/ui/icons/facebook.svg';
import Linkedin from '@/ui/icons/linkedin.svg';
import Link from 'next/link';
import {Footerr, Enla, Div} from './styled';

export function Footer() {
  return (
    <Footerr>
      <Div $display='flex' $dire='row' $aling='center'>
        <Div $display='flex'>
          <Link
            href={'/signin'}
            style={{textDecoration: 'none', color: 'inherit'}}>
            <Body>Login</Body>
          </Link>
          <Link
            href={'/profile'}
            style={{textDecoration: 'none', color: 'inherit'}}>
            <Body>Mi Perfil</Body>
          </Link>
          <Link
            href={'/search'}
            style={{textDecoration: 'none', color: 'inherit'}}>
            <Body>Buscar</Body>
          </Link>
        </Div>
        <Div $display='flex'>
          <Body> Redes</Body>
          <Enla href={'#'}>
            <Body>
              <FacebookSVG />
              Facebook
            </Body>
          </Enla>
          <Enla href={'https://www.linkedin.com/in/brunoken18/'}>
            <Body>
              <Linkedin /> Linkedin
            </Body>
          </Enla>
          <Enla href={'https://github.com/brunoken22'}>
            <Body>
              <Github /> GitGub
            </Body>
          </Enla>
        </Div>
      </Div>
      <Div>
        <Body>
          @2023 <strong>Bruno ken</strong>
        </Body>
      </Div>
    </Footerr>
  );
}

import styled from 'styled-components';

export const Footerr = styled.footer`
  background-color: #121212;
  color: #fff;
  padding: 1rem;
  display: grid;
  row-gap: 1rem;
`;
export const Enla = styled.a`
  text-decoration: none;
  color: #fff;
`;

export const Div = styled.div<any>`
  display: ${(props): any => props.$display || 'block'};
  flex-direction: ${(props): any => props.$dire || 'column'};
  align-items: ${(props): any => props.$aling || ''};
  justify-content: space-between;
  row-gap: 0.5rem;

  @media (max-width: 350px) {
    flex-direction: column;
    row-gap: ${(props): any => (props.$dire ? '1.5rem' : 'inherint')};
  }
`;

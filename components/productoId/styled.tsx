import styled from 'styled-components';

export const DivProductId = styled.div`
  display: flex;
  width: 80%;
  margin: 0 auto;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  @media (max-width: 1270px) {
    width: 100%;
  }
`;

export const DivCantidadCompra = styled.div`
  text-align: start;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  align-items: center;
  padding-left: 1rem;
  @media (max-width: 1270px) {
    padding: 0;
  }
`;

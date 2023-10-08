import styled from 'styled-components';

export const DivContainerFavorito = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  margin: auto;
`;
export const DivIconEliminar = styled.div`
  @media (max-width: 700px) {
    position: absolute;
    top: 0;
    right: 0;
  }
`;
export const TempleFavorito = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  text-align: start;
  @media (max-width: 700px) {
    flex-direction: column;
    justify-content: center;
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 10px;
    text-align: center;
    position: relative;
  }
`;

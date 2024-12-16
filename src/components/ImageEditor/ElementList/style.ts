import styled from 'styled-components';

export const ElementListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  border-left: 1px solid #ccc;
  overflow-y: auto;
  background-color: #fafafa;
`;

export const ImageList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: space-evenly;
`;

export const ImageItem = styled.div`
  width: 80px;
  cursor: pointer;
  text-align: center;

  img {
    width: 100%;
    height: auto;
    border: 1px solid #ccc;
  }

  span {
    display: block;
    margin-top: 5px;
    font-size: 12px;
  }

  &:hover {
    opacity: 0.8;
  }
`;

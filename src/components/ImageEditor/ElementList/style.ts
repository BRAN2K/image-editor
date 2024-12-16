import styled from 'styled-components';

export const ElementListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  border-left: 1px solid #ccc;
  overflow-y: auto;
  background-color: #fafafa;
`;

export const SectionTitle = styled.h4`
  color: #000;
`;

export const ImageList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  justify-items: center;
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

export const TextList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const TextItem = styled.div`
  cursor: pointer;
  padding: 5px;
  border: 1px solid #ccc;

  span {
    font-size: 14px;
    color: #000;
  }

  &:hover {
    background-color: #e8e8e8;
  }
`;

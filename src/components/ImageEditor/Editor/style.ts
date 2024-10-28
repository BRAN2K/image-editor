import styled from 'styled-components';

export const EditorContainer = styled.div`
  display: flex;
  height: 100vh;
`;

export const Sidebar = styled.div`
  width: 400px;
`;

export const TopBar = styled.div`
  position: absolute;
  top: 10px;
  left: 400px;
  display: flex;
  z-index: 10;
  gap: 10px;
`;

export const FileInput = styled.input`
  margin-right: 10px;
`;

export const ExportButton = styled.button`
  padding: 5px 10px;
`;

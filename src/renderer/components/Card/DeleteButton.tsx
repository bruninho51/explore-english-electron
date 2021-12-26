import styled from 'styled-components';

export const DeleteButton = styled.div`
    width: 32px;
    height: 32px;
    font-size: 24px;
    border-radius: 200px;
    border: 1px solid #000;
    &:hover {
      background: #E44352;
      background: rgba(220, 53, 69, 1);
  }
    position: absolute;
    top: 5px;
    right: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

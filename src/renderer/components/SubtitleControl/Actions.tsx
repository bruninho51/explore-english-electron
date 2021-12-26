import styled, { css, keyframes } from 'styled-components';

const slidein = keyframes`
  from {
    bottom: 0;
  }
  to {
    bottom: -80px;
  }
`;

export const Actions = styled.div<{ edit: boolean }>`
  box-sizing: border-box;
  width: 100%;
  height: 130px;
  border-radius: 5px;
  background: #F8F8F8;
  border: 3px solid #DCDCDC;
  align-items: bottom;
  font-family: Roboto sans-serif;
  text-align: center;
  padding: 20px;
  position: absolute;
  bottom: -80px;
  z-index: -1;
  ${props => {
    if (props.edit) {
      return css`
        animation: ${slidein} 2s;
      `;
    } else {
      return css`
        top: 0px;
      `;
    }
  }}
`;

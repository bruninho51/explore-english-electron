import styled from 'styled-components';

export const SizedBox = styled.div<{ height: string }>`
  height: ${props => props.height};
  width: 100%;
  z-index: -2;
`;

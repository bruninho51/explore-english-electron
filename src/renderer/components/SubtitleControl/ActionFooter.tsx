import styled from 'styled-components';
import { Button } from '../Button';

export const ActionFooter = styled.footer`
  position: absolute;
  bottom: 10px;
  right: 10px;
  ${Button} {
    margin-left: 5px;
  }
`;

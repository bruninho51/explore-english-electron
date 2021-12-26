import styled from 'styled-components';
import { Button } from '../Button';

export const Bar = styled.div`
  box-sizing: border-box;
  width: 4vmax;
  height: 100%;
  background: #F8F8F8;
  border-left: 3px solid #DCDCDC;
  border-right: 3px solid #DCDCDC;
  border-bottom: 3px solid #DCDCDC;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  top: 0px;
  ${Button} {
    width: 3vmax;
    height: 3vmax;
  }
`;

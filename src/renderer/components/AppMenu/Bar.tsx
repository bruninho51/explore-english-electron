import styled from 'styled-components';
import { Button } from '../Button';

export const Bar = styled.div`
  box-sizing: border-box;
  width: 60px;
  height: 100%;
  background: #F8F8F8;
  border-right: 2px solid #DCDCDC;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding: 0px 10px 0px 10px;
  top: 0px;
  z-index: 4;
  user-select: none;
  ${Button} {
    padding-left: 5px;
    display: flex;
    justify-content: left;
    align-items: center;
    width: 100%;
    height: 40px;
    background-color: transparent;
    box-shadow: 0px 0px black;
    color: black;
  };
  &:hover {
    width: 250px;
    -webkit-transition: all 200ms ease-in;
    -ms-transition: all 200ms ease-in;
    -moz-transition: all 200ms ease-in;
    transition: all 200ms ease-in;
  }
  &:focus {
    width: 250px;
    }
`;

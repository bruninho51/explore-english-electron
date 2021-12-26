import styled, { css } from 'styled-components';
import { ButtonProps } from './Button';
import pallet from './pallet-theme';

export const BaseButton = styled.button`
  user-select: none;
  position: relative;
  font-family: Roboto, sans-serif;
  font-size: 1em;
  text-align: center;
  display: ${(props: ButtonProps) => props.block ? 'block' : 'inline-block'};
  padding-top: 10px;
  padding-bottom: 10px;
  max-width: 100%;
  width: 100%;
  box-shadow: rgb(196, 196, 196) 5px 5px 10px;
  border-width: initial;
  border-style: none;
  border-color: initial;
  border-image: initial;
  border-radius: 5px;
  outline: none;
  background-color: #E0E0E0;
  ${(props: ButtonProps) => !props.disabled && css`
    cursor: pointer;
    background-color: ${(props: ButtonProps) => pallet[props.theme][0]};
    color: ${(props: ButtonProps) => pallet[props.theme][1]};
    &:hover {
      background: ${(props: ButtonProps) => pallet[props.theme][2]};
    }
  `}
`;

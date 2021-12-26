import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { SizedButton } from './SizedButton';
import { ThemeEnum, SizeEnum } from './enums';

const AnimatedButton = styled(SizedButton)<{ size?: string, block?: boolean }>`
  &:after {
    content: "";
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    margin: auto;
    width: 100%; height: 100%;
    background-image: radial-gradient(circle at center, rgba(240, 240, 240, 0.1), rgba(230, 230, 230, 0.1));
    background-size: 1%;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0;
    transition: background-size 200ms, opacity 200ms;
    border-radius: 5px;
  }
  &:active:after {
    background-image: radial-gradient(circle at center, rgba(230, 230, 230, 0.2) 50%, transparent 52%);
    background-size: 90%;
    opacity: 1;
    border-radius: 5px;
  }
`;

export interface ButtonProps extends PropsWithChildren<any> {
  theme: ThemeEnum
  size: SizeEnum
  block: boolean
  disabled: boolean
};

const defaultProps: ButtonProps = {
  theme: ThemeEnum.primary,
  size: SizeEnum.small,
  block: false,
  disabled: false
};

const Button = AnimatedButton;

Button.defaultProps = defaultProps;

export { Button };

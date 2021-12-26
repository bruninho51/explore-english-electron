import styled, { css } from 'styled-components';
import { ButtonProps } from '.';
import { BaseButton } from './BaseButton';
import { SizeEnum } from './enums';

export const SizedButton = styled(BaseButton)`
  ${(props: ButtonProps) => props.size === 'small' && css`
    font-size: 1em;
    padding-top: 10px;
    padding-bottom: 10px;
    width: ${(props: ButtonProps) => props.block ? '100%' : '7em'};
  `}
  ${(props: ButtonProps) => props.size === 'medium' && css`
    font-size: 1em;
    padding-top: 12px;
    padding-bottom: 12px;
    width: ${(props: ButtonProps) => props.block ? '100%' : '7em'};
  `}
  ${(props: ButtonProps) => props.size === SizeEnum.large && css`
    font-size: 1em;
    padding-top: 15px;
    padding-bottom: 15px;
    width: ${(props: ButtonProps) => props.block ? '100%' : '7em'};
  `}
`;

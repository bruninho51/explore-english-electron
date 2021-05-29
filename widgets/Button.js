import React from 'react';
import styled, { css } from "styled-components";
import PropTypes from 'prop-types';

// [backgroundColor, textColor, backgorundColor:hover]
const theme = {
  primary: ['#007bff', '#fff', '#3293fd'],
  secondary: ['#6c757d', '#fff', '666666'],
  success: ['#28a745', '#fff', '#449a56'],
  danger: ['#dc3545', '#fff', '#E44352'],
  warning: ['#ffc107', '#000', '#Ffcb32'],
  info: ['#17a2b8', '#fff', '#46a3b3'],
  dark: ['#23272b', '#fff', '#363637'],
  light: ['#Dbdde0', '#000', '#E7e7e8']
}

const BaseButton = styled.button`
  user-select: none;
  position: relative;
  font-family: Roboto, sans-serif;
  font-size: 1em;
  text-align: center;
  display: ${props => props.block ? 'block' : 'inline-block'};
  padding-top: 10px;
  padding-bottom: 10px;
  margin-left: 15px;
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
  ${props => !props.disabled && css`
    cursor: pointer;
    background-color: ${props => theme[props.theme][0]};
    color: ${props => theme[props.theme][1]};
    &:hover {
      background: ${props => theme[props.theme][2]};
    }
  `}
`

const SizedButton = styled(BaseButton)`
  ${props => props.size === 'small' && css`
    font-size: 1em;
    padding-top: 10px;
    padding-bottom: 10px;
    width: ${props => props.block ? '100%' : '7em' };
  `}
  ${props => props.size === 'medium' && css`
    font-size: 1em;
    padding-top: 12px;
    padding-bottom: 12px;
    width: ${props => props.block ? '100%' : '7em' };
  `}
  ${props => props.size === 'large' && css`
    font-size: 1em;
    padding-top: 15px;
    padding-bottom: 15px;
    width: ${props => props.block ? '100%' : '7em' };
  `}
`

export const AnimatedButton = styled(SizedButton)`
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
`

export const Button = AnimatedButton

Button.propTypes = {
  theme: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  block: PropTypes.bool
};
  
Button.defaultProps = {
  theme: 'primary',
  size: 'small',
  block: false
};
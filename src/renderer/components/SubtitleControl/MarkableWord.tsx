import styled from 'styled-components';
import { Word } from '../Card/Word';

export const MarkableWord = styled(Word)<{ marked: boolean }>`
  padding: 1px;
  border-radius: 5px;
  background: ${props => props.marked ? '#FFDE03' : 'transparent'};
  cursor: pointer;
  user-select: none;
`;

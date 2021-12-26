import styled from 'styled-components';
import { Word } from './Word';

export const MarkableWord = styled(Word)<{ marked: boolean }>`
  padding: 1px;
  border-radius: 5px;
  background: ${(props: any) => props.marked ? '#FFDE03' : 'transparent'};
`;

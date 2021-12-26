import { ChangeEventHandler, ReactElement } from 'react';
import { Label } from './Label';
import { TextInputContainer } from './TextInputContainer';
import { TextInputStyle } from './TextInputStyle';

export const TextInput = ({ type, name, label, value, onChange }: { type: string, name: string, label: string, value: string, onChange: ChangeEventHandler<HTMLInputElement> }): ReactElement => {
  return (
    <TextInputContainer>
      <Label>{`${label}:`}</Label>
      <TextInputStyle type={type} name={name} value={value} onChange={onChange} />
    </TextInputContainer>
  );
};

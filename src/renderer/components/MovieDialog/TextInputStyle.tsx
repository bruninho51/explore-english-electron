import styled from 'styled-components';

export const TextInputStyle = styled.input`
    border-color: transparent;
    border: 1px solid black;
    font-family: Roboto sans-serif;
    height: 40px;
    border-radius: 5px;
    width: 400px;
    padding: 0px 20px 0px 20px;
    text-align: center;
    font-size: 24px;
    &:focus {
        outline: none;
    }
`;

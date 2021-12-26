import styled from 'styled-components';

export const TextInputStyle = styled.input`
    border-color: transparent;
    border: 1px solid black;
    font-family: Roboto sans-serif;
    height: 30px;
    border-radius: 10px;
    width: 400px;
    padding: 0px 20px 0px 20px;
    text-align: center;
    &:focus {
        outline: none;
        border-radius: 10px;
    }
`;

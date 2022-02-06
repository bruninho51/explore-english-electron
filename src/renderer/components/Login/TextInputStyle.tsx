import styled from 'styled-components';

export const TextInputStyle = styled.input`
    box-sizing: border-box;
    border-color: transparent;
    border: 1px solid black;
    font-family: Roboto sans-serif;
    height: 40px;
    border-radius: 5px;
    width: 100%;
    padding: 0px 20px 0px 20px;
    text-align: center;
    margin-bottom: 5px;
    font-size: 24px;
    &:focus {
        outline: none;
    }
`;

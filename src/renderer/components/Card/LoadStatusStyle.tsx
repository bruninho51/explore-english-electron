import styled from 'styled-components';

export const LoadStatusStyle = styled.div`
  box-sizing: border-box;
  position: relative;
  width: 100%;
  min-height: 20px;
  background: ${(props: any) => props.color ? props.color : '#FFF'};
  position: absolute;
  bottom: -28px;
  border-radius: 5px;
  box-shadow: 0px 5px 15px 0px;
  padding: 2px 10px 2px 10px;
  font: 24px Roboto, sans-serif;
  text-align: center;
  margin: 5px 0px 5px 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

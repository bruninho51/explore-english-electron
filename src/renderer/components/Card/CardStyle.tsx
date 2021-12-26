import styled from 'styled-components';

export const CardStyle = styled.div<{ status: string }>`
  box-sizing: border-box;
  width: 100%;
  min-height: 100px;
  background: #FFF;
  border-radius: 5px;
  box-shadow: 0px 5px 15px 0px;
  padding: 5px 50px 5px 10px;
  font: 24px Roboto, sans-serif;
  text-align: center;
  margin: ${(props: any) => props.status ? '5px 0px 30px 0px;' : '5px 0px 5px 0px;'};
`;

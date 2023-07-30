import styled from "styled-components";

export const FlexCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${(props) => (props.marginTop ? props.marginTop : "0px")};
  flex-direction: ${(props) => (props.direction ? props.direction : "row")};
`;

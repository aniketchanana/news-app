import React from "react";
import styled from "styled-components";
import { News } from "./modules/News";

function App() {
  return (
    <MainContainer>
      <News />
    </MainContainer>
  );
}

const MainContainer = styled.div`
  height: 100vh;
  width: 100vw;
  padding: 30px;
`;
export default App;

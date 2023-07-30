import React from "react";
import styled from "styled-components";

export const NewsCard = ({ content, title, urlToImage }) => {
  return (
    <CardContainer>
      <h1>{title}</h1>
      <p>{content}</p>
      <img src={urlToImage} style={{ width: "100%" }} alt="news"></img>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  box-shadow: 0px 0px 22px 1px rgba(0, 0, 0, 0.2);
  margin-top: 50px;
  padding: 10px;
`;

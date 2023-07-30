import { NewsCard } from "./NewsCard";
import { InitialNewsState } from "./InitialNewsState";
import styled from "styled-components";
import { Spin } from "antd";
import { FlexCenter } from "../../styledComponents";
import { ErrorSvg } from "./ErrorSvg";

export const NewsList = ({
  newsArticles,
  isNewsArticleLoading,
  errorMessage = "",
}) => {
  if (isNewsArticleLoading) {
    return (
      <FlexCenter marginTop={"120px"}>
        <Spin size="large" />
      </FlexCenter>
    );
  }
  if (errorMessage) {
    return (
      <FlexCenter marginTop={"80px"}>
        <ErrorSvg errorMessage={errorMessage} />
      </FlexCenter>
    );
  }
  return newsArticles.length === 0 ? (
    <InitialNewsState />
  ) : (
    <CardContainer>
      {newsArticles.map((article, index) => (
        <NewsCard {...article} key={index} />
      ))}
    </CardContainer>
  );
};

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 600px;
  align-self: center;
`;

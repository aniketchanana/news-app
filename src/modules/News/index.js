import React, { useState } from "react";
import styled from "styled-components";
import { Input, Button, DatePicker } from "antd";
import moment from "moment";
import { getNews } from "./services/api";
import { NewsList } from "./NewsList";

const dateFormat = "YYYY-MM-DD";
const { RangePicker } = DatePicker;

export const News = () => {
  const [query, setQuery] = useState({
    topic: "",
    date: null,
  });
  const [newsArticles, setNewsArticle] = useState([]);
  const [isNewsArticleLoading, setIsNewsArticleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchResults = async () => {
    let response = [];
    setIsNewsArticleLoading(true);
    try {
      response = await getNews(
        query.topic,
        query.date !== null
          ? `from=${query.date.from}&to=${query.date.from}`
          : ""
      );
    } catch (e) {
      setErrorMessage(e.response.data.message);
    } finally {
      setIsNewsArticleLoading(false);
    }
    setNewsArticle(response.data.articles);
  };

  const updateQueryObj = (key, value) => {
    const updatedValues = {};
    updatedValues[key] = value;
    setQuery({
      ...query,
      ...updatedValues,
    });
  };

  const updateDate = (dateRange) => {
    const [startDate, endDate] = dateRange;
    updateQueryObj("date", {
      from: moment(startDate).format(dateFormat),
      to: moment(endDate).format(dateFormat),
    });
  };
  const updateTopic = (e) => {
    updateQueryObj("topic", e.target.value);
  };
  return (
    <NewsContainer>
      <SearchContainer>
        <Input
          size="large"
          placeholder="Search news..."
          onChange={updateTopic}
        />
        <RangePicker format={dateFormat} onChange={updateDate} />
        <Button size="large" type="primary" onClick={fetchResults}>
          Search
        </Button>
      </SearchContainer>
      <NewsList
        newsArticles={newsArticles}
        isNewsArticleLoading={isNewsArticleLoading}
        errorMessage={errorMessage}
      />
    </NewsContainer>
  );
};

const NewsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const SearchContainer = styled.div`
  display: flex;
  width: 600px;
  align-self: center;
`;

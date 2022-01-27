import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Input, Button, DatePicker } from "antd";
import moment from "moment";
import { getNews } from "./services/api";
import { NewsCard } from "./NewsCard";

const dateFormat = "YYYY-MM-DD";
const { RangePicker } = DatePicker;

export const News = () => {
  const [query, setQuery] = useState({
    topic: "",
    date: null,
  });

  const [newsArticles, setNewsArticle] = useState([]);

  const fetchResults = async () => {
    let response = [];
    try {
      response = await getNews(
        query.topic,
        query.date !== null
          ? `from=${query.date.from}&to=${query.date.from}`
          : ""
      );
    } catch (e) {}
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
      <CardContainer>
        {newsArticles.map((article, index) => (
          <NewsCard {...article} key={index} />
        ))}
      </CardContainer>
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
const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 600px;
  align-self: center;
`;

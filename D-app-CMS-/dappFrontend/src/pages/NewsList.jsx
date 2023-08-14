import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import NewsItem from "../components/NewsItem";
import { newsList, newsList2 } from "../staticData";

const NewsList = ({ setSidebarOpen }) => {
  window.scrollTo(0, 0);
  useEffect(() => {
    setSidebarOpen(false);
  }, []);

  return (
    <div className="record-page">
      <div className="record-header page-header">
        <div
          className="back-button-wrapper"
          style={{ display: "flex", justifyContent: "center" }}
        >
            <Link to="/">
              <img src="/assets/icons/backnew.svg" className="back-image" alt="" />
            </Link>
        </div>
        <div className="record-header-inner">
          <p className="section-name text-center">News</p>
        </div>
      </div>

      <section className="section-common">
        {newsList2.map((news) => {
          return (
            <>
              <Link to={news.link}>
                <NewsItem
                  title={news.title}
                  subtitle={news.subtitle}
                  time={news.time}
                  img={news.img}
                />
              </Link>
            </>
          );
        })}
      </section>
    </div>
  );
};

export default NewsList;

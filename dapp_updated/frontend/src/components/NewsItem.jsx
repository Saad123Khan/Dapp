import React from "react";

const NewsItem = ({ title, subtitle, time, img }) => {
  return (
    <>
      <div className="news-item py-2">
        <div className="flex-space">
          <div>
            <p className="muted">
              {title}
              <span className="orange ms-1">{time} ago</span>
            </p>
            <p className="card-title">{subtitle}</p>
          </div>
          <div className="square-img news-img">
            <img src={img} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsItem;

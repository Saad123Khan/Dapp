import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import { newsList2 } from "../staticData";
import { useParams } from "react-router-dom";

const NewsPage = ({ setSidebarOpen }) => {
  window.scrollTo(0, 0);
  useEffect(() => {
    setSidebarOpen(false);
  }, []);
  const handleBack = () => {
    window.history.back();
  };
  const { id } = useParams();
  const news = newsList2[id];

  return (
    <div className="report_detail">
<div className="top" >
  <img onClick={()=>handleBack()} src="/assets/icons/back_icon.svg" className="backnew"/> 
  News </div>
  
  <div className="detail_content">

  <div className="title" >
    <div className="text">{(newsList2[id]?.subtitle)}</div>
  </div>

<div className="detail-news-section">
<p>{parse(newsList2[id]?.desc)}</p>
</div>
  </div>
    </div>
  );
};

export default NewsPage;

import React from "react";
import { Info } from "@mui/icons-material";
import "../css/widgets.css";
import { FiberManualRecord } from "@mui/icons-material";

function Widgets() {
  const newsArticle = (heading, subtitle) => (
    <div className="widgets__article">
      <div className="widgets__articleLeft">
        <FiberManualRecord />
      </div>
      <div className="widgets__articleRight">
        <h4>{heading}</h4>
        <p>{subtitle}</p>
      </div>
    </div>
  );

  return (
    <div className="widgets">
      <div className="widgets__header">
        <h2>LinkedIn News</h2>
        <Info />
      </div>
      {newsArticle("Tesla Motors is here!!", "Top news - 9909 readers")}
      {newsArticle("Tesla Motors is here!!", "Top news - 896 readers")}
      {newsArticle("Tesla Motors is here!!", "Cars & auto - 1235 readers")}
      {newsArticle("Tesla Motors is here!!", "Crypto - 8000 readers")}
      {newsArticle("Tesla Motors is here!!", "Code - 9999 readers")}
      {newsArticle("GNE Addmissions started!!", "College - 548 readers")}
    </div>
  );
}

export default Widgets;

import React from "react";
import ContentModal from "../ContentModal/ContentModal";

import { img_300, unavailable } from "../../config/config";

import "./SingleContent.css";

const SingleContent = ({
  id,
  poster,
  title,
  date,
  media_type,
  vote_average,
}) => {
  return (
    <ContentModal media_type={media_type} id={id}>
      <div className="media">
        <div className="badge-container">
          <span className={`badge ${vote_average > 6 ? "good" : "bad"}`}>
            {vote_average}
          </span>
        </div>
        <img
          className="poster"
          src={poster ? `${img_300}${poster}` : unavailable}
          alt={title}
        />
        <div className="title">{title}</div>
        <div className="subTitle">
          {media_type === "tv" ? "TV Series" : "Movie"} | {date}
        </div>
      </div>
    </ContentModal>
  );
};

export default SingleContent;

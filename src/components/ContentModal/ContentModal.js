import React, { useEffect, useState } from "react";
import axios from "axios";
// import YouTubeIcon from '@mui/icons-material/YouTube';
import Carousel from "../Carousel/Carousel";
import {
  img_500,
  unavailable,
  unavailableLandscape,
} from "../../config/config";

import "./ContentModal.css";

export default function ContentModal({ children, media_type, id }) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  const [video, setVideo] = useState();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=a6ad2973195ecefe389848924abcd908&language=en-US`
    );

    setContent(data);
  };

  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=a6ad2973195ecefe389848924abcd908&language=en-US`
    );

    setVideo(data.results[0]?.key);
  };

  useEffect(() => {
    fetchData();
    fetchVideo();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div
        className="media"
        style={{ cursor: "pointer" }}
        color="inherit"
        onClick={handleOpen}
      >
        {children}
      </div>
      {open && (
        <div className="modalBackground">
          <div className="modalContainer">
            {content && (
              <>
                <div className="poster">
                  <img
                    src={
                      content.poster_path
                        ? `${img_500}/${content.poster_path}`
                        : unavailable
                    }
                    alt={content.name || content.title}
                  />
                  <img
                    src={
                      content.backdrop_path
                        ? `${img_500}/${content.backdrop_path}`
                        : unavailableLandscape
                    }
                    alt={content.name || content.title}
                    className="landscape"
                  />
                </div>
                <div className="content">
                  <h2 className="title">
                    {content.name || content.title} (
                    {(
                      content.first_air_date ||
                      content.release_date ||
                      "-----"
                    ).substring(0, 4)}
                    )
                  </h2>
                  {content.tagline && <i className="tagline">{content.tagline}</i>}
                  <p className="description">{content.overview}</p>
                  <div className="carouselContainer">
                    <Carousel id={id} media_type={media_type} />
                  </div>
                  <a
                    className="trailerLink"
                    href={`https://www.youtube.com/watch?v=${video}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="watchTrailer">
                      Watch the Trailer 
                    </button>
                  </a>
                </div>
              </>
            )}
            <button className="closeButton" onClick={handleClose}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}

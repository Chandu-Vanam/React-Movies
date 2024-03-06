import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (value === 0) {
      navigate("/");
    } else if (value === 1) {
      navigate("/movies");
    } else if (value === 2) {
      navigate("/series");
    } else if (value === 3) {
      navigate("/search");
    }
  }, [value, navigate]);

  return (
    <>
        <div className="navigation">
    <span onClick={() => window.scroll(0, 0)} className="header">
      Movie Maze
    </span>
      <div className="navigation-items">
      <div
          className={`navigation-item ${value === 0 ? 'active' : ''}`}
          onClick={() => setValue(0)}
        >
          Trending
        </div>
        <div
          className={`navigation-item ${value === 1 ? 'active' : ''}`}
          onClick={() => setValue(1)}
        >
          Movies
        </div>
        <div
          className={`navigation-item ${value === 2 ? 'active' : ''}`}
          onClick={() => setValue(2)}
        >
          TV Series
        </div>
        <div
          className={`navigation-item ${value === 3 ? 'active' : ''}`}
          onClick={() => setValue(3)}
        >
          Search
        </div>
      </div>
      </div>
  </>
  );
};

export default Header;

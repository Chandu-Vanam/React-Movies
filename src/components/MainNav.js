import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./mainNav.css";

const SimpleBottomNavigation = () => {
  const [value, setValue] = React.useState(0);
  const history = useNavigate();

  useEffect(() => {
    if (value === 0) {
      history("/");
    } else if (value === 1) {
      history("/movies");
    } else if (value === 2) {
      history("/series");
    } else if (value === 3) {
      history("/search");
    }
  }, [value, history]);

  return (
    <div className="bottom-navigation">
      <div
        className={`bottom-navigation-item ${value === 0 ? 'active' : ''}`}
        onClick={() => setValue(0)}
      >
        Trending
      </div>
      <div
        className={`bottom-navigation-item ${value === 1 ? 'active' : ''}`}
        onClick={() => setValue(1)}
      >
        Movies
      </div>
      <div
        className={`bottom-navigation-item ${value === 2 ? 'active' : ''}`}
        onClick={() => setValue(2)}
      >
        TV Series
      </div>
      <div
        className={`bottom-navigation-item ${value === 3 ? 'active' : ''}`}
        onClick={() => setValue(3)}
      >
        Search
      </div>
    </div>
  );
}

export default SimpleBottomNavigation;

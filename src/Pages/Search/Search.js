import { useState, useEffect } from "react";
import axios from "axios";
import CustomPagination from "../../components/Pagination/CustomPagination";
import SingleContent from "../../components/SingleContent/SingleContent";

const Search = () => {
  const [type, setType] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();

  const fetchSearch = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=a6ad2973195ecefe389848924abcd908&language=en-US&query=${searchText}&page=${page}&include_adult=false`
      );
      setContent(data.results);
      setNumOfPages(data.total_pages);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
  }, [type, page]);

  return (
    <div>
      <div className="search">
        <input
          style={{ flex: 1 }}
          className="searchBox"
          placeholder="Search"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button
          onClick={fetchSearch}
          className="searchButton"
        >
          Search
        </button>
      </div>
      <div className="tabs">
        <button
          className={type === 0 ? "active" : ""}
          onClick={() => {
            setType(0);
            setPage(1);
          }}
        >
          Search Movies
        </button>
        <button
          className={type === 1 ? "active" : ""}
          onClick={() => {
            setType(1);
            setPage(1);
          }}
        >
          Search TV Series
        </button>
      </div>
      <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={type ? "tv" : "movie"}
              vote_average={c.vote_average}
            />
          ))}
        {searchText &&
          !content &&
          (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Search;

import axios from "axios";
import { useEffect, useState } from "react";
import './genres.css';

const Genres = ({
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
  type,
  setPage,
}) => {
  const [loading, setLoading] = useState(true);

  const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
  };

  const handleRemove = (genre) => {
    setSelectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id)
    );
    setGenres([...genres, genre]);
    setPage(1);
  };

  const fetchGenres = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/genre/${type}/list?api_key=a6ad2973195ecefe389848924abcd908&language=en-US`
      );
      setGenres(data.genres);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching genres:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGenres();

    return () => {
      setGenres([]); // unmounting
    };
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <div>Loading genres...</div>;
  }

  return (
    <div className="genres-container">
      {selectedGenres.map((genre) => (
        <div className="chip selected" key={genre.id} onClick={() => handleRemove(genre)}>
          {genre.name}
        </div>
      ))}
      {Array.isArray(genres) && genres.map((genre) => (
        <div className="chip" key={genre.id} onClick={() => handleAdd(genre)}>
          {genre.name}
        </div>
      ))}
    </div>
  );
};

export default Genres;

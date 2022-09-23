import React from "react";
import "./Home.scss";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { BiPlay } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";

const apikey = "25da43cc7e56bc6759c70a1c1dc2af47";
const url = "https://api.themoviedb.org/3";
const upcoming = "upcoming";
const imgUrl = " https://image.tmdb.org/t/p/original";
const nowPlaying = "now_playing";
const popular = "popular";
const topRated = "top_rated";

const Card = ({ img }) => <img className="card" src={img} alt="cover" />;

const Row = ({ title, arr = [] }) => (
  <div className="row">
    <h2>{title}</h2>
    <div>
      {arr.map((item, index) => (
        <Card key={index} img={`${imgUrl}/${item.poster_path}`} />
      ))}
    </div>
  </div>
);

const Home = () => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [genre, setGenre] = useState([]);

  useEffect(() => {
    const fetchUpcoming = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${upcoming}?api_key=${apikey}`);
      setUpcomingMovies(results);
    };
    const fetchPopular = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${popular}?api_key=${apikey}`);
      setPopularMovies(results);
    };
    const fetchNowPlaying = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${nowPlaying}?api_key=${apikey}`);
      setNowPlayingMovies(results);
    };
    const fetchTopRated = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${topRated}?api_key=${apikey}`);
      setTopRatedMovies(results);
    };

    const getAllGenre = async () => {
      const {
        data: { genres },
      } = await axios.get(`${url}/genre/movie/list?api_key=${apikey}`);
      setGenre(genres);
    };

    getAllGenre();
    fetchUpcoming();
    fetchPopular();
    fetchNowPlaying();
    fetchTopRated();
  }, []);
  return (
    <section className="home">
      <div
        className="banner"
        style={{
          backgroundImage: popularMovies[0]
            ? `url(${`${imgUrl}/${popularMovies[0].poster_path}`})`
            : "rgb(16, 16, 16)",
        }}
      >
        {popularMovies[0] && <h1>{popularMovies[0].original_title}</h1>}
        {popularMovies[0] && <p>{popularMovies[0].overview}</p>}
        <div>
          <button>
            <BiPlay />
            Play
          </button>
          <button>
            My List
            <AiOutlinePlus />
          </button>
        </div>
      </div>
      <Row title={"Upcoming"} arr={upcomingMovies} />
      <Row title={"Popular"} arr={popularMovies} />
      <Row title={"Top Rated"} arr={topRatedMovies} />
      <Row title={"Now Playing"} arr={nowPlayingMovies} />
      <div className="genreBox">
        {genre.map((item) => (
          <Link key={item.id} to={`/genre/${item.id}`}>
            {item.name}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Home;

import Hero from '../components/Hero';
import Features from '../components/Features';
import PopularBuses from '../components/popularBuses';
import SearchBar from '../components/searchBar';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
      <Hero />
      <SearchBar />
      <Features />
      <PopularBuses />
      <Footer />
    </>
  );
};

export default Home;
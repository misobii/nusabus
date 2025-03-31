import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import BusLists from './pages/BusLists';
import DepartureSchedule from './pages/DepartureSchedule';
import TicketOrder from './pages/TicketOrder';
import About from './pages/About';
import ContactUs from './pages/ContactUs';
import SearchResults from './pages/searchResults';
import BusDetail from './pages/BusDetail';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/bus/daftar-bus" element={<BusLists />} />
        <Route path="/bus/jadwal" element={<DepartureSchedule />} />
        <Route path="/bus/pesan-tiket" element={<TicketOrder />} />
        <Route path="/tentang-kami" element={<About />} />
        <Route path="/kontak" element={<ContactUs />} />
        <Route path="/bus/:id" element={<BusDetail />} />
      </Routes>
    </Router>
  );
}

export default App;

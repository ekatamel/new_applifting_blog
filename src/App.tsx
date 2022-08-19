import ArticleList from './components/ArticleList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import ArticleDetail from './components/ArticleDetail';
import Navbar from './components/Navbar';
import Login from './components/Login';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/articles" element={<ArticleList />} />
        <Route path="/articles/:id" element={<ArticleDetail />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

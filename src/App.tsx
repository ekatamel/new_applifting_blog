import ArticleList from './components/ArticleList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import ArticleDetail from './components/ArticleDetail';
import Navbar from './components/Navbar';
import Login from './components/Login';
import AdminArticles from './components/AdminArticles';
import AdminNewArticle from './components/AdminNewArticle';
import AdminEditArticle from './components/AdminEditArticle';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/articles" element={<ArticleList />} />
        <Route path="/articles/:id" element={<ArticleDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/myarticles" element={<AdminArticles />} />
        <Route path="/myarticles/create-new" element={<AdminNewArticle />} />
        <Route path="/myarticles/edit/:id" element={<AdminEditArticle />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

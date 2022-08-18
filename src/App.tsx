import ArticleList from "./components/ArticleList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import ArticleDetail from "./components/ArticleDetail";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/articles" element={<ArticleList />} />
        <Route path="/articles/:id" element={<ArticleDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

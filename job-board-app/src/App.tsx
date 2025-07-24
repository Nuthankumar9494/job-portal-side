import './App.css'
import { Routes, Route } from 'react-router-dom';
import JobsPage from './pages/JobsPage';
import BookmarksPage from './pages/BookmarksPage';
import NotFoundPage from './pages/NotFoundPage';
import Header from './Layout/Header';

function App() {

  return (
    <>
    <Header/>
      <Routes>
        <Route path="/" element={<JobsPage />} />
        <Route path="/bookmarks" element={<BookmarksPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App

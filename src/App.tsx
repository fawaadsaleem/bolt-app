import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Library from './components/Library';
import StoryPlayer from './components/StoryPlayer';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-950 to-indigo-950 font-story">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Library />} />
          <Route path="/story/:id" element={<StoryPlayer />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

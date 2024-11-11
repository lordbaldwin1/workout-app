import './App.css';
import WorkoutLog from './components/WorkoutLog';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
      <Routes>
        <Route path="/" element={<WorkoutLog />} />
        <Route path="/workout-log" element={<WorkoutLog />} />
      </Routes>
  );
}

export default App;

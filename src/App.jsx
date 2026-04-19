import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Exercises from "./pages/Exercises";
import CreateTemplate from "./pages/CreateTemplate";
import StartWorkout from "./pages/StartWorkout";
import WorkoutSession from "./pages/WorkoutSession";
import WorkoutHistory from "./pages/WorkoutHistory";


function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-bgMain text-textMain">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/exercises" element={<Exercises />} />
          <Route path="/templates/new" element={<CreateTemplate />} />
          <Route path="/sessions/start" element={<StartWorkout />} />
          <Route path="/sessions/run" element={<WorkoutSession />} />
          <Route path="/sessions/:templateId" element={<WorkoutSession />} />
          <Route path="/history" element={<WorkoutHistory />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
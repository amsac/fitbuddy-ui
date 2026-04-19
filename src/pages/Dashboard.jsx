import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
        {/* HISTORY ICON (absolute top-right) */}
  <button
    onClick={() => navigate("/history")}
    className="absolute top-0 right-0 text-xl border border-gray-700 p-2 rounded-lg hover:bg-card"
  >
    🕒
  </button>

<div className="relative mb-8">

  {/* TITLE (centered) */}
  <h1 className="heading-font text-5xl text-primary text-center">
    FITBUDDY
  </h1>



</div>

      {/* Buttons */}
      <div className="flex flex-col gap-6 w-full max-w-sm">

        <button
          onClick={() => navigate("/exercises")}
          className="bg-card border border-gray-700 py-4 rounded-xl hover:bg-primary hover:text-black transition"
        >
          View Exercises
        </button>

        <button
          onClick={() => navigate("/templates/new")}
          className="bg-card border border-gray-700 py-4 rounded-xl hover:bg-primary hover:text-black transition"
        >
          Create Template
        </button>

        <button
          onClick={() => navigate("/sessions/start")}
          className="bg-primary text-black py-4 rounded-xl font-semibold hover:bg-primaryHover transition"
        >
          Start Workout
        </button>

      </div>
    </div>
  );
}

export default Dashboard;
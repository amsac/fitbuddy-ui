import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect , useState} from "react";
function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [toast, setToast] = useState(null);


useEffect(() => {
  if (location.state?.success) {
    setToast(location.state.success);

    setTimeout(() => {
      setToast(null);
    }, 2500);
  }
}, []);
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
      {toast && (
  <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-primary text-black px-6 py-3 rounded-xl shadow-lg z-50">
    {toast}
  </div>
)}
    </div>
  );
}

export default Dashboard;
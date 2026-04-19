import { useEffect, useState } from "react";
import api from "../api/axiosClient";

function Exercises() {
  const [exercises, setExercises] = useState([]);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    fetchExercises();
  }, []);

  const fetchExercises = async () => {
    try {
      const res = await api.get("/exercises");
      setExercises(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleExercise = (id) => {
    if (activeId === id) {
      setActiveId(null); // close if same clicked
    } else {
      setActiveId(id); // open new, auto closes others
    }
  };

  return (
    <div className="min-h-screen bg-bgMain text-textMain px-4 py-6">

      <h2 className="text-2xl font-semibold mb-6">Exercises</h2>

      <div className="flex flex-col gap-4">

        {exercises?.map((ex) => {
          const isActive = activeId === ex.id;
          return (
            <div
              key={ex.id}
              className="bg-card border border-gray-700 rounded-xl overflow-hidden transition"
            >

              {/* 🔹 HEADER (always visible) */}
              <div
                onClick={() => toggleExercise(ex.id)}
                className="flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-800 transition"
              >

                {/* Thumbnail */}
                <img
                  src={ex.imageUrl}
                  alt={ex.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />

                {/* Title */}
                <h3 className="text-lg font-semibold flex-1">
                  {ex.name}
                </h3>

                {/* Indicator */}
                <span className="text-sm text-textSecondary">
                  {isActive ? "▲" : "▼"}
                </span>
              </div>

              {/* 🔥 EXPANDABLE CONTENT */}
              <div
                className={`grid transition-all duration-300 ${
                  isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  {/* 🎥 VIDEO */}
                  <video
                    src={ex.videoUrl}
                    className="w-full h-52 sm:h-64 object-contain bg-black"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />

                  {/* 📄 DETAILS */}
                  <div className="p-4">
                    <p className="text-sm text-textSecondary mb-2">
                      {ex.muscleGroup.toUpperCase()}
                    </p>

                    <p className="text-sm mb-3 whitespace-pre-wrap break-words">
                      {ex.overview}
                    </p>

                    {/* Instructions */}
                    <ul className="text-sm text-textSecondary list-disc pl-5 space-y-1">
                      {ex.instructions.split("|").map((step, idx) => (
                        <li key={idx}>{step.trim()}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

            </div>
          );
        })}

      </div>
    </div>
  );
}

export default Exercises;

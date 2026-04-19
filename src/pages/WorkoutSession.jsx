import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api/axiosClient";

function WorkoutSession() {
  const { state } = useLocation();

  const [session] = useState(state);
  const [activeId, setActiveId] = useState(null);

  // stores completed sets
  const [logs, setLogs] = useState({});

  // current input per exercise
  const [currentInput, setCurrentInput] = useState({});

  // rest timer per exercise
  const [restTimer, setRestTimer] = useState({});

  // 🔁 TIMER EFFECT
  useEffect(() => {
    const interval = setInterval(() => {
      setRestTimer((prev) => {
        const updated = { ...prev };

        Object.keys(updated).forEach((key) => {
          if (updated[key] > 0) {
            updated[key] -= 1;
          }
        });

        return updated;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const toggleAccordion = (id) => {
    setActiveId(activeId === id ? null : id);
  };
  const finishWorkout = async () => {
    const confirmFinish = window.confirm("Finish workout?");
    if (!confirmFinish) return;

    try {
      await api.post(`/sessions/${session.sessionId}/complete`);
      alert("🎉 Workout Completed!");
    } catch (err) {
      alert("❌ Failed");
    }
  };

  const logSet = async (exercise) => {
    const input = currentInput[exercise.exerciseLogId];

    if (!input?.reps) return;

    try {
      await api.post("/sets", {
        exerciseLogId: exercise.exerciseLogId,
        reps: Number(input.reps),
        weight: Number(input.weight || 0),
      });

      const existing = logs[exercise.exerciseLogId] || [];

      setLogs({
        ...logs,
        [exercise.exerciseLogId]: [
          ...existing,
          {
            reps: input.reps,
            weight: input.weight,
          },
        ],
      });

      // clear input
      setCurrentInput({
        ...currentInput,
        [exercise.exerciseLogId]: { reps: "", weight: "" },
      });

      // start 60 sec rest timer
      setRestTimer({
        ...restTimer,
        [exercise.exerciseLogId]: 3,
      });

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-bgMain text-textMain px-4 py-6">

      <h2 className="text-xl text-center mb-4">
        {session.templateName}
      </h2>

      {session.exercises.map((ex) => {
        const doneSets = (logs[ex.exerciseLogId] || []).length;
        const isOpen = activeId === ex.exerciseLogId;
        const remainingTime = restTimer[ex.exerciseLogId] || 0;

        return (
          <div
            key={ex.exerciseLogId}
            className="mb-4 bg-card border border-gray-700 rounded-xl overflow-hidden"
          >

            {/* HEADER */}
            <div
              onClick={() => toggleAccordion(ex.exerciseLogId)}
              className="flex justify-between p-4 cursor-pointer"
            >
              <span>{ex.exerciseName}</span>
              <span>{doneSets}/{ex.targetSets}</span>
            </div>

            {/* CONTENT */}
            <div className={`${isOpen ? "block" : "hidden"} p-4`}>

              {/* VIDEO */}
              <video
                src={ex.videoUrl}
                className="w-full max-h-[250px] object-contain bg-black mb-3"
                autoPlay
                loop
                muted
                playsInline
              />

              {/* OVERVIEW (preview) */}
              <ul className="text-sm text-textSecondary mb-3 list-disc pl-5">
                {ex.overview.split("|").slice(0, 2).map((p, i) => (
                  <li key={i}>{p.trim()}</li>
                ))}
              </ul>

              {/* ✅ PREVIOUS SETS */}
              <div className="flex flex-col items-center mb-3">
                {(logs[ex.exerciseLogId] || []).map((set, idx) => (
                  <div
                    key={idx}
                    className="flex gap-4 text-sm text-textSecondary mb-1"
                  >
                    <span>Set {idx + 1}</span>
                    <span>{set.reps} reps</span>
                    <span>{set.weight || 0} kg</span>
                  </div>
                ))}
              </div>

              {/* 🎯 CURRENT SET */}
              {doneSets < ex.targetSets && (
                <div className="flex flex-col items-center gap-3">

                  <div className="text-sm">
                    Set {doneSets + 1} / {ex.targetSets}
                  </div>

                  <div className="flex gap-3">

                    <input
                      type="number"
                      placeholder="Reps"
                      value={
                        currentInput[ex.exerciseLogId]?.reps || ""
                      }
                      onChange={(e) =>
                        setCurrentInput({
                          ...currentInput,
                          [ex.exerciseLogId]: {
                            ...currentInput[ex.exerciseLogId],
                            reps: e.target.value,
                          },
                        })
                      }
                      className="w-20 p-2 bg-bgMain border border-gray-700 rounded text-center"
                    />

                    <input
                      type="number"
                      placeholder="Weight"
                      value={
                        currentInput[ex.exerciseLogId]?.weight || ""
                      }
                      onChange={(e) =>
                        setCurrentInput({
                          ...currentInput,
                          [ex.exerciseLogId]: {
                            ...currentInput[ex.exerciseLogId],
                            weight: e.target.value,
                          },
                        })
                      }
                      className="w-20 p-2 bg-bgMain border border-gray-700 rounded text-center"
                    />

                  </div>

                  {/* ⏱️ REST TIMER OR BUTTON */}
                  {remainingTime > 0 ? (
                    <div className="text-yellow-400 font-semibold">
                      Rest: {remainingTime}s
                    </div>
                  ) : (
                    <button
                      onClick={() => logSet(ex)}
                      className="bg-primary text-black px-6 py-2 rounded"
                    >
                      + Log Set
                    </button>
                  )}

                </div>
              )}

              {/* ✅ COMPLETED */}
              {doneSets === ex.targetSets && (
                <div className="text-green-500 text-center mt-3">
                  ✅ Completed
                </div>
              )}

            </div>
          </div>
        );
      })}

      {/* FINISH BUTTON */}
      <button
        onClick={finishWorkout}
        className="w-full bg-primary text-black py-3 rounded-xl mt-4"
      >
        Finish Workout
      </button>

    </div>
  );
}

export default WorkoutSession;
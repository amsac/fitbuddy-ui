import { useEffect, useState } from "react";
import api from "../api/axiosClient";

function WorkoutHistory() {
  const [sessions, setSessions] = useState([]);
  const [activeSession, setActiveSession] = useState(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await api.get("/sessions/users/1/completed");
      setSessions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleSession = (id) => {
    setActiveSession(activeSession === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-bgMain text-textMain flex justify-center">
      <div className="w-full max-w-md p-4">

        <h2 className="text-xl mb-4 text-center">
          Workout History
        </h2>

        <div className="flex flex-col gap-4">

          {sessions.map((session) => {
            const isOpen = activeSession === session.sessionId;

            return (
              <div
                key={session.sessionId}
                className="bg-card border border-gray-700 rounded-xl overflow-hidden"
              >

                {/* HEADER */}
                <div
                  onClick={() => toggleSession(session.sessionId)}
                  className="flex justify-between items-center p-4 cursor-pointer"
                >
                  <div className="text-left">
                    <p className="font-semibold">
                      {session.templateName}
                    </p>
                    <p className="text-sm text-textSecondary">
                      {session.date}
                    </p>
                  </div>

                  <span className="text-sm">
                    {isOpen ? "▲" : "▼"}
                  </span>
                </div>

                {/* CONTENT */}
                <div className={`${isOpen ? "block" : "hidden"} p-4`}>

                  <p className="text-sm text-textSecondary text-center mb-3">
                    {new Date(session.completedAt).toLocaleTimeString()}
                  </p>

                  {session.exercises.map((ex, idx) => (
                    <div key={idx} className="mb-3 text-center">

                      <p className="font-medium mb-1">
                        {ex.exerciseName}
                      </p>
{/* 
                      {ex.sets.map((set) => (
                        <div
                          key={set.setNumber}
                          className="flex justify-center gap-4 text-sm text-textSecondary"
                        >
                          <span>Set {set.setNumber}</span>
                          <span>{set.reps}</span>
                          <span>{set.weight} kg</span>
                        </div>
                      ))} */}
                      {ex.sets.map((set) => (
                            <div
                                key={set.setNumber}
                                className="flex justify-center items-center gap-3 mb-2"
                            >

                                {/* Set Number */}
                                <div className="w-16 p-2 bg-bgMain border border-gray-700 rounded text-center text-sm">
                                Set {set.setNumber}
                                </div>

                                {/* Reps */}
                                <div className="w-20 p-2 bg-bgMain border border-gray-700 rounded text-center">
                                {set.reps}
                                </div>

                                {/* Weight */}
                                <div className="w-20 p-2 bg-bgMain border border-gray-700 rounded text-center">
                                {set.weight}
                                </div>

                            </div>
                            ))}

                    </div>
                  ))}

                </div>

              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
}

export default WorkoutHistory;
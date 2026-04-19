import { useEffect, useState } from "react";
import api from "../api/axiosClient";
import { useNavigate } from "react-router-dom";

function StartWorkout() {
  const [templates, setTemplates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTemplates();
  }, []);
  const startSession = async (templateId) => {
  try {
    const res = await api.post("/sessions/start", {
      userId: 1,
      templateId,
    });

    navigate(`/sessions/run`, {
      state: res.data, // pass session
    });
  } catch (err) {
    console.error(err);
  }
};

  const fetchTemplates = async () => {
    const res = await api.get("/templates");
    setTemplates(res.data);
  };

  return (
    <div className="min-h-screen bg-bgMain text-textMain p-4">

      <h2 className="text-2xl mb-6">Select Workout</h2>

      <div className="flex flex-col gap-4">

        {templates.map((tpl) => (
          <div
            key={tpl.id}
            onClick={() => startSession(tpl.id)}
            className="bg-card p-4 rounded-xl border border-gray-700 cursor-pointer hover:border-primary"
          >
            <h3 className="font-semibold">{tpl.name}</h3>
            <p className="text-sm text-textSecondary">{tpl.description}</p>
          </div>
        ))}

      </div>
    </div>
  );
}

export default StartWorkout;
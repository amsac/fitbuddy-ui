import { useEffect, useState } from "react";
import api from "../api/axiosClient";

const MUSCLE_GROUPS = ["ALL", "chest", "legs", "biceps", "triceps", "back", "shoulders"];

function CreateTemplate() {
  const [exercises, setExercises] = useState([]);
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");
  const [muscle, setMuscle] = useState("ALL");

  const [template, setTemplate] = useState({
    name: "",
    description: "",
    level: "BEGINNER",
  });

  useEffect(() => {
    fetchExercises();
  }, []);

  const fetchExercises = async () => {
    const res = await api.get("/exercises");
    setExercises(res.data);
  };

  // 🔍 FILTER LOGIC
  const filtered = exercises?.filter((ex) => {
    const matchSearch = ex.name.toLowerCase().includes(search.toLowerCase());
    const matchMuscle = muscle === "ALL" || ex.muscleGroup === muscle;
    return matchSearch && matchMuscle;
  });

  // ➕ ADD / REMOVE
  const toggleSelect = (ex) => {
    const exists = selected.find((e) => e.exerciseId === ex.id);

    if (exists) {
      setSelected(selected.filter((e) => e.exerciseId !== ex.id));
    } else {
      setSelected([
        ...selected,
        {
          exerciseId: ex.id,
          targetSets: 3,
          targetReps: 10,
          name: ex.name,
          externalId: ex.externalId
        },
      ]);
    }
  };

  const isSelected = (id) => {
    return selected.some((e) => e.exerciseId === id);
  };

  // 🚀 CREATE TEMPLATE
  const createTemplate = async () => {
    try {
      await api.post("/templates", {
        ...template,
        createdBy: 1,
        exercises: selected.map(({ name, ...rest }) => rest),
      });

      alert("✅ Template created successfully!");

      // reset
      setSelected([]);
      setTemplate({ name: "", description: "", level: "BEGINNER" });

    } catch (err) {
      alert("❌ Failed to create template");
    }
  };

  return (
    <div className="min-h-screen bg-bgMain text-textMain px-4 py-6">

      {/* 🧠 TEMPLATE INFO */}
      <div className="mb-6 space-y-3">
        <input
          placeholder="Template Name"
          value={template.name}
          onChange={(e) => setTemplate({ ...template, name: e.target.value })}
          className="w-full p-3 rounded bg-card border border-gray-700"
        />

        <textarea
          placeholder="Description"
          value={template.description}
          onChange={(e) => setTemplate({ ...template, description: e.target.value })}
          className="w-full p-3 rounded bg-card border border-gray-700"
        />

        <select
          value={template.level}
          onChange={(e) => setTemplate({ ...template, level: e.target.value })}
          className="w-full p-3 rounded bg-card border border-gray-700"
        >
          <option>BEGINNER</option>
          <option>INTERMEDIATE</option>
          <option>ADVANCED</option>
        </select>
      </div>

      {/* 🏷️ MUSCLE FILTER */}
      <div className="flex gap-2 overflow-x-auto mb-4">
        {MUSCLE_GROUPS.map((m) => (
          <button
            key={m}
            onClick={() => setMuscle(m)}
            className={`px-4 py-2 rounded-full border ${
              muscle === m ? "bg-primary text-black" : "bg-card border-gray-700"
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* 🔍 SEARCH */}
      <input
        placeholder="Search exercises..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 rounded bg-card border border-gray-700 mb-4"
      />

      {/* 📦 EXERCISES */}
      <div className="flex flex-col gap-3 mb-6">

        {filtered.map((ex) => (
          <div
            key={ex.id}
            className="flex items-center gap-4 bg-card p-3 rounded-xl border border-gray-700"
          >

            <img src={ex.imageUrl} className="w-16 h-16 rounded object-cover" />

            <div className="flex-1">
              <p className="font-semibold">{ex.name}</p>
              <p className="text-sm text-textSecondary">{ex.muscleGroup}</p>
            </div>

            <button
              onClick={() => toggleSelect(ex)}
              className={`px-3 py-1 rounded ${
                isSelected(ex.id)
                  ? "bg-red-500"
                  : "bg-primary text-black"
              }`}
            >
              {isSelected(ex.id) ? "Remove" : "Add"}
            </button>

          </div>
        ))}

      </div>

      {/* 📋 SELECTED */}
      <div className="mb-6">
        <h3 className="mb-2 font-semibold">Selected Exercises</h3>

        {selected.map((ex, idx) => (
<div key={idx} className="flex gap-3 items-center mb-2">

  <span className="flex-1">{ex.name}</span>

  {/* Sets */}
  <input
    type="number"
    placeholder="Sets"
    value={ex.targetSets}
    onChange={(e) => {
      const updated = [...selected];
      updated[idx].targetSets = e.target.value;
      setSelected(updated);
    }}
    className="w-20 p-2 bg-card border border-gray-700 rounded text-center"
  />

  {/* Reps */}
  <input
    type="number"
    placeholder="Reps"
    value={ex.targetReps}
    onChange={(e) => {
      const updated = [...selected];
      updated[idx].targetReps = e.target.value;
      setSelected(updated);
    }}
    className="w-20 p-2 bg-card border border-gray-700 rounded text-center"
  />

</div>
        ))}
      </div>

      {/* 🚀 SUBMIT */}
      <button
        onClick={createTemplate}
        className="w-full bg-primary text-black py-3 rounded-xl font-semibold"
      >
        Create Template
      </button>

    </div>
  );
}

export default CreateTemplate;
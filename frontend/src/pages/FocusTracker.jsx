import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";

const FocusTracker = () => {
  const [selectedMinutes, setSelectedMinutes] = useState(25);
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [currentTask, setCurrentTask] = useState("");
  const [sessions, setSessions] = useState([]);
    const [darkMode, setDarkMode] = useState(true);

  const DAILY_GOAL_MINUTES = 120;

  // Handle timer ticking
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          // Session complete
          handleSessionComplete();
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleSessionComplete = () => {
    const durationMinutes = Math.round(selectedMinutes);
    const finishedAt = new Date().toISOString();

    setSessions((prev) => [
      {
        id: Date.now(),
        task: currentTask || "Unnamed Focus Session",
        duration: durationMinutes,
        finishedAt,
      },
      ...prev,
    ]);
  };

  const handleStart = () => {
    if (secondsLeft === 0) {
      setSecondsLeft(selectedMinutes * 60);
    }
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSecondsLeft(selectedMinutes * 60);
  };

  const handleDurationChange = (minutes) => {
    if (isRunning) return; // don’t allow change mid-session
    setSelectedMinutes(minutes);
    setSecondsLeft(minutes * 60);
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60)
      .toString()
      .padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // Stats for today
  const todayString = new Date().toDateString();
  const todaySessions = sessions.filter(
    (s) => new Date(s.finishedAt).toDateString() === todayString
  );
  const totalMinutesToday = todaySessions.reduce(
    (sum, s) => sum + s.duration,
    0
  );
  const sessionsTodayCount = todaySessions.length;
  const goalPercent = Math.min(
    100,
    Math.round((totalMinutesToday / DAILY_GOAL_MINUTES) * 100)
  );

  // For circular progress (SVG)
  const CIRCLE_LENGTH = 283; // approx 2πr for r=45
  const strokeDashoffset =
    CIRCLE_LENGTH - (CIRCLE_LENGTH * goalPercent) / 100;

  return (
    <div className="w-full min-h-screen bg-[#EBDCCB] pt-[110px] px-4 sm:px-6 pb-8">
      <div className="max-w-6xl mx-auto">
<Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-bold text-[#4b3b1c] mb-4">
          🎯 Focus Tracker
        </h1>
        <p className="text-sm sm:text-base text-[#4b3b1c] opacity-80 mb-6">
          Plan your deep work, track focused minutes, and build a strong study streak.
        </p>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">

          {/* Total Focus Time */}
          <div className="bg-[#FDF5EA] rounded-xl p-4 shadow flex flex-col justify-between">
            <span className="text-sm text-[#4b3b1c] opacity-70">
              Today&apos;s Focus Time
            </span>
            <span className="text-3xl font-bold text-[#4b3b1c] mt-2">
              {totalMinutesToday} min
            </span>
            <span className="text-xs text-[#4b3b1c] opacity-70 mt-1">
              Goal: {DAILY_GOAL_MINUTES} min
            </span>
          </div>

          {/* Sessions Completed */}
          <div className="bg-[#FDF5EA] rounded-xl p-4 shadow flex flex-col justify-between">
            <span className="text-sm text-[#4b3b1c] opacity-70">
              Sessions Completed
            </span>
            <span className="text-3xl font-bold text-[#4b3b1c] mt-2">
              {sessionsTodayCount}
            </span>
            <span className="text-xs text-[#4b3b1c] opacity-70 mt-1">
              Deep focus blocks finished today
            </span>
          </div>

          {/* Daily Goal Ring */}
          <div className="bg-[#FDF5EA] rounded-xl p-4 shadow flex flex-col items-center justify-center">
            <span className="text-sm text-[#4b3b1c] opacity-70 mb-1">
              Daily Goal Progress
            </span>
            <div className="relative w-24 h-24 mb-1">
              <svg className="absolute top-0 left-0 w-full h-full">
                <circle
                  className="text-[#EBDCCB]"
                  strokeWidth="10"
                  stroke="currentColor"
                  fill="transparent"
                  r="45"
                  cx="60"
                  cy="60"
                />
                <circle
                  className="text-[#E2A16F]"
                  strokeWidth="10"
                  strokeDasharray={CIRCLE_LENGTH}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="45"
                  cx="60"
                  cy="60"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-[#4b3b1c]">
                {goalPercent}%
              </div>
            </div>
            <span className="text-xs text-[#4b3b1c] opacity-70">
              Keep going!
            </span>
          </div>
        </div>

        {/* Main Content: Timer + Session Log */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Focus Session Timer */}
          <div className="bg-[#FDF5EA] rounded-xl p-5 shadow flex flex-col">
            <h2 className="text-xl font-semibold text-[#4b3b1c] mb-3">
              ⏱️ Active Focus Session
            </h2>

            {/* Task Input */}
            <label className="text-sm text-[#4b3b1c] opacity-80 mb-1">
              What are you focusing on?
            </label>
            <input
              type="text"
              className="w-full rounded-lg border border-[#E2A16F]/40 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E2A16F]"
              placeholder="e.g. DSA - Sliding Window, DBMS - Normalization..."
              value={currentTask}
              onChange={(e) => setCurrentTask(e.target.value)}
            />

            {/* Duration Choices */}
            <div className="flex flex-wrap gap-2 mt-4">
              {[25, 45, 60].map((m) => (
                <button
                  key={m}
                  onClick={() => handleDurationChange(m)}
                  className={`
                    px-3 py-1 rounded-full text-sm border transition
                    ${
                      selectedMinutes === m
                        ? "bg-[#E2A16F] text-white border-[#E2A16F]"
                        : "bg-white text-[#4b3b1c] border-[#E2A16F]/40 hover:bg-[#E2A16F]/10"
                    }
                  `}
                >
                  {m} min
                </button>
              ))}
            </div>

            {/* Timer Display */}
            <div className="flex flex-col items-center justify-center mt-6 mb-4">
              <div className="text-5xl sm:text-6xl font-bold text-[#4b3b1c] tracking-widest">
                {formatTime(secondsLeft)}
              </div>
              <p className="mt-2 text-xs text-[#4b3b1c] opacity-70">
                Tip: Put your phone away and stay with this one task.
              </p>
            </div>

            {/* Controls */}
            <div className="flex gap-3 mt-auto">
              {!isRunning ? (
                <button
                  onClick={handleStart}
                  className="flex-1 bg-[#E2A16F] text-white py-2 rounded-lg font-semibold hover:scale-[1.02] transition shadow"
                >
                  Start Focus
                </button>
              ) : (
                <button
                  onClick={handlePause}
                  className="flex-1 bg-[#4b3b1c] text-white py-2 rounded-lg font-semibold hover:scale-[1.02] transition shadow"
                >
                  Pause
                </button>
              )}

              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-lg border border-[#4b3b1c]/40 text-[#4b3b1c] text-sm font-medium hover:bg-[#4b3b1c]/5 transition"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Session History */}
          <div className="bg-[#FDF5EA] rounded-xl p-5 shadow flex flex-col">
            <h2 className="text-xl font-semibold text-[#4b3b1c] mb-3">
              📚 Focus Session History (Today)
            </h2>

            {todaySessions.length === 0 ? (
              <p className="text-sm text-[#4b3b1c] opacity-75">
                No sessions completed yet today. Start a focus session to see your history here.
              </p>
            ) : (
              <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                {todaySessions.map((s) => (
                  <div
                    key={s.id}
                    className="bg-white rounded-lg p-3 shadow-sm border border-[#E2A16F]/20"
                  >
                    <div className="flex justify-between items-center gap-2">
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-[#4b3b1c]">
                          {s.task}
                        </p>
                        <p className="text-xs text-[#4b3b1c] opacity-70">
                          Finished at:{" "}
                          {new Date(s.finishedAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      <span className="text-xs font-semibold bg-[#E2A16F]/10 text-[#4b3b1c] px-2 py-1 rounded-full">
                        {s.duration} min
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <p className="mt-3 text-xs text-[#4b3b1c] opacity-60">
              This history is stored only in this session (no backend). Refreshing the page will reset it.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FocusTracker;

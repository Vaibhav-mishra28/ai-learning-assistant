import React from 'react'

const statsGrid = () => {
  return (
    <>
    {/* 1. Statistics */}
<div className="bg-[#FDF5EA] rounded-xl p-5 shadow-md">

  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
    
    {/* Time Studied */}
    <div className="bg-white rounded-lg p-3 shadow flex flex-col items-center">
      <span className="text-[#E2A16F] font-bold text-xl">12h</span>
      <span className="text-[#4b3b1c] text-sm opacity-80">Study Time</span>
    </div>

    {/* Notes Uploaded */}
    <div className="bg-white rounded-lg p-3 shadow flex flex-col items-center">
      <span className="text-[#E2A16F] font-bold text-xl">32</span>
      <span className="text-[#4b3b1c] text-sm opacity-80">Notes</span>
    </div>

    {/* Quiz Accuracy */}
    <div className="bg-white rounded-lg p-3 shadow flex flex-col items-center">
      <span className="text-[#E2A16F] font-bold text-xl">87%</span>
      <span className="text-[#4b3b1c] text-sm opacity-80">Accuracy</span>
    </div>

    {/* Concepts Learned */}
    <div className="bg-white rounded-lg p-3 shadow flex flex-col items-center">
      <span className="text-[#E2A16F] font-bold text-xl">58</span>
      <span className="text-[#4b3b1c] text-sm opacity-80">Concepts</span>
    </div>

    {/* Learning Streak */}
    <div className="bg-white rounded-lg p-3 shadow flex flex-col items-center">
      <span className="text-[#E2A16F] font-bold text-xl">7 days</span>
      <span className="text-[#4b3b1c] text-sm opacity-80">Streak</span>
    </div>

  </div>
</div>

    </>
  )
}

export default statsGrid
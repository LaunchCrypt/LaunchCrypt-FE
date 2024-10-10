import React from 'react'

function EllipsisButton() {
  return (
    <button className="h-12 w-12 bg-[#14142f] rounded-full flex items-center justify-center 
                    hover:bg-[#555571] transition duration-400 ease-in-out transform focus:outline-none focus:ring-0 group">
      <div className="flex space-x-1.5">
        <div className="w-1 h-1 bg-[#d3c3ec] rounded-full group-hover:bg-white transition duration-400"></div>
        <div className="w-1 h-1 bg-[#d3c3ec] rounded-full group-hover:bg-white transition duration-400"></div>
        <div className="w-1 h-1 bg-[#d3c3ec] rounded-full group-hover:bg-white transition duration-400"></div>
      </div>
    </button>
  );
}

export default EllipsisButton
import React from 'react'

function Footer() {
  return (
    <footer className="justify-center border-t border-white/20 h-full w-full bg-gray-900 text-center  mt-5">
      <p className="text-sm text-[#051F20]">
        &copy; {new Date().getFullYear()} FILMORA. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer
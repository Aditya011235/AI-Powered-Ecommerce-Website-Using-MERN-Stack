import React from 'react'

function Registration() {
  return (
    <div className='w-[100vw] h-[100vh] bg-gradient-to-r from-[#141414] to-[#0c2025] text-white flex flex-col items-center justify-start'>
      <div className='w-[100%] h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer'>
        <img className="w-[40px]" src={logo} alt="" />
        <h1 className='text-[22px] font-sans'>OneCart</h1>
      </div>
      <div></div>
    </div>
  )
}

export default Registration;

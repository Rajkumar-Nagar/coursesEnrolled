import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';


function Syllabus({ item }) {

  const [showDeatails, setshowDeatails] = useState(false)


  const handleDetails = () => {
    setshowDeatails(!showDeatails)
  }

  return (

    <button onClick={handleDetails} className=' w-full sm:w-1/2 space-y-1 bg-slate-300 px-5 rounded-md py-3'>
      <div className='flex  justify-between  items-center'>

        <h1 className='text-[#020202] font-semibold text-[1.10rem]'>{item.topic}</h1>
        {
          showDeatails ? <i class="fa-solid fa-angle-down"></i> :
            <i class="fa-solid fa-chevron-right"></i>
        }

      </div>

      {
        showDeatails && (

          <div className=''>
            <h1 className='text-left  text-[#646161] font-semibold text-[1rem]'>week : {item.week}</h1>
            <h1 className='text-left text-[#646161] font-semibold text-[1rem]'>{item.content}</h1>
          </div>

        )
      }

    </button>
  )
}

function Cource() {
  const cources = useSelector((state) => state.app.courses)
  const { id } = useParams();
  const CourcesDetails = cources.find((item) => item.id == id)
  console.log(CourcesDetails)

  return (
    <>

      <div className="container py-8   w-full pt-28  bg-[#abafce] h-full">
        <div className="maincontainer w-full m-auto px-3 space-y-2 max-w-6xl">

          <h1 className='text-black font-bold text-2xl'>
            {CourcesDetails?.name}
          </h1>
          <p className='text-black font-semibold text-xl'>
            {CourcesDetails?.description}
          </p>
          <div className='flex flex-col sm:flex-row sm:items-center gap-5'>

            <div className='flex items-center gap-2'>
              <div className='px-2 py-1 bg-white rounded-full '>
                <i class="fa-solid fa-chalkboard-user"></i>
              </div>
              <span className='text-black font-medium text-[1.10rem]'>{CourcesDetails?.instructor}</span>
            </div>

            <div>
              <span className='text-black font-medium text-[1.10rem]'>Location : </span>
              <span className='text-[#525558] font-medium text-[1.10rem]'>{CourcesDetails?.location} </span>
            </div>

            <div>
              <span className='text-black font-medium text-[1.10rem]'>Duration : </span>
              <span className='text-[#525558] font-medium text-[1.10rem]'>{CourcesDetails?.duration} </span>
            </div>
          </div>

          <div className='flex items-center gap-5 flex-wrap'>
            <div>
              <span className='text-black font-medium text-[1.10rem]'>Status : </span>
              <span className='text-[#525558] font-medium text-[1.10rem]'>{CourcesDetails?.enrollmentStatus}</span>
            </div>
            <div>
              <span className='text-black font-medium text-[1.10rem]'>Schedule : </span>
              <span className='text-[#525558] font-medium text-[1.10rem]' >
                {CourcesDetails?.schedule}
              </span>
            </div>
          </div>

        </div>
      </div>
      
      <div className="maincontainer my-2 w-full px-3 m-auto max-w-6xl">

        <div className=" border-2 py-5 px-5 space-y-2">
          <h1 className='text-black font-bold text-2xl'>Pre-requisites</h1>
          <p className='text-[#696d71] font-semibold text-[1.10rem]'>- {CourcesDetails?.prerequisites.join(", ")}</p>
        </div>

        <div className=" border-b-2 y-5 py-5 space-y-2">

          <h1 className='text-black font-bold text-2xl'>Syllabus</h1>
          <div className='flex flex-col space-y-2'>

            {
              CourcesDetails?.syllabus.map((item, index) => (
                <Syllabus item={item} key={index} />
              ))
            }

          </div>
        </div>

      </div>
    </>
  )
}

export default Cource
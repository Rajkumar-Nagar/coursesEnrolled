import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setProgress } from '../Redux/ReduxSlice'
import { db } from '../config/firbase';
import { collection, doc, addDoc, getDoc, getDocs, where } from "firebase/firestore";

function EnrolledDashboard({ item }) {
  const dispatch = useDispatch()
  const reduxcources = useSelector((state) => state.app.courses)
  const enrolledCourses = reduxcources.find((items) => items.id == item.course_id)

  // const handleUpdate=()=>{

  // }

  const handleComplete = () => {
    const userConfirmed = window.confirm("Are you sure you want to mark courses as complete?");
    if (userConfirmed) {

      dispatch(setProgress(item.course_id))
    }
  }

  const user = useSelector((state) => state.app.user)
  console.log(user)
  return (
    <div className="Enrolled border-2 border-black/5 w-[80%] min-w-[230px] px-7  py-5 space-y-1  bg-[#acc1d7] rounded-md flex gap-3  sm:gap-5 lg:flex-row lg:justify-normal justify-center flex-col items-center">

      <div className='lg:w-40 h-full w-full'>
        <img src="./backCover.png" alt="reload" />
      </div>

      <div className='space-y-1.5'>

        <h1 className='text-[#3a87da] text-center font-serif font-bold sm:text-2xl text-xl'>{enrolledCourses.name}</h1>
        <div className='flex items-center flex-col gap-5 lg:flex-row'>
          <div className='flex items-center gap-3'>
            <div className='px-2 py-1 bg-white rounded-full '>
              <i class="fa-solid fa-chalkboard-user"></i>
            </div>
            <span className='text-black font-serif font-bold sm:text-[1.2rem] text-base'>{enrolledCourses.instructor}</span>
          </div>
          <div>
            <span className='text-black font-serif font-bold sm:text-[1.2rem] text-base '>Due Date : </span>
            <span className='text-[#5c5d5f] font-serif font-bold sm:text-[1.2rem] text-base'> 12 Aug 2024</span>
          </div>
        </div>

        <div className="lg:w-[65%] w-full  bg-gray-200 rounded-full dark:bg-gray-700">
          <div
            className="bg-[#df72c4] text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
            style={{ width: `${item.progress}%` }}
          >
            {item.progress}
          </div>
        </div>

        {
          item.progress === 100 ?
            (
              <span className='text-black font-serif font-bold sm:text-[1.2rem] text-base '>Course is Completed</span>
            ) :
            (<div className='flex items-center space-x-4 pt-3'>
             
              <button onClick={handleComplete} className='px-4 py-2 rounded-md bg-[#75808d] text-[0.8rem] font-bold text-white hover:bg-slate-600 active:bg-slate-700'>
              Mark As complete 
              </button>
            </div >)
        }
      </div>
    </div >
  )
}


function Dashbord() {
  const user = useSelector((state) => state.app.user)
  console.log(user.enrolledCourses)

  return (
    <div className='mainContainer pt-28'>

      <div className='dashbordContainer bg-[#b8c5d3] m-auto border-black w-full md:w-[70vw] rounded-md '>

        <div className='w-full h-32 bg-[#7c9cbd] relative px-20 rounded-md'>
          <div className='w-32 h-32 absolute rounded-full bg-pink-400  bottom-[-30px]'>
          </div>
        </div>

        <div className="details py-10 px-5 sm:px-20 ">
          <h1 className='text-black/50 font-serif text-center sm:text-left font-bold text-xl'>{user.name}</h1>
          <div className='flex justify-center flex-col items-center space-y-3 my-10'>
            <h1 className='text-black font-serif text-center  font-bold text-3xl '>Enrolled Cources</h1>
            {
              user.enrolledCourses.map((item) => {
                return <EnrolledDashboard item={item} key={item.id} />
              })
            }
          </div>


        </div>

      </div>
    </div>
  )
}

export default Dashbord
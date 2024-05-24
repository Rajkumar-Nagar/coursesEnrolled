import React from 'react'
import { useNavigate } from 'react-router-dom';

function CoursesList({ course }) {

    const navigate = useNavigate();
    
    const handleCourseDetails = () => {
        navigate(`/Cource/${course.id}`)
    }

    return (
        <div className="Courcebox  w-full min-h-[22rem] border-2 border-black/50 rounded-md shadow-2xl  min-w-[220px]:">

            <img src="/backCover.png" alt="reload" className='w-full' />

            <div className="aftercover py-2 px-2 flex-col space-y-2">
                <h1 className='font-bold text-base text-black '>
                    {course.name}
                </h1>
                <p className='font-medium text-xs text-[#7b7b79] '>{course.description.slice(0, 80)}..</p>

                <div className="bottom flex items-center justify-between">
                    <div className='flex items-center gap-3'>
                        <div className='bg-[#e2e2df] p-1 rounded-full '>
                            <i className="fa-solid fa-chalkboard-user"></i>
                        </div>
                        <div>
                            <h1 className='font-semibold text-[0.9rem] text-black '>{course.instructor}</h1>
                            {/* <p className='font-medium text-xs text-[#7b7b79] '>{course.schedule}</p> */}
                        </div>
                    </div>

                    <button onClick={handleCourseDetails} className='px-5 py-1  bg-slate-600 rounded-md font-semibold text-[0.8rem] text-white hover:bg-slate-400 hover:text-black active:bg-slate-500'>
                        Details
                    </button>
                </div>
            </div>

        </div>
    )
}

export default CoursesList
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {searchCources} from "../Redux/ReduxSlice"
import { useNavigate, useSearchParams } from 'react-router-dom';


function Navbar({}) {

    const [searchItem, setsearchItem] = useState("")
    const reduxcources = useSelector((state) => state.app.courses)
    const navigate=useNavigate()
    const [searchParams, setSearchParams] = useSearchParams();

    const handlProfile=()=>{
        navigate("/Dashbord")
    }
    
    const dispatch=useDispatch();
    useEffect(() => {
        // Update the search params in the URL
        if (searchItem) {
            searchParams.set('search', searchItem);
        } else {
            searchParams.delete('search');
        }
        setSearchParams(searchParams);

        // Dispatch the search action
        dispatch(searchCources(searchItem));
    }, [searchItem, dispatch, searchParams, setSearchParams]);
   

    return (
        <div className='Navbar fixed h-[4.5rem] w-full   bg-gray-500 flex justify-between items-center sm:px-10 px-2 gap-x-10' style={{zIndex:"9999"}}>
            <div className='navLeft'>
                <h1 className='font-bold text-white text-2xl'>Course Enroll</h1>
            </div>

            <div className="navright flex items-center gap-3">
                <div className=" search w-30 md:w-60 h-10 border-2 px-3  gap-4 bg-white flex items-center border-black">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input
                        type="text"
                        placeholder="Search"
                        className="searchInput w-full"
                        value={searchItem}
                        onChange={(e) => setsearchItem(e.target.value)}
                        style={{ border: 'none', outline: 'none' }}
                    />
                </div>

                <button onClick={handlProfile} className="profile flex items-center gap-3">
                    <div className='bg-white px-3 py-2 rounded-full '>
                        <i className="fa-regular fa-user"></i>
                    </div>

                    <h1 className='text-white font-semibold md:block hidden'>Rajkumar nagar</h1>
                </button>
            </div>

        </div>
    );
}

export default Navbar;

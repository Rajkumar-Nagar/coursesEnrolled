import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  courses: [],
  SearchItem: [],
  Intial: false,
  user: null
}

export const counterSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    coursesAdd: (state, action) => {
      state.courses = action.payload
      state.Intial = true
      //  state.courses= [...state.courses,action.payload]
    },
    searchCources: (state, action) => {
      state.SearchItem = state.courses.filter((item) =>
        item.name.toUpperCase().includes(action.payload.toUpperCase()) ||
        item.instructor.toUpperCase().includes(action.payload.toUpperCase())
      );
    },
    setUser: (state, action) => {
      state.user = action.payload
    },

    setProgress: (state, action) => {
      const courseIndex = state.user.enrolledCourses.findIndex(item => item.course_id === action.payload);
      if (courseIndex !== -1) {
        state.user.enrolledCourses = state.user.enrolledCourses.map((course, index) => 
          index === courseIndex ? { ...course, progress: 100 } : course
        );
      } else {
        console.error(`Course with id ${action.payload} not found`);
      }
    }

  },
})

export const { coursesAdd, searchCources, setUser ,setProgress} = counterSlice.actions

export default counterSlice.reducer

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cource from "./Component/Cource";
import Dashbord from "./Component/Dashbord";
import { store,persistor } from "./Redux/Store";
import { Provider } from "react-redux";
import Home from "./Component/Home";
import Navbar from "./Component/Navbar";
import CoursesList from "./Component/CoursesList";
import { PersistGate } from "redux-persist/integration/react";


function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/CoursesList" element={<CoursesList />} />
            <Route path="/Cource/:id" element={<Cource />} />
            <Route path="/Dashbord" element={<Dashbord />} />

          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  )
}

export default App;

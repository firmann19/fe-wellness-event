import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { listen } from "./redux/listener";
import HomePage from "./pages/HomePage";
import CompanyHR from "./pages/CompanyHR/CompanyHR";
import Vendor from "./pages/Vendor/Vendor";
import CreateEventCompanyHR from "./components/CreateEvent";
import CreateCategory from "./components/CreateCategory";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import DetailWellnessEvent from "./components/DetailEvent";

function App() {
  useEffect(() => {
    listen();
  }, []);
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<HomePage />} />
        <Route path="/company-hr" element={<CompanyHR />} />
        <Route path="/vendor" element={<Vendor />} />
        <Route
          path="/create-wellness-event"
          element={<CreateEventCompanyHR />}
        />
        <Route
          path="/detail-wellness-event/:id"
          element={<DetailWellnessEvent />}
        />
        <Route path="/create-category" element={<CreateCategory />} />
      </Routes>
    </>
  );
}

export default App;

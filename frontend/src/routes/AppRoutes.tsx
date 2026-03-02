import { BrowserRouter, Routes, Route } from "react-router-dom";
import HealthPage from "../features/health/HealthPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HealthPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
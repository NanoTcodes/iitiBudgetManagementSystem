import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import AlertState from "./contexts/alert/AlertState";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Department from "./department/Department";
import Finance from "./finance/Finance";

function App() {
  return (
    <>
      <AlertState>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          style={{ fontSize: "1em" }}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <Router>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/dept" element={<Department />} />
            <Route exact path="/finance" element={<Finance />} />
          </Routes>
        </Router>
      </AlertState>
    </>
  );
}

export default App;

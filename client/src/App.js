import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import AlertState from "./contexts/alert/AlertState";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Department from "./department/Department";
import Finance from "./finance/Finance";
import FinHome from "./finance/Home/FinHome";
import YearState from "./contexts/year/YearState";
import DepartmentState from "./contexts/department/DepartmentState";
import UserState from "./contexts/select/SelectedUserState";
import DeptDetails from "./finance/Department/DeptDetails";
import AddUser from "./finance/AddUser/AddUser";
import UpdateProfile from "./finance/UpdateProfile/UpdateProfile";
import AllUsers from "./finance/AllUsers/AllUsers";
import NotFound from "./NotFound/NotFound";
import AboutUs from "./aboutus";
import Footer from "./footer/footer";

function App() {
  return (
    <>
      <AlertState>
        <YearState>
          <DepartmentState>
            <UserState>
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
                <Route exact path="/dept/" element={<Department />} />
                <Route path="aboutus" element={<AboutUs />}></Route>
                <Route exact path="/finance/" element={<Finance />}>
                  <Route path="" element={<FinHome />} />
                  <Route path="dept" element={<DeptDetails />} />
                  <Route path="adduser" element={<AddUser />}></Route>
                  <Route path="updateuser" element={<UpdateProfile />}></Route>
                  <Route path="allusers" element={<AllUsers />}></Route>
                </Route>
                <Route path="/*" element={<NotFound />} />
              </Routes>
            </Router>
            <Footer/>
            </UserState>
          </DepartmentState>
        </YearState>
      </AlertState>
      </>
  );
}

export default App;

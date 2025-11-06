import "./App.css";
import Home from "./pages/Home";
import { Route,Routes } from "react-router";
import Highlightext from "./components/core/HomePage/HighlighText"
import Navbar from "./components/common/Navbar"
import Login from "./pages/LogIn"
import SignUp from "./pages/Signup";
import ForgotPassword from "./pages/Forgot-Password";
import UpdatePassword from "./pages/UpdatePassword"
import VerifyEmail from "./pages/VerifyEmail"
import About from "./pages/about"
import Dashboard from "./pages/Dashboard";
import MyProfile from "./components/core/Dashboard/MyProfile";
import EditProfile from "./components/core/Dashboard/Settings/EditProfile";
import Setting from "./components/core/Dashboard/Setting"
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import { useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "./utilis/constants";
import AddCourse from "./components/core/Dashboard/AddCourse";
import MyCourse from "./components/core/Dashboard/MyCourse"
import Catalog from "./pages/Catalog";
import CourseDetail from "./pages/CourseDetail";
import EnrolledCourse from "./components/core/Dashboard/EnrolledCourse/EnrolledCourse"
import Cart from "./components/core/Dashboard/cart";
import Instructor from "./components/core/Dashboard/instructorDashboard/instructor";
import VideoDetails from "./components/core/viewcourse/videoDetail";
function App() {
  const {user}=useSelector((state)=>state.profile);
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter text-white ">
      {/* how do you create a Routes is a important thing  */}
      {/* bdhiya  */}
      {/* hello  */}
      <Navbar/>

      <Routes>
        {/* hath  */}


        <Route path="/" element={<Home/>}></Route>
        <Route path="/catalog/:catalogName" element={<Catalog/>}></Route>
        <Route path="/courses/:courseId" element={<CourseDetail/>}></Route>


        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route path="/forgot-password" element={<ForgotPassword/>}></Route>
        <Route path="/update-password/:id" element={<UpdatePassword/>}></Route>
        <Route path="/verify-Email" element={<VerifyEmail/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route  element={<PrivateRoute><Dashboard /></PrivateRoute>}>
            {/* <Route index element={<MyProfile />} /> Default child when "/dashboard" is visited */}
            {/* for all user  */}
            <Route path="dashboard/my-profile" element={<MyProfile />} /> 
            <Route path="dashboard/settings" element={<Setting />} /> 
           {
            user?.accountType===ACCOUNT_TYPE.STUDENT && (
              <>
              <Route path="dashboard/enrolled-courses" element={<EnrolledCourse />} /> 
              <Route path="dashboard/cart" element={<Cart />} /> 
              </>
            )
           }


            {/* for instrucut */}
            {
                            console.log("usertype is ",user?.accountType)

            }
            {   
              user?.accountType===ACCOUNT_TYPE.INSTRUCTOR && (
                <>
                <Route path="dashboard/add-course" element={< AddCourse/>}/>
                <Route path="dashboard/instructor" element={<Instructor />}/>
                <Route path="dashboard/my-courses" element={<MyCourse ></MyCourse>}/>

                </>
                
              
              )

            }
         </Route>

         <Route 
          element={ <PrivateRoute><ViewCourse /></PrivateRoute>
          }
        >
          {
            user?.accountType === "Student" && (
              <>
                <Route 
                  path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                  element={<VideoDetails />}
                />
              </>
            )
          }

        </Route>

        






      </Routes>
    </div>
  );
}

export default App;

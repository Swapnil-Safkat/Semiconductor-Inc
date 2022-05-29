import './App.css';
import { Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Navbar from './Components/Navbar';
import Home from './Pages/Home/Home';
import Login from './Pages/Authentication/Login';
import SignUp from './Pages/Authentication/SignUp';
import RequiredAuth from './Components/RequiredAuth';
import RequiredAdmin from './Components/RequiredAdmin';
import Dashboard from './Pages/Dashboard/Dashboard';
import MyOrders from './Pages/Dashboard/MyOrders';
import MyProfile from './Pages/Dashboard/MyProfile';
import AddReview from './Pages/Dashboard/AddReview';

function App() {
  return (
    <div data-theme="dark">
      <div className=' text-accent min-h-screen flex flex-col items-center justify-between'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='home' element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<SignUp />} />
          <Route path='dashboard' element={<RequiredAuth><Dashboard /></RequiredAuth>} >
            <Route index element={<MyProfile />} />
            <Route path='my-orders' element={<MyOrders />} />
            <Route path='add-review' element={<AddReview />} />
          </Route>
        </Routes>
        {/* <Routes>
          <Route path='/' element={<Home />} />
          <Route path='home' element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<SignUp />} />
          <Route path='appointment' element={<RequiredAuth><Appointment /></RequiredAuth>} />
          <Route path='dashboard' element={<RequiredAuth><Dashboard /></RequiredAuth>} >
            <Route index element={<MyAppointments />} />
            <Route path='reviews' element={<MyReviews />} />
            <Route path='history' element={<MyHistory />} />
            <Route path='payment/:_id' element={<Payment />} />
            <Route path='users' element={<RequiredAdmin><Users /></RequiredAdmin>} />
            <Route path='addDoctor' element={<RequiredAdmin><AddDoctor /></RequiredAdmin>} />
            <Route path='manageDoctor' element={<RequiredAdmin><ManageDoctor /></RequiredAdmin>} />
          </Route>
        </Routes> */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnHover />
      </div>
    </div>
  );
}

export default App;

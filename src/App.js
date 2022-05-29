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
import AddProduct from './Pages/Dashboard/AddProduct';
import ManageProduct from './Pages/Dashboard/ManageProduct';
import NotFound from './Components/NotFound';
import AllUsers from './Pages/Dashboard/AllUsers';
import Blogs from './Pages/Blogs/Blogs';
import Portfolio from './Pages/Portfolio/Portfolio';
import Purchase from './Pages/Home/Purchase';

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
          <Route path='blogs' element={<Blogs />} />
          <Route path='portfolio' element={<Portfolio />} />
          <Route path='purchase/:id' element={<RequiredAuth><Purchase /></RequiredAuth>} />
          <Route path='dashboard' element={<RequiredAuth><Dashboard /></RequiredAuth>} >
            <Route index element={<MyProfile />} />
            <Route path='my-orders' element={<MyOrders />} />
            <Route path='add-review' element={<AddReview />} />
            <Route path='add-product' element={<RequiredAdmin><AddProduct /></RequiredAdmin>} />
            <Route path='manage-product' element={<RequiredAdmin><ManageProduct /></RequiredAdmin>} />
            <Route path='all-users' element={<RequiredAdmin><AllUsers /></RequiredAdmin>} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>

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

import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import Register from "./components/User/Register/Register";
import Login from "./components/User/Login/Login";
import Navbar from "./components/Navigation/Navbar";
import AddNewCategory from "./components/Categories/AddNewCategory";
import CategoryList from "./components/Categories/CategoryList";
import UpdateCategory from "./components/Categories/UpdateCategory";
// import AdminRoute from "./components/Navigation/ProtectedRoutes/AdminRoute";
import CreatePost from "./components/Posts/CreatePost";
import PostsList from "./components/Posts/PostsList";
// import PrivateProtectRoute from "./components/Navigation/ProtectedRoutes/PrivateProtectRoute";


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* <Route element={<AdminRoute />} >
          <Route exact path="/add-category" element={<AddNewCategory />} />
        </Route> */}
        {/* <Route exact path="/add-category" element={(
        <AdminRoute ><AddNewCategory /></AdminRoute>)}/> */}

        <Route exact path="/update-category/:id" element={<UpdateCategory />} /> 
        <Route exact path="/posts" element={<PostsList />} />
        <Route exact path="/add-category" element={<AddNewCategory />} />
        <Route exact path="/category-list" element={<CategoryList />} />
        <Route exact path="/create-post" element={<CreatePost />} />
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


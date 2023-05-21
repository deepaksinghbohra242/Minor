import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import Register from "./components/User/Register/Register";
import Login from "./components/User/Login/Login";
import Navbar from "./components/Navigation/Navbar";
import AddNewCategory from "./components/Categories/AddNewCategory";
import CategoryList from "./components/Categories/CategoryList";
import UpdateCategory from "./components/Categories/UpdateCategory";
import CreatePost from "./components/Posts/CreatePost";
import PostsList from "./components/Posts/PostsList";
import PostDetails from "./components/Posts/PostDetails";
import UpdatePost from "./components/Posts/UpdatePost";
import Profile from "./components/User/Profile/Profile";
import UploadProfilePhoto from "./components/User/Profile/UploadProfilePhoto";
import UpdateProfileForm from "./components/User/Profile/UpdateProfileForm";
import SendEmail from "./components/User/Emailing/SendEmail";
import UsersList from "./components/User/UsersList/UsersList";
import AccountVerified from "./components/User/AccountVerification/AccountVerified"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/update-post/:id" element={<UpdatePost />} />
        <Route exact path="/update-category/:id" element={<UpdateCategory />} />
        <Route exact path="/posts" element={<PostsList />} />
        <Route exact path="/verify-account/:token" element={<AccountVerified />} />
        <Route exact path="/posts/:id" element={<PostDetails />} />
        <Route exact path="/add-category" element={<AddNewCategory />} />
        <Route exact path="/category-list" element={<CategoryList />} />
        <Route exact path="/create-post" element={<CreatePost />} />
        <Route exact path="/profile/:id" element={<Profile />} />
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/upload-profile-photo" element={<UploadProfilePhoto />} />
        <Route exact path="/update-profile/:id" element={<UpdateProfileForm />} />
        <Route exact path="/send-email" element={<SendEmail />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/users" element={<UsersList />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;


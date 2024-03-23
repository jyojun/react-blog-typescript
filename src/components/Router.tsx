import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import PostList from "../pages/posts";
import PostDetail from "../pages/posts/detail";
import PostWrite from "../pages/posts/write";
import PostEdit from "../pages/posts/edit";
import Profile from "../pages/profile";
import Login from "../pages/login";
import Signup from "../pages/signup";

export default function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<PostList />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/posts/write" element={<PostWrite />} />
        <Route path="/posts/edit/:id" element={<PostEdit />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </>
  );
}

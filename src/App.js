import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

// ^ import the pages
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import CreateBlog from "./pages/CreateBlog";
import BlogDetail from "./pages/BlogDetail";
import UpdateBlog from "./pages/UpdateBlog";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyBlog from "./pages/MyBlog";

function App() {
  const { user } = useAuthContext();
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/createblog"
              element={user ? <CreateBlog /> : <Navigate to="/login" />}
            />
            <Route
              path="myBlog"
              element={user ? <MyBlog /> : <Navigate to="/login" />}
            />
            <Route path="/:id" element={<BlogDetail />} />
            <Route
              path="/update/:id"
              element={user ? <UpdateBlog /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

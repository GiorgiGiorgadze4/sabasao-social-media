import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { createPost, fetchPosts } from "./api/posts.service";
import { ICreatePostData } from "./interfaces/createPostData";
import { IPost } from "./interfaces/post";
import Login from "./components/auth/Login";
import Register from "./components/auth/register";
import Header from "./components/common/Header";
import { IloggedUser } from "./interfaces/user";
import CreatePost from "./components/feed/CreatePost";
import Feed from "./components/feed/Feed";
import NavigationSidebar from "./components/common/NavigationSidebar";
import { loginUser } from "./api/posts.service";
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch and useSelector
import { RootState } from "./store/store"; // Import RootState for type safety

import { setUser } from "./store/userSlice"; // Import the setUser action
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App: React.FC = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch(); // Initialize dispatch for Redux actions
  const user = useSelector((state: RootState) => state.user.user); // Access user data from Redux store
  useEffect(() => {
    console.log("Updated user:", user);
  }, [user]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === "ok") {
      setIsLoggedIn(true);
    }
    setIsLoading(false);

    const loadPosts = async () => {
      try {
        const fetchedPosts = await fetchPosts();
        console.log(fetchedPosts);
        setPosts(fetchedPosts.reverse());
      } catch (error) {
        console.error("Error loading posts:", error);
      }
    };

    loadPosts();
  }, []);

  const handleLogin = async (username: string, password: string) => {
    try {
      const userDataLoad = await loginUser(username, password);
      // Dispatch the user data to the Redux store
      dispatch(setUser(userDataLoad.user)); // Set the logged-in user globally
      console.log("User logged in:", user); // Log the user from Redux state after dispatch

      localStorage.setItem("token", "ok");
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(setUser(null)); // Clear user data by setting it to null
    setIsLoggedIn(false);
  };

  const handleCreatePost = async (title: string, content: string) => {
    console.log("algorithm", user?.username);
    const newPostData: ICreatePostData = {
      title,
      content,
      username: user?.username, // Extract username correctly
      createdAt: user?.updatedAt, // Set the current date/time as createdAt
    };
    try {
      const createdPost = await createPost(newPostData, "ok");
      const updatedPosts = [createdPost, ...posts];
      setPosts(updatedPosts);
      console.log("userDATA", user);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login onLogin={handleLogin} />
          </Route>
          <Route exact path="/">
            {isLoggedIn ? (
              <>
                <Header onLogout={handleLogout} />
                <CreatePost onPostCreate={handleCreatePost} />
                <div className="main-content">
                  <NavigationSidebar />
                  <Feed posts={posts} />
                </div>
              </>
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;

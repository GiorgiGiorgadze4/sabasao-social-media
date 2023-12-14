import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { createPost, fetchPosts } from "./api/posts.service";
import { ICreatePostData } from "./interfaces/createPostData";
import { IPost } from "./interfaces/post";
import Login from "./components/auth/Login";
import Register from './components/auth/register';
import Header from './components/common/Header';
import CreatePost from './components/feed/CreatePost';
import Feed from './components/feed/Feed';
import NavigationSidebar from './components/common/NavigationSidebar';
import { loginUser } from "./api/posts.service";
//import RightSidebar from './components/common/RightSidebar'; // Uncomment if RightSidebar is implemented
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

const App: React.FC = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token === 'ok') {
      setIsLoggedIn(true);
    }
    setIsLoading(false);

    // Fetch posts from local storage
    const storedPosts = localStorage.getItem('posts');
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    }
  }, []);

  const handleLogin = async (username: string, password: string) => {
    try {
      await loginUser(username, password);
      localStorage.setItem('token', 'ok'); // Manually setting the token for testing
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  const handleCreatePost = async (title: string, content: string) => {
    const newPostData: ICreatePostData = { title, content };
    try {
      const createdPost = await createPost(newPostData, "ok"); // Use the token here if needed
      const updatedPosts = [createdPost, ...posts];
      setPosts(updatedPosts);

      // Save posts to local storage
      localStorage.setItem('posts', JSON.stringify(updatedPosts));
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
                  {/* Uncomment the line below when RightSidebar is implemented */}
                  {/* <RightSidebar friends={userFriends} /> */}
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

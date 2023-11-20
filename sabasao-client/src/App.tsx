// App.tsx
import React, { useState } from 'react';
import './App.css';

// Updated types
type Profile = {
  firstName: string;
  lastName: string;
  email: string;
};

type Post = {
  content: string;
  userId: number;
  postId: number;
};

type Friend = {
  name: string;
  occupation: string;
};

// Sample initial data
const userProfile: Profile = {
  firstName: 'Steve',
  lastName: 'Ralph',
  email: 'steve.ralph@example.com',
};

const userPosts: Post[] = [
  // ...initial posts
];

const userFriends: Friend[] = [
  // ...initial friends
];

// The main App component
const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(userPosts);

  const handleCreatePost = (content: string) => {
    const newPost: Post = {
      content,
      userId: 1, // This should be the ID of the user creating the post
      postId: Math.random(), // This should be a unique identifier for the post
    };
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="app">
      <Header />
      <CreatePost onPostCreate={handleCreatePost} />
      <div className="main-content">
        <NavigationSidebar />
        <Feed posts={posts} />
        <RightSidebar friends={userFriends} />
      </div>
    </div>
  );
};

// Header component
const Header: React.FC = () => {
  return (
    <header className="header">
      {/* Insert your header content here */}
    </header>
  );
};

// CreatePost component
const CreatePost: React.FC<{ onPostCreate: (content: string) => void }> = ({ onPostCreate }) => {
  const [postContent, setPostContent] = useState('');

  const handleSubmit = () => {
    if (postContent.trim()) {
      onPostCreate(postContent);
      setPostContent('');
    }
  };

  return (
    <div className="create-post">
      <textarea
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
        placeholder="What's on your mind..."
      />
      <button onClick={handleSubmit}>Post</button>
    </div>
  );
};

// Feed component
const Feed: React.FC<{ posts: Post[] }> = ({ posts }) => {
  return (
    <div className="feed">
      {posts.map((post, index) => (
        <div key={post.postId} className="post">
          <div className="post-content">{post.content}</div>
          {/* Placeholder for user info - should be fetched or passed down */}
          <div className="post-user-info">Posted by user ID {post.userId}</div>
        </div>
      ))}
    </div>
  );
};

// NavigationSidebar component
const NavigationSidebar: React.FC = () => {
  return (
    <nav className="navigation-sidebar">
      {/* Navigation links and user profile summary */}
    </nav>
  );
};

// RightSidebar component
const RightSidebar: React.FC<{ friends: Friend[] }> = ({ friends }) => {
  return (
    <aside className="right-sidebar">
      <div className="sponsored-content">
        {/* Sponsored ads content */}
      </div>
      <ul className="friend-list">
        {friends.map((friend, index) => (
          <li key={index} className="friend">
            <div className="friend-name">{friend.name}</div>
            <div className="friend-occupation">{friend.occupation}</div>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default App;

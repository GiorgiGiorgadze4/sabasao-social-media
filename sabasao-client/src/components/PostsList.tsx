import React, { useState, useEffect } from 'react';
import { fetchPosts } from '../api/posts.service';

const PostsList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* {posts.map(post => (
        <div key={post.id}>{post.title}</div>
      ))} */}
    </div>
  );
};

export default PostsList;

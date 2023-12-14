import React from 'react';
import { IPost } from '../../interfaces/post';

const Feed: React.FC<{ posts: IPost[] }> = ({ posts }) => {
  return (
    <div className="feed">
      {posts.map((post, index) => (
        <div key={index} className="post">
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Feed;

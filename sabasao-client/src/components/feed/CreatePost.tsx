import React, { useState } from "react";

const CreatePost: React.FC<{
  onPostCreate: (title: string, content: string) => void;
}> = ({ onPostCreate }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (title && content) {
      onPostCreate(title, content);
      setTitle("");
      setContent("");
    }
  };

  return (
    <div className="create-post">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
      />
      <button onClick={handleSubmit}>Create Post</button>
    </div>
  );
};

export default CreatePost;

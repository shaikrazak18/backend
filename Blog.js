import React, { useEffect, useState } from 'react';

export default function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/blog')
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h2>📝 Blog Posts</h2>
      {posts.length === 0 ? <p>Loading posts...</p> : (
        posts.map(post => (
          <article key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <hr />
          </article>
        ))
      )}
    </div>
  );
}

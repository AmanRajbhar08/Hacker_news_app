import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PostDetail = () => {
  // Extract postId from route parameters
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  // Fetch post details when the component mounts
  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Use axios to fetch post details from HN API
        const response = await axios.get(`http://hn.algolia.com/api/v1/items/${postId}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post details:', error);
      }
    };

    // Call the fetchPost function
    fetchPost();
  }, [postId]); // Re-run effect when postId changes

  return (
    <div>
      {post ? (
        <div>
          {/* Display post details */}
          <h2>{post.title}</h2>
          <p>Points: {post.points}</p>
          <ul>
            {/* Display list of comments */}
            {post.children.map((comment) => (
              <li key={comment.id}>{comment.text}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PostDetail;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { keyword } from "jest-matcher-utils/node_modules/chalk";
import unirest from 'unirest';

function GetPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://api.traileraddict.com/?featured=yes&count=2")
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <div>
      <ul>
        {/* {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))} */}
      </ul>
    </div>
  );
}

export default GetPosts;

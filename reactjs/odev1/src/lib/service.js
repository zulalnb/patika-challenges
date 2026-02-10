import axios from "axios";

async function getData(user_id) {
  const apiUrl = "https://jsonplaceholder.typicode.com";

  const { data: user } = await axios(`${apiUrl}/users/${user_id}`);

  const { data: post } = await axios(`${apiUrl}/posts?userId=${user_id}`);

  console.log("user: ", user);
  console.log("posts: ", post);

  // return `user: ${user}
  // posts: ${post}`;
}

export default getData;

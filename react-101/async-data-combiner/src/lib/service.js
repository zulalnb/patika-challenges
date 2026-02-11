import axios from "axios";

async function getData(user_id) {
  const apiUrl = "https://jsonplaceholder.typicode.com";

  const { data: user } = await axios(`${apiUrl}/users/${user_id}`);

  const { data: posts } = await axios(`${apiUrl}/posts?userId=${user_id}`);

  return { ...user, posts };
}

export default getData;

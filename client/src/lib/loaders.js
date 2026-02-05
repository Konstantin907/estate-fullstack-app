import { defer, redirect } from "react-router-dom";
import apiRequest from "./apiRequest";

export const singlePageLoader = async ({ params }) => {
  const res = await apiRequest.get("/posts/" + params.id);
  return res.data;
};

export const listPageLoader = ({ request }) => {
  const query = request.url.split("?")[1];

  const postPromise = apiRequest.get(
    query ? "/posts?" + query : "/posts"
  );

  return defer({
    postResponse: postPromise,
  });
};

export const profilePageLoader = async () => {
  try {
    const postPromise = apiRequest.get("/users/profilePosts");
    // const allPostsPromise = apiRequest.get("/posts/all");
    const chatPromise = apiRequest.get("/chats");

    return defer({
      postResponse: postPromise,
      // allPostsResponse: allPostsPromise,
      chatResponse: chatPromise,
    });
  } catch (error) {
    if (error?.response?.status === 401) {
      return redirect("/login");
    }
    throw error;
  }
};

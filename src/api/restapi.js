import newRequest from "../utils/newRequest";

export const LoginUser = async ({ username, password }) => {
  return await newRequest.post("/auth/login", {
    username: username,
    password: password,
  });
};

export const LogoutUser = async () => {
  return await newRequest.post("/auth/logout", {});
};

export const RegisterUser = async ({ user, img }) => {
  return await newRequest.post("/auth/register", {
    ...user,
    img,
  });
};

export const GetUserByUsername = async ({ username }) => {
  return await newRequest.get("/user/getuserbyusername/" + username);
};

export const fetchGigs = async ({ search, min, max, sort }) => {
  let url = `/gig/getGigs`;
  if (search) {
    url = url.concat(search);
  } else {
    url = url.concat(`?q=0`);
  }
  min && (url = url.concat(`&min=${min}`));
  max && (url = url.concat(`&max=${max}`));
  sort && (url = url.concat(`&sort=${sort}`));
  return await newRequest.get(url);
};

export const GetUserById = async ({ userId }) => {
  return await newRequest.get("/user/getuserbyid/" + userId);
};

export const GetGigById = async ({ gigId }) => {
  return await newRequest.get("/gig/getGig/" + gigId);
};

export const GetReviewsByGigId = async ({ gigId }) => {
  return await newRequest.get("/review/" + gigId);
};

export const CreateReview = async ({ gigId, desc, star }) => {
  return await newRequest.post("/review", {
    gigId,
    desc,
    star,
  });
};

export const CreateOrder = async ({ gigId }) => {
  return await newRequest.post("/order/create-payment-intent/" + gigId, {});
};

export const ConfirmOrder = async ({ payment_intent }) => {
  return await newRequest.put("/order/confirmorder", {
    payment_intent,
  });
};

export const MarkOrderAsCompleted = async ({ id }) => {
  return await newRequest.put("/order/markasfinished/" + id, {});
};

export const GetOrders = async () => {
  return await newRequest.get("/order/getorders");
};

export const GetMyGigs = async ({ userId }) => {
  return await newRequest.get("/gig/getGigs?userId=" + userId);
};

export const CreateGig = async (request) => {
  return await newRequest.post("/gig/createGig/", { ...request });
};

export const DeleteGig = async ({ id }) => {
  return await newRequest.delete("/gig/deleteGig/" + id);
};

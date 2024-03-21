import mongoose from "mongoose";

export const blogData = {
  image:
    "data:image/jpeg;base64,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",
  title: "More about Copilot",
  content: "This is copilot description!",
};
export const InvalidBlogData = {
  image: "",
  title: "",
  content: "This is copilot description!",
};

export const updateBlog = {
  image: "data:image/jpeg;base64,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",
  title: "More about Copilot updated",
  content: "This is update copilot description!",
};

export const loginUser = {
  email: "blaise@gmail.com",
  password: "@Snave1234",
};
export const loginNewUser = {
  email: "musa@gmail.com",
  password: "@Snave1234",
};
export const UnExistingEmailloginUser = {
  email: "fred@gmail.com",
  password: "@Snave1234",
};
export const UnExistingPasswordloginUser = {
  email: "blaise@gmail.com",
  password: "@Fred1234",
};

export const registerUser = {
  name: "blaise",
  email: "blaise@gmail.com",
  role: "Admin",
  password: "@Snave1234",
  ConfirmPassword: "@Snave1234",
};
export const InvalidRegisterUser = {
  name: "",
  email: "blaise@gmail.com",
  role: "Admin",
  password: "@Snave1234",
  ConfirmPassword: "@Snave1234",
};
export const registeNewUser = {
  name: "musa",
  email: "musa@gmail.com",
  password: "@Snave1234",
  ConfirmPassword: "@Snave1234",
};

export const UpdateUser = {
  name: "blaise Kant",
  email: "blaise@gmail.com",
  role: "Admin",
  password: "@Snave1234",
  ConfirmPassword: "@Snave1234",
};

export const mongooseInvalidObjectId = "65fa6d374ef65cf29b144a8";
export const UnExistingBlogId = "25fa865c796c8d17c95a2cc9";
export const UnExistingNewUserId = "24fa865c716c8d17c95a2cc9";

export const comment = {
  // 2x2
  comment: "That's goog man!",
};
export const InvalidComment = {
  // 2x2
  comment: "",
};

export const querryMessage = {
  name: "John",
  email: "John@gmail.com",
  message: "I liked your experience",
};
export const InvalidQuerryMessage = {
  name: "",
  email: "John@gmail.com",
  message: "I liked your experience",
};
// export const ServerErrorquerryMessage = {
//   name: 'Peter',
//   email: "John@gmail.com",
//   message: "I liked your experience",
//   numbers: 1234
// }
export const UpdatequerryMessage = {
  name: "John wick",
  email: "John@gmail.com",
  message: "I liked your experience",
};

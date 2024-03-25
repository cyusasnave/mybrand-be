import path from "path";

const imagePath = path.resolve(__dirname, "code2.png");
// console.log(imagePath);

export const blogData = {
  image: imagePath,
  title: "More about Copilot",
  content: "This is copilot description!",
};
export const InvalidBlogData = {
  image: "",
  title: "",
  content: "This is copilot description!",
};

export const updateBlog = {
  image: imagePath,
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

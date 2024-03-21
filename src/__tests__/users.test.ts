import Request from "supertest";
import app from "../app";
import mongoTesting from "../services/mongoTesting";
import userModel from "../models/userModel";
import {
  InvalidRegisterUser,
  UnExistingBlogId,
  UnExistingEmailloginUser,
  UnExistingNewUserId,
  UnExistingPasswordloginUser,
  UpdateUser,
  loginNewUser,
  loginUser,
  registeNewUser,
  registerUser,
} from "../mock/static";
import mongoose from "mongoose";

jest.setTimeout(20000);

let id: mongoose.Types.ObjectId;
let token: string;
let secondToken: string;
describe("User", () => {
  beforeAll(async () => {
    await mongoTesting.mongoTestingConnect();
  });
  afterAll(async () => {
    await userModel.deleteMany();
    await mongoTesting.mongoTestingDisconnect();
  });

  describe("User end-points", () => {
    it("should create an admin new user and return 201", async () => {
      const { body, statusCode } = await Request(app)
        .post("/api/users/register")
        .send(registerUser);

      expect(statusCode).toEqual(201);
      expect(body.status).toStrictEqual("Success");
      expect(body.message).toStrictEqual("User created successfully!");
      expect(body).toHaveProperty("user");
      expect(body.user).toBeDefined();
      expect(body.user?._id).toBeDefined();

      id = body.user?._id;
      console.log(id);
    });

    it("should return 406 if the user already exist", async () => {
      const { body, statusCode } = await Request(app)
        .post("/api/users/register")
        .send(registerUser);

      expect(statusCode).toEqual(409);
      expect(body.status).toStrictEqual("Fail");
      expect(body.message).toBeDefined();
    });

    it("should check if the if valid before login if not return 409", async () => {
      const { body, statusCode } = await Request(app)
        .post("/api/users/login")
        .send(UnExistingEmailloginUser);

      expect(statusCode).toEqual(409);
      expect(body.status).toStrictEqual("Fail");
      expect(body.message).toStrictEqual("Wrong credentials!");
    });

    it("should check if the user password is valid if not return 409", async () => {
      const { body, statusCode } = await Request(app)
        .post("/api/users/login")
        .send(UnExistingPasswordloginUser);

      expect(statusCode).toEqual(409);
      expect(body.status).toStrictEqual("Fail");
      expect(body.message).toStrictEqual("Wrong credentials!");
    });

    it("should login a admin user with a token and return 200", async () => {
      const { body, statusCode } = await Request(app)
        .post("/api/users/login")
        .send(loginUser);

      expect(statusCode).toEqual(200);
      expect(body.status).toStrictEqual("Success");
      expect(body.message).toStrictEqual("User logged In Successfully!");
      expect(body).toHaveProperty("token");
      expect(body.token).toBeDefined();

      token = body.token;
      console.log(token);
    });

    it("should get a logged in user and return 200", async () => {
      const { body, statusCode } = await Request(app)
        .get("/api/users/loggedInUser")
        .set("Authorization", `Bearer ${token}`);

      expect(statusCode).toEqual(200);
      expect(body.status).toStrictEqual("Success");
      expect(body.message).toStrictEqual("LoggedIn user fetched successfully!");
      expect(body.user).toBeDefined();
    });

    it("should get all users and return 200", async () => {
      const { body, statusCode } = await Request(app)
        .get("/api/users")
        .set("Authorization", `Bearer ${token}`);

      expect(statusCode).toEqual(200);
      expect(body.message).toStrictEqual("Users fetched successfully!");
      expect(body.users).toBeDefined();
    });

    it("should get a single user by id and if no user found return 404", async () => {
      const unExistingUserId = UnExistingBlogId;
      const { body, statusCode } = await Request(app)
        .get(`/api/users/${unExistingUserId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(statusCode).toEqual(404);
      expect(body.status).toStrictEqual("Fail");
      expect(body.message).toStrictEqual("User not found!");
    });

    it("should get a single user and return 200", async () => {
      console.log(id);
      console.log(token);
      const { body, statusCode } = await Request(app)
        .get(`/api/users/${id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(statusCode).toEqual(200);
      expect(body.status).toStrictEqual("Success");
      expect(body.message).toStrictEqual("User fetched successfully!");
      expect(body.user).toBeDefined();
    });

    it("should update a single user by id and if no user found return 404", async () => {
      const unExistingUserId = UnExistingBlogId;
      const { body, statusCode } = await Request(app)
        .patch(`/api/users/${unExistingUserId}`)
        .set("Authorization", `Bearer ${token}`)
        .send(UpdateUser);

      expect(statusCode).toEqual(404);
      expect(body.status).toStrictEqual("Fail");
      expect(body.message).toStrictEqual("User not found!");
    });

    it("should update a new user and return 200", async () => {
      const { body, statusCode } = await Request(app)
        .patch(`/api/users/${id}`)
        .set("Authorization", `Bearer ${token}`)
        .send(UpdateUser);

      expect(statusCode).toEqual(200);
      expect(body.status).toStrictEqual("Success");
      expect(body.message).toStrictEqual("User updated successfully!");
    });

    it("should delete a single user by id and if no user found return 404", async () => {
      const { body, statusCode } = await Request(app)
        .delete(`/api/users/${UnExistingNewUserId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(statusCode).toEqual(404);
      expect(body.status).toStrictEqual("Fail");
      expect(body.message).toStrictEqual("User not found!");
    });

    it("should delete a user and return 200", async () => {
      const { body, statusCode } = await Request(app)
        .delete(`/api/users/${id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(statusCode).toEqual(200);
      expect(body.status).toStrictEqual("Success");
      expect(body.message).toStrictEqual("User deleted successfully!");
    });

    it("should authenticate the user and if the token is not passed return 498", async () => {
      const { body } = await Request(app)
        .delete(`/api/users/${id}`)
        .expect(498);

      expect(body.message).toStrictEqual("Please logIn to continue!");
    });

    it("should validate the user add request and if not valid return 400", async () => {
      const { body } = await Request(app)
        .post("/api/users/register")
        .send(InvalidRegisterUser)
        .expect(400);

      expect(body.message).toBeDefined();
    });
  });
});

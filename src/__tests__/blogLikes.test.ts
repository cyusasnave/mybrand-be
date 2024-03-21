import Request from "supertest";
import app from "../app";
import mongoTesting from "../services/mongoTesting";
import {
  UnExistingBlogId,
  blogData,
  loginUser,
  mongooseInvalidObjectId,
  registerUser,
} from "../mock/static";
import userModel from "../models/userModel";
import mongoose from "mongoose";
import blogModel from "../models/blogModel";
import blogLikesModel from "../models/blogLikesModel";

jest.setTimeout(20000);

let token: string;
let id: mongoose.Types.ObjectId;
describe("Blog Likes", () => {
  beforeAll(async () => {
    await mongoTesting.mongoTestingConnect();
  });

  afterAll(async () => {
    await userModel.deleteMany();
    await blogModel.deleteMany();
    await blogLikesModel.deleteMany();
    await mongoTesting.mongoTestingDisconnect();
  });

  describe("On /POST/ a like", () => {
    it("should register a user and login user", async () => {
      const res = await Request(app)
        .post("/api/users/register")
        .send(registerUser)
        .expect(201);

      const resLogIn = await Request(app)
        .post("/api/users/login")
        .send(loginUser)
        .expect(200);

      expect(resLogIn.body.token).toBeDefined();
      token = resLogIn.body.token;
    });

    it("should create a new blog and return 201", async () => {
      const { body, statusCode } = await Request(app)
        .post("/api/blogs")
        .send(blogData);

      expect(statusCode).toEqual(201);
      expect(body.blog).toBeDefined();

      id = body.blog._id;
    });
    it("should check if the blog is valid mongoose id", async () => {
      const InvalidMongooseId = mongooseInvalidObjectId;
      const { body, statusCode } = await Request(app)
        .post(`/api/blogs/${InvalidMongooseId}/likes`)
        .set("Authorization", `Bearer ${token}`);

      expect(statusCode).toEqual(406);
      expect(body.status).toStrictEqual("Fail");
      expect(body.message).toStrictEqual("Invalid Blog Id!");
    });

    it("should check if the blog exist and if not return 404", async () => {
      const myUnExistingBlogId = UnExistingBlogId;
      const { body, statusCode } = await Request(app)
        .post(`/api/blogs/${myUnExistingBlogId}/likes`)
        .set("Authorization", `Bearer ${token}`);

      expect(statusCode).toEqual(404);
      expect(body.status).toStrictEqual("Fail");
      expect(body.message).toStrictEqual("Blog not found");
    });

    it("should add a like one the user has not liked the blog", async () => {
      const { body, statusCode } = await Request(app)
        .post(`/api/blogs/${id}/likes`)
        .set("Authorization", `Bearer ${token}`);

      expect(statusCode).toEqual(201);
      expect(body.status).toStrictEqual("Success");
      expect(body.message).toStrictEqual("Like successfully added");
    });

    it("should remove a like once the user has liked the blog before", async () => {
      const { body, statusCode } = await Request(app)
        .post(`/api/blogs/${id}/likes`)
        .set("Authorization", `Bearer ${token}`);

      expect(statusCode).toEqual(200);
      expect(body.status).toStrictEqual("Success");
      expect(body.message).toStrictEqual("Like successfully removed");
    });
  });

  describe("On /GET/ likes", () => {
    it("should chech if the blog id is mongoose valid id, if not return 406", async () => {
      const myInvalidBlogId = mongooseInvalidObjectId;
      const { body, statusCode } = await Request(app).get(
        `/api/blogs/${myInvalidBlogId}/likes`
      );

      expect(statusCode).toEqual(406);
      expect(body.status).toStrictEqual("Fail");
      expect(body.message).toStrictEqual("Invalid request!");
    });

    it("should return 400 if the blog does not exist", async () => {
      const myUnExistingBlogId = UnExistingBlogId;
      const { body, statusCode } = await Request(app).get(
        `/api/blogs/${myUnExistingBlogId}/likes`
      );

      expect(statusCode).toEqual(400);
      expect(body.status).toStrictEqual("Fail");
      expect(body.message).toStrictEqual("Blog not found!");
    });

    it("should get the number of likes and return 200", async () => {
      const { body, statusCode } = await Request(app).get(
        `/api/blogs/${id}/likes`
      );

      expect(statusCode).toEqual(200);
      expect(body.status).toStrictEqual("Success");
      expect(body.message).toStrictEqual("Likes fetched successfully!");
      expect(body.NumberOfLikes).toBeDefined();
    });
  });
});

import Request from "supertest";
import app from "../app";
import mongoTesting from "../services/mongoTesting";
import {
  InvalidComment,
  UnExistingBlogId,
  blogData,
  comment,
  loginUser,
  mongooseInvalidObjectId,
  registerUser,
} from "../mock/static";
import userModel from "../models/userModel";
import blogCommentModel from "../models/blogCommentModel";
import blogModel from "../models/blogModel";
import mongoose from "mongoose";

jest.setTimeout(20000);

let token: string;
let id: mongoose.Types.ObjectId;
describe("Blog comments", () => {
  beforeAll(async () => {
    await mongoTesting.mongoTestingConnect();
  });

  afterAll(async () => {
    await userModel.deleteMany();
    await blogModel.deleteMany();
    await blogCommentModel.deleteMany();
    await mongoTesting.mongoTestingDisconnect();
  });

  describe("/POST/ a comment", () => {
    it("should register a user and login a user", async () => {
      const res = await Request(app)
        .post("/api/users/register")
        .send(registerUser)
        .expect(201);

      const resLogin = await Request(app)
        .post("/api/users/login")
        .send(loginUser)
        .expect(200);

      expect(resLogin.body.token).toBeDefined();

      token = resLogin.body.token;
    });

    it("should create a new blog", async () => {
      const { body, statusCode } = await Request(app)
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .field('title', blogData.title)
        .field('content', blogData.content)
        .attach("image", blogData.image)

      expect(statusCode).toEqual(201);
      expect(body.blog._id).toBeDefined();
      id = body.blog._id;
    });

    it("should check valid mongoose id and if not return 400", async () => {
      const InvalidId = mongooseInvalidObjectId;
      const { body, statusCode } = await Request(app)
        .post(`/api/blogs/${InvalidId}/comments`)
        .send(comment)
        .set("Authorization", `Bearer ${token}`);

      expect(statusCode).toEqual(400);
      expect(body.message).toStrictEqual("Invalid Id!");
    });

    it("should check if the blog exist and if not return 404", async () => {
      const UnExistingId = UnExistingBlogId;
      const { body, statusCode } = await Request(app)
        .post(`/api/blogs/${UnExistingId}/comments`)
        .send(comment)
        .set("Authorization", `Bearer ${token}`);

      expect(statusCode).toEqual(404);
      expect(body.message).toStrictEqual("No blog found!");
    });

    it("should create a new comment to specific blog", async () => {
      const { body, statusCode } = await Request(app)
        .post(`/api/blogs/${id}/comments`)
        .send(comment)
        .set("Authorization", `Bearer ${token}`);

      expect(statusCode).toEqual(201);
      expect(body.status).toStrictEqual("Success");
      expect(body.message).toStrictEqual("Comment Added successfully");
      expect(body.comment).toHaveProperty("comment", comment.comment);
    });
  });

  describe("On /GET/ comment over a blog", () => {
    it("should return 404 if not blog is found", async () => {
      const myUnExistingId = UnExistingBlogId;
      const { body, statusCode } = await Request(app)
        .get(`/api/blogs/${myUnExistingId}/comments`)
        .set("Authorization", `Bearer ${token}`);

      expect(statusCode).toEqual(404);
      expect(body.status).toStrictEqual("Not Found");
      expect(body.message).toStrictEqual("Blog not found!");
    });

    it("should fetch the comment over a blog and return 200", async () => {
      const { body, statusCode } = await Request(app)
        .get(`/api/blogs/${id}/comments`)
        .set("Authorization", `Bearer ${token}`);

      expect(statusCode).toEqual(200);
      expect(body.status).toStrictEqual("Success");
      expect(body.message).toStrictEqual("Blog fetched successfully");
      expect(body.blogWithComments).toBeDefined();
    });

    // testing middlewares

    it("should validate the comment add request and if not valid return 400", async () => {
      const { body } = await Request(app)
        .post(`/api/blogs/${id}/comments`)
        .set("Authorization", `Bearer ${token}`)
        .send(InvalidComment)
        .expect(400);

      expect(body.message).toBeDefined();
    });
  });
});

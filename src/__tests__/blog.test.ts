import Request from "supertest";
import app from "../app";
import mongoTesting from "../services/mongoTesting";
import {
  InvalidBlogData,
  blogData,
  loginUser,
  registerUser,
  updateBlog,
} from "../mock/static";
import blogModel from "../models/blogModel";
import userModel from "../models/userModel";
import mongoose from "mongoose";

jest.setTimeout(20000);

let token: string;
let id: mongoose.Types.ObjectId;
describe("Blog API", () => {
  beforeAll(async () => {
    await mongoTesting.mongoTestingConnect();
  });

  afterAll(async () => {
    await userModel.deleteMany();
    await blogModel.deleteMany();
    await mongoTesting.mongoTestingDisconnect();
  });

  describe("Blog end-points", () => {
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

    it("should create a new blog and return 201", async () => {
      const { body } = await Request(app)
        .post("/api/blogs")
        .expect("Content-Type", /json/)
        .set("Authorization", `Bearer ${token}`)
        .send(blogData)
        .expect(201);

      expect(body.message).toStrictEqual("Blog added successfully!");
      expect(body).toHaveProperty("blog");
      expect(body.blog).toHaveProperty("title", blogData.title);
      expect(body.blog).toHaveProperty("content", blogData.content);
      expect(body.blog._id).toBeDefined();

      id = body.blog._id;
    });

    it("should fetch all blog and return 200", async () => {
      const { body } = await Request(app).get("/api/blogs").expect(200);

      expect(body.message).toStrictEqual("Blogs fetched successfully!");
      expect(body).toHaveProperty("blogs");
      expect(body.blogs).toBeDefined();
    });

    it("should fetch a single blog and return 200", async () => {
      const { body } = await Request(app).get(`/api/blogs/${id}`).expect(200);

      expect(body.message).toStrictEqual("Blog fetched successfully!");
      expect(body).toHaveProperty("blog");
      expect(body.blog).toBeDefined();
    });

    it("should update a blog with a given id and return 200", async () => {
      const { body } = await Request(app)
        .patch(`/api/blogs/${id}`)
        .set("Authorization", `Bearer ${token}`)
        .send(updateBlog)
        .expect(200);

      expect(body.message).toStrictEqual("Blog updated successfully!");
      expect(body).toHaveProperty("blog");
      expect(body.blog.title).toStrictEqual(updateBlog.title);
      expect(body.blog.content).toStrictEqual(updateBlog.content);
    });

    it("should delete a blog with given id and return 200", async () => {
      const { body } = await Request(app)
        .delete(`/api/blogs/${id}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(body.message).toStrictEqual("Blog deleted successfully!");
    });

    // testing middlewares

    it("should authenticate the user and if the token is not passed return 498", async () => {
      const { body } = await Request(app)
        .delete(`/api/blogs/${id}`)
        .expect(498);

      expect(body.message).toStrictEqual("Please logIn to continue!");
    });

    it("should validate the blog request and if not valid return 400", async () => {
      const { body } = await Request(app)
        .post("/api/blogs")
        .expect("Content-Type", /json/)
        .send(InvalidBlogData)
        .expect(400);

      expect(body.message).toBeDefined();
    });
  });
});

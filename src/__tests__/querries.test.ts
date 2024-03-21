import Request from "supertest";
import app from "../app";
import mongoTesting from "../services/mongoTesting";
import {
  InvalidQuerryMessage,
  UnExistingBlogId,
  UpdatequerryMessage,
  loginUser,
  querryMessage,
  registerUser,
} from "../mock/static";
import mongoose from "mongoose";
import querriesModel from "../models/querriesModel";
import userModel from "../models/userModel";

jest.setTimeout(20000);

let token: string;
let id: mongoose.Types.ObjectId;
describe("Querries", () => {
  beforeAll(async () => {
    await mongoTesting.mongoTestingConnect();
  });

  afterAll(async () => {
    await userModel.deleteMany();
    await querriesModel.deleteMany();
    await mongoTesting.mongoTestingDisconnect();
  });

  describe("Querries end-point", () => {
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

    it("should add new querry and return 201", async () => {
      const { body, statusCode } = await Request(app)
        .post("/api/querries")
        .send(querryMessage);

      expect(statusCode).toEqual(201);
      expect(body.status).toStrictEqual("Success");
      expect(body.message).toStrictEqual("Querry Sent successfully!");
      expect(body.querry._id).toBeDefined();
      id = body.querry._id;
      console.log(id);
    });

    it("should /GET/ all querries and return 200", async () => {
      const { body, statusCode } = await Request(app)
        .get("/api/querries")
        .set("Authorization", `Bearer ${token}`);

      expect(statusCode).toEqual(200);
      expect(body.status).toStrictEqual("Success");
      expect(body.message).toStrictEqual("Querries fetched successfully!");
    });

    it("should get single querry by id and if the querry does not exist return 404", async () => {
      const unExistingQuerryId = UnExistingBlogId;
      const { body, statusCode } = await Request(app)
        .get(`/api/querries/${unExistingQuerryId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(statusCode).toEqual(404);
      expect(body.status).toStrictEqual("Fail");
      expect(body.message).toStrictEqual("Querry not found!");
    });

    it("should get single querry by id and return 200", async () => {
      const { body, statusCode } = await Request(app)
        .get(`/api/querries/${id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(statusCode).toEqual(200);
      expect(body.status).toStrictEqual("Success");
      expect(body.message).toStrictEqual("Querry fetched successfully!");
      expect(body.Querry).toBeDefined();
    });

    it("should update a single querry and if the querry is not found return 404", async () => {
      const unExistingQuerryId = UnExistingBlogId;
      const { body, statusCode } = await Request(app)
        .patch(`/api/querries/${unExistingQuerryId}`)
        .set("Authorization", `Bearer ${token}`)
        .send(UpdatequerryMessage);

      expect(statusCode).toEqual(404);
      expect(body.status).toStrictEqual("Fail");
      expect(body.message).toStrictEqual("Querry not found!");
    });

    it("should update a single querry and return 200", async () => {
      const { body, statusCode } = await Request(app)
        .patch(`/api/querries/${id}`)
        .set("Authorization", `Bearer ${token}`)
        .send(UpdatequerryMessage);

      expect(statusCode).toEqual(200);
      expect(body.status).toStrictEqual("Success");
      expect(body.message).toStrictEqual("Querry updated successfully!");
      expect(body.Querry).toHaveProperty("name", UpdatequerryMessage.name);
    });

    it("should delete a querry and if the querry does not exist return 404", async () => {
      const unExistingQuerryId = UnExistingBlogId;
      const { body, statusCode } = await Request(app)
        .delete(`/api/querries/${unExistingQuerryId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(statusCode).toEqual(404);
      expect(body.status).toStrictEqual("Fail");
      expect(body.message).toStrictEqual("Querry not found!");
    });

    it("should delete a querry and return 200", async () => {
      const { body, statusCode } = await Request(app)
        .delete(`/api/querries/${id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(statusCode).toEqual(200);
      expect(body.status).toStrictEqual("Success");
      expect(body.message).toStrictEqual("Querry deleted successfully!");
    });

    // testing middlewares

    it("should validate the querry add request and if not valid return 400", async () => {
      const { body } = await Request(app)
        .post("/api/querries")
        .send(InvalidQuerryMessage)
        .expect(400);

      expect(body.message).toBeDefined();
    });
  });
});

import { Express } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { version } from "../../package.json";

const githubLInk = `https://github.com/cyusasnave/mybrand-be`;
const options: swaggerJSDoc.Options = { 
  definition: {
    "openapi": "3.0.0",
    "info": {
      version,
      "description": `This REST API serves for my brand.
                      <a href='${githubLInk}' target='_blank'>Github Link</a>`,
  
      "title": "My Brand REST API"
    },
    "servers": [
      {
        "url": "http://localhost:3000/api/",
        "description": "Local server"
      }
    ],
  
    "components": {
      "securitySchemes": {
        "bearerAuth": {
          "type": "http",
          "scheme": "bearer",
          "bearerFormat": "JWT",
          "description": "JWT token added in the Authorization header"
        }
      },
      "responses": {
        "NotFound": {
          "description": "The specified resource was not found",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "error": {
                    "type": "string",
                    "example": "Not found"
                  }
                }
              }
            }
          }
        },
        "BadRequest": {
          "description": "Bad Request",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "error": {
                    "type": "string",
                    "example": "Bad Request"
                  }
                }
              }
            }
          }
        },
        "InvalidToken": {
          "description": "Unauthorized",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "error": {
                    "type": "string",
                    "example": "Please logIn to continue!"
                  }
                }
              }
            }
          }
        },
        "UNAUTHORIZED": {
          "description": "UNAUTHORIZED",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "error": {
                    "type": "string",
                    "example": "Wrong credentials!"
                  }
                }
              }
            }
          }
        },
        "NotAccepted": {
          "description": "Not acceptable",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "error": {
                    "type": "string",
                    "example": "Only admin can perform this action!"
                  }
                }
              }
            }
          }
        },
        "ConflictError": {
          "description": "Resource exists",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "error": {
                    "type": "string",
                    "example": "Resource exists"
                  }
                }
              }
            }
          }
        },
        "ValidationError": {
          "description": "Validation error",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "error": {
                    "type": "string",
                    "example": "Validation error"
                  }
                }
              }
            }
          }
        },
        "ServerError": {
          "description": "Internal server error",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "error": {
                    "type": "string",
                    "example": "Something went wrong!"
                  }
                }
              }
            }
          }
        }
      },
      "schemas": {
        "UserRegister": {
          "required": ["name", "email", "password", "ConfirmPassword"],
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "description": "name",
              "example": "Jane Doe"
            },
            "email": {
              "type": "string",
              "description": "Email",
              "example": "janedoe@gmail.com"
            },
  
            "password": {
              "type": "string",
              "description": "Password",
              "example": "@Janedoe1234"
            },

            "ConfirmPassword": {
                "type": "string",
              "description": "Confirm Password",
              "example": "@Janedoe1234"
            }
          }
        },
        "UpdateUser": {
          "required": ["name", "email", "password", "ConfirmPassword"],
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "description": "name",
              "example": "Mark Doe"
            },
            "email": {
              "type": "string",
              "description": "Email",
              "example": "markdoe@gmail.com"
            },
  
            "password": {
              "type": "string",
              "description": "Password",
              "example": "@Markdoe1234"
            },

            "ConfirmPassword": {
                "type": "string",
              "description": "Confirm Password",
              "example": "@Markdoe1234"
            }
          }
        },
        "UserLogin": {
          "required": ["email", "password"],
          "type": "object",
          "properties": {
            "email": {
              "type": "string",
              "description": "your email",
              "example": "janedoe@gmail.com"
            },
            "password": {
              "type": "string",
              "description": "your password",
              "example": "@Janedoe1234"
            }
          }
        },
  
        "Blogs": {
          "required": ["title", "content", "image"],
          "type": "object",
          "properties": {
            "title": {
              "type": "string",
              "description": "blog title",
              "example": "React features"
            },
            "content": {
              "type": "content",
              "description": "blog content",
              "example": "This is blog"
            },
            "image": {
              "type": "string",
              "description": "blog image",
              "example": "car.jpg"
            }
          }
        },
        "updateBlog": {
          "type": "object",
          "properties": {
            "title": {
              "type": "string",
              "description": " blog title",
              "example": "Updated React features"
            },
            "content": {
              "type": "string",
              "description": "blog content",
              "example": "This is updated blog content"
            },
            "image": {
              "type": "file",
              "description": "blog image",
              "example": "image.jpg"
            }
          }
        },
        "Comment": {
          "required": ["comment"],
          "type": "object",
          "properties": {
            "comment": {
              "type": "string",
              "description": "Comment description",
              "example": "Good blog!"
            }
          }
        },
        "createQuerry": {
            "required": ["name", "email", "message"],
            "type": "object",
            "properties": {
                "name": {
                    "type": "string",
                    "description": "Sender name",
                    "example": "Peter"
                },
                "email": {
                    "type": "string",
                    "description": "Sender email",
                    "example": "peter@gmail.com"
                },
                "message": {
                    "type": "string",
                    "description": "Message",
                    "example": "Good brand!"
                }
            }
        },
        "UpdateQuerry": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string",
                    "description": "Sender name",
                    "example": "Peter Paul"
                },
                "email": {
                    "type": "string",
                    "description": "Sender email",
                    "example": "peterpaul@gmail.com"
                },
                "message": {
                    "type": "string",
                    "description": "Message",
                    "example": "Good brand big man!"
                }
            }
        },
      }
    },
    "tags": [
      {
        "name": "User",
        "description": "User Endpoints"
      },
  
      {
        "name": "Blogs",
        "description": "Blog Endpoints"
      },
      {
        "name": "Comments",
        "description": "Reading and creating comment over a blog"
      },
      { "name": "likes", "description": "Liking and Unliking a blog" },
      { "name": "Querries", "description": "Messaging an admin" }
    ],
    "schemes": ["http", "https"],
    "security": [
      {
        "bearerAuth": []
      }
    ],
  
    "paths": {
      "/users/register": {
        "post": {
          "tags": ["User"],
          "summary": "User register",
          "description": "Create user account",
          "requestBody": {
            "required": "true",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UserRegister"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "User created successfully!"
            },
            "400": {
              "$ref": "#/components/responses/BadRequest"
            },
            "409": {
                "$ref": "#/components/responses/ConflictError"
            }
          }
        }
      },
  
      "/users/login": {
        "post": {
          "tags": ["User"],
          "summary": "User login",
          "description": "User login",
          "requestBody": {
            "required": "true",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UserLogin"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "You logged in successfully!"
            },
            "401": {
              "$ref": "#/components/responses/UNAUTHORIZED"
            }
          }
        }
      },

      "/users/loggedInUser": {
        "get": {
            "tags": ["User"],
            "summary": "Get a logged in user",
            "description": "Get a logged in user",
            "responses": {
                "200": {
                    "description": "Logged in User found successfully!"
                },
                "498": {
                    "$ref": "#/components/responses/InvalidToken"
                }
            }
        }
      },
      "/users": {
        "get": {
            "tags": ["User"],
            "summary": "Get all user",
            "description": "Get all user",
            "responses": {
                "200": {
                    "description": "Users fetched successfully!"
                },
                "498": {
                    "$ref": "#/components/responses/InvalidToken"
                }
            }
        }
      },
      "/users/{id}": {
        "get": {
            "tags": ["User"],
            "summary": "Get single user",
            "description": "Get single user by id",
            "parameters": [
                {
                  "name": "id",
                  "in": "path",
                  "required": true,
                  "schema": {
                    "type": "string",
                    "default": 123
                  },
                  "description": "User id"
                }
              ],
            "responses": {
                "200": {
                    "description": "User fetched successfully!"
                },
                "498": {
                    "$ref": "#/components/responses/InvalidToken"
                },
                "404": {
                    "description": "User not found!"
                }
            }
        }
      },
      "/users/{userId}": {
        "patch": {
            "tags": ["User"],
            "summary": "Update user",
            "description": "Update user by id",
            "requestBody": {
                "required": "true",
                "content": {
                    "application/json": {
                        "schema": {
                            "$ref": "#/components/responses/UpdateUser"
                        }
                    }
                }
            },
            "parameters": [
                {
                  "name": "userId",
                  "in": "path",
                  "required": true,
                  "schema": {
                    "type": "string",
                    "default": 123
                  },
                  "description": "User id"
                }
              ],
            "responses": {
                "200": {
                    "description": "User updated successfully!"
                },
                "498": {
                    "$ref": "#/components/responses/InvalidToken"
                },
                "404": {
                    "description": "User not found!"
                }
            }
        }
      },
      "/users/{deleteId}": {
        "delete": {
            "tags": ["User"],
            "summary": "Delete user",
            "description": "Delete user by id",
            "parameters": [
                {
                  "name": "deleteId",
                  "in": "path",
                  "required": true,
                  "schema": {
                    "type": "string",
                    "default": 123
                  },
                  "description": "User id"
                }
              ],
            "responses": {
                "200": {
                    "description": "User deleted successfully!"
                },
                "498": {
                    "$ref": "#/components/responses/InvalidToken"
                },
                "404": {
                    "description": "User not found!"
                }
            }
        }
      },
  
      "/blogs": {
        "post": {
          "tags": ["Blogs"],
          "summary": "Create blogs",
          "description": "Create blogs",
          "requestBody": {
            "required": "true",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Blogs"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Blog added successfully!"
            },
            "400": {
              "$ref": "#/components/responses/BadRequest"
            },
            "406": {
              "$ref": "#/components/responses/NotAccepted"
            },
            "500": {
                "description": "Error uploading image/Something went wrong!"
            },
            "498": {
                "$ref": "#/components/responses/InvalidToken"
            }
          }
        }
      },
      "/blogs/": {
        "get": {
          "tags": ["Blogs"],
          "summary": "Get all blogs",
          "description": "Get all blogs",
          "responses": {
            "200": {
              "description": "Blogs fetched successfully!"
            },
            "500": {
              "$ref": "#/components/responses/ServerError"
            }
          }
        }
      },
  
      "/blogs/{id}/": {
        "get": {
          "tags": ["Blogs"],
          "summary": "Get blog by id",
          "description": "Get blog by id.",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "required": true,
              "schema": {
                "type": "string",
                "default": 1234
              },
              "description": "blog id"
            }
          ],
          "responses": {
            "200": {
              "description": "Blog fetched successfully!"
            },
            "404": {
              "$ref": "#/components/responses/NotFound"
            }
          }
        }
      },
      "/blogs/{Id}": {
        "patch": {
          "tags": ["Blogs"],
          "summary": "Update blog.",
          "description": "Update blog by id.",
          "parameters": [
            {
              "name": "Id",
              "in": "path",
              "required": true,
              "schema": {
                "type": "string",
                "default": 1234
              },
              "description": "blog Id"
            }
          ],
          "requestBody": {
            "required": "true",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/updateBlog"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Blog updated successfully."
            },
            "500": {
              "$ref": "#/components/responses/ServerError"
            },
            "498": {
                "$ref": "#/components/responses/InvalidToken"
            }
          }
        }
      },
      "/blogs/{ID}": {
        "delete": {
          "tags": ["Blogs"],
          "summary": "Delete delete.",
          "description": "Delete delete.",
          "parameters": [
            {
              "name": "ID",
              "in": "path",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "blog Id"
            }
          ],
          "responses": {
            "200": {
              "description": "Blog deleted successfully!"
            },
            "404": {
              "$ref": "#/components/responses/NotFound"
            },
            "500": {
              "$ref": "#/components/responses/ServerError"
            },
            "498": {
                "$ref": "#/components/responses/InvalidToken"
            }
          }
        }
      },
      "/blogs/{ID}/comments": {
        "get": {
          "tags": ["Comments"],
          "summary": "Blog comments",
          "description": "Get comments list of blog",
          "parameters": [
            {
              "name": "ID",
              "in": "path",
              "required": true,
              "schema": {
                "type": "string",
                "default": 1234
              },
              "description": "Blog id"
            }
          ],
          "responses": {
            "200": {
              "description": "Blog fetched successfully"
            },
            "404": {
              "$ref": "#/components/responses/NotFound"
            },
            "406": {
                "description": "Blog Id not valid!"
            }
          }
        }
      },
      "/blogs/{blogId}/comments": {
        "post": {
          "tags": ["Comments"],
          "summary": "Create comment",
          "description": "Create comment on Blog",
          "parameters": [
            {
              "name": "blogId",
              "in": "path",
              "required": true,
              "schema": {
                "type": "string",
                "default": 1234
              },
              "description": "Blog id"
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Comment"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Comment Added successfully"
            },
            "406": {
              "description": "Invalid blog Id!"
            },
            "400": {
              "$ref": "#/components/responses/BadRequest"
            },
            "498": {
                "$ref": "#/components/responses/InvalidToken"
            }
          }
        }
      },
      "/blogs/{blogId}/likes": {
        "post": {
          "tags": ["likes"],
          "summary": "Add/remove like to the blog based on the user",
          "description": "Add/Remove like on Blog",
          "parameters": [
            {
              "name": "blogId",
              "in": "path",
              "required": true,
              "schema": {
                "type": "string",
                "default": 1234
              },
              "description": "Blog id"
            }
          ],
          "responses": {
            "201": {
              "description": "Like successfully added"
            },
            "200": {
              "description": "Like successfully removed"
            },
            "406": {
              "description": "Invalid blog Id!"
            },
            "404": {
                "description": "Blog not found"
            },
            "498": {
                "$ref": "#/components/responses/InvalidToken"
            }
          }
        }
      },
      "/querries": {
        "post": {
            "tags": ["Querries"],
            "summary": "Sending a querry",
            "description": "Sending a querry",
            "requestBody": {
                "required": "true",
                "content": {
                    "application/json": {
                        "schema": {
                            "$ref": "#/components/schemas/createQuerry"
                        }
                    }
                }
            },
            "responses": {
                "201": {
                    "description": "Querry Sent successfully!"
                },
                "500": {
                    "$ref": "#/components/responses/ServerError" 
                }
            }
        }
      },
      "/querries/": {
        "get": {
            "tags": ["Querries"],
            "summary": "Getting all querries",
            "description": "Getting all querries",
            "responses": {
                "200": {
                    "description": "Querries fetched successfully!"
                },
                "500": {
                    "$ref": "#/components/responses/ServerError" 
                }
            }
        }
      },
      "/querries/{id}": {
        "get": {
            "tags": ["Querries"],
            "summary": "Getting a querry",
            "description": "Getting a querry",
            "parameters": [
                {
                  "name": "id",
                  "in": "path",
                  "required": true,
                  "schema": {
                    "type": "string",
                    "default": 1234
                  },
                  "description": "Querry id"
                }
              ],
            "responses": {
                "200": {
                    "description": "Querry fetched successfully!"
                },
                "500": {
                    "$ref": "#/components/responses/ServerError" 
                },
                "404": {
                    "description": "Querry not found!"
                }
            }
        }
      },
      "/querries/{UpdateId}": {
        "patch": {
            "tags": ["Querries"],
            "summary": "Updating a querry",
            "description": "Updating a querry",
            "requestBody": {
                "required": "true",
                "content": {
                    "application/json": {
                        "schema": {
                            "$ref": "#/components/schemas/UpdateQuerry"
                        }
                    }
                }
            },
            "parameters": [
                {
                  "name": "UpdateId",
                  "in": "path",
                  "required": true,
                  "schema": {
                    "type": "string",
                    "default": 1234
                  },
                  "description": "Querry id"
                }
              ],
            "responses": {
                "200": {
                    "description": "Querries fetched successfully!"
                },
                "500": {
                    "$ref": "#/components/responses/ServerError" 
                },
                "404": {
                    "description": "Querry not found!"
                }
            }
        }
      },
      "/querries/{deleteId}": {
        "delete": {
            "tags": ["Querries"],
            "summary": "Deleting a querry",
            "description": "Deleting a querry",
            "parameters": [
                {
                  "name": "deleteId",
                  "in": "path",
                  "required": true,
                  "schema": {
                    "type": "string",
                    "default": 1234
                  },
                  "description": "Querry id"
                }
              ],
            "responses": {
                "200": {
                    "description": "Querry deleted successfully!"
                },
                "500": {
                    "$ref": "#/components/responses/ServerError" 
                },
                "404": {
                    "description": "Querry not found!"
                }
            }
        }
      },
    }
  },
  apis: ["./routes/*.ts", "./models/*.ts"]
};

const swaggerSpec = swaggerJSDoc(options); // Corrected variable name

function swaggerDocs(app: Express, port: number) {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    console.info(`Docs available on http://localhost:${port}/api-docs`);
}

export default swaggerDocs;

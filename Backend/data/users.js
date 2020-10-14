import bcrypt from "bcryptjs";

const users = [
  {
    name: "admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("pass", 10),
    isAdmin: true,
  },
  {
    name: "John Doe",
    email: "john@example.com",
    password: bcrypt.hashSync("pass", 10),
  },
  {
    name: "Jane Doe",
    email: "hane@example.com",
    password: bcrypt.hashSync("12346", 10),
  },
];

export default users;

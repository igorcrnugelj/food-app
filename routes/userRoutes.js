import express from "express";
import { v4 as uuidv4 } from "uuid";
import User from "../models/user.js";
//import { findAllUsers } from "../service/UserService.js";
import saveUser from "../service/UserService.js";
import { deleteUser } from "../service/UserService.js";

const router = express.Router();

let users = [];

// router.get("/", async (req, res) => {
//   const allUsers = await User.findAll();
//   console.log(allUsers);
//   console.log(allUsers.every((user) => user instanceof User)); // true
//   console.log("All users:", JSON.stringify(allUsers, null, 2));

//   res.send(allUsers);
// });

//NEW GET WITH SERVICE:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
router.get("/", async (req, res) => {
  const allUsers = await findAllUsers;
  console.log(allUsers);
  console.log(allUsers.every((user) => user instanceof User)); // true
  console.log("All users:", JSON.stringify(allUsers, null, 2));
  res.send(allUsers);
});
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

//when we put the colon sign here ("/:id"), we can expect anything after "/users" path
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params; //here we are making destructuring
    console.log(id);
    const user1 = await User.findByPk(id);
    if (!user1) {
      throw new Error(`No user with such id found in database`);
    }
    //   const foundUser = users.find((user) => user.id === id);
    //   res.send(foundUser);
    res.send(user1);
  } catch (error) {
    res.send(error.message);
    console.log(error.message);
  }
});

// router.post("/", async (req, res) => {
//   const user = req.body;
//   const { firstName, lastName, age } = user;

//   let userCreated;
//   try {
//     userCreated = await User.create({ firstName, lastName, age });
//   } catch (err) {
//     res.status(500).send("User is not created");
//     console.log(err.message);
//     return;
//   }

//   const userId = userCreated.dataValues.id;
//   //   await User.create({
//   //     firstName,
//   //     lastName,
//   //     age,
//   //   })
//   //     .then((user) => {
//   //       userId = user.dataValues.id;
//   //       console.log(userId);
//   //     })
//   //     .catch((err) => console.log(err));

//   //   users.push({ ...user, id: uuidv4() });
//   res.send(
//     `User with the name ${firstName} ${lastName} old ${age} years with id ${userId}, added to the database`
//   );
// });

//NEW POST WITH SERVICE::::::::::::::::::::::::::::::::::::::::::::::::::::::

router.post("/", async (req, res) => {
  const user = req.body;
  const savedUser = await saveUser(user);
  const { firstName, lastName, age, id } = savedUser;
  res.send(
    `User with the name ${firstName} ${lastName} old ${age} years with id ${id}, added to the database`
  );
});

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const message = await deleteUser(id);
  //users = users.filter((user) => user.id !== id);
  res.send(`${message}`);
});

export default router;

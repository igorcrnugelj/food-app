import User from "../models/user.js";

//FIRST FUNCTION
//export const findAllUsers = User.findAll();

//SECOND FUNCTION
const saveUser = async (user) => {
  const { firstName, lastName, age } = user;
  let userCreated;
  try {
    userCreated = await User.create({ firstName, lastName, age });
  } catch (err) {
    // res.status(500).send("User is not created");
    console.log(err.message);
    return;
  }
  const userId = userCreated.dataValues.id;
  return userCreated;
};

//THIRD FUNCTION
export const deleteUser = async (id) => {
  const user = await User.findByPk(id);

  try {
    if (!user) {
      throw new Error(`Cann't find user with such id`);
    } else {
      await user.destroy();
      return `User ${user.dataValues.firstName} ${user.dataValues.lastName} with id ${id} is deleted from database`;
    }
  } catch (err) {
    return err.message;
  }
};

export default saveUser;

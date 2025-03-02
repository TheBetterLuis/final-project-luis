const express = require("express");
const router = express.Router();

const {
  getUserByUserID,
  getSafeUserByUserID,
  getUsers,
  getTechUsers,
  getPaginatedTechUsers,
  getRegularUsers,
  getPaginatedRegularUsers,
  getPaginatedPremiumUsers,
  createUser,
  deleteUser,
  updateUser,
  makeRole,
} = require("../controllers/users");

const { auth } = require("../middleware/auth");

router.post("/single", getUserByUserID);
router.post("/safe", getSafeUserByUserID);
router.post("/make/:newRole/:id", makeRole);

//we add auth here to protect this route, before the controller
//router.get("/", getUsers);
router.get("/", auth(["admin", "tech", "free"]), getUsers);
router.get("/tech", getTechUsers);
router.get("/regular", getRegularUsers);

router.get("/tech/paginate", getPaginatedTechUsers);
router.get("/regular/paginate", getPaginatedRegularUsers);
router.get("/premium/paginate", getPaginatedPremiumUsers);

//route to delete users by ID
router.delete("/:id", deleteUser);

//route to create user
router.post("/", createUser);

//route to update user
router.patch("/", updateUser);

module.exports = router;

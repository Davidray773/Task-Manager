import express from "express"
import { adminOnly, verifyToken } from "../utils/verifyUser.js"
import { getUserById, getUsers, updateUserRole } from "../controller/user.controller.js"

const router = express.Router()

// User mangement route
router.get("/get-users", verifyToken, adminOnly, getUsers)

router.get("/:id", verifyToken, getUserById)

router.put("/update-role/:id", verifyToken, adminOnly, updateUserRole)

export default router

import express from "express"
import { taskController } from "./task.controller";
import { USER_ROLE } from "../../utils/constant";
import auth from "../../middlewares/auth";
const router=express.Router()


router.get("/",auth(USER_ROLE.admin),taskController.getAllTask)
router.get("/:id",auth(USER_ROLE.admin),taskController.getSingleTask)
router.delete("/:id",auth(USER_ROLE.admin),taskController.deleteTaskByAdmin)
router.put("/:id",auth(USER_ROLE.admin),taskController.updateTask)
router.post("/create-task",auth(USER_ROLE.admin),taskController.createTask)
router.post("/complete-task",auth(USER_ROLE.user),taskController.completedTask)


export const TaskRouter=  router;
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const router = (0, express_1.Router)();
router.post("/register", user_controller_1.userController.createUser);
router.post("/make-admin", user_controller_1.userController.createAdmin);
router.put("/active-account", user_controller_1.userController.activeAccount);
exports.UserRoutes = router;

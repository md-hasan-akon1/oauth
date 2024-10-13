import { Router  } from "express";
import { UserRoutes } from "../module/users/user.routes";
import { AuthRoutes } from "../module/auth/auth.route";
import { TaskRouter } from "../module/task/tesk.route";

const router = Router();
const moduleRoutes=[
    {   path: '/users',
        route: UserRoutes
    },
    {   path: '/auth',
        route: AuthRoutes
    },
    {   path: '/task',
        route: TaskRouter
    }
]

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
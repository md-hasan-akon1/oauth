import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { taskServices } from "./task.sevice";

const createTask= catchAsync(async (req, res) => {
    const result=await taskServices.createTask(req.body)
     
       sendResponse(res, {
         statusCode: httpStatus.OK,
         success: true,
         message: 'task created succesfully',
         data: result,
       });
     });
const getAllTask= catchAsync(async (req, res) => {
    const result=await taskServices.getAllTask()
     
       sendResponse(res, {
         statusCode: httpStatus.OK,
         success: true,
         message: 'task retraived succesfully',
         data: result,
       });
     });
const getSingleTask= catchAsync(async (req, res) => {
    const id=req.params.id
    const result=await taskServices.getSingleTask(id)
     
       sendResponse(res, {
         statusCode: httpStatus.OK,
         success: true,
         message: 'task retraived succesfully',
         data: result,
       });
     });
const deleteTaskByAdmin= catchAsync(async (req, res) => {
    const id=req.params.id
    const result=await taskServices.deleteTaskByAdmin(id)
     
       sendResponse(res, {
         statusCode: httpStatus.OK,
         success: true,
         message: 'task deleted succesfully',
         data: result,
       });
     });
const updateTask= catchAsync(async (req, res) => {
    const id=req.params.id
    const result=await taskServices.updateTask(id,req.body)
     
       sendResponse(res, {
         statusCode: httpStatus.OK,
         success: true,
         message: 'task updated succesfully',
         data: result,
       });
     });
const completedTask= catchAsync(async (req, res) => {
    const id=req.query.taskId as string
    const result=await taskServices.completedTask(id,req.user)
     
       sendResponse(res, {
         statusCode: httpStatus.OK,
         success: true,
         message: 'task completed succesfully',
         data: result,
       });
     });

     export const taskController={
        createTask,
        getAllTask,
        getSingleTask,
        deleteTaskByAdmin,
        updateTask,
        completedTask
     }
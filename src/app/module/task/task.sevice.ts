import { date } from "zod"
import { ITask } from "./task.interface"
import CompletedTask, { Task } from "./task.model"
import AppError from "../../errors/AppError"
import httpStatus from "http-status"
import { JwtPayload } from "jsonwebtoken"
import app from "../../../app"
import { User } from "../users/user.model"
import { createTransport } from "nodemailer"
import mongoose from "mongoose"

const createTask = async (payload: ITask) => {
    const result = await Task.create(payload)
    return result
}
const getAllTask = async () => {
    const result = await Task.find()
    return result
}
const getSingleTask = async (id: string) => {

    const result = await Task.findOne({ _id: id })
    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, "task not found")
    }
    return result
}
const deleteTaskByAdmin = async (id: string) => {
    const task = await Task.findById({ _id: id })
    if (!task) {
        throw new AppError(httpStatus.NOT_FOUND, "task not found")
    }
    const result = await Task.deleteOne({ _id: id })
    return result
}
const updateTask = async (id: string, data: Partial<ITask>) => {
    const task = await Task.findById(id); // Find the task by its ID
    if (!task) {
        throw new AppError(httpStatus.NOT_FOUND, "Task not found");
    }

    const result = await Task.findByIdAndUpdate(
        id,       // ID to match
        { ...data },  // Data to update (spread operator used for all fields in `data`)
        { new: true, upsert: true }  // Return the updated document and upsert if not found
    );

    return result;
}


const completedTask = async (id: string, user: JwtPayload) => {
    const task = await Task.findOne({ _id: id })
    if (!task) {
        throw new AppError(httpStatus.NOT_FOUND, "task not found")
    }
    const existTask = await CompletedTask.findOne({ userId: user.userId, taskId: id })
    const isExistUser = await User.findOne({ _id: user.userId })

    if (!isExistUser) {
        throw new AppError(httpStatus.NOT_FOUND, "user not exist ")
    }
    if (!isExistUser?.isActive) {
        throw new AppError(httpStatus.NOT_FOUND, "this  user  not active")

    }

    if (existTask) {
        throw new AppError(httpStatus.CONFLICT, "Already completed this task")
    }
    const session = await mongoose.startSession();

    try {
        session.startTransaction()
        const result = await CompletedTask.create([{ taskId: id, userId: user.userId }], { session })
        const updateUserPoint = await User.findByIdAndUpdate({ _id: user.userId }, { $inc: { points: task?.points } }, { new: true, session })

        //   const updateTraineeCapacity = await Schedule.findByIdAndUpdate(
        //       { _id: payload.scheduleId },
        //       { $inc: { traineeCount: 1 } },
        //       { new: true, session }
        //     );
        await session.commitTransaction();
        await session.endSession();
        return result;
    } catch (error) {
        session.abortTransaction();
        session.endSession();
    }



}
export const taskServices = {
    createTask,
    getAllTask,
    getSingleTask,
    deleteTaskByAdmin,
    updateTask,
    completedTask
}
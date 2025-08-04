import express from "express"
import { CreateEmployee, getAllEmployee, getEmployeeById } from "./controller/employee.js"

const mainRouter= express.Router()

mainRouter.get("/",getAllEmployee)
mainRouter.get("/:id",getEmployeeById)
mainRouter.post("/",CreateEmployee)
 
export default mainRouter
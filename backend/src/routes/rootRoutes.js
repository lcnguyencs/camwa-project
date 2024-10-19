import express from "express"
import authRoutes from "./authRoutes.js";

const rootRoutes = express.Router()


rootRoutes.get(`/`, (request, respone, next) => {
    respone.json(`ok`);
 });
 
 // rootRouter.use("/auth", authRoutes)
 rootRoutes.use("/auth", authRoutes)
 rootRoutes.use("/video", videoRouter)

 export default rootRoutes;
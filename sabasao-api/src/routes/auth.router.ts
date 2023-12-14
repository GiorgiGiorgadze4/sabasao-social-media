import express from "express";
import UserController from "../controllers/user.controller";

const router = express.Router();
const userController = new UserController();

router.post("/register", async (req, res) => {
  try {
    
    console.log(req.body);
    const response = await userController.register(req.body);
    return res.json(response);
  } catch (error) {
    const errorMessage = (error as Error).message; 
    return res.status(500).json({ message: errorMessage });
  }
});


router.post("/login", async (req, res) => {
  try {
    const response = await userController.login(req.body);
    
      console.log("login mushaobs?");
      console.log(req.body);
    return res.json(response);
  } catch (error) {
    console.log("login ar mushaobs?");
    console.log(error);
    const errorMessage = (error as Error).message; 
    return res.status(500).json({ message: errorMessage });
  }
});



export default router;

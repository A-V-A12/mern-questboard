import express from "express"
import { deleteQuest, getAllQuests, getQuestById, postQuest, updateQuest } from "../controllers/qController.js";

const router = express.Router();

router.get("/",getAllQuests);
router.get("/:id",getQuestById);
router.post("/", postQuest);
router.put("/:id", updateQuest);  
router.delete("/:id", deleteQuest);

export default router;
import Quest from "../models/Quest.js"

export async function  getAllQuests  (req, res) {
   try {
    const quests = await Quest.find().sort({createdAt: -1}); // newest first
    res.status(200).json(quests);

   } catch(error){
    console.error("Error in getAllQuests controller", error);
        res.status(500).json({message:"Internal server error"});
   }
}

export async function  postQuest(req, res) {
    try {
        const {title, content} = req.body;
        const quest = new Quest({title, content});
        const savedQuest = await quest.save();
        res.status(201).json(savedQuest);
    } catch(error){
        console.error("Error in postQuest controller", error);
        res.status(500).json({message:"Internal server error"});

    }
}

export async function getQuestById(req,res){
     try {
        const quest = await Quest.findById(req.params.id)
        if(!quest) return res.status(404).json({message:"Quest not found!"});
        res.json(quest);
    } catch(error){
        console.error("Error in getQuestById controller", error);
        res.status(500).json({message:"Internal server error"});

    }
}
    

export async function  updateQuest(req, res) {
    try{
        const {title,content} = req.body;
        const updatedQuest = await Quest.findByIdAndUpdate(req.params.id,{title,content},{
            new:true,
        }
        );
        if(!updatedQuest) return res.status(404).json({message:"Quest not found."});
        res.status(200).json(updatedQuest);
    }catch(error){
        console.error("Error in updateQuest controller", error);
        res.status(500).json({message:"Internal server error"});
    }
};

export async function  deleteQuest(req, res) {
    try{
        const {title,content} = req.body;
        const deletedQuest = await Quest.findByIdAndDelete(req.params.id )
        if(!deletedQuest) return res.status(404).json({message:"Quest not found."});
        res.status(200).json({message: "Quest deleted succesfully!"});
    }catch(error){
        console.error("Error in deleteQuest controller", error);
        res.status(500).json({message:"Internal server error"});
    }
};


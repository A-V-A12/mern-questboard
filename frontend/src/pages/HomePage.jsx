import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import RateLimitedUI from "../components/RateLimitedUI.jsx";
import toast from "react-hot-toast";
import QuestCard from "../components/QuestCard.jsx";
import api from "../lib/axios.js";
import QuestsNotFound from "../components/QuestsNotFound.jsx";


const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [quests,setQuests] = useState([])
  const [loading,setLoading] = useState(true)

  useEffect(() => {
    const fetchQuests = async () => {
      try {
        const res = await api.get("/quests");
        console.log(res.data);
        setQuests(res.data);
        setIsRateLimited(false)
      } catch (error) {
        console.log("Error fetching quests");
        console.log(error);
        if (error.response?.status === 429){
          setIsRateLimited(true)
        }else{
          toast.error("Failed to load Quests")
        }
      }finally{
        setLoading(false);
      }
    }
     
    fetchQuests();
  },[])

  return (
    <div className="min-h-screen">
      <Navbar />
      {isRateLimited && <RateLimitedUI />}

      <div className="max-w-7xl mx-auto  p-4 mt-6">
        {loading && <div className="text-center text-primary py-10">Loading quests...</div> }

        {quests.length === 0 && !isRateLimited && <QuestsNotFound />}

        {quests.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quests.map(quest =>(
              <div>
                <QuestCard key={quest._id} quest={quest} setQuests={setQuests}/>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default HomePage;

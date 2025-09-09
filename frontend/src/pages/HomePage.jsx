import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import RateLimitedUI from "../components/RateLimitedUI.jsx";
import toast from "react-hot-toast";
import QuestCard from "../components/QuestCard.jsx";
import QuestsNotFound from "../components/QuestsNotFound.jsx";
import { useNavigate } from "react-router-dom";
import api from "../lib/axios.js";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [quests, setQuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkingAuth, setCheckingAuth] = useState(true); 
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAndFetch = async () => {
      try {
        const { data: verifyData } = await api.get("/auth/verify", {
          withCredentials: true,
        });

        if (!verifyData.status) {
          navigate("/login");
          return;
        }

        setUsername(verifyData.user);
        toast.success(`Hello ${verifyData.user}`, { duration: 2000 });

        
        const { data: questsData } = await api.get("/quests", {
          withCredentials: true,
        });

        setQuests(questsData);
        setIsRateLimited(false);
      } catch (err) {
        if (err.response?.status === 429) {
          setIsRateLimited(true);
          toast.error("Too many requests! Please wait a few seconds.", {
            duration: 3000,
          });
        } else {
          console.error(err);
          navigate("/login");
        }
      } finally {
        setLoading(false);
        setCheckingAuth(false); 
      }
    };

    verifyAndFetch();
  }, [navigate]);

  const Logout = async () => {
    try {
      await api.post("/auth/logout", {}, { withCredentials: true }).catch(() => {});
    } finally {
      navigate("/login");
    }
  };

  
  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p className="text-teal-400">Checking authentication...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar username={username} logout={Logout} />

      {isRateLimited && <RateLimitedUI />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="text-center text-teal-400 py-10">Loading quests...</div>
        )}

        {!loading && !isRateLimited && quests.length === 0 && <QuestsNotFound />}

        {!loading && !isRateLimited && quests.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quests.map((quest) => (
              <QuestCard key={quest._id} quest={quest} setQuests={setQuests} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;

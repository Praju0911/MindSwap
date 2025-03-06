
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import { Skill } from "@/types/database";
import { useUserSkills } from "@/hooks/useUserSkills";
import { useUserProfile } from "@/hooks/useUserProfile";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardTabs from "@/components/dashboard/DashboardTabs";
import NewSkillCard from "@/components/dashboard/NewSkillCard";

const Dashboard = () => {
  const { user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [isAddingSkill, setIsAddingSkill] = useState(false);

  const { userSkills, isLoading: skillsLoading, addSkill } = useUserSkills(user?.id);
  const { profile } = useUserProfile(user?.id);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/signin");
    }
  }, [user, authLoading, navigate]);

  const handleAddSkill = async (newSkill: Partial<Skill>) => {
    const result = await addSkill(newSkill);
    if (result) {
      setIsAddingSkill(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <DashboardHeader 
          onAddSkill={() => setIsAddingSkill(true)} 
          isAddingSkill={isAddingSkill}
        />

        {isAddingSkill && (
          <NewSkillCard 
            onSubmit={handleAddSkill} 
            onCancel={() => setIsAddingSkill(false)} 
          />
        )}

        <DashboardTabs 
          userSkills={userSkills} 
          isLoadingSkills={skillsLoading} 
          onAddSkill={() => setIsAddingSkill(true)}
        />
      </div>
    </Layout>
  );
};

export default Dashboard;

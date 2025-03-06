
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, LineChart, Book, ListChecks, GraduationCap } from "lucide-react";
import SkillCard from "@/components/SkillCard";
import AddSkillForm from "@/components/AddSkillForm";
import { toast } from "sonner";

const Dashboard = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [userSkills, setUserSkills] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [isLoadingSkills, setIsLoadingSkills] = useState(true);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/signin");
    }
  }, [user, isLoading, navigate]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
      
      if (error) {
        console.error("Error fetching profile:", error);
        return;
      }
      
      setProfile(data);
    };

    const fetchUserSkills = async () => {
      if (!user) return;
      
      setIsLoadingSkills(true);
      
      const { data, error } = await supabase
        .from("skills")
        .select("*, profiles:user_id(*)")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      
      if (error) {
        console.error("Error fetching skills:", error);
        toast.error("Failed to load skills");
        setIsLoadingSkills(false);
        return;
      }
      
      setUserSkills(data || []);
      setIsLoadingSkills(false);
    };

    fetchProfile();
    fetchUserSkills();
  }, [user]);

  const handleAddSkill = async (newSkill: any) => {
    try {
      if (!user) return;
      
      const { data, error } = await supabase
        .from("skills")
        .insert({
          ...newSkill,
          user_id: user.id
        })
        .select("*, profiles:user_id(*)");
      
      if (error) {
        console.error("Error adding skill:", error);
        toast.error("Failed to add skill");
        return;
      }
      
      setUserSkills([data[0], ...userSkills]);
      setIsAddingSkill(false);
      toast.success("Skill added successfully");
    } catch (error) {
      console.error("Error adding skill:", error);
      toast.error("Failed to add skill");
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your skills and track your progress
            </p>
          </div>
          <Button 
            onClick={() => setIsAddingSkill(true)} 
            className="mt-4 md:mt-0"
            disabled={isAddingSkill}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Skill
          </Button>
        </div>

        {isAddingSkill && (
          <Card className="mb-8 border-primary/20 animate-in fade-in">
            <CardHeader>
              <CardTitle>Add New Skill</CardTitle>
              <CardDescription>Share a skill you can teach others</CardDescription>
            </CardHeader>
            <CardContent>
              <AddSkillForm onSubmit={handleAddSkill} onCancel={() => setIsAddingSkill(false)} />
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="skills" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="skills">
              <Book className="mr-2 h-4 w-4" />
              My Skills
            </TabsTrigger>
            <TabsTrigger value="progress">
              <LineChart className="mr-2 h-4 w-4" />
              Progress
            </TabsTrigger>
            <TabsTrigger value="requests">
              <ListChecks className="mr-2 h-4 w-4" />
              Exchange Requests
            </TabsTrigger>
          </TabsList>

          <TabsContent value="skills" className="space-y-6">
            {isLoadingSkills ? (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center p-6">Loading your skills...</div>
                </CardContent>
              </Card>
            ) : userSkills.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userSkills.map((skill) => (
                  <SkillCard
                    key={skill.id}
                    id={skill.id}
                    title={skill.title}
                    description={skill.description}
                    category={skill.category}
                    user={{
                      id: skill.profiles.id,
                      name: skill.profiles.full_name || skill.profiles.username || "Anonymous",
                      avatar: skill.profiles.avatar_url
                    }}
                    featured={skill.featured}
                  />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center p-6">
                    <GraduationCap className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No skills added yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Share your knowledge with others by adding skills you can teach
                    </p>
                    <Button onClick={() => setIsAddingSkill(true)}>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Your First Skill
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="progress">
            <Card>
              <CardHeader>
                <CardTitle>Your Learning Progress</CardTitle>
                <CardDescription>
                  Track your progress in the skills you're learning
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center p-8">
                  <LineChart className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Coming Soon</h3>
                  <p className="text-muted-foreground">
                    We're working on building progress tracking features
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requests">
            <Card>
              <CardHeader>
                <CardTitle>Exchange Requests</CardTitle>
                <CardDescription>
                  Manage requests from people who want to learn from you
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center p-8">
                  <ListChecks className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No requests yet</h3>
                  <p className="text-muted-foreground">
                    When someone wants to learn from you, requests will appear here
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Dashboard;

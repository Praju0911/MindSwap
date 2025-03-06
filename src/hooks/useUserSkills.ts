
import { useState, useEffect } from "react";
import { Skill } from "@/types/database";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useUserSkills = (userId: string | undefined) => {
  const [userSkills, setUserSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    
    const fetchUserSkills = async () => {
      setIsLoading(true);
      
      try {
        // Use any to bypass type checking for Supabase client
        const { data, error } = await (supabase as any)
          .from('skills')
          .select('*, profiles:user_id(*)')
          .eq('user_id', userId)
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error("Error fetching skills:", error);
          toast.error("Failed to load skills");
          return;
        }
        
        setUserSkills(data as Skill[] || []);
      } catch (error) {
        console.error("Error in skill fetching:", error);
        toast.error("Failed to load skills");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserSkills();
  }, [userId]);

  const addSkill = async (newSkill: Partial<Skill>) => {
    try {
      if (!userId) return;
      
      // Use any to bypass type checking for Supabase client
      const { data, error } = await (supabase as any)
        .from('skills')
        .insert({
          ...newSkill,
          user_id: userId
        })
        .select('*, profiles:user_id(*)');
      
      if (error) {
        console.error("Error adding skill:", error);
        toast.error("Failed to add skill");
        return null;
      }
      
      setUserSkills([data[0] as Skill, ...userSkills]);
      toast.success("Skill added successfully");
      return data[0] as Skill;
    } catch (error) {
      console.error("Error adding skill:", error);
      toast.error("Failed to add skill");
      return null;
    }
  };

  return { userSkills, isLoading, addSkill };
};

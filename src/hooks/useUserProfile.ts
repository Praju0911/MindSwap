
import { useState, useEffect } from "react";
import { Profile } from "@/types/database";
import { supabase } from "@/integrations/supabase/client";

export const useUserProfile = (userId: string | undefined) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setIsLoading(false);
      return;
    }
    
    const fetchProfile = async () => {
      setIsLoading(true);
      
      try {
        // Use any to bypass type checking for Supabase client
        const { data, error } = await (supabase as any)
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();
        
        if (error) {
          console.error("Error fetching profile:", error);
          return;
        }
        
        setProfile(data as Profile);
      } catch (error) {
        console.error("Error in profile fetching:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  return { profile, isLoading };
};

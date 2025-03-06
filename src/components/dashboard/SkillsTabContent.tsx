
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import SkillCard from "@/components/SkillCard";
import { Skill } from "@/types/database";

interface SkillsTabContentProps {
  skills: Skill[];
  isLoading: boolean;
  onAddSkill: () => void;
}

const SkillsTabContent = ({ skills, isLoading, onAddSkill }: SkillsTabContentProps) => {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center p-6">Loading your skills...</div>
        </CardContent>
      </Card>
    );
  }

  if (skills.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center p-6">
            <GraduationCap className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No skills added yet</h3>
            <p className="text-muted-foreground mb-4">
              Share your knowledge with others by adding skills you can teach
            </p>
            <Button onClick={onAddSkill}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Your First Skill
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {skills.map((skill) => (
        <SkillCard
          key={skill.id}
          id={skill.id}
          title={skill.title}
          description={skill.description}
          category={skill.category}
          user={{
            id: skill.profiles?.id || "",
            name: skill.profiles?.full_name || skill.profiles?.username || "Anonymous",
            avatar: skill.profiles?.avatar_url || undefined
          }}
          featured={skill.featured}
        />
      ))}
    </div>
  );
};

export default SkillsTabContent;

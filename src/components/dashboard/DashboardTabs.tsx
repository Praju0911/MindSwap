
import { Book, LineChart, ListChecks } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SkillsTabContent from "./SkillsTabContent";
import ProgressTabContent from "./ProgressTabContent";
import RequestsTabContent from "./RequestsTabContent";
import { Skill } from "@/types/database";

interface DashboardTabsProps {
  userSkills: Skill[];
  isLoadingSkills: boolean;
  onAddSkill: () => void;
}

const DashboardTabs = ({ userSkills, isLoadingSkills, onAddSkill }: DashboardTabsProps) => {
  return (
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
        <SkillsTabContent 
          skills={userSkills} 
          isLoading={isLoadingSkills} 
          onAddSkill={onAddSkill} 
        />
      </TabsContent>

      <TabsContent value="progress">
        <ProgressTabContent />
      </TabsContent>

      <TabsContent value="requests">
        <RequestsTabContent />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;

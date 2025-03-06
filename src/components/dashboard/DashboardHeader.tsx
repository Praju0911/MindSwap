
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface DashboardHeaderProps {
  onAddSkill: () => void;
  isAddingSkill: boolean;
}

const DashboardHeader = ({ onAddSkill, isAddingSkill }: DashboardHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your skills and track your progress
        </p>
      </div>
      <Button 
        onClick={onAddSkill} 
        className="mt-4 md:mt-0"
        disabled={isAddingSkill}
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Add New Skill
      </Button>
    </div>
  );
};

export default DashboardHeader;

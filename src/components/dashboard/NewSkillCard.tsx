
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import AddSkillForm from "@/components/AddSkillForm";
import { Skill } from "@/types/database";

interface NewSkillCardProps {
  onSubmit: (values: Partial<Skill>) => void;
  onCancel: () => void;
}

const NewSkillCard = ({ onSubmit, onCancel }: NewSkillCardProps) => {
  return (
    <Card className="mb-8 border-primary/20 animate-in fade-in">
      <CardHeader>
        <CardTitle>Add New Skill</CardTitle>
        <CardDescription>Share a skill you can teach others</CardDescription>
      </CardHeader>
      <CardContent>
        <AddSkillForm onSubmit={onSubmit} onCancel={onCancel} />
      </CardContent>
    </Card>
  );
};

export default NewSkillCard;

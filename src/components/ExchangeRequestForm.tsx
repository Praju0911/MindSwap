
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { skills, getUserById } from "@/data/skills";

interface ExchangeRequestFormProps {
  skillOwner: string;
  skillTitle: string;
  onSubmit: (message: string) => void;
  onCancel: () => void;
}

export const ExchangeRequestForm = ({
  skillOwner,
  skillTitle,
  onSubmit,
  onCancel
}: ExchangeRequestFormProps) => {
  const [message, setMessage] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");
  const [loading, setLoading] = useState(false);
  
  // For demo purposes: these would be the current user's skills in a real app
  // Here we're just grabbing a different user's skills as an example
  const currentUserId = "user2"; // This would be the logged-in user
  const currentUser = getUserById(currentUserId);
  const mySkills = skills.filter(skill => skill.userId === currentUserId);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onSubmit(message);
      setLoading(false);
    }, 1000);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="skill-select">Offer one of your skills</Label>
          <Select 
            value={selectedSkill} 
            onValueChange={setSelectedSkill}
          >
            <SelectTrigger id="skill-select">
              <SelectValue placeholder="Select one of your skills to offer" />
            </SelectTrigger>
            <SelectContent>
              {mySkills.map(skill => (
                <SelectItem key={skill.id} value={skill.id}>
                  {skill.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="message">
            Message to {skillOwner}
          </Label>
          <Textarea
            id="message"
            placeholder={`Hi, I'm interested in learning "${skillTitle}". I can offer my expertise in return.`}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[120px]"
          />
        </div>
      </div>
      
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button 
          type="submit" 
          disabled={!selectedSkill || !message || loading}
        >
          {loading ? "Sending..." : "Send Request"}
        </Button>
      </DialogFooter>
    </form>
  );
};

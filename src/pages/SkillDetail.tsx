
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { CalendarDays, MessageCircle, ArrowLeft, Clock, Sparkles, Star, User, Handshake, Check } from "lucide-react";
import { getSkillById, getUserById } from "@/data/skills";
import { useToast } from "@/components/ui/use-toast";
import { ExchangeRequestForm } from "@/components/ExchangeRequestForm";

const SkillDetail = () => {
  const { skillId } = useParams();
  const [showExchangeForm, setShowExchangeForm] = useState(false);
  const { toast } = useToast();
  
  // Get skill data
  const skill = getSkillById(skillId);
  
  // Handle case when skill is not found
  if (!skill) {
    return (
      <Layout>
        <div className="container py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Skill Not Found</h1>
          <p className="mb-6">The skill you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/skills">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Skills
            </Link>
          </Button>
        </div>
      </Layout>
    );
  }
  
  // Get user data
  const user = getUserById(skill.userId);
  const formattedDate = new Date(skill.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  
  const handleExchangeRequest = () => {
    setShowExchangeForm(true);
  };
  
  const handleExchangeSubmit = (message: string) => {
    toast({
      title: "Exchange requested!",
      description: "Your request has been sent to the skill owner.",
      duration: 5000,
    });
    setShowExchangeForm(false);
  };
  
  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-muted/30 py-4">
        <div className="container">
          <div className="flex items-center text-sm text-muted-foreground">
            <Link to="/skills" className="hover:text-foreground transition-colors">
              Skills
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{skill.title}</span>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Skill Info Column */}
          <div className="md:col-span-2 space-y-8">
            {/* Skill Header */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="outline">{skill.category}</Badge>
                {skill.featured && (
                  <Badge variant="default" className="bg-primary">
                    <Sparkles className="h-3 w-3 mr-1" /> Featured
                  </Badge>
                )}
              </div>
              
              <h1 className="text-3xl font-bold tracking-tight mb-4">{skill.title}</h1>
              
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <CalendarDays className="h-4 w-4 mr-1.5" />
                  <span>Posted {formattedDate}</span>
                </div>
              </div>
            </div>
            
            <Separator />
            
            {/* Skill Description */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <div className="prose prose-sm max-w-none">
                <p className="whitespace-pre-line text-base leading-relaxed">{skill.description}</p>
              </div>
            </div>
            
            <Separator />
            
            {/* Tags */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {skill.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Exchange Action Card */}
            <Card className="p-6">
              <div className="text-center mb-6">
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handleExchangeRequest}
                >
                  <Handshake className="mr-2 h-5 w-5" />
                  Request Exchange
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground text-center mb-4">
                Interested in this skill? Request an exchange with your own skills.
              </p>
              
              <Separator className="my-4" />
              
              {/* User Profile Card */}
              <div className="text-center">
                <h3 className="font-medium mb-4">Offered by</h3>
                <div className="flex justify-center mb-3">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback className="text-lg">{user?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
                <Link to={`/profile/${user.id}`} className="font-medium hover:underline">
                  {user.name}
                </Link>
                <p className="text-sm text-muted-foreground mt-1">Member since {new Date(user.joinedAt).toLocaleDateString()}</p>
                
                <div className="mt-4">
                  <Button variant="outline" className="w-full" asChild>
                    <Link to={`/profile/${user.id}`}>
                      <User className="mr-2 h-4 w-4" />
                      View Profile
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Exchange Request Dialog */}
      <Dialog open={showExchangeForm} onOpenChange={setShowExchangeForm}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Request Skill Exchange</DialogTitle>
            <DialogDescription>
              Send a message to {user.name} explaining what skills you can offer in return.
            </DialogDescription>
          </DialogHeader>
          
          <ExchangeRequestForm 
            skillOwner={user.name} 
            skillTitle={skill.title}
            onSubmit={handleExchangeSubmit}
            onCancel={() => setShowExchangeForm(false)}
          />
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default SkillDetail;

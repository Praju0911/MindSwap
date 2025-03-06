
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { Shuffle, MessageCircle } from "lucide-react";

export interface SkillCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
  featured?: boolean;
}

const SkillCard = ({ 
  id, 
  title, 
  description, 
  category, 
  user,
  featured = false 
}: SkillCardProps) => {
  return (
    <Card className={`overflow-hidden transition-all hover:shadow-md ${
      featured ? "border-primary/20 bg-primary/5" : ""
    }`}>
      <CardHeader className="p-4">
        <div className="flex justify-between items-start">
          <Badge variant="outline" className="mb-2">
            {category}
          </Badge>
          {featured && (
            <Badge variant="default" className="bg-primary">
              Featured
            </Badge>
          )}
        </div>
        <Link to={`/skills/${id}`} className="hover:underline underline-offset-4">
          <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
        </Link>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-muted-foreground line-clamp-3">{description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <Link to={`/profile/${user.id}`}>
          <div className="flex items-center space-x-2">
            <Avatar className="h-7 w-7">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {user.name}
            </span>
          </div>
        </Link>
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm">
            <MessageCircle className="h-4 w-4 mr-1" />
            <span className="text-xs">Chat</span>
          </Button>
          <Button variant="outline" size="sm" className="text-xs">
            <Shuffle className="h-4 w-4 mr-1" />
            Exchange
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SkillCard;

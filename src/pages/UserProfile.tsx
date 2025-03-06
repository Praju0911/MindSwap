
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Mail, Calendar as CalendarIcon, MessageCircle, User, Handshake, Star } from "lucide-react";
import { getUserById, getSkillsByUserId } from "@/data/skills";
import SkillCard from "@/components/SkillCard";

const UserProfile = () => {
  const { userId } = useParams();
  const user = getUserById(userId);
  const userSkills = getSkillsByUserId(userId);
  
  if (!user) {
    return (
      <Layout>
        <div className="container py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">User Not Found</h1>
          <p className="mb-6">The user you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/skills">Back to Skills</Link>
          </Button>
        </div>
      </Layout>
    );
  }
  
  const joinedDate = new Date(user.joinedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });
  
  return (
    <Layout>
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-card rounded-lg border p-6 text-center">
              <Avatar className="h-24 w-24 mx-auto mb-4">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              
              <h1 className="text-xl font-bold mb-1">{user.name}</h1>
              <p className="text-sm text-muted-foreground mb-4">
                <CalendarIcon className="h-3.5 w-3.5 inline mr-1" />
                Joined {joinedDate}
              </p>
              
              <Button variant="outline" className="w-full mb-3">
                <MessageCircle className="mr-2 h-4 w-4" />
                Message
              </Button>
              
              <Separator className="my-6" />
              
              {/* Bio */}
              {user.bio && (
                <div className="text-left mb-6">
                  <h3 className="font-medium mb-2 text-sm">About</h3>
                  <p className="text-sm text-muted-foreground">{user.bio}</p>
                </div>
              )}
              
              {/* Interests */}
              <div className="text-left">
                <h3 className="font-medium mb-3 text-sm">Interests</h3>
                <div className="flex flex-wrap gap-1.5">
                  {user.interests.map((interest) => (
                    <Badge key={interest} variant="secondary" className="text-xs">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="md:col-span-3">
            <Tabs defaultValue="skills" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="skills" className="flex items-center">
                  <Star className="h-4 w-4 mr-2" />
                  Skills ({userSkills.length})
                </TabsTrigger>
                <TabsTrigger value="exchanges" className="flex items-center">
                  <Handshake className="h-4 w-4 mr-2" />
                  Exchanges
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="skills">
                {userSkills.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {userSkills.map((skill) => (
                      <div key={skill.id}>
                        <SkillCard
                          id={skill.id}
                          title={skill.title}
                          description={skill.description}
                          category={skill.category}
                          user={{
                            id: user.id,
                            name: user.name,
                            avatar: user.avatar
                          }}
                          featured={skill.featured}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-muted/30 rounded-lg">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                      <Star className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No skills yet</h3>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                      This user hasn't added any skills yet.
                    </p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="exchanges">
                <div className="text-center py-12 bg-muted/30 rounded-lg">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                    <Handshake className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No exchanges yet</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    This user hasn't completed any skill exchanges yet.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserProfile;

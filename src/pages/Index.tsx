
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import SkillCard from '@/components/SkillCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Card, 
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  Search, 
  Shuffle, 
  MessageCircle, 
  Users, 
  BookOpen 
} from 'lucide-react';
import { getRecentSkills, getFeaturedSkills, categories, getUserById } from '@/data/skills';

const Index = () => {
  const [recentSkills, setRecentSkills] = useState([]);
  const [featuredSkills, setFeaturedSkills] = useState([]);
  
  useEffect(() => {
    // In a real application, this would be API calls
    setRecentSkills(getRecentSkills(3));
    setFeaturedSkills(getFeaturedSkills());
  }, []);

  const heroFeatures = [
    { icon: <Shuffle className="h-5 w-5" />, text: "Direct knowledge exchange" },
    { icon: <MessageCircle className="h-5 w-5" />, text: "Secure messaging" },
    { icon: <Users className="h-5 w-5" />, text: "Community of learners" },
  ];

  const steps = [
    {
      number: "01",
      title: "Create your profile",
      description: "Sign up and list the skills you're willing to share with others."
    },
    {
      number: "02",
      title: "Find your match",
      description: "Browse through available skills and find someone whose knowledge you value."
    },
    {
      number: "03",
      title: "Initiate an exchange",
      description: "Send an exchange request offering your skill in return for theirs."
    },
    {
      number: "04",
      title: "Learn together",
      description: "Once accepted, arrange sessions and start sharing knowledge."
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 -z-10" />
        <div className="container px-4 py-20 md:py-32 mx-auto">
          <div className="max-w-3xl mx-auto text-center animate-on-scroll">
            <Badge variant="outline" className="mb-4 px-3 py-1 text-sm bg-background/80 backdrop-blur-sm">
              Peer-to-Peer Knowledge Exchange
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Exchange Skills, <span className="text-primary">Share Knowledge</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              A platform where you can trade your expertise with others. No money involved, just pure knowledge exchange.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
              <Link to="/signup">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/how-it-works">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Learn How It Works
                </Button>
              </Link>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              {heroFeatures.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary mr-2">
                    {feature.icon}
                  </div>
                  <span className="text-sm md:text-base">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Search Bar Section */}
      <section className="py-10 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <Input 
              type="search"
              placeholder="Find a skill you'd like to learn..."
              className="pl-10 py-6 text-base rounded-lg border-muted-foreground/20"
            />
            <div className="absolute inset-y-0 right-1.5 flex items-center">
              <Button className="rounded-md">Search</Button>
            </div>
          </div>
          
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <span className="text-sm text-muted-foreground mr-2">Popular:</span>
            {categories.slice(0, 6).map((category, index) => (
              <Link key={index} to={`/skills?category=${category}`}>
                <Badge variant="outline" className="hover:bg-secondary transition-colors cursor-pointer">
                  {category}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Skills Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div className="animate-on-scroll">
              <Badge variant="outline" className="mb-3">Featured Skills</Badge>
              <h2 className="text-3xl font-bold tracking-tight mb-3">
                Discover Popular Exchanges
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                Browse through our handpicked selection of high-quality skills being offered by our community members.
              </p>
            </div>
            <Link to="/skills" className="mt-4 md:mt-0">
              <Button variant="outline">
                View All Skills
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredSkills.map((skill, index) => {
              const user = getUserById(skill.userId);
              return (
                <div key={skill.id} className={`animate-on-scroll duration-${(index + 1) * 100}`}>
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
                    featured={true}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <Badge variant="outline" className="mb-3">Simple Process</Badge>
            <h2 className="text-3xl font-bold tracking-tight mb-3">
              How Knowledge Barter Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform makes it easy to connect with others and exchange valuable skills and knowledge.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <Card key={index} className="border-none shadow-none bg-transparent animate-on-scroll duration-500">
                <CardHeader>
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                    <span className="font-bold">{step.number}</span>
                  </div>
                  <CardTitle>{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{step.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 text-center animate-on-scroll">
            <Link to="/how-it-works">
              <Button>
                Learn More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Recent Skills Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div className="animate-on-scroll">
              <Badge variant="outline" className="mb-3">New Additions</Badge>
              <h2 className="text-3xl font-bold tracking-tight mb-3">
                Recently Added Skills
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                Check out the latest skills added to our platform by community members.
              </p>
            </div>
            <Link to="/skills" className="mt-4 md:mt-0">
              <Button variant="outline">
                View All Skills
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentSkills.map((skill, index) => {
              const user = getUserById(skill.userId);
              return (
                <div key={skill.id} className={`animate-on-scroll duration-${(index + 1) * 100}`}>
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
                    featured={false}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center animate-on-scroll">
            <Badge variant="outline" className="mb-4 px-3 py-1 text-sm backdrop-blur-sm border-primary-foreground/30 text-primary-foreground">
              Join Our Community
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Ready to Start Exchanging Knowledge?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Create your profile today and become part of a growing community that values sharing knowledge and skills.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/signup">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Create Your Profile
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/skills">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  Browse Available Skills
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;

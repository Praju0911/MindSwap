
import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import SkillCard from '@/components/SkillCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  Check
} from 'lucide-react';
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
} from "@/components/ui/tabs";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { skills, categories, getUserById } from '@/data/skills';

const Skills = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get('category');
  
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [sortBy, setSortBy] = useState('recent');
  
  useEffect(() => {
    filterSkills();
  }, [selectedCategory, searchQuery, sortBy]);
  
  const filterSkills = () => {
    let filtered = [...skills];
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(skill => skill.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        skill => 
          skill.title.toLowerCase().includes(query) || 
          skill.description.toLowerCase().includes(query) ||
          skill.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Sort
    if (sortBy === 'recent') {
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortBy === 'alphabetical') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }
    
    setFilteredSkills(filtered);
  };
  
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  const handleSortChange = (value) => {
    setSortBy(value);
  };

  return (
    <Layout>
      {/* Header */}
      <section className="bg-muted/30 py-12 md:py-20">
        <div className="container px-4 mx-auto">
          <div className="text-center max-w-3xl mx-auto animate-on-scroll">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Browse Skills
            </h1>
            <p className="text-muted-foreground mb-8">
              Discover skills and knowledge shared by our community members that you can exchange for your own expertise.
            </p>
            
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <Input 
                type="search"
                placeholder="Search for skills, topics, or keywords..."
                className="pl-10 py-6 text-base rounded-lg border-muted-foreground/20"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <div className="absolute inset-y-0 right-1.5 flex items-center">
                <Button className="rounded-md">Search</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Skills Listing */}
      <section className="py-12">
        <div className="container px-4 mx-auto">
          {/* Filters */}
          <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <Tabs 
              defaultValue={selectedCategory} 
              onValueChange={handleCategoryChange}
              className="w-full md:w-auto"
            >
              <div className="overflow-x-auto pb-2">
                <TabsList className="inline-flex h-9 rounded-lg bg-muted p-1 text-muted-foreground">
                  <TabsTrigger 
                    value="all" 
                    className="rounded-md text-xs sm:text-sm px-3"
                  >
                    All Skills
                  </TabsTrigger>
                  {categories.map((category) => (
                    <TabsTrigger 
                      key={category} 
                      value={category} 
                      className="rounded-md text-xs sm:text-sm px-3"
                    >
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
            </Tabs>
            
            <div className="flex items-center space-x-2 self-end md:self-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Sort By
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuCheckboxItem 
                    checked={sortBy === 'recent'} 
                    onCheckedChange={() => handleSortChange('recent')}
                    className="cursor-pointer"
                  >
                    Most Recent
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem 
                    checked={sortBy === 'alphabetical'} 
                    onCheckedChange={() => handleSortChange('alphabetical')}
                    className="cursor-pointer"
                  >
                    Alphabetical
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          {/* Active Filters */}
          {(selectedCategory !== 'all' || searchQuery) && (
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {selectedCategory !== 'all' && (
                <Badge 
                  variant="secondary" 
                  className="flex items-center gap-1 cursor-pointer"
                  onClick={() => setSelectedCategory('all')}
                >
                  Category: {selectedCategory}
                  <button className="ml-1 text-muted-foreground hover:text-foreground">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </Badge>
              )}
              {searchQuery && (
                <Badge 
                  variant="secondary" 
                  className="flex items-center gap-1 cursor-pointer"
                  onClick={() => setSearchQuery('')}
                >
                  Search: {searchQuery}
                  <button className="ml-1 text-muted-foreground hover:text-foreground">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </Badge>
              )}
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 px-2 text-xs"
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
              >
                Clear all
              </Button>
            </div>
          )}
          
          {/* Skills Grid */}
          {filteredSkills.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSkills.map((skill, index) => {
                const user = getUserById(skill.userId);
                return (
                  <div key={skill.id} className={`animate-on-scroll duration-${(index % 3 + 1) * 100}`}>
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
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No skills found</h3>
              <p className="text-muted-foreground mb-6">
                We couldn't find any skills matching your current filters.
              </p>
              <Button 
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Skills;

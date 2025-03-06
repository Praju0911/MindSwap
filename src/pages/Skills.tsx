
import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import SkillCard from '@/components/SkillCard';
import FiltersSidebar from '@/components/FiltersSidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  Check,
  X
} from 'lucide-react';
import { 
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet";
import { skills, categories, getUserById } from '@/data/skills';

const Skills = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get('category');
  
  // Define all popular tags from our skills data
  const allTags = Array.from(new Set(skills.flatMap(skill => skill.tags)));
  const popularTags = allTags.slice(0, 10); // Take top 10 tags
  
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [sortBy, setSortBy] = useState('recent');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  
  // Extended filters state
  const [filters, setFilters] = useState({
    category: categoryParam || 'all',
    tags: [],
    featured: false,
    dateRange: [0, 4] as [number, number]
  });
  
  useEffect(() => {
    filterSkills();
  }, [filters, searchQuery, sortBy]);
  
  const filterSkills = () => {
    let filtered = [...skills];
    
    // Filter by category
    if (filters.category !== 'all') {
      filtered = filtered.filter(skill => skill.category === filters.category);
    }
    
    // Filter by tags if any selected
    if (filters.tags.length > 0) {
      filtered = filtered.filter(skill => 
        filters.tags.some(tag => skill.tags.includes(tag))
      );
    }
    
    // Filter by featured status
    if (filters.featured) {
      filtered = filtered.filter(skill => skill.featured);
    }
    
    // Filter by date range
    if (filters.dateRange[0] > 0) {
      const now = new Date();
      const monthsAgo = [0, 1, 3, 6, 12][filters.dateRange[0]];
      const cutoffDate = new Date();
      cutoffDate.setMonth(now.getMonth() - monthsAgo);
      
      filtered = filtered.filter(skill => new Date(skill.createdAt) >= cutoffDate);
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
  
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
    
    if (key === 'category') {
      setSelectedCategory(value);
    }
  };
  
  const handleClearFilters = () => {
    setFilters({
      category: 'all',
      tags: [],
      featured: false,
      dateRange: [0, 4]
    });
    setSelectedCategory('all');
  };
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  const handleSortChange = (value) => {
    setSortBy(value);
  };
  
  // Check if any filters are active
  const hasActiveFilters = 
    filters.category !== 'all' || 
    filters.tags.length > 0 || 
    filters.featured || 
    filters.dateRange[0] > 0 ||
    searchQuery;

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
          {/* Mobile Filters Button */}
          <div className="md:hidden mb-4">
            <Sheet open={isMobileFiltersOpen} onOpenChange={setIsMobileFiltersOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters {hasActiveFilters && <Badge className="ml-1 px-1">{filteredSkills.length}</Badge>}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[85%] sm:max-w-md pt-10">
                <FiltersSidebar
                  categories={categories}
                  selectedFilters={filters}
                  onFilterChange={handleFilterChange}
                  onClearFilters={handleClearFilters}
                  popularTags={popularTags}
                />
              </SheetContent>
            </Sheet>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Desktop Filters Sidebar */}
            <div className="hidden md:block md:w-1/4 lg:w-1/5">
              <FiltersSidebar
                categories={categories}
                selectedFilters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
                popularTags={popularTags}
                className="sticky top-24"
              />
            </div>
            
            {/* Main Content */}
            <div className="md:w-3/4 lg:w-4/5">
              {/* Active Filters & Sort */}
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                {/* Active Filters */}
                <div className="flex flex-wrap items-center gap-2">
                  {hasActiveFilters && (
                    <>
                      <span className="text-sm text-muted-foreground">Active filters:</span>
                      {filters.category !== 'all' && (
                        <Badge 
                          variant="secondary" 
                          className="flex items-center gap-1 cursor-pointer"
                          onClick={() => handleFilterChange('category', 'all')}
                        >
                          Category: {filters.category}
                          <X className="h-3 w-3 ml-1" />
                        </Badge>
                      )}
                      {filters.tags.map(tag => (
                        <Badge 
                          key={tag}
                          variant="secondary" 
                          className="flex items-center gap-1 cursor-pointer"
                          onClick={() => {
                            const newTags = filters.tags.filter(t => t !== tag);
                            handleFilterChange('tags', newTags);
                          }}
                        >
                          Tag: {tag}
                          <X className="h-3 w-3 ml-1" />
                        </Badge>
                      ))}
                      {filters.featured && (
                        <Badge 
                          variant="secondary" 
                          className="flex items-center gap-1 cursor-pointer"
                          onClick={() => handleFilterChange('featured', false)}
                        >
                          Featured only
                          <X className="h-3 w-3 ml-1" />
                        </Badge>
                      )}
                      {searchQuery && (
                        <Badge 
                          variant="secondary" 
                          className="flex items-center gap-1 cursor-pointer"
                          onClick={() => setSearchQuery('')}
                        >
                          Search: {searchQuery}
                          <X className="h-3 w-3 ml-1" />
                        </Badge>
                      )}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 px-2 text-xs"
                        onClick={handleClearFilters}
                      >
                        Clear all
                      </Button>
                    </>
                  )}
                </div>
                
                {/* Sort Dropdown */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground hidden sm:inline">Sort by:</span>
                  <select
                    className="text-sm rounded-md border border-input bg-background px-3 py-1"
                    value={sortBy}
                    onChange={(e) => handleSortChange(e.target.value)}
                  >
                    <option value="recent">Most Recent</option>
                    <option value="alphabetical">Alphabetical</option>
                  </select>
                </div>
              </div>
              
              {/* Results Count */}
              <div className="mb-6">
                <p className="text-sm text-muted-foreground">
                  Showing <span className="font-medium text-foreground">{filteredSkills.length}</span> skills
                </p>
              </div>
              
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
                <div className="text-center py-12 bg-muted/30 rounded-lg">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                    <Search className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No skills found</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    We couldn't find any skills matching your current filters.
                    Try adjusting your search terms or filters.
                  </p>
                  <Button 
                    onClick={handleClearFilters}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Skills;

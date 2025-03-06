
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Filter, 
  X, 
  CalendarDays, 
  Sparkles,
  Star 
} from "lucide-react";

interface FiltersSidebarProps {
  categories: string[];
  selectedFilters: {
    category: string;
    tags: string[];
    featured: boolean;
    dateRange: [number, number];
  };
  onFilterChange: (key: string, value: any) => void;
  onClearFilters: () => void;
  popularTags: string[];
  className?: string;
}

const FiltersSidebar = ({
  categories,
  selectedFilters,
  onFilterChange,
  onClearFilters,
  popularTags,
  className
}: FiltersSidebarProps) => {
  // Mock date range (0-12 months ago)
  const dateRangeLabels = ["Any time", "1 month", "3 months", "6 months", "12 months"];
  
  return (
    <div className={`space-y-6 p-4 bg-card rounded-lg border ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium flex items-center">
          <Filter className="h-5 w-5 mr-2" />
          Filters
        </h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClearFilters}
          className="h-8 px-2 text-xs"
        >
          <X className="h-4 w-4 mr-1" /> Clear all
        </Button>
      </div>
      
      <Separator />
      
      {/* Categories */}
      <div>
        <h4 className="font-medium mb-3 text-sm">Categories</h4>
        <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox 
                id={`category-${category}`} 
                checked={selectedFilters.category === category}
                onCheckedChange={() => onFilterChange("category", 
                  selectedFilters.category === category ? "all" : category
                )}
              />
              <Label 
                htmlFor={`category-${category}`}
                className="text-sm cursor-pointer"
              >
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>
      
      <Separator />
      
      {/* Popular Tags */}
      <div>
        <h4 className="font-medium mb-3 text-sm">Popular Tags</h4>
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag) => (
            <Badge 
              key={tag}
              variant={selectedFilters.tags.includes(tag) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => {
                const newTags = selectedFilters.tags.includes(tag)
                  ? selectedFilters.tags.filter(t => t !== tag)
                  : [...selectedFilters.tags, tag];
                onFilterChange("tags", newTags);
              }}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      
      <Separator />
      
      {/* Date Range */}
      <div>
        <h4 className="font-medium mb-3 text-sm flex items-center">
          <CalendarDays className="h-4 w-4 mr-1" /> Date Posted
        </h4>
        <div className="px-2">
          <Slider 
            defaultValue={selectedFilters.dateRange} 
            max={4}
            step={1}
            onValueChange={(value) => onFilterChange("dateRange", value as [number, number])}
            className="mb-6"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            {dateRangeLabels.map((label, index) => (
              <span key={index} className={`${index === selectedFilters.dateRange[0] ? "font-medium text-foreground" : ""}`}>
                {index === 0 || index === 4 ? label : ""}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <Separator />
      
      {/* Featured Only */}
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="featured-only" 
          checked={selectedFilters.featured}
          onCheckedChange={(checked) => onFilterChange("featured", checked)}
        />
        <Label 
          htmlFor="featured-only"
          className="text-sm cursor-pointer flex items-center"
        >
          Featured skills only <Sparkles className="h-4 w-4 ml-1 text-amber-400" />
        </Label>
      </div>
    </div>
  );
};

export default FiltersSidebar;

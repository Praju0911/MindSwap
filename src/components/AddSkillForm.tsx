
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categories } from "@/data/skills";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const skillFormSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }).max(100, {
    message: "Title must not exceed 100 characters."
  }),
  description: z.string().min(20, {
    message: "Description must be at least 20 characters.",
  }).max(1000, {
    message: "Description must not exceed 1000 characters."
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  tags: z.array(z.string()).optional(),
});

type SkillFormValues = z.infer<typeof skillFormSchema>;

interface AddSkillFormProps {
  onSubmit: (values: SkillFormValues) => void;
  onCancel: () => void;
}

const AddSkillForm = ({ onSubmit, onCancel }: AddSkillFormProps) => {
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  
  const form = useForm<SkillFormValues>({
    resolver: zodResolver(skillFormSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      tags: [],
    },
  });

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === "," || e.key === " ") {
      e.preventDefault();
      
      const newTag = tagInput.trim();
      
      if (newTag && !tags.includes(newTag) && tags.length < 5) {
        setTags([...tags, newTag]);
        setTagInput("");
        form.setValue("tags", [...tags, newTag]);
      }
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const filteredTags = tags.filter(tag => tag !== tagToRemove);
    setTags(filteredTags);
    form.setValue("tags", filteredTags);
  };

  const handleFormSubmit = (values: SkillFormValues) => {
    const skillData = {
      ...values,
      tags: tags.length > 0 ? tags : [],
    };
    
    onSubmit(skillData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Web Development with React" {...field} />
              </FormControl>
              <FormDescription>
                Give your skill a clear, descriptive title.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe what you can teach and your level of expertise..." 
                  className="min-h-32 resize-y"
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Provide details about what you'll teach and your expertise level.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Choose the category that best fits your skill.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="tags"
          render={() => (
            <FormItem>
              <FormLabel>Tags (Optional)</FormLabel>
              <FormControl>
                <Input
                  placeholder="Type and press Enter to add tags (max 5)"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleAddTag}
                  disabled={tags.length >= 5}
                />
              </FormControl>
              <FormDescription>
                Add up to 5 relevant tags to help others find your skill.
              </FormDescription>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1 text-xs">
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="h-3 w-3 rounded-full hover:bg-muted-foreground/20"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end gap-2">
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Save Skill</Button>
        </div>
      </form>
    </Form>
  );
};

export default AddSkillForm;


export interface Skill {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  userId: string;
  featured: boolean;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  skills: string[];
  interests: string[];
  joinedAt: string;
}

export const categories = [
  "Technology",
  "Design",
  "Business",
  "Marketing",
  "Languages",
  "Music",
  "Cooking",
  "Art",
  "Health",
  "Education"
];

export const users: User[] = [
  {
    id: "user1",
    name: "Alex Morgan",
    email: "alex@example.com",
    avatar: "https://ui.shadcn.com/avatars/01.png",
    bio: "Full-stack developer with 5 years of experience. Passionate about teaching coding to beginners.",
    skills: ["skill1", "skill5"],
    interests: ["Design", "Music", "Cooking"],
    joinedAt: "2023-01-15T00:00:00Z"
  },
  {
    id: "user2",
    name: "Jamie Lee",
    email: "jamie@example.com",
    avatar: "https://ui.shadcn.com/avatars/02.png",
    bio: "Graphic designer specialized in brand identity. Always looking to learn new skills.",
    skills: ["skill2", "skill7"],
    interests: ["Technology", "Art", "Marketing"],
    joinedAt: "2023-02-20T00:00:00Z"
  },
  {
    id: "user3",
    name: "Taylor Kim",
    email: "taylor@example.com",
    avatar: "https://ui.shadcn.com/avatars/03.png",
    bio: "Marketing specialist with a background in psychology. Eager to exchange knowledge.",
    skills: ["skill3", "skill9"],
    interests: ["Business", "Psychology", "Languages"],
    joinedAt: "2023-03-10T00:00:00Z"
  },
  {
    id: "user4",
    name: "Jordan Rivera",
    email: "jordan@example.com",
    avatar: "https://ui.shadcn.com/avatars/04.png",
    bio: "Music teacher with 10+ years of experience. Willing to teach piano in exchange for coding lessons.",
    skills: ["skill4", "skill10"],
    interests: ["Technology", "Education"],
    joinedAt: "2023-04-05T00:00:00Z"
  }
];

export const skills: Skill[] = [
  {
    id: "skill1",
    title: "Web Development with React",
    description: "Learn React from scratch. I'll teach you component design, state management, hooks, and best practices for building modern web applications.",
    category: "Technology",
    tags: ["React", "JavaScript", "Frontend"],
    userId: "user1",
    featured: true,
    createdAt: "2023-05-10T00:00:00Z"
  },
  {
    id: "skill2",
    title: "Logo Design & Brand Identity",
    description: "I'll help you create a memorable logo and brand identity that reflects your values and resonates with your target audience.",
    category: "Design",
    tags: ["Branding", "Graphics", "Illustrator"],
    userId: "user2",
    featured: true,
    createdAt: "2023-05-15T00:00:00Z"
  },
  {
    id: "skill3",
    title: "Digital Marketing Strategy",
    description: "Learn how to create and implement effective digital marketing strategies that drive growth and engagement.",
    category: "Marketing",
    tags: ["Strategy", "Social Media", "Growth"],
    userId: "user3",
    featured: false,
    createdAt: "2023-05-20T00:00:00Z"
  },
  {
    id: "skill4",
    title: "Piano Lessons for Beginners",
    description: "Start your musical journey with personalized piano lessons. I'll teach you the basics of reading music and playing your favorite songs.",
    category: "Music",
    tags: ["Piano", "Music Theory", "Beginners"],
    userId: "user4",
    featured: false,
    createdAt: "2023-05-25T00:00:00Z"
  },
  {
    id: "skill5",
    title: "Data Structures & Algorithms",
    description: "Master the fundamental data structures and algorithms that are essential for coding interviews and efficient programming.",
    category: "Technology",
    tags: ["Algorithms", "Interviews", "Computer Science"],
    userId: "user1",
    featured: false,
    createdAt: "2023-06-01T00:00:00Z"
  },
  {
    id: "skill6",
    title: "Spanish Language Lessons",
    description: "Conversational Spanish lessons customized to your learning style and goals. Become fluent through regular practice.",
    category: "Languages",
    tags: ["Spanish", "Conversation", "Fluency"],
    userId: "user3",
    featured: false,
    createdAt: "2023-06-05T00:00:00Z"
  },
  {
    id: "skill7",
    title: "UI/UX Design Fundamentals",
    description: "Learn the principles of user interface and experience design. Create intuitive, beautiful interfaces that users love.",
    category: "Design",
    tags: ["UI", "UX", "Figma"],
    userId: "user2",
    featured: false,
    createdAt: "2023-06-10T00:00:00Z"
  },
  {
    id: "skill8",
    title: "Photography Basics",
    description: "Learn composition, lighting, and camera settings to take stunning photos with any camera, even your smartphone.",
    category: "Art",
    tags: ["Photography", "Composition", "Lighting"],
    userId: "user4",
    featured: false,
    createdAt: "2023-06-15T00:00:00Z"
  },
  {
    id: "skill9",
    title: "Content Marketing",
    description: "Create compelling content that attracts, engages, and converts your target audience. Build a content strategy that works.",
    category: "Marketing",
    tags: ["Content", "Blogging", "Strategy"],
    userId: "user3",
    featured: false,
    createdAt: "2023-06-20T00:00:00Z"
  },
  {
    id: "skill10",
    title: "Music Production",
    description: "Learn the basics of music production, including recording, mixing, and mastering. Create professional-sounding tracks at home.",
    category: "Music",
    tags: ["Production", "Recording", "Mixing"],
    userId: "user4",
    featured: false,
    createdAt: "2023-06-25T00:00:00Z"
  }
];

export const getSkillsByCategory = (category: string) => {
  return skills.filter(skill => skill.category === category);
};

export const getUserById = (id: string) => {
  return users.find(user => user.id === id);
};

export const getSkillById = (id: string) => {
  return skills.find(skill => skill.id === id);
};

export const getSkillsByUserId = (userId: string) => {
  return skills.filter(skill => skill.userId === userId);
};

export const getFeaturedSkills = () => {
  return skills.filter(skill => skill.featured);
};

export const getRecentSkills = (limit = 6) => {
  return [...skills]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
};

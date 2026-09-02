export const skillsData = [
  {
    category: "Programming",
    items: ["Python", "JavaScript"]
  },
  {
    category: "Web",
    items: ["HTML", "CSS", "JavaScript", "Responsive Web Design"]
  },
  {
    category: "Database",
    items: ["SQL", "DBMS", "Supabase"]
  },
  {
    category: "AI",
    items: ["Generative AI", "Gemini API", "AI-powered Web Applications"]
  },
  {
    category: "Tools",
    items: ["Git", "GitHub", "VS Code", "Power BI"]
  }
];

export interface Project {
  id: string;
  name: string;
  desc: string;
  tech: string;
  category: 'ai' | 'web';
  icon: string;
  github?: string;
  live?: string;
}

export const projectsData: Project[] = [
  {
    id: "01",
    name: "AI Chatbox",
    category: "ai",
    icon: "bot",
    desc: "An intelligent conversational AI interface with context awareness and natural response generation.",
    tech: "Python, Gemini API, WebSockets",
    github: "https://github.com/shailenderdubey/ai-chatbox",
    live: "https://ai-chatbox-demo.vercel.app"
  },
  {
    id: "02",
    name: "Sahay",
    category: "web",
    icon: "helping-hand",
    desc: "A digital assistance platform connecting individuals with community help and emergency resources.",
    tech: "React, Node.js, Supabase, Web",
    github: "https://github.com/shailenderdubey/sahay",
    live: "https://sahay-app.vercel.app"
  },
  {
    id: "03",
    name: "Moodify",
    category: "ai",
    icon: "smile",
    desc: "AI-powered emotion analysis and music recommendation engine tailored to real-time mood detection.",
    tech: "Python, OpenCV, Gemini API, React",
    github: "https://github.com/shailenderdubey/moodify",
    live: "https://moodify-ai.vercel.app"
  },
  {
    id: "04",
    name: "Personal Portfolio",
    category: "web",
    icon: "layout",
    desc: "Interactive glassmorphic developer portfolio featuring custom WebGL shaders and smooth micro-interactions.",
    tech: "React, Vite, TypeScript, CSS3",
    github: "https://github.com/shailenderdubey/portfolio",
    live: "https://shailenderdubey.vercel.app"
  }
];

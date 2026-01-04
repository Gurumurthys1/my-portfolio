import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import Project from '../models/Project.js';
import Skill from '../models/Skill.js';
import Experience from '../models/Experience.js';

dotenv.config();

const projects = [
  {
    title: "Respiratory Disease Detection",
    description: "AI system using audio-visual features and Graph Neural Networks (GNNs) to classify respiratory diseases such as asthma, COPD, and pneumonia.",
    image: "/images/project-1-gen.png",
    technologies: ["Python", "GNN", "PyTorch"],
    liveUrl: "#",
    githubUrl: "#",
    category: "ai"
  },
  {
    title: "3D Printing Defect Detection",
    description: "CNN-based computer vision model using TensorFlow and OpenCV to automatically detect defects in 3D-printed objects.",
    image: "/images/project-2-gen.png",
    technologies: ["TensorFlow", "OpenCV", "CNN"],
    liveUrl: "#",
    githubUrl: "#",
    category: "ai"
  },
  {
    title: "Doctor Appointment System",
    description: "Full-stack MERN application with secure authentication, role-based dashboards, and real-time appointment scheduling.",
    image: "/images/project-3-gen.png",
    technologies: ["MERN", "React", "Node.js"],
    liveUrl: "#",
    githubUrl: "#",
    category: "web"
  }
];

const skills = [
  // AI / Data Science
  { name: "Data Science", category: "AI / Data Science", icon: "FaDatabase", color: "#F7931E" },
  { name: "Machine Learning", category: "AI / Data Science", icon: "FaBrain", color: "#F7931E" },
  { name: "Deep Learning", category: "AI / Data Science", icon: "SiKeras", color: "#D00000" },
  { name: "Computer Vision", category: "AI / Data Science", icon: "FaEye", color: "#5C3EE8" },
  { name: "NumPy", category: "AI / Data Science", icon: "SiNumpy", color: "#013243" },
  { name: "Pandas", category: "AI / Data Science", icon: "SiPandas", color: "#150458" },
  
  // Languages
  { name: "Python", category: "Languages", icon: "SiPython", color: "#3776AB" },
  { name: "C", category: "Languages", icon: "FaCode", color: "#00599C" },
  { name: "Java", category: "Languages", icon: "FaJava", color: "#007396" },

  // Software Development & Soft Skills
  { name: "Software Dev", category: "Software Dev", icon: "FaCode", color: "#61DAFB" },
  { name: "Problem Solving", category: "Software Dev", icon: "FaCogs", color: "#A8B9CC" },
  { name: "Communication", category: "Soft Skills", icon: "FaHandshake", color: "#FFD700" },

  // Full-Stack / Web Development
  { name: "MERN Stack", category: "Full-Stack", icon: "FaGlobe", color: "#000000" },
  { name: "REST APIs", category: "Full-Stack", icon: "FaServer", color: "#FF6F00" },
  { name: "Web Scraping", category: "Full-Stack", icon: "FaCode", color: "#339933" },
  { name: "HTML5", category: "Full-Stack", icon: "SiHtml5", color: "#E34F26" },
  { name: "CSS", category: "Full-Stack", icon: "SiCss3", color: "#1572B6" },
  { name: "JavaScript", category: "Full-Stack", icon: "SiJavascript", color: "#F7DF1E" },
  { name: "React.js", category: "Full-Stack", icon: "SiReact", color: "#61DAFB" },
  { name: "Bootstrap", category: "Full-Stack", icon: "SiBootstrap", color: "#7952B3" },
  { name: "Node.js", category: "Full-Stack", icon: "SiNodedotjs", color: "#339933" },
  { name: "Express.js", category: "Full-Stack", icon: "SiExpress", color: "#000000" },
  { name: "SQL", category: "Full-Stack", icon: "SiMysql", color: "#4479A1" },
  { name: "MongoDB", category: "Full-Stack", icon: "SiMongodb", color: "#47A248" },
  { name: "Neo4j", category: "Full-Stack", icon: "FaShareAlt", color: "#008CC1" },

  // Tools & Platforms
  { name: "Git", category: "Tools", icon: "SiGit", color: "#F05032" },
  { name: "GitHub", category: "Tools", icon: "SiGithub", color: "#181717" },

  // Mobile Development
  { name: "Flutter", category: "Mobile", icon: "SiFlutter", color: "#02569B" }
];

const experiences = [
  {
    role: "Data Scientist",
    company: "Company Name",
    period: "2023 - Present",
    description: "Developing advanced machine learning models and data analysis pipelines. Leveraging Python, PyTorch, and cloud technologies to solve complex data problems.",
    technologies: ["Python", "PyTorch", "ML", "Data Analysis"]
  },
  {
    role: "Full Stack Developer (MERN)",
    company: "Company Name",
    period: "2022 - 2023",
    description: "Built scalable web applications using MongoDB, Express, React, and Node.js. Designed RESTful APIs and optimized frontend performance.",
    technologies: ["React.js", "Node.js", "MongoDB", "Express"]
  },
  {
    role: "Web Developer Intern",
    company: "Company Name",
    period: "2021 - 2022",
    description: "Assisted in identifying and fixing bugs. Collaborated with the design team to implement responsive UI/UX designs.",
    technologies: ["HTML", "CSS", "JavaScript", "React"]
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();
    await Project.deleteMany({});
    await Skill.deleteMany({});
    await Experience.deleteMany({});
    await Project.insertMany(projects);
    await Skill.insertMany(skills);
    await Experience.insertMany(experiences);
    console.log('✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();

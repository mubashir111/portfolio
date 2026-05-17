import { AppData } from './types';

export const INITIAL_DATA: AppData = {
  profile: {
    name: "Mubashir T",
    role: "Full Stack Developer",
    email: "muba4shir@gmail.com",
    phone: "+91 9061417949",
    address: "Kuttippuram, Malappuram, Kerala 679582",
    summary: "Result-driven Full-stack developer with a strong background in building web applications, administrative dashboards, CRM systems, and e-learning platforms. Proficient in modern web technologies and frameworks, with expertise in scalable architecture, product development, and robust error handling.",
    socials: {
      github: "https://github.com/",
      linkedin: "https://linkedin.com/"
    }
  },
  skills: [
    "Laravel", "PHP", "React.js", "JavaScript", "TypeScript", "Flutter", 
    "MySQL", "HTML/CSS", "Bootstrap", "Tailwind CSS", "Git", "REST APIs", "ERPNext"
  ],
  services: [
    {
      id: "s1",
      title: "Web Application Development",
      description: "Building scalable, secure, and high-performance web applications using Laravel, React, and PHP.",
      icon: "Globe"
    },
    {
      id: "s2",
      title: "Mobile App Development",
      description: "Cross-platform mobile application development using Flutter for seamless user experiences on Android and iOS.",
      icon: "Smartphone"
    },
    {
      id: "s3",
      title: "CRM & ERP Systems",
      description: "Custom administrative dashboards, CRM systems, and HRM solutions tailored to business needs.",
      icon: "Database"
    },
    {
      id: "s4",
      title: "E-Commerce & Payment Integration",
      description: "End-to-end e-commerce solutions with secure payment gateway integrations (Stripe, Razorpay, etc.).",
      icon: "ShoppingCart"
    }
  ],
  experience: [
    {
      id: "e0",
      company: "Team Backoffice",
      role: "Web Developer",
      period: "Current",
      description: [
        "Currently working at http://teambackoffice.com/ creating comprehensive web applications, ERP systems, and dynamic websites.",
        "Developing robust features and scalable backend architecture using Laravel."
      ]
    },
    {
      id: "e1",
      company: "Al Rawabi Projects",
      role: "Web Developer",
      period: "Oct 2024 - Present",
      description: [
        "Developed and maintained dynamic and responsive websites using HTML, CSS, JavaScript, PHP, and Laravel.",
        "Built custom features, dashboards, and APIs to support business operations.",
        "Integrated third-party services such as payment gateways, email services, and SMS APIs."
      ]
    },
    {
      id: "e2",
      company: "GREENWORLD International",
      role: "Full Stack Developer",
      period: "Mar 2022 - Oct 2024",
      description: [
        "Designed and developed scalable web applications using Laravel.",
        "Created CRM systems, HRM systems, dashboards, and LMS platforms.",
        "Developed cross-platform mobile apps using Flutter."
      ]
    },
    {
      id: "e3",
      company: "XpertConsortium",
      role: "Full Stack Developer",
      period: "Nov 2021 - Feb 2022",
      description: [
        "Worked on full-stack development using HTML, CSS, JS, PHP, React.js, and Laravel.",
        "Integrated and optimized APIs for seamless data exchange.",
        "Managed database operations using MySQL."
      ]
    }
  ],
  projects: [
    {
      id: "p1",
      title: "Admission Tracker",
      description: "Mobile and web application for student tracking, facilitating seamless monitoring of student activities and progress.",
      link: "https://admissiontracker.in/",
      tags: ["Mobile App", "Web App", "Tracking"],
      image: "https://picsum.photos/seed/admission/800/600"
    },
    {
      id: "p2",
      title: "Meorah",
      description: "Premium e-commerce platform featuring a modern shopping experience, elegant product catalog, and secure checkout.",
      link: "https://meorah.in/",
      tags: ["E-Commerce", "Web Development", "Payment Integration"],
      image: "https://picsum.photos/seed/meorah/800/600"
    },
    {
      id: "p3",
      title: "Behom",
      description: "Sleek and modern e-commerce platform for home decor and furniture, featuring advanced product discovery and seamless checkout.",
      link: "https://behom.ae/",
      tags: ["E-Commerce", "UI/UX", "Web Development"],
      image: "https://picsum.photos/seed/behom/800/600"
    },
    {
      id: "p4",
      title: "Wytfox Website",
      description: "Visually appealing corporate website showcasing company offerings with smooth navigation.",
      link: "https://wytfox.in/",
      tags: ["Corporate", "Design", "Frontend"],
      image: "https://picsum.photos/seed/wytfox/800/600"
    }
  ],
  testimonials: [
    {
      id: "t1",
      name: "bava haji",
      role: "Project Manager",
      company: "Al Rawabi Projects",
      text: "Mubashir is an exceptional developer who always delivers high-quality code on time.",
      avatar: "https://picsum.photos/seed/user1/100/100"
    },
    {
      id: "t2",
      name: "dr vinodkumar",
      role: "CEO",
      company: "Greenworld Int.",
      text: "His ability to handle both backend logic and frontend aesthetics is impressive.",
      avatar: "https://picsum.photos/seed/user2/100/100"
    }
  ]
};
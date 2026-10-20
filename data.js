// =========================================================================
// MAHESH NANDIGAM — PORTFOLIO CONFIGURATION DATA
// Formatted strictly according to latest voice instructions
// =========================================================================

const PORTFOLIO_DATA = {
  personal: {
    name: "Mahesh Nandigam",
    meta: "19, Engineer & Creator",
    tagline: "I love building cool stuff on the internet.",
    email: "nandigammahesh595@gmail.com",
    topmate: "https://topmate.io/mahesh_nandigam",
    status: "Available for work",
    
    // Exact 3 reflection points from audio:
    bullets: [
      "I love AI, open source, and CP.",
      "Building something that 99% of the world spend their time.",
      "Currently juggling with fundamentals and experimenting with AI tools."
    ],

    // 3 Distinct Categorized Profiles: Dev, CP, Creator
    profiles: {
      dev: [
        { name: "GitHub", url: "https://github.com/Mahesh-Nandigam" },
        { name: "X", url: "https://x.com/maheshn_dev" },
        { name: "LinkedIn", url: "https://www.linkedin.com/in/mahesh-nandigam" },
        { name: "Discord", url: "https://discord.com/users/1422628571842609215" }
      ],
      cp: [
        { name: "LeetCode", url: "https://leetcode.com/u/mahesh-nandigam/" },
        { name: "Codeforces", url: "https://codeforces.com/profile/mahesh_nandigam01" },
        { name: "AtCoder", url: "https://atcoder.jp/users/maheshcodesx" }
      ],
      creator: [
        { name: "Instagram", url: "https://www.instagram.com/maheshnandigam_" },
        { name: "YouTube", url: "https://www.youtube.com/@MAHESHNANDIGAM-t9z" }
      ]
    }
  },

  // 4 Important Projects in Exact Order (Crisp, 2-3 lines max):
  // 1. HirePanel.Ai
  // 2. FounderCopilot.os
  // 3. ApplyJack
  // 4. Ecosphere
  projects: [
    {
      id: "hirepanel",
      title: "HirePanel.Ai",
      description: "Autonomous multi-agent technical interview committee. Evaluates candidate resumes, GitHub repositories, and LinkedIn profiles to deliver mathematically weighted consensus scores in seconds.",
      tags: ["Agentic AI", "Multi-Agent Panel", "Python", "Full Stack"],
      demoUrl: "https://hire-panel-ai.vercel.app",
      repoUrl: "https://github.com/Mahesh-Nandigam/HirePanel.Ai"
    },
    {
      id: "foundercopilot",
      title: "FounderCopilot.os",
      description: "Productivity workspace and system architecture copilot for early-stage founders. Decomposes high-level product specs into modular development sprints and actionable milestones.",
      tags: ["Founder OS", "Product Architecture", "Next.js", "Vercel"],
      demoUrl: "https://founder-copilot-os.vercel.app",
      repoUrl: "https://github.com/Mahesh-Nandigam/FounderCopilot.os"
    },
    {
      id: "applyjack",
      title: "ApplyJack",
      description: "Intelligent job application copilot with a Chrome extension and web dashboard. Autofills portal applications and dynamically personalizes resumes and cover letters for target roles.",
      tags: ["Manifest V3 Extension", "Next.js", "Google Cloud Run", "NLP"],
      demoUrl: "https://apply-jack.vercel.app",
      repoUrl: "https://github.com/Mahesh-Nandigam/ApplyJack"
    },
    {
      id: "ecosphere",
      title: "Ecosphere",
      description: "Living carbon awareness dashboard that turns sustainability tracking into an interactive digital terrarium with real-time responsive SVG ecosystem visualizations.",
      tags: ["Dynamic SVG", "Carbon Intelligence", "Vanilla JS", "Cloud Run"],
      demoUrl: "https://ecosphere-qkg43gmgq-mahesh-nandigams-projects.vercel.app",
      repoUrl: "https://github.com/Mahesh-Nandigam/Ecosphere"
    }
  ],

  // Live GitHub Activity API
  github: {
    username: "Mahesh-Nandigam",
    profileUrl: "https://github.com/Mahesh-Nandigam",
    apiUrl: "https://github-contributions-api.jogruber.de/v4/Mahesh-Nandigam?y=last",
    verifiedCount: "415"
  },

  // Exact Skills: Full Stack (Frontend + Backend), Languages (C++, Python)
  skills: [
    {
      section: "Full Stack Development",
      groups: [
        {
          name: "Frontend Development",
          items: [
            { name: "HTML5", icon: "devicon-html5-plain" },
            { name: "CSS3", icon: "devicon-css3-plain" },
            { name: "JavaScript", icon: "devicon-javascript-plain" },
            { name: "Bootstrap", icon: "devicon-bootstrap-plain" }
          ]
        },
        {
          name: "Backend Development",
          items: [
            { name: "Node.js", icon: "devicon-nodejs-plain" },
            { name: "Express.js", icon: "devicon-express-original" },
            { name: "MongoDB", icon: "devicon-mongodb-plain" },
            { name: "SQL", icon: "devicon-mysql-plain" },
            { name: "REST APIs", icon: "devicon-fastapi-plain" }
          ]
        }
      ]
    },
    {
      section: "Programming Languages",
      groups: [
        {
          name: "Core Languages",
          items: [
            { name: "C++", icon: "devicon-cplusplus-plain" },
            { name: "Python", icon: "devicon-python-plain" }
          ]
        }
      ]
    }
  ],

  // Real Blogs: 3 published LinkedIn Pulse articles
  blogs: [
    {
      title: "The Art of Winning in Tech",
      platform: "LinkedIn Pulse",
      readTime: "12 min read",
      url: "https://www.linkedin.com/pulse/art-winning-tech-mahesh-nandigam-sdixf",
      excerpt: "An in-depth breakdown of cultivating real depth, ignoring social doom-loops, and building high-leverage software engineering skills."
    },
    {
      title: "To anyone currently overwhelmed by DSA, Web Dev, Web3, and AI/ML — DO NOT open VS Code today until you read this",
      platform: "LinkedIn Pulse",
      readTime: "7 min read",
      url: "https://www.linkedin.com/pulse/anyone-currently-overwhelmed-dsa-web-dev-web3-aiml-do-mahesh-nandigam-j4kbf",
      excerpt: "Deconstructing roadmap paralysis and cutting through noise to focus on three non-negotiables: DSA, active development, and open source proof."
    },
    {
      title: "Guidance to CS 30 by CS 29. One year, World changed a lot",
      platform: "LinkedIn Pulse",
      readTime: "4 min read",
      url: "https://www.linkedin.com/pulse/guidance-cs-30-29-one-year-world-changed-lot-mahesh-nandigam-7poof",
      excerpt: "An actionable, grounded guide for incoming engineering students navigating foundational data structures, development workflows, and hackathons."
    }
  ],

  // Footer quote exactly as requested
  footer: {
    quote: "I do live for code.",
    author: "Mahesh"
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = PORTFOLIO_DATA;
}

export default{
    HeroHeading: "Build Your Dev Avatar with AI",
    HeroSubHeading: "From code to identity — AI-crafted avatars for makers, hackers, and engineers.",
    HeroDesc: "Generate sleek, custom avatars or logos using AI. Whether you're on GitHub, Discord, or Slack — stand out with a unique identity powered by tech.",    
   
    InputTittlePlaceHolder: "Type here...",

    LogoTitle: "Choose Your Platform",
    LogoTitleDesc: "Select the platform where you'll use your avatar. Each platform has different requirements and styles.",
  
    LogoDescTitle: "Your Developer Personality",
    LogoDesDes: "Choose keywords that describe your coding style or personality. You can select from presets or type your own.",
  
    LogoIdeaTitle: "Idea or Concept",
    
    LogoDesignTitle: "Design Style",
    LogoDesignDesc: "Choose a design style that matches your vibe — minimalist, techy, anime-inspired, pixel, etc.",
  
    LogoColorPaletteTitle: "Color Palette",
    LogoColorPaletteDesc: "Select a color palette that represents your personality or project style. Use presets or create your own.",
  
    LogoPricingModelTittle: "Choose a Plan",
    LogoPricingModelDesc: "Select a pricing plan that fits your needs. Start for free or upgrade for more features.",

    // Platform options for step 1
    platforms: [
        {
            name: "GitHub",
            icon: "🐙",
            description: "Open source contributions",
            color: "bg-gray-800"
        },
        {
            name: "Discord",
            icon: "💬",
            description: "Gaming & community",
            color: "bg-indigo-600"
        },
        {
            name: "Slack",
            icon: "💼",
            description: "Professional workspace",
            color: "bg-green-600"
        },
        {
            name: "Reddit",
            icon: "🤖",
            description: "Community discussions",
            color: "bg-orange-500"
        }
    ],

    // Developer personality keywords
    developerKeywords: [
        "Bug Fixer", "Tense Dev", "Chill Coder", "Techie",
        "Code Ninja", "Debug Master", "Night Owl", "Coffee Addict",
        "Full Stack", "Frontend Hero", "Backend Wizard", "DevOps Guru",
        "Open Source", "Startup Founder", "Freelancer", "Team Lead"
    ],
  
    pricingOpttions: [
        {
            tittle: "Free",
            icon: "/free.png",
            features: [
                "Generate up to 5 AI Avatars",
                "Access to basic customization options",
                "Standard resolution downloads"
            ],
            button: "Get Started",
        },
        {
            tittle: "Pro",
            icon: "/vip.png",
            features: [
                "Generate unlimited AI Avatars",
                "Access to advanced customization options",
                "High-resolution downloads",
                "Priority support"
            ],
            button: "Upgrade Now",
        }
    ]

}
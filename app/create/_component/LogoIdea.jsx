"use client"
import React, { useState, useEffect } from 'react'
import HeadingDescription from './HeadingDescription'
import Lookup from '@/app/_data/Lookup'
import { Button } from '@/components/ui/button'

function LogoIdea({onHandleInputChange, formData}) {
  const [generatedIdeas, setGeneratedIdeas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState(formData?.idea);

  useEffect(() => {
    if (formData?.platform && formData?.keywords && formData?.design) {
      generateLogoIdeas();
    }
  }, [formData?.platform, formData?.keywords, formData?.design]);

  const generateLogoIdeas = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/generate-ideas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          platform: formData.platform,
          keywords: formData.keywords,
          design: formData.design
        }),
      });

      const data = await response.json();
      
      if (data.success && data.ideas) {
        setGeneratedIdeas(data.ideas);
      } else {
        // Fallback ideas
        setGeneratedIdeas([
          "Code Warrior",
          "Debug Master", 
          "Pixel Artist",
          "Tech Innovator"
        ]);
      }
    } catch (error) {
      console.error('Error generating logo ideas:', error);
      // Fallback ideas
      setGeneratedIdeas([
        "Code Warrior",
        "Debug Master", 
        "Pixel Artist",
        "Tech Innovator"
      ]);
    }
    setLoading(false);
  };

  const handleIdeaSelect = (idea) => {
    setSelectedIdea(idea);
    onHandleInputChange(idea);
  };

  return (
    <div className='mt-10'>
      <HeadingDescription
        title={Lookup.LogoIdeaTitle}
        description="AI-generated logo concepts based on your preferences. Choose the one that resonates with your vision."
      />

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-electric-blue"></div>
          <span className="ml-3 text-muted-foreground">Generating ideas...</span>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 max-w-2xl'>
          {generatedIdeas.map((idea, index) => (
            <div 
              key={index}
              onClick={() => handleIdeaSelect(idea)}
              className={`p-6 rounded-xl cursor-pointer transition-all duration-200 border-2 ${
                selectedIdea === idea 
                  ? 'border-electric-blue bg-electric-blue/10 glow-electric-blue' 
                  : 'border-gray-200 hover:border-electric-blue/50 hover:bg-electric-blue/5'
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg text-dark-navy">{idea}</h3>
                <div className="text-2xl">
                  {index === 0 && "⚡"}
                  {index === 1 && "🚀"}
                  {index === 2 && "💡"}
                  {index === 3 && "🎯"}
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {index === 0 && "Dynamic and energetic concept"}
                {index === 1 && "Innovative and forward-thinking"}
                {index === 2 && "Creative and inspiring approach"}
                {index === 3 && "Focused and goal-oriented"}
              </p>
            </div>
          ))}
        </div>
      )}

      {!loading && generatedIdeas.length > 0 && (
        <div className="mt-6">
          <Button 
            onClick={generateLogoIdeas}
            variant="outline"
            className="border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-white "
          >
            🔄 Generate New Ideas
          </Button>
        </div>
      )}

      {selectedIdea && (
        <div className="mt-6 p-4 bg-gradient-electric/10 rounded-lg border border-electric-blue/20">
          <p className="text-sm text-muted-foreground">Selected concept:</p>
          <p className="font-bold text-lg text-electric-blue">{selectedIdea}</p>
        </div>
      )}
    </div>
  )
}

export default LogoIdea
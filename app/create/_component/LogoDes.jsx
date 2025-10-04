import React, { useState } from 'react'
import HeadingDescription from './HeadingDescription'
import Lookup from '@/app/_data/Lookup'

function LogoDes({onHandleInputChange, formData}) {
  const [selectedKeywords, setSelectedKeywords] = useState(formData?.keywords || []);
  const [customKeyword, setCustomKeyword] = useState('');

  const handleKeywordSelect = (keyword) => {
    if (selectedKeywords.includes(keyword)) {
      const updated = selectedKeywords.filter(k => k !== keyword);
      setSelectedKeywords(updated);
      onHandleInputChange(updated);
    } else {
      const updated = [...selectedKeywords, keyword];
      setSelectedKeywords(updated);
      onHandleInputChange(updated);
    }
  };

  const handleCustomKeyword = (e) => {
    setCustomKeyword(e.target.value);
  };

  const addCustomKeyword = () => {
    if (customKeyword.trim() && !selectedKeywords.includes(customKeyword.trim())) {
      const updated = [...selectedKeywords, customKeyword.trim()];
      setSelectedKeywords(updated);
      onHandleInputChange(updated);
      setCustomKeyword('');
    }
  };

  return (
    <div className='mt-10'>
      <HeadingDescription
        title={Lookup.LogoDescTitle}
        description={Lookup.LogoDesDes}/>

      {/* Keyword Selection */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-3 mt-5 max-w-4xl'>
        {Lookup.developerKeywords.map((keyword, index) => (
          <button
            key={index}
            onClick={() => handleKeywordSelect(keyword)}
            className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 border-2 ${
              selectedKeywords.includes(keyword)
                ? 'border-electric-blue bg-electric-blue/20 text-electric-blue glow-subtle'
                : 'border-gray-200 hover:border-electric-blue/50 text-dark-navy'
            }`}
          >
            {keyword}
          </button>
        ))}
      </div>

      {/* Custom Keyword Input */}
      <div className='mt-6 max-w-md'>
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="Add your own keyword..." 
            className='border border-electric-blue rounded-lg p-3 flex-1 focus:outline-none focus:ring-2 focus:ring-electric-blue bg-background text-foreground'
            value={customKeyword}
            onChange={handleCustomKeyword}
            onKeyPress={(e) => e.key === 'Enter' && addCustomKeyword()}
          />
          <button 
            onClick={addCustomKeyword}
            className="px-4 py-3 bg-gradient-electric hover:glow-electric-blue text-white rounded-lg font-semibold cursor-pointer"
          >
            Add
          </button>
        </div>
      </div>

      {/* Selected Keywords Display */}
      {selectedKeywords.length > 0 && (
        <div className='mt-4'>
          <p className="text-sm text-muted-foreground mb-2">Selected keywords:</p>
          <div className="flex flex-wrap gap-2">
            {selectedKeywords.map((keyword, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-electric-blue/20 text-electric-blue rounded-full text-sm font-medium"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}

export default LogoDes
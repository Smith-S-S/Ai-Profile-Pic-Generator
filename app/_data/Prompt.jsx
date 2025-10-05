export default{
    DESIGN_IDEA_PROMPT: "Generate a unique avatar for the {platform}. The avatar should be modern, expressive, and visually engaging, suitable as a profile picture. It should reflect the user's personalies interests, or role use this personalies from {keywords}, Use a color scheme based on {color scheme}, and ensure the style is clean, versatile, fun, and optimized for digital {platform}. Include a brief explanation of the visual choices and overall concept.",
    
    LOGO_PROMPT: `Create a unique avatar "{design.title}", inspired by the following visual style: {design.prompt}. 
    The avatar should reflect themes like {keywords}, and be designed for use on {platform}. 
    Use the "{palette}" color palette to guide the visual style. 
    The avatar should be expressive, modern, and suitable as a profile picture for developers or creators in fun and cool style. 
    Pay special attention to hand anatomy and positioning — ensure the hands, if visible, are rendered with correct proportions, fingers, and natural poses.
    And add an keyboard for the avatar to make it more realistic coder avatar vibe.
    Avoid text or typography unless essential to the style. Focus on personality, creativity, and digital appeal. 
    Return the result as a JSON object with a single 'prompt' field.`,

}


// DESIGN_IDEA_PROMPT: "Generate a unique avatar for the {platform}. The avatar should be modern, expressive, and visually engaging, suitable as a profile picture. It should reflect the user's personalies interests, or role use this personalies from {keywords}, Use a color scheme based on {color scheme}, and ensure the style is clean, versatile, fun, and optimized for digital {platform}. Include a brief explanation of the visual choices and overall concept.",

// AVATAR_PROMPT: "Create a {style} avatar for a user named {name}, for use on {platform}. The avatar should be visually appealing, modern, and suitable as a profile picture across platforms like GitHub, Discord, and Slack. Incorporate design elements that reflect the user's identity, role, or interests. Use a color palette inspired by {color scheme}, and make sure the avatar works well in both light and dark modes. Return the result in JSON format with only a 'prompt' field containing the final avatar generation prompt.",



// LOGO_PROMPT: "Create a {style} avatar for a company named {company name} that specializes in {industry/niche}. The avatar should be modern, professional, and visually appealing. It should incorporate elements that represent the company's values and mission. The color scheme should be {color scheme}, and the typography should be clean and easy to read. The avatar should be versatile and work well in both digital and print formats. Please provide a brief explanation of the design concept along with the avatar. Give me result in JSON portal with prompt field only",

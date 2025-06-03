export const formatMessage = (content) => {
  // Handle section formatting with 'u' flag for Unicode support
  const sections = content.split(/\n\n(?=[🎯|💫|💡|🤝])/u);
  
  if (sections.length > 1) {
    return (
      <div className="space-y-6">
        {sections.map((section, index) => {
          const [title, ...content] = section.split('\n');
          
          // Special formatting for scholarship recommendations section
          if (title.includes('💫 Top Recommendations:')) {
            const scholarships = content.join('\n').split(/•\s🎓/).filter(Boolean);
            return (
              <div key={index} className="recommendation-section">
                <h3 className="font-semibold text-[#283d50] mb-4">{title}</h3>
                {scholarships.map((scholarship, schIndex) => (
                  <div 
                    key={schIndex} 
                    className="bg-[#f8fafc] rounded-lg p-4 border border-gray-100 hover:border-[#283d50] transition-colors duration-200 mb-4"
                  >
                    {scholarship.split('\n').map((line, lineIndex) => {
                      if (line.includes('🔗 Next Steps:')) {
                        const linkMatch = line.match(/\bhttps?:\/\/\S+/gi);
                        return (
                          <p key={lineIndex} className="mt-2">
                            <span className="font-medium">Next Steps: </span>
                            {linkMatch ? (
                              <a 
                                href={linkMatch[0]}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                Apply Here
                              </a>
                            ) : line}
                          </p>
                        );
                      }
                      return (
                        <p 
                          key={lineIndex} 
                          className={`${lineIndex === 0 ? 'font-medium text-[#283d50]' : 'text-gray-600'} ${lineIndex > 0 ? 'mt-1' : ''}`}
                        >
                          {line}
                        </p>
                      );
                    })}
                  </div>
                ))}
              </div>
            );
          }
          
          return (
            <div key={index} className="message-section">
              <h3 className="font-semibold text-[#283d50] mb-2">{title}</h3>
              <div className="text-gray-600">
                {content.map((line, lineIndex) => (
                  <p key={lineIndex} className="mt-1">
                    {line.trim()}
                  </p>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // Regular message formatting for non-structured content
  return <p className="text-gray-700 whitespace-pre-wrap">{content}</p>;
};

import { useState } from 'react';

export default function ScholarshipSectionNav({ activeSection, onSectionChange }) {
  const sections = [
    { id: "timeline", label: "Scholarships Timeline", icon: "🎓" },
    { id: "browse", label: "Browse Scholarships", icon: "🔍" },
    { id: "assistant", label: "AI Assistant", icon: "🤖" }
  ];

  // For mobile view
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="sticky top-[76px] z-20 bg-white shadow-md">
      <div className="max-w-7xl mx-auto">
        {/* Desktop Navigation */}
        <div className="hidden md:flex">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={`flex items-center py-3 px-6 ${
                activeSection === section.id
                  ? "text-[#283d50] border-b-2 border-[#283d50] font-medium"
                  : "text-gray-500 hover:text-[#283d50]"
              }`}
            >
              <span className="mr-2">{section.icon}</span>
              {section.label}
            </button>
          ))}
        </div>
        
        {/* Mobile Navigation */}
        <div className="md:hidden relative">
          <button 
            className="flex items-center justify-between w-full py-3 px-4 text-left bg-white border-b"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="flex items-center">
              <span className="mr-2">{sections.find(s => s.id === activeSection)?.icon}</span>
              {sections.find(s => s.id === activeSection)?.label}
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transform ${menuOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          
          {menuOpen && (
            <div className="absolute top-full left-0 right-0 bg-white shadow-md z-20">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => {
                    onSectionChange(section.id);
                    setMenuOpen(false);
                  }}
                  className={`flex items-center w-full py-3 px-4 text-left ${
                    activeSection === section.id
                      ? "bg-gray-100 text-[#283d50] font-medium"
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  <span className="mr-2">{section.icon}</span>
                  {section.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

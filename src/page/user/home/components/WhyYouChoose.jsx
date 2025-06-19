import test from "../../../../assets/img/test.png";

export default function WhyYouChoose() {
  const features = [
    {
      icon: test,
      title: "Real-time Deadline Tracking",
      description: "Never miss a scholarship deadline with our advanced notification system and calendar integration"
    },
    {
      icon: test,
      title: "Global Scholarship Database",
      description: "Access thousands of scholarships from universities, governments, and organizations worldwide with daily updates"
    },
    {
      icon: test,
      title: "Smart Search & Filtering",
      description: "Find scholarships that match your academic profile, field of study, and geographic preferences"
    },
    {
      icon: test,
      title: "Application Management",
      description: "Organize your scholarship applications, track progress, and manage required documents in one place"
    }
  ];

  return (
    <section className='flex flex-col gap-8 items-center justify-center text-center py-16 px-4 bg-white' itemScope itemType="https://schema.org/ItemList">
      <div className="max-w-4xl mx-auto">
        <h2 className='text-3xl md:text-4xl font-bold text-[#283d50] mb-4'>
          Why Choose OpenScholarships?
        </h2>
        <p className="text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
          We provide comprehensive tools and resources to help students discover, apply for, 
          and manage scholarship opportunities from around the world.
        </p>
        
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto' itemProp="itemListElement">
          {features.map((feature, index) => (
            <div 
              key={index}
              className='flex flex-col items-center space-y-4 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100'
              itemScope 
              itemType="https://schema.org/Service"
            >
              <img 
                src={feature.icon} 
                alt={`${feature.title} icon`} 
                className='w-16 h-16 mx-auto' 
                loading="lazy"
                width="64"
                height="64"
              />
              <h3 className='text-lg font-semibold text-[#283d50] mb-2' itemProp="name">
                {feature.title}
              </h3>
              <p className='text-sm text-gray-700 leading-relaxed text-center' itemProp="description">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

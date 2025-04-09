import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: "Build Your Career",
    subtitle: "Connect with top employers and land your dream job",
    bgVideo: "bg-video.mp4", // Add video path
    buttonText: "Browse Jobs",
    buttonLink: "/jobs",
    //gradient: "from-blue-400 to-purple-400"
  },
  {
    id: 2,
    title: "Master New Skills",
    subtitle: "Access industry-leading training programs",
    bgImage: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3",
    buttonText: "Start Learning",
    buttonLink: "/training",
    gradient: "from-green-400 to-blue-400"
  },
  {
    id: 3,
    title: "Perfect Your Resume",
    subtitle: "Create professional resumes with AI assistance",
    bgImage: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3",
    buttonText: "Build Resume",
    buttonLink: "/resume-builder",
    gradient: "from-purple-400 to-pink-400"
  }
];

const HeroSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    console.log('Current slide:', currentSlide);
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 12000); // Changed from 4000 to 6000ms (6 seconds)
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative min-h-[92vh] w-full overflow-hidden -mt-24">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide 
              ? 'opacity-100 z-10' 
              : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Background Video/Image with Gradient Overlay */}
          {index === 0 ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={slide.bgVideo} type="video/mp4" />
            </video>
          ) : (
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ 
                backgroundImage: `url(${slide.bgImage})`
              }}
            />
          )}
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} opacity-60`} />

          {/* Content */}
          <div className="relative h-full flex items-center pt-36">
            <div className="container mx-auto px-4">
              <div className="max-w-xl">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-white">
                  {slide.title}
                </h1>
                <p className="text-lg text-white mb-6">
                  {slide.subtitle}
                </p>
                <Link 
                  to={slide.buttonLink}
                  className="btn btn-primary px-6 py-2 text-base inline-flex items-center"
                >
                  {slide.buttonText}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows - Add z-20 to ensure visibility */}
      <div className="absolute bottom-8 right-8 flex items-center space-x-4 z-20">
        <button
          onClick={prevSlide}
          className="p-3 rounded-lg bg-gray-800/80 hover:bg-gray-700 active:bg-gray-600 transform active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-white/50"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all transform hover:scale-110 active:scale-95 ${
                index === currentSlide ? 'bg-white scale-110' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
        <button
          onClick={nextSlide}
          className="p-3 rounded-lg bg-gray-800/80 hover:bg-gray-700 active:bg-gray-600 transform active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-white/50"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
};

export default HeroSlideshow;
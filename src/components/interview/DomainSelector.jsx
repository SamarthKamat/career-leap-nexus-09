import React from 'react';
import {
  Code,
  Users,
  Brain,
  TrendingUp,
  ChevronRight
} from 'lucide-react';

const INTERVIEW_DOMAINS = [
  {
    id: 'technical',
    name: 'Technical',
    description: 'Programming, system design, and software development questions',
    icon: Code,
    color: 'text-blue-500',
    bgColor: 'bg-blue-100'
  },
  {
    id: 'hr',
    name: 'HR',
    description: 'Company culture, workplace scenarios, and professional conduct',
    icon: Users,
    color: 'text-green-500',
    bgColor: 'bg-green-100'
  },
  {
    id: 'behavioral',
    name: 'Behavioral',
    description: 'Past experiences, problem-solving, and situational judgment',
    icon: Brain,
    color: 'text-purple-500',
    bgColor: 'bg-purple-100'
  },
  {
    id: 'marketing',
    name: 'Marketing',
    description: 'Digital marketing, strategy, and market analysis',
    icon: TrendingUp,
    color: 'text-orange-500',
    bgColor: 'bg-orange-100'
  }
];

const DIFFICULTY_LEVELS = [
  { id: 'beginner', name: 'Beginner', color: 'text-green-500' },
  { id: 'intermediate', name: 'Intermediate', color: 'text-yellow-500' },
  { id: 'advanced', name: 'Advanced', color: 'text-red-500' }
];

const DomainSelector = ({ onSelect }) => {
  const [selectedDomain, setSelectedDomain] = React.useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = React.useState(null);

  const handleDomainSelect = (domain) => {
    setSelectedDomain(domain);
  };

  const handleDifficultySelect = (difficulty) => {
    setSelectedDifficulty(difficulty);
    onSelect({
      domain: selectedDomain.id,
      difficulty: difficulty.id
    });
  };

  if (selectedDomain) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => setSelectedDomain(null)}
          className="flex items-center text-primary-600 hover:text-primary-700"
        >
          <ChevronRight className="h-4 w-4 rotate-180 mr-1" />
          Back to Domains
        </button>

        <h2 className="text-2xl font-bold mb-4">
          Select Difficulty for {selectedDomain.name} Interview
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {DIFFICULTY_LEVELS.map((difficulty) => (
            <button
              key={difficulty.id}
              onClick={() => handleDifficultySelect(difficulty)}
              className="p-6 rounded-lg border-2 border-gray-200 hover:border-primary-500 transition-colors duration-200"
            >
              <h3 className={`text-xl font-semibold ${difficulty.color}`}>
                {difficulty.name}
              </h3>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Select Interview Domain</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {INTERVIEW_DOMAINS.map((domain) => {
          const Icon = domain.icon;
          return (
            <button
              key={domain.id}
              onClick={() => handleDomainSelect(domain)}
              className="p-6 rounded-lg border-2 border-gray-200 hover:border-primary-500 transition-colors duration-200 text-left"
            >
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-full ${domain.bgColor}`}>
                  <Icon className={`h-6 w-6 ${domain.color}`} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {domain.name}
                  </h3>
                  <p className="mt-1 text-gray-500">{domain.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DomainSelector;
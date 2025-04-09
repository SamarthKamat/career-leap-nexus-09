import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';
import {
  Building,
  Star,
  DollarSign,
  Briefcase,
  ThumbsUp,
  ThumbsDown,
  Search,
  Filter,
  MapPin,
  Plus
} from 'lucide-react';

const CompanyReviews = () => {
  const { currentUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterIndustry, setFilterIndustry] = useState('all');
  
  // Sample company reviews data
  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: 'TechNova Solutions',
      industry: 'Technology',
      location: 'San Francisco, CA',
      rating: 4.5,
      reviews: 128,
      salaryRange: '$80,000 - $180,000',
      employeeCount: '1000-5000',
      pros: [
        'Great work-life balance',
        'Competitive compensation',
        'Strong learning culture'
      ],
      cons: [
        'Fast-paced environment',
        'Complex projects'
      ],
      recentReviews: [
        {
          id: 1,
          position: 'Software Engineer',
          rating: 5,
          date: '2025-03-15',
          review: 'Excellent company culture and opportunities for growth. The management is supportive and the projects are challenging.',
          pros: ['Good benefits', 'Career growth', 'Modern tech stack'],
          cons: ['High pressure during releases']
        },
        {
          id: 2,
          position: 'Product Manager',
          rating: 4,
          date: '2025-03-10',
          review: 'Great place to work with talented individuals. The company values innovation and employee well-being.',
          pros: ['Strong team', 'Good compensation', 'Remote work options'],
          cons: ['Complex decision making process']
        }
      ]
    },
    {
      id: 2,
      name: 'DataViz Corp',
      industry: 'Data Analytics',
      location: 'New York, NY',
      rating: 4.2,
      reviews: 85,
      salaryRange: '$75,000 - $160,000',
      employeeCount: '500-1000',
      pros: [
        'Innovative projects',
        'Professional development',
        'Good benefits'
      ],
      cons: [
        'Work pressure',
        'Limited remote options'
      ],
      recentReviews: [
        {
          id: 1,
          position: 'Data Analyst',
          rating: 4,
          date: '2025-03-12',
          review: 'Great learning environment with exposure to cutting-edge technologies.',
          pros: ['Learning opportunities', 'Modern tools', 'Good team'],
          cons: ['Tight deadlines']
        }
      ]
    }
  ]);

  const industries = ['Technology', 'Data Analytics', 'Finance', 'Healthcare', 'E-commerce'];

  const filteredCompanies = companies
    .filter(company =>
      filterIndustry === 'all' || company.industry === filterIndustry
    )
    .filter(company =>
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <>
      <Header />
      
      <div className="bg-gray-50 min-h-screen py-10">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold mb-1">Company Reviews</h1>
                <p className="text-gray-600">Explore and share experiences about companies</p>
              </div>
              <button className="btn btn-primary flex items-center">
                <Plus className="h-5 w-5 mr-2" />
                Write a Review
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search companies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full input"
                />
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="h-5 w-5 text-gray-400" />
                  <select
                    value={filterIndustry}
                    onChange={(e) => setFilterIndustry(e.target.value)}
                    className="input"
                  >
                    <option value="all">All Industries</option>
                    {industries.map(industry => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Companies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCompanies.map(company => (
              <div key={company.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-semibold mb-1">{company.name}</h2>
                      <div className="flex items-center text-gray-600 text-sm">
                        <Building className="h-4 w-4 mr-1" />
                        <span>{company.industry}</span>
                        <span className="mx-2">•</span>
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{company.location}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center mb-1">
                        {renderStars(company.rating)}
                        <span className="ml-2 text-gray-600">{company.rating}</span>
                      </div>
                      <div className="text-sm text-gray-500">{company.reviews} reviews</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center text-gray-600">
                      <DollarSign className="h-5 w-5 mr-2 text-green-500" />
                      <span>{company.salaryRange}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Briefcase className="h-5 w-5 mr-2 text-blue-500" />
                      <span>{company.employeeCount} employees</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="mb-2">
                      <h3 className="font-medium flex items-center text-green-600">
                        <ThumbsUp className="h-4 w-4 mr-2" />
                        Pros
                      </h3>
                      <ul className="list-disc list-inside text-sm text-gray-600 ml-6">
                        {company.pros.map((pro, index) => (
                          <li key={index}>{pro}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-medium flex items-center text-red-600">
                        <ThumbsDown className="h-4 w-4 mr-2" />
                        Cons
                      </h3>
                      <ul className="list-disc list-inside text-sm text-gray-600 ml-6">
                        {company.cons.map((con, index) => (
                          <li key={index}>{con}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Recent Reviews</h3>
                    <div className="space-y-3">
                      {company.recentReviews.map(review => (
                        <div key={review.id} className="border-t pt-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium">{review.position}</span>
                            <div className="flex items-center">
                              {renderStars(review.rating)}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{review.review}</p>
                          <div className="text-xs text-gray-500">
                            {new Date(review.date).toLocaleDateString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default CompanyReviews;

import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Building, Users, MapPin, Globe, Briefcase, ArrowRight } from 'lucide-react';

const CompanyProfiles = () => {
  // Sample company data
  const companies = [
    {
      id: 1,
      name: "TechNova Solutions",
      logo: "/placeholder.svg",
      industry: "Information Technology",
      size: "1000-5000 employees",
      location: "San Francisco, CA",
      website: "technova.example.com",
      description: "A leading technology company specializing in cloud computing, artificial intelligence, and enterprise solutions.",
      activeJobs: 24
    },
    {
      id: 2,
      name: "FinServe Global",
      logo: "/placeholder.svg",
      industry: "Financial Services",
      size: "5000-10000 employees",
      location: "New York, NY",
      website: "finserve.example.com",
      description: "A multinational financial services corporation providing banking, investment, and technology solutions.",
      activeJobs: 18
    },
    {
      id: 3,
      name: "HealthPlus Systems",
      logo: "/placeholder.svg",
      industry: "Healthcare Technology",
      size: "500-1000 employees",
      location: "Boston, MA",
      website: "healthplus.example.com",
      description: "An innovative healthcare technology provider developing solutions for medical institutions and patients.",
      activeJobs: 12
    },
    {
      id: 4,
      name: "EcoSmart Energy",
      logo: "/placeholder.svg",
      industry: "Renewable Energy",
      size: "100-500 employees",
      location: "Austin, TX",
      website: "ecosmart.example.com",
      description: "A renewable energy company focused on developing sustainable power solutions and green technologies.",
      activeJobs: 8
    },
    {
      id: 5,
      name: "DataVision Analytics",
      logo: "/placeholder.svg",
      industry: "Data Analytics",
      size: "500-1000 employees",
      location: "Seattle, WA",
      website: "datavision.example.com",
      description: "A data analytics firm providing business intelligence and advanced analytics solutions to enterprise clients.",
      activeJobs: 15
    },
    {
      id: 6,
      name: "CreativeWorks Media",
      logo: "/placeholder.svg",
      industry: "Media & Entertainment",
      size: "100-500 employees",
      location: "Los Angeles, CA",
      website: "creativeworks.example.com",
      description: "A media company specializing in digital content creation, marketing, and multimedia production.",
      activeJobs: 10
    }
  ];

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Partner Companies</h1>
            <p className="text-xl mb-8">
              Discover top employers actively recruiting from our talent pool
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="#companies" className="btn btn-secondary px-8 py-3">
                Browse Companies
              </Link>
              <Link to="/jobs" className="btn btn-outline border-white text-white hover:bg-white hover:text-primary px-8 py-3">
                View Open Positions
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Company Listing */}
      <section id="companies" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Partner Companies</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {companies.map(company => (
              <div key={company.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="p-6 border-b">
                  <div className="flex items-center">
                    <img 
                      src={company.logo} 
                      alt={`${company.name} logo`} 
                      className="w-16 h-16 object-contain mr-4"
                    />
                    <div>
                      <h3 className="text-xl font-semibold">{company.name}</h3>
                      <p className="text-gray-600">{company.industry}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{company.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600">
                      <Users className="h-5 w-5 mr-2" />
                      <span>{company.size}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-5 w-5 mr-2" />
                      <span>{company.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Globe className="h-5 w-5 mr-2" />
                      <span>{company.website}</span>
                    </div>
                    <div className="flex items-center text-primary-600 font-medium">
                      <Briefcase className="h-5 w-5 mr-2" />
                      <span>{company.activeJobs} Active Job Openings</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-6">
                    <Link to={`/companies/${company.id}`} className="text-primary-600 font-medium flex items-center hover:text-primary-700">
                      Company Details <ArrowRight size={16} className="ml-1" />
                    </Link>
                    <Link to={`/jobs?company=${company.id}`} className="btn btn-primary">
                      View Jobs
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Recruitment Process Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Recruitment Process</h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 p-6">
                <div className="relative">
                  <div className="border-r-2 border-primary-300 absolute h-full top-0" style={{left: '15px'}} />
                  
                  <ul className="list-none m-0 p-0">
                    <li className="mb-8">
                      <div className="flex items-center">
                        <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center z-10">
                          1
                        </div>
                        <div className="ml-4">
                          <h3 className="text-xl font-semibold">Application Screening</h3>
                          <p className="text-gray-600">
                            Companies review student profiles and resumes
                          </p>
                        </div>
                      </div>
                    </li>
                    <li className="mb-8">
                      <div className="flex items-center">
                        <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center z-10">
                          2
                        </div>
                        <div className="ml-4">
                          <h3 className="text-xl font-semibold">Aptitude Testing</h3>
                          <p className="text-gray-600">
                            Assessment of technical and soft skills
                          </p>
                        </div>
                      </div>
                    </li>
                    <li className="mb-8">
                      <div className="flex items-center">
                        <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center z-10">
                          3
                        </div>
                        <div className="ml-4">
                          <h3 className="text-xl font-semibold">Technical Interview</h3>
                          <p className="text-gray-600">
                            In-depth evaluation of technical competencies
                          </p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="flex items-center">
                        <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center z-10">
                          4
                        </div>
                        <div className="ml-4">
                          <h3 className="text-xl font-semibold">HR Interview</h3>
                          <p className="text-gray-600">
                            Assessment of cultural fit and soft skills
                          </p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="md:w-1/2 p-6">
                <div className="relative">
                  <div className="border-r-2 border-primary-300 absolute h-full top-0" style={{left: '15px'}} />
                  
                  <ul className="list-none m-0 p-0">
                    <li className="mb-8">
                      <div className="flex items-center">
                        <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center z-10">
                          5
                        </div>
                        <div className="ml-4">
                          <h3 className="text-xl font-semibold">Group Discussion</h3>
                          <p className="text-gray-600">
                            Evaluation of communication and leadership skills
                          </p>
                        </div>
                      </div>
                    </li>
                    <li className="mb-8">
                      <div className="flex items-center">
                        <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center z-10">
                          6
                        </div>
                        <div className="ml-4">
                          <h3 className="text-xl font-semibold">Final Interview</h3>
                          <p className="text-gray-600">
                            Meeting with senior management or department heads
                          </p>
                        </div>
                      </div>
                    </li>
                    <li className="mb-8">
                      <div className="flex items-center">
                        <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center z-10">
                          7
                        </div>
                        <div className="ml-4">
                          <h3 className="text-xl font-semibold">Offer Letter</h3>
                          <p className="text-gray-600">
                            Job offer with compensation and benefits details
                          </p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="flex items-center">
                        <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center z-10">
                          8
                        </div>
                        <div className="ml-4">
                          <h3 className="text-xl font-semibold">Onboarding</h3>
                          <p className="text-gray-600">
                            Introduction to company culture and work environment
                          </p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-primary py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Interested in Becoming a Partner Company?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join our network of employers and gain access to a curated pool of talented candidates ready for recruitment
          </p>
          <Link to="/contact" className="btn bg-white text-primary hover:bg-gray-100 px-8 py-3 text-lg">
            Partner With Us
          </Link>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default CompanyProfiles;

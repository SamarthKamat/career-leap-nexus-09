import React from 'react';
import { FileText, Briefcase, GraduationCap, Award, Star } from 'lucide-react';

const ResumeReport = ({ parsedData }) => {
  if (!parsedData) return null;

  const {
    name,
    email,
    phone,
    skills = [],
    education = [],
    experience = [],
    certifications = [],
    summary,
  } = parsedData;

  const SectionHeader = ({ icon: Icon, title }) => (
    <div className="flex items-center space-x-2 mb-4">
      <Icon className="h-5 w-5 text-primary-600" />
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-8">
      {/* Personal Information */}
      <div>
        <SectionHeader icon={FileText} title="Personal Information" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {name && (
            <div>
              <p className="text-sm text-gray-600">Full Name</p>
              <p className="font-medium">{name}</p>
            </div>
          )}
          {email && (
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-medium">{email}</p>
            </div>
          )}
          {phone && (
            <div>
              <p className="text-sm text-gray-600">Phone</p>
              <p className="font-medium">{phone}</p>
            </div>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      {summary && (
        <div>
          <SectionHeader icon={Star} title="Professional Summary" />
          <p className="text-gray-700 whitespace-pre-line">{summary}</p>
        </div>
      )}

      {/* Work Experience */}
      {experience.length > 0 && (
        <div>
          <SectionHeader icon={Briefcase} title="Work Experience" />
          <div className="space-y-6">
            {experience.map((exp, index) => (
              <div key={index} className="border-l-2 border-primary-100 pl-4">
                <h4 className="font-semibold text-lg">{exp.title}</h4>
                <p className="text-primary-600">{exp.company}</p>
                {exp.dates && (
                  <p className="text-sm text-gray-500 mb-2">{exp.dates}</p>
                )}
                {exp.description && (
                  <p className="text-gray-700 whitespace-pre-line">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div>
          <SectionHeader icon={GraduationCap} title="Education" />
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div key={index} className="border-l-2 border-primary-100 pl-4">
                <h4 className="font-semibold">{edu.degree}</h4>
                <p className="text-primary-600">{edu.institution}</p>
                {edu.dates && (
                  <p className="text-sm text-gray-500">{edu.dates}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div>
          <SectionHeader icon={Award} title="Skills" />
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div>
          <SectionHeader icon={Award} title="Certifications" />
          <div className="space-y-2">
            {certifications.map((cert, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-primary-600 rounded-full" />
                <span className="text-gray-700">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeReport;
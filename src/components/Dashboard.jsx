// import { useNavigate } from 'react-router-dom'
// import { useEffect } from 'react'

// function Dashboard({ user, setUser }) {
//   const navigate = useNavigate()

//   useEffect(() => {
//     if (!user) {
//       navigate('/login')
//     }
//   }, [user, navigate])

//   const handleLogout = () => {
//     setUser(null)
//     localStorage.removeItem('user')
//     navigate('/login')
//   }

//   if (!user) {
//     return null
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
//       <div className="relative py-3 sm:max-w-xl sm:mx-auto">
//         <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
//         <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
//           <div className="max-w-md mx-auto">
//             <div>
//               <h1 className="text-2xl font-semibold">Welcome to your Dashboard</h1>
//             </div>
//             <div className="divide-y divide-gray-200">
//               <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
//                 <p>Email: {user.email}</p>
//                 <p>Name: {user.name}</p>
//               </div>
//               <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
//                 <button
//                   onClick={handleLogout}
//                   className="text-indigo-600 hover:text-indigo-500"
//                 >
//                   Logout
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Dashboard






// import { useNavigate } from 'react-router-dom';
// import { useEffect } from 'react';
// import PropTypes from 'prop-types';

// function Dashboard({ user, setUser }) {
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!user) {
//       navigate('/login');
//     }
//   }, [user, navigate]);

//   const handleLogout = () => {
//     setUser(null);
//     localStorage.removeItem('user');
//     navigate('/login');
//   };

//   if (!user) {
//     return <div>Loading...</div>; // Added loading indicator
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
//       <div className="relative py-3 sm:max-w-xl sm:mx-auto">
//         <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
//         <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
//           <div className="max-w-md mx-auto">
//             <div>
//               <h1 className="text-2xl font-semibold">Welcome to your Dashboard</h1>
//             </div>
//             <div className="divide-y divide-gray-200">
//               <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
//                 <p>Email: {user.email}</p>
//                 <p>Name: {user.name}</p>
//               </div>
//               <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
//                 <button
//                   onClick={handleLogout}
//                   className="text-indigo-600 hover:text-indigo-500"
//                 >
//                   Logout
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// Dashboard.propTypes = {
//   user: PropTypes.shape({
//     email: PropTypes.string,
//     name: PropTypes.string,
//   }),
//   setUser: PropTypes.func.isRequired,
// };

// export default Dashboard;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Mail, Linkedin, Github, MapPin, Briefcase, GraduationCap, Award, FolderOpen, Languages, Download, Save } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function Dashboard({ user, setUser }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    personalInfo: {
      name: '',
      title: '',
      phone: '',
      email: '',
      linkedin: '',
      github: '',
      location: '',
    },
    summary: '',
    projects: [
      {
        title: '',
        points: ['', '', '']
      }
    ],
    skills: '',
    education: {
      degree: '',
      school: '',
      gpa: '',
      duration: ''
    },
    certifications: [''],
    internship: {
      company: '',
      duration: '',
      description: ''
    },
    languages: [
      { language: '', proficiency: '' }
    ]
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      fetchUserData();
    }
  }, [user, navigate]);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user-data`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const userData = await response.json();
        setFormData(userData);
      } else {
        console.error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleChange = (section, field, value, index = null) => {
    setFormData(prev => {
      const newData = { ...prev };
      if (index !== null && Array.isArray(newData[section])) {
        newData[section][index] = { ...newData[section][index], [field]: value };
      } else if (typeof newData[section] === 'object' && !Array.isArray(newData[section])) {
        newData[section][field] = value;
      } else {
        newData[section] = value;
      }
      return newData;
    });
  };

  const addItem = (section) => {
    setFormData(prev => {
      const newData = { ...prev };
      if (section === 'projects') {
        newData.projects.push({ title: '', points: ['', '', ''] });
      } else if (section === 'certifications') {
        newData.certifications.push('');
      } else if (section === 'languages') {
        newData.languages.push({ language: '', proficiency: '' });
      }
      return newData;
    });
  };

  const removeItem = (section, index) => {
    setFormData(prev => {
      const newData = { ...prev };
      newData[section].splice(index, 1);
      return newData;
    });
  };

  const saveData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/save-user-data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        alert('Data saved successfully!');
      } else {
        alert('Failed to save data. Please try again.');
      }
    } catch (error) {
      console.error('Error saving data:', error);
      alert('An error occurred while saving data.');
    }
  };

  const downloadPDF = async () => {
    const element = document.getElementById('resume-preview');
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('resume.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-[1200px] mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Welcome, {user.name}!</h1>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="space-y-6">
          {/* Personal Information */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 gap-4">
              {Object.entries(formData.personalInfo).map(([key, value]) => (
                <input
                  key={key}
                  type={key === 'email' ? 'email' : key === 'phone' ? 'tel' : 'text'}
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                  className="w-full p-2 border rounded"
                  value={value}
                  onChange={(e) => handleChange('personalInfo', key, e.target.value)}
                />
              ))}
            </div>
          </div>

          {/* Professional Summary */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Professional Summary</h2>
            <textarea
              placeholder="Write your professional summary..."
              className="w-full p-2 border rounded h-32"
              value={formData.summary}
              onChange={(e) => handleChange('summary', null, e.target.value)}
            />
          </div>

          {/* Projects */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Projects</h2>
            {formData.projects.map((project, index) => (
              <div key={index} className="space-y-4 mb-4">
                <input
                  type="text"
                  placeholder="Project Title"
                  className="w-full p-2 border rounded"
                  value={project.title}
                  onChange={(e) => handleChange('projects', 'title', e.target.value, index)}
                />
                {project.points.map((point, pointIndex) => (
                  <input
                    key={pointIndex}
                    type="text"
                    placeholder={`Project Point ${pointIndex + 1}`}
                    className="w-full p-2 border rounded"
                    value={point}
                    onChange={(e) => {
                      const newPoints = [...project.points];
                      newPoints[pointIndex] = e.target.value;
                      handleChange('projects', 'points', newPoints, index);
                    }}
                  />
                ))}
                <button onClick={() => removeItem('projects', index)} className="text-red-600">Remove Project</button>
              </div>
            ))}
            <button onClick={() => addItem('projects')} className="text-blue-600">Add Project</button>
          </div>

          {/* Skills */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Skills</h2>
            <input
              type="text"
              placeholder="Skills (comma separated)"
              className="w-full p-2 border rounded"
              value={formData.skills}
              onChange={(e) => handleChange('skills', null, e.target.value)}
            />
          </div>

          {/* Education */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Education</h2>
            <div className="grid grid-cols-1 gap-4">
              {Object.entries(formData.education).map(([key, value]) => (
                <input
                  key={key}
                  type="text"
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                  className="w-full p-2 border rounded"
                  value={value}
                  onChange={(e) => handleChange('education', key, e.target.value)}
                />
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Certifications</h2>
            {formData.certifications.map((cert, index) => (
              <div key={index} className="mb-2">
                <input
                  type="text"
                  placeholder="Certification"
                  className="w-full p-2 border rounded"
                  value={cert}
                  onChange={(e) => handleChange('certifications', null, e.target.value, index)}
                />
                <button onClick={() => removeItem('certifications', index)} className="text-red-600">Remove</button>
              </div>
            ))}
            <button onClick={() => addItem('certifications')} className="text-blue-600">Add Certification</button>
          </div>

          {/* Internship */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Internship</h2>
            <div className="grid grid-cols-1 gap-4">
              {Object.entries(formData.internship).map(([key, value]) => (
                key === 'description' ? (
                  <textarea
                    key={key}
                    placeholder="Description"
                    className="w-full p-2 border rounded h-32"
                    value={value}
                    onChange={(e) => handleChange('internship', key, e.target.value)}
                  />
                ) : (
                  <input
                    key={key}
                    type="text"
                    placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                    className="w-full p-2 border rounded"
                    value={value}
                    onChange={(e) => handleChange('internship', key, e.target.value)}
                  />
                )
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Languages</h2>
            {formData.languages.map((lang, index) => (
              <div key={index} className="grid grid-cols-2 gap-4 mb-2">
                <input
                  type="text"
                  placeholder="Language"
                  className="w-full p-2 border rounded"
                  value={lang.language}
                  onChange={(e) => handleChange('languages', 'language', e.target.value, index)}
                />
                <input
                  type="text"
                  placeholder="Proficiency"
                  className="w-full p-2 border rounded"
                  value={lang.proficiency}
                  onChange={(e) => handleChange('languages', 'proficiency', e.target.value, index)}
                />
                <button onClick={() => removeItem('languages', index)} className="text-red-600">Remove</button>
              </div>
            ))}
            <button onClick={() => addItem('languages')} className="text-blue-600">Add Language</button>
          </div>
        </div>

        {/* Preview Section */}
        <div className="sticky top-8">
          <div id="resume-preview" className="max-w-[21cm] mx-auto p-8 bg-white shadow-lg rounded-lg">
            <header className="mb-4 pb-4 border-b-2 border-blue-600">
              <h1 className="text-3xl font-bold text-gray-800">{formData.personalInfo.name || 'YOUR NAME'}</h1>
              <h2 className="text-lg text-blue-600">{formData.personalInfo.title || 'Professional Title'}</h2>
              <div className="flex flex-wrap gap-4 mt-2">
                {formData.personalInfo.phone && (
                  <a href={`tel:${formData.personalInfo.phone}`} className="flex items-center text-gray-600 hover:text-blue-600">
                    <Phone size={14} className="mr-2" />
                    <span>{formData.personalInfo.phone}</span>
                  </a>
                )}
                {formData.personalInfo.email && (
                  <a href={`mailto:${formData.personalInfo.email}`} className="flex items-center text-gray-600 hover:text-blue-600">
                    <Mail size={14} className="mr-2" />
                    <span>{formData.personalInfo.email}</span>
                  </a>
                )}
                {formData.personalInfo.linkedin && (
                  <a href={formData.personalInfo.linkedin} className="flex items-center text-gray-600 hover:text-blue-600">
                    <Linkedin size={14} className="mr-2" />
                    <span>{formData.personalInfo.linkedin}</span>
                  </a>
                )}
                {formData.personalInfo.github && (
                  <a href={formData.personalInfo.github} className="flex items-center text-gray-600 hover:text-blue-600">
                    <Github size={14} className="mr-2" />
                    <span>{formData.personalInfo.github}</span>
                  </a>
                )}
                {formData.personalInfo.location && (
                  <span className="flex items-center text-gray-600">
                    <MapPin size={14} className="mr-2" />
                    <span>{formData.personalInfo.location}</span>
                  </span>
                )}
              </div>
            </header>

            <div className="grid grid-cols-2 gap-8">
              <div>
                {formData.summary && (
                  <section className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-2 flex items-center">
                      <Briefcase className="mr-2 text-blue-600" size={16} />
                      PROFESSIONAL SUMMARY
                    </h3>
                    <p className="text-gray-600">{formData.summary}</p>
                  </section>
                )}

                {formData.projects.length > 0 && (
                  <section className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-2 flex items-center">
                      <FolderOpen className="mr-2 text-blue-600" size={16} />
                      PROJECTS
                    </h3>
                    {formData.projects.map((project, index) => (
                      <div key={index} className="mb-2">
                        <h4 className="font-semibold">{project.title}</h4>
                        <ul className="list-disc pl-5 text-gray-600 space-y-1">
                          {project.points.map((point, pointIndex) => (
                            point && <li key={pointIndex}>{point}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </section>
                )}
              </div>

              <div>
                {formData.skills && (
                  <section className="mb-8">
                    <h3 className="text-sm font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-2 flex items-center">
                      <Award className="mr-2 text-blue-600" size={16} />
                      SKILLS
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {formData.skills.split(',').map((skill) => (
                        <span key={skill} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-lg">
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                  </section>
                )}

                {(formData.education.degree || formData.education.school) && (
                  <section className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-2 flex items-center">
                      <GraduationCap className="mr-2 text-blue-600" size={16} />
                      EDUCATION
                    </h3>
                    <div className="mb-4">
                      <h4 className="font-semibold">{formData.education.degree}</h4>
                      <p className="text-blue-600 mb-1">{formData.education.school}</p>
                      <div className="flex justify-between w-full">
                        <p className="text-gray-600">CGPA: {formData.education.gpa}</p>
                        <p className="text-gray-600">{formData.education.duration}</p>
                      </div>
                    </div>
                  </section>
                )}

                {formData.certifications.length > 0 && formData.certifications[0] && (
                  <section className="mb-8">
                    <h3 className="text-sm font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-2 flex items-center">
                      <Award className="mr-2 text-blue-600" size={16} />
                      CERTIFICATIONS
                    </h3>
                    <ul className="list-disc pl-5 text-gray-600 space-y-1 mb-1">
                      {formData.certifications.map((cert, index) => (
                        cert && <li key={index}>{cert}</li>
                      ))}
                    </ul>
                  </section>
                )}

                {(formData.internship.company || formData.internship.description) && (
                  <section className="mb-8">
                    <h3 className="text-sm font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-2 flex items-center">
                      <Briefcase className="mr-2 text-blue-600" size={16} />
                      INTERNSHIP
                    </h3>
                    <div>
                      <h4 className="font-semibold">{formData.internship.company}</h4>
                      <p className="text-blue-600 mb-1">{formData.internship.duration}</p>
                      <p className="text-gray-600">{formData.internship.description}</p>
                    </div>
                  </section>
                )}

                {formData.languages.length > 0 && formData.languages[0].language && (
                  <section>
                    <h3 className="text-sm font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-2 flex items-center">
                      <Languages className="mr-2 text-blue-600" size={16} />
                      LANGUAGES
                    </h3>
                    <ul className="text-gray-600 flex gap-4">
                      {formData.languages.map((lang, index) => (
                        <li key={index}>
                          <span className="font-semibold">{lang.language}:</span> {lang.proficiency}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Save and Download Buttons */}
      <div className="fixed bottom-8 right-8 space-x-4">
        <button
          onClick={saveData}
          className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-700 flex items-center gap-2"
        >
          <Save className="h-5 w-5" />
          Save Data
        </button>
        <button
          onClick={downloadPDF}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Download className="h-5 w-5" />
          Download PDF
        </button>
      </div>
    </div>
  );
}
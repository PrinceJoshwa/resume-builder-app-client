// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Sidebar from '../components/Sidebar';
// import { Phone, Mail, Linkedin, Github, MapPin, Briefcase, GraduationCap, Award, FolderOpen, Languages, Download, Save } from 'lucide-react';
// // import { Download, Save } from 'lucide-react';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';

// export default function Template1({ onLogout }) {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     personalInfo: {
//       name: '',
//       title: '',
//       email: '',
//       phone: '',
//       location: ''
//     },
//     summary: '',
//     experience: [
//       {
//         title: '',
//         company: '',
//         duration: '',
//         description: ''
//       }
//     ],
//     education: [
//       {
//         degree: '',
//         school: '',
//         year: ''
//       }
//     ],
//     skills: ''
//   });

//   const handleChange = (section, field, value, index = null) => {
//     setFormData(prev => {
//       const newData = { ...prev };
//       if (index !== null && Array.isArray(newData[section])) {
//         newData[section][index] = { ...newData[section][index], [field]: value };
//       } else if (typeof newData[section] === 'object' && !Array.isArray(newData[section])) {
//         newData[section][field] = value;
//       } else {
//         newData[section] = value;
//       }
//       return newData;
//     });
//   };

//   const saveResume = async () => {
//     try {
//       const response = await fetch('/api/save-resume', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         },
//         body: JSON.stringify({
//           templateId: 1,
//           data: formData
//         })
//       });
      
//       if (response.ok) {
//         alert('Resume saved successfully!');
//         navigate('/my-resumes');
//       } else {
//         alert('Failed to save resume');
//       }
//     } catch (error) {
//       console.error('Error saving resume:', error);
//       alert('Error saving resume');
//     }
//   };

//   const downloadPDF = async () => {
//     const element = document.getElementById('resume-preview');
//     if (!element) return;

//     try {
//       const canvas = await html2canvas(element, {
//         scale: 2,
//         useCORS: true,
//         logging: false
//       });
      
//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF('p', 'mm', 'a4');
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = pdf.internal.pageSize.getHeight();
      
//       pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
//       pdf.save('resume.pdf');
//     } catch (error) {
//       console.error('Error generating PDF:', error);
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-50">
//       <Sidebar onLogout={onLogout} />
      
//       <div className="flex-1 overflow-auto">
//         <div className="p-8">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//             {/* Form Section */}
//             <div className="space-y-6">
//               <div className="bg-white rounded-lg shadow p-6">
//                 <h2 className="text-xl font-bold mb-4">Personal Information</h2>
//                 <div className="space-y-4">
//                   {Object.entries(formData.personalInfo).map(([key, value]) => (
//                     <div key={key}>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         {key.charAt(0).toUpperCase() + key.slice(1)}
//                       </label>
//                       <input
//                         type={key === 'email' ? 'email' : 'text'}
//                         className="w-full p-2 border rounded-md"
//                         value={value}
//                         onChange={(e) => handleChange('personalInfo', key, e.target.value)}
//                       />
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="bg-white rounded-lg shadow p-6">
//                 <h2 className="text-xl font-bold mb-4">Professional Summary</h2>
//                 <textarea
//                   className="w-full p-2 border rounded-md h-32"
//                   value={formData.summary}
//                   onChange={(e) => handleChange('summary', null, e.target.value)}
//                 />
//               </div>

//               {/* Add more form sections for experience, education, skills */}
//             </div>

//             {/* Preview Section */}
//             <div className="sticky top-8">
//               <div id="resume-preview" className="bg-white shadow-lg rounded-lg p-8">
//                 {/* Template 1 Preview */}
//                 <div className="border-b-2 border-blue-600 pb-4 mb-6">
//                   <h1 className="text-3xl font-bold text-gray-800">
//                     {formData.personalInfo.name || 'Your Name'}
//                   </h1>
//                   <h2 className="text-xl text-blue-600 mt-1">
//                     {formData.personalInfo.title || 'Professional Title'}
//                   </h2>
//                   <div className="flex flex-wrap gap-4 mt-2 text-gray-600">
//                     {formData.personalInfo.email && (
//                       <span>{formData.personalInfo.email}</span>
//                     )}
//                     {formData.personalInfo.phone && (
//                       <span>{formData.personalInfo.phone}</span>
//                     )}
//                     {formData.personalInfo.location && (
//                       <span>{formData.personalInfo.location}</span>
//                     )}
//                   </div>
//                 </div>

//                 {formData.summary && (
//                   <div className="mb-6">
//                     <h3 className="text-lg font-semibold mb-2">Professional Summary</h3>
//                     <p className="text-gray-700">{formData.summary}</p>
//                   </div>
//                 )}

//                 {/* Add more preview sections for experience, education, skills */}
//               </div>
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="fixed bottom-8 right-8 space-x-4">
//             <button
//               onClick={saveResume}
//               className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-700 flex items-center gap-2"
//             >
//               <Save className="h-5 w-5" />
//               Save Resume
//             </button>
//             <button
//               onClick={downloadPDF}
//               className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 flex items-center gap-2"
//             >
//               <Download className="h-5 w-5" />
//               Download PDF
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Phone, Mail, MapPin, Briefcase, GraduationCap, Award, Download, Save, FolderOpen, Globe } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function ResumeBuilder({ onLogout }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    personalInfo: {
      name: '',
      title: '',
      email: '',
      phone: '',
      location: ''
    },
    summary: '',
    experience: [
      {
        title: '',
        company: '',
        duration: '',
        description: ''
      }
    ],
    education: [
      {
        degree: '',
        school: '',
        year: ''
      }
    ],
    skills: '',
    projects: [
      {
        title: '',
        description: '',
        technologies: ''
      }
    ],
    certifications: [
      {
        name: '',
        issuer: '',
        year: ''
      }
    ],
    languages: [
      {
        language: '',
        proficiency: ''
      }
    ]
  });

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

  const saveResume = async () => {
    try {
      const response = await fetch('/api/save-resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          templateId: 1,
          data: formData
        })
      });
      
      if (response.ok) {
        alert('Resume saved successfully!');
        navigate('/my-resumes');
      } else {
        alert('Failed to save resume');
      }
    } catch (error) {
      console.error('Error saving resume:', error);
      alert('Error saving resume');
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

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar onLogout={onLogout} />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form Section - Left Column */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-4">Personal Information</h2>
                <div className="space-y-4">
                  {Object.entries(formData.personalInfo).map(([key, value]) => (
                    <div key={key}>
                      <label htmlFor={`personal-${key}`} className="block text-sm font-medium text-gray-700 mb-1">
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </label>
                      <input
                        id={`personal-${key}`}
                        type={key === 'email' ? 'email' : 'text'}
                        className="w-full p-2 border rounded-md"
                        value={value}
                        onChange={(e) => handleChange('personalInfo', key, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-4">Professional Summary</h2>
                <textarea
                  id="summary"
                  className="w-full p-2 border rounded-md h-32"
                  value={formData.summary}
                  onChange={(e) => handleChange('summary', null, e.target.value)}
                />
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-4">Experience</h2>
                {formData.experience.map((exp, index) => (
                  <div key={index} className="space-y-4 mb-4">
                    <input
                      type="text"
                      placeholder="Job Title"
                      className="w-full p-2 border rounded-md"
                      value={exp.title}
                      onChange={(e) => handleChange('experience', 'title', e.target.value, index)}
                    />
                    <input
                      type="text"
                      placeholder="Company"
                      className="w-full p-2 border rounded-md"
                      value={exp.company}
                      onChange={(e) => handleChange('experience', 'company', e.target.value, index)}
                    />
                    <input
                      type="text"
                      placeholder="Duration"
                      className="w-full p-2 border rounded-md"
                      value={exp.duration}
                      onChange={(e) => handleChange('experience', 'duration', e.target.value, index)}
                    />
                    <textarea
                      placeholder="Description"
                      className="w-full p-2 border rounded-md h-32"
                      value={exp.description}
                      onChange={(e) => handleChange('experience', 'description', e.target.value, index)}
                    />
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-4">Projects</h2>
                {formData.projects.map((project, index) => (
                  <div key={index} className="space-y-4 mb-4">
                    <input
                      type="text"
                      placeholder="Project Title"
                      className="w-full p-2 border rounded-md"
                      value={project.title}
                      onChange={(e) => handleChange('projects', 'title', e.target.value, index)}
                    />
                    <textarea
                      placeholder="Project Description"
                      className="w-full p-2 border rounded-md h-32"
                      value={project.description}
                      onChange={(e) => handleChange('projects', 'description', e.target.value, index)}
                    />
                    <input
                      type="text"
                      placeholder="Technologies Used"
                      className="w-full p-2 border rounded-md"
                      value={project.technologies}
                      onChange={(e) => handleChange('projects', 'technologies', e.target.value, index)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Form Section - Right Column */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-4">Skills</h2>
                <input
                  type="text"
                  placeholder="Skills (comma separated)"
                  className="w-full p-2 border rounded-md"
                  value={formData.skills}
                  onChange={(e) => handleChange('skills', null, e.target.value)}
                />
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-4">Education</h2>
                {formData.education.map((edu, index) => (
                  <div key={index} className="space-y-4 mb-4">
                    <input
                      type="text"
                      placeholder="Degree"
                      className="w-full p-2 border rounded-md"
                      value={edu.degree}
                      onChange={(e) => handleChange('education', 'degree', e.target.value, index)}
                    />
                    <input
                      type="text"
                      placeholder="School"
                      className="w-full p-2 border rounded-md"
                      value={edu.school}
                      onChange={(e) => handleChange('education', 'school', e.target.value, index)}
                    />
                    <input
                      type="text"
                      placeholder="Year"
                      className="w-full p-2 border rounded-md"
                      value={edu.year}
                      onChange={(e) => handleChange('education', 'year', e.target.value, index)}
                    />
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-4">Certifications</h2>
                {formData.certifications.map((cert, index) => (
                  <div key={index} className="space-y-4 mb-4">
                    <input
                      type="text"
                      placeholder="Certification Name"
                      className="w-full p-2 border rounded-md"
                      value={cert.name}
                      onChange={(e) => handleChange('certifications', 'name', e.target.value, index)}
                    />
                    <input
                      type="text"
                      placeholder="Issuer"
                      className="w-full p-2 border rounded-md"
                      value={cert.issuer}
                      onChange={(e) => handleChange('certifications', 'issuer', e.target.value, index)}
                    />
                    <input
                      type="text"
                      placeholder="Year"
                      className="w-full p-2 border rounded-md"
                      value={cert.year}
                      onChange={(e) => handleChange('certifications', 'year', e.target.value, index)}
                    />
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-4">Languages</h2>
                {formData.languages.map((lang, index) => (
                  <div key={index} className="space-y-4 mb-4">
                    <input
                      type="text"
                      placeholder="Language"
                      className="w-full p-2 border rounded-md"
                      value={lang.language}
                      onChange={(e) => handleChange('languages', 'language', e.target.value, index)}
                    />
                    <input
                      type="text"
                      placeholder="Proficiency"
                      className="w-full p-2 border rounded-md"
                      value={lang.proficiency}
                      onChange={(e) => handleChange('languages', 'proficiency', e.target.value, index)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="mt-8">
            <div id="resume-preview" className="bg-white shadow-lg rounded-lg p-8 relative">
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="border-b-2 border-blue-600 pb-4">
                    <h1 className="text-3xl font-bold text-gray-800">
                      {formData.personalInfo.name || 'Your Name'}
                    </h1>
                    <h2 className="text-xl text-blue-600 mt-1">
                      {formData.personalInfo.title || 'Professional Title'}
                    </h2>
                  </div>

                  {formData.summary && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <Briefcase className="mr-2 text-blue-600" size={20} />
                        Professional Summary
                      </h3>
                      <p className="text-gray-700">{formData.summary}</p>
                    </div>
                  )}

                  {formData.experience.length > 0 && formData.experience[0].title && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <Briefcase className="mr-2 text-blue-600" size={20} />
                        Experience
                      </h3>
                      {formData.experience.map((exp, index) => (
                        <div key={index} className="mb-4">
                          <h4 className="font-semibold">{exp.title}</h4>
                          <p className="text-blue-600">{exp.company}</p>
                          <p className="text-gray-600">{exp.duration}</p>
                          <p className="text-gray-700">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {formData.projects.length > 0 && formData.projects[0].title && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <FolderOpen className="mr-2 text-blue-600" size={20} />
                        Projects
                      </h3>
                      {formData.projects.map((project, index) => (
                        <div key={index} className="mb-4">
                          <h4 className="font-semibold">{project.title}</h4>
                          <p className="text-gray-700">{project.description}</p>
                          <p className="text-blue-600">Technologies: {project.technologies}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  <div className="flex flex-wrap gap-4 text-gray-600">
                    {formData.personalInfo.email && (
                      <span className="flex items-center">
                        <Mail className="mr-2 h-4 w-4" />
                        {formData.personalInfo.email}
                      </span>
                    )}
                    {formData.personalInfo.phone && (
                      <span className="flex items-center">
                        <Phone className="mr-2 h-4 w-4" />
                        {formData.personalInfo.phone}
                      </span>
                    )}
                    {formData.personalInfo.location && (
                      <span className="flex items-center">
                        <MapPin className="mr-2 h-4 w-4" />
                        {formData.personalInfo.location}
                      </span>
                    )}
                  </div>

                  {formData.skills && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <Award className="mr-2 text-blue-600" size={20} />
                        Skills
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {formData.skills.split(',').map((skill, index) => (
                          <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-lg">
                            {skill.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {formData.education.length > 0 && formData.education[0].degree && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <GraduationCap className="mr-2 text-blue-600" size={20} />
                        Education
                      </h3>
                      {formData.education.map((edu, index) => (
                        <div key={index} className="mb-2">
                          <h4 className="font-semibold">{edu.degree}</h4>
                          <p className="text-blue-600">{edu.school}</p>
                          <p className="text-gray-600">{edu.year}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {formData.certifications.length > 0 && formData.certifications[0].name && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <Award className="mr-2 text-blue-600" size={20} />
                        Certifications
                      </h3>
                      {formData.certifications.map((cert, index) => (
                        <div key={index} className="mb-2">
                          <h4 className="font-semibold">{cert.name}</h4>
                          <p className="text-blue-600">{cert.issuer}</p>
                          <p className="text-gray-600">{cert.year}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {formData.languages.length > 0 && formData.languages[0].language && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <Globe className="mr-2 text-blue-600" size={20} />
                        Languages
                      </h3>
                      {formData.languages.map((lang, index) => (
                        <div key={index} className="mb-2">
                          <span className="font-semibold">{lang.language}</span>
                          <span className="text-gray-600 ml-2">({lang.proficiency})</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex justify-center space-x-4">
            <button
              onClick={saveResume}
              className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-700 flex items-center gap-2"
            >
              <Save className="h-5 w-5" />
              Save Resume
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
      </div>
    </div>
  );
}
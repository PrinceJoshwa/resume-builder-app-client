import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import tmpimg1 from '../assets/template1.png';
import tmpimg2 from '../assets/template2.png';
import tmpimg3 from '../assets/template3.png';


const templates = [
  {
    id: 1,
    name: 'Professional',
    description: 'Clean and professional template for corporate jobs',
    thumbnail: tmpimg1,
    path: '/template1'
  },
  {
    id: 2,
    name: 'Creative',
    description: 'Modern and creative template for design roles',
    thumbnail: tmpimg2,
    path: '/template2'
  },
  {
    id: 3,
    name: 'Simple',
    description: 'Minimalist template focusing on experience',
    thumbnail: tmpimg3,
    path: '/template3'
  }
];

export default function Templates({ onLogout }) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar onLogout={onLogout} />
  
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Choose a Template</h1>
  
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template) => (
                <Link
                  key={template.id}
                  to={template.path}
                  className="block group"
                >
                  <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105">
                    <img
                      src={template.thumbnail}
                      alt={template.name}
                    //   style={{ height: '200px', width: '200px' }}
                      className="w-[400px] h-[400px] object-contain object-center"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600">
                        {template.name}
                      </h3>
                      <p className="text-gray-600 mt-1">{template.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
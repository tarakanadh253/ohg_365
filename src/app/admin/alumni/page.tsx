"use client";

import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X, Upload, User } from 'lucide-react';
import { AlumniProfile, alumniData } from '@/data/alumni';

interface AlumniAdminProps {
  isDark?: boolean;
}

export default function AlumniAdmin({ isDark = false }: AlumniAdminProps) {
  const [alumni, setAlumni] = useState<AlumniProfile[]>(alumniData);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAlumni, setNewAlumni] = useState<Partial<AlumniProfile>>({
    name: '',
    initials: '',
    position: '',
    company: '',
    package: '',
    batch: '',
    testimonial: '',
    course: '',
    placementDate: '',
    isActive: true
  });

  const handleEdit = (id: string) => {
    setEditingId(id);
  };

  const handleSave = (id: string, updatedData: Partial<AlumniProfile>) => {
    setAlumni(prev => prev.map(alumni => 
      alumni.id === id ? { ...alumni, ...updatedData } : alumni
    ));
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this alumni profile?')) {
      setAlumni(prev => prev.filter(alumni => alumni.id !== id));
    }
  };

  const handleAdd = () => {
    if (newAlumni.name && newAlumni.initials && newAlumni.position && newAlumni.company) {
      const id = (alumni.length + 1).toString();
      const alumniToAdd: AlumniProfile = {
        id,
        name: newAlumni.name,
        initials: newAlumni.initials,
        position: newAlumni.position,
        company: newAlumni.company,
        package: newAlumni.package || 'Not disclosed',
        batch: newAlumni.batch || '2024 Batch',
        testimonial: newAlumni.testimonial || 'Great experience with OneHubGlobal!',
        course: newAlumni.course || 'DevOps',
        placementDate: newAlumni.placementDate || new Date().toISOString().split('T')[0],
        isActive: newAlumni.isActive ?? true
      };
      
      setAlumni(prev => [...prev, alumniToAdd]);
      setNewAlumni({
        name: '',
        initials: '',
        position: '',
        company: '',
        package: '',
        batch: '',
        testimonial: '',
        course: '',
        placementDate: '',
        isActive: true
      });
      setShowAddForm(false);
    }
  };

  const handleImageUpload = (id: string, file: File) => {
    // In a real application, you would upload to a server
    // For now, we'll just show a placeholder
    console.log('Uploading image for alumni:', id, file);
    alert('Image upload functionality will be implemented with backend integration');
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} p-6`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
            Alumni Management
          </h1>
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Manage success stories and placed student profiles
          </p>
        </div>

        {/* Add New Alumni Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Alumni
          </button>
        </div>

        {/* Add New Alumni Form */}
        {showAddForm && (
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 mb-6 border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Add New Alumni Profile
              </h3>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                  Name *
                </label>
                <input
                  type="text"
                  value={newAlumni.name}
                  onChange={(e) => setNewAlumni({ ...newAlumni, name: e.target.value })}
                  className={`w-full px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                  placeholder="Enter full name"
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                  Initials *
                </label>
                <input
                  type="text"
                  value={newAlumni.initials}
                  onChange={(e) => setNewAlumni({ ...newAlumni, initials: e.target.value })}
                  className={`w-full px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                  placeholder="e.g., RK"
                  maxLength={3}
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                  Position *
                </label>
                <input
                  type="text"
                  value={newAlumni.position}
                  onChange={(e) => setNewAlumni({ ...newAlumni, position: e.target.value })}
                  className={`w-full px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                  placeholder="e.g., DevOps Engineer"
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                  Company *
                </label>
                <input
                  type="text"
                  value={newAlumni.company}
                  onChange={(e) => setNewAlumni({ ...newAlumni, company: e.target.value })}
                  className={`w-full px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                  placeholder="e.g., Amazon Web Services"
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                  Package
                </label>
                <input
                  type="text"
                  value={newAlumni.package}
                  onChange={(e) => setNewAlumni({ ...newAlumni, package: e.target.value })}
                  className={`w-full px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                  placeholder="e.g., ₹12 LPA"
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                  Batch
                </label>
                <input
                  type="text"
                  value={newAlumni.batch}
                  onChange={(e) => setNewAlumni({ ...newAlumni, batch: e.target.value })}
                  className={`w-full px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                  placeholder="e.g., 2024 Batch"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                  Testimonial
                </label>
                <textarea
                  value={newAlumni.testimonial}
                  onChange={(e) => setNewAlumni({ ...newAlumni, testimonial: e.target.value })}
                  rows={3}
                  className={`w-full px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                  placeholder="Enter testimonial..."
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                  Course
                </label>
                <input
                  type="text"
                  value={newAlumni.course}
                  onChange={(e) => setNewAlumni({ ...newAlumni, course: e.target.value })}
                  className={`w-full px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                  placeholder="e.g., DevOps Fundamentals"
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                  Placement Date
                </label>
                <input
                  type="date"
                  value={newAlumni.placementDate}
                  onChange={(e) => setNewAlumni({ ...newAlumni, placementDate: e.target.value })}
                  className={`w-full px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => setShowAddForm(false)}
                className={`px-4 py-2 rounded-lg ${isDark ? 'bg-gray-600 text-white hover:bg-gray-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} transition-colors`}
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Save className="w-4 h-4 mr-2 inline" />
                Add Alumni
              </button>
            </div>
          </div>
        )}

        {/* Alumni Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {alumni.map((alumniProfile) => (
            <div key={alumniProfile.id} className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 border ${isDark ? 'border-gray-700' : 'border-gray-200'} shadow-lg`}>
              <div className="text-center mb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold text-white">{alumniProfile.initials}</span>
                </div>
                <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {alumniProfile.name}
                </h3>
                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {alumniProfile.position} at {alumniProfile.company}
                </p>
                <p className="text-green-500 font-semibold text-sm">
                  {alumniProfile.package}
                </p>
              </div>
              
              <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-3 mb-4`}>
                <p className={`text-sm italic ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  "{alumniProfile.testimonial}"
                </p>
              </div>
              
              <div className="flex justify-between items-center text-xs text-gray-500 mb-4">
                <span>{alumniProfile.batch}</span>
                <span>{alumniProfile.course}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(alumniProfile.id)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(alumniProfile.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="flex items-center space-x-2">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={alumniProfile.isActive}
                      onChange={(e) => handleSave(alumniProfile.id, { isActive: e.target.checked })}
                      className="mr-1"
                    />
                    <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Active
                    </span>
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

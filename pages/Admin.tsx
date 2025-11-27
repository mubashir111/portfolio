import React, { useState } from 'react';
import { AdminLayout } from '../components/AdminLayout';
import { useData } from '../context/DataContext';
import { Button } from '../components/Button';
import { Save, Plus, Trash2, X } from 'lucide-react';

// Subcomponents for the admin sections
const Overview = () => {
    const { data } = useData();
    return (
        <div>
            <h2 className="text-3xl font-bold text-white mb-6">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                    <h3 className="text-slate-400 text-sm uppercase">Total Projects</h3>
                    <p className="text-4xl font-bold text-white mt-2">{data.projects.length}</p>
                </div>
                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                    <h3 className="text-slate-400 text-sm uppercase">Services Listed</h3>
                    <p className="text-4xl font-bold text-white mt-2">{data.services.length}</p>
                </div>
                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                    <h3 className="text-slate-400 text-sm uppercase">Experience Entries</h3>
                    <p className="text-4xl font-bold text-white mt-2">{data.experience.length}</p>
                </div>
            </div>
            <div className="mt-8 bg-slate-800 p-8 rounded-xl border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-4">Welcome back, {data.profile.name}!</h3>
                <p className="text-slate-400">
                    Use the sidebar to manage your portfolio content. Changes are saved locally to your browser.
                    Since this is a client-side demo, clearing your browser cache will reset the data.
                </p>
            </div>
        </div>
    );
};

const ProfileEditor = () => {
    const { data, updateData } = useData();
    const [formData, setFormData] = useState(data.profile);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        updateData({ profile: formData });
        alert('Profile updated!');
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Edit Profile</h2>
                <Button onClick={handleSave}><Save className="w-4 h-4 mr-2" /> Save Changes</Button>
            </div>
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Full Name</label>
                        <input name="name" value={formData.name} onChange={handleChange} className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-white" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Role Title</label>
                        <input name="role" value={formData.role} onChange={handleChange} className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-white" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Email</label>
                        <input name="email" value={formData.email} onChange={handleChange} className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-white" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Phone</label>
                        <input name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-white" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Address</label>
                    <input name="address" value={formData.address} onChange={handleChange} className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-white" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Professional Summary</label>
                    <textarea name="summary" value={formData.summary} onChange={handleChange} rows={4} className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-white" />
                </div>
            </div>
        </div>
    );
};

const ProjectsEditor = () => {
    const { data, updateData } = useData();
    const [projects, setProjects] = useState(data.projects);

    const handleProjectChange = (id: string, field: string, value: string) => {
        setProjects(projects.map(p => p.id === id ? { ...p, [field]: value } : p));
    };

    const deleteProject = (id: string) => {
        if(window.confirm('Are you sure?')) {
            setProjects(projects.filter(p => p.id !== id));
        }
    };

    const addProject = () => {
        const newProject = {
            id: Date.now().toString(),
            title: "New Project",
            description: "Description here...",
            tags: ["New"],
            image: "https://picsum.photos/800/600",
            link: "#"
        };
        setProjects([...projects, newProject]);
    };

    const saveAll = () => {
        updateData({ projects });
        alert('Projects saved!');
    };

    return (
        <div className="space-y-6">
             <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Manage Projects</h2>
                <div className="space-x-2">
                    <Button variant="outline" onClick={addProject}><Plus className="w-4 h-4 mr-2" /> Add Project</Button>
                    <Button onClick={saveAll}><Save className="w-4 h-4 mr-2" /> Save Changes</Button>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-6">
                {projects.map((project) => (
                    <div key={project.id} className="bg-slate-800 p-6 rounded-xl border border-slate-700 relative">
                        <button onClick={() => deleteProject(project.id)} className="absolute top-4 right-4 text-slate-500 hover:text-red-500">
                            <Trash2 size={20} />
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-8">
                            <div>
                                <label className="block text-xs text-slate-500 mb-1">Title</label>
                                <input value={project.title} onChange={(e) => handleProjectChange(project.id, 'title', e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-white text-sm" />
                            </div>
                            <div>
                                <label className="block text-xs text-slate-500 mb-1">Link</label>
                                <input value={project.link} onChange={(e) => handleProjectChange(project.id, 'link', e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-white text-sm" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs text-slate-500 mb-1">Description</label>
                                <textarea value={project.description} onChange={(e) => handleProjectChange(project.id, 'description', e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-white text-sm" rows={2} />
                            </div>
                             <div className="md:col-span-2">
                                <label className="block text-xs text-slate-500 mb-1">Image URL</label>
                                <input value={project.image} onChange={(e) => handleProjectChange(project.id, 'image', e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-white text-sm" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Main Admin Routing Component (Simple Conditional Rendering based on path for this demo)
export const AdminDashboard: React.FC = () => {
    // In a real app with nested routes, this would use <Outlet>
    // Here we will just use window.location.hash or a simple prop if we had routing fully set up for sub-components
    // But since we are using HashRouter in App.tsx, let's just make this render the correct sub-component
    const path = window.location.hash.replace('#/admin', '');
    
    // Simple internal router for the admin section
    let content;
    if (path === '' || path === '/') content = <Overview />;
    else if (path === '/profile') content = <ProfileEditor />;
    else if (path === '/projects') content = <ProjectsEditor />;
    else content = <div className="text-center py-20 text-slate-500">Section under construction (Services/Experience/Testimonials editors follow same pattern as Projects)</div>;

    return (
        <AdminLayout>
            {content}
        </AdminLayout>
    );
};
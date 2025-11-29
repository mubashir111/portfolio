import React, { useState } from 'react';
import { AdminLayout } from '../components/AdminLayout';
import { useData } from '../context/DataContext';
import { Button } from '../components/Button';
import { Save, Plus, Trash2, Edit2, AlertTriangle, ExternalLink } from 'lucide-react';

// --- Subcomponents ---

const Overview = () => {
    const { data } = useData();
    return (
        <div>
            <h2 className="text-3xl font-bold text-white mb-6">Dashboard Overview</h2>
            
            {/* Action Required Alert */}
            <div className="bg-brand-900/20 border border-brand-500/50 p-4 rounded-xl flex items-start space-x-3 mb-8">
                <AlertTriangle className="text-brand-400 shrink-0 mt-1" />
                <div>
                    <h3 className="text-brand-400 font-bold">Important: Activate Email Form</h3>
                    <p className="text-brand-200/80 text-sm mt-1">
                        To receive messages at <strong>{data.profile.email}</strong>, you must fill out the contact form on your website once. 
                        You will receive an email from <em>FormSubmit</em> asking you to confirm your email address. 
                        Messages will not arrive until you do this.
                    </p>
                    <a href="/#contact" target="_blank" className="text-white text-sm underline mt-2 inline-block">Go to Contact Form</a>
                </div>
            </div>

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
                    If you clear your cache or switch devices, these changes will be reset to default.
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

    const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ 
            ...formData, 
            socials: { ...formData.socials, [e.target.name]: e.target.value } 
        });
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
                        <label className="block text-sm font-medium text-slate-400 mb-1">Email (for Contact Form)</label>
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
                
                <div className="pt-4 border-t border-slate-700">
                    <h3 className="text-white font-medium mb-3">Social Links</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">GitHub URL</label>
                            <input name="github" value={formData.socials.github || ''} onChange={handleSocialChange} className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-white" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">LinkedIn URL</label>
                            <input name="linkedin" value={formData.socials.linkedin || ''} onChange={handleSocialChange} className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-white" />
                        </div>
                    </div>
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

    const handleTagsChange = (id: string, value: string) => {
        const tags = value.split(',').map(t => t.trim());
        setProjects(projects.map(p => p.id === id ? { ...p, tags } : p));
    };

    const deleteProject = (id: string) => {
        if(window.confirm('Are you sure you want to delete this project?')) {
            setProjects(projects.filter(p => p.id !== id));
        }
    };

    const addProject = () => {
        const newProject = {
            id: Date.now().toString(),
            title: "New Project Title",
            description: "Describe the project here...",
            tags: ["Web", "React"],
            image: "https://picsum.photos/seed/new/800/600",
            link: "https://example.com"
        };
        setProjects([newProject, ...projects]);
    };

    const saveAll = () => {
        updateData({ projects });
        alert('Projects saved successfully!');
    };

    return (
        <div className="space-y-6">
             <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Manage Projects</h2>
                <div className="space-x-2">
                    <Button variant="outline" onClick={addProject}><Plus className="w-4 h-4 mr-2" /> Add New</Button>
                    <Button onClick={saveAll}><Save className="w-4 h-4 mr-2" /> Save Changes</Button>
                </div>
            </div>
            <div className="space-y-6">
                {projects.map((project) => (
                    <div key={project.id} className="bg-slate-800 p-6 rounded-xl border border-slate-700 relative group">
                        <button onClick={() => deleteProject(project.id)} className="absolute top-4 right-4 text-slate-500 hover:text-red-500 p-2">
                            <Trash2 size={20} />
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pr-10">
                            <div>
                                <label className="block text-xs text-slate-400 mb-1">Project Title</label>
                                <input value={project.title} onChange={(e) => handleProjectChange(project.id, 'title', e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-white text-sm" />
                                
                                <label className="block text-xs text-slate-400 mt-3 mb-1">Live Link</label>
                                <input value={project.link} onChange={(e) => handleProjectChange(project.id, 'link', e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-white text-sm" />

                                <label className="block text-xs text-slate-400 mt-3 mb-1">Tags (comma separated)</label>
                                <input value={project.tags.join(', ')} onChange={(e) => handleTagsChange(project.id, e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-white text-sm" />
                            </div>
                            <div>
                                <label className="block text-xs text-slate-400 mb-1">Description</label>
                                <textarea value={project.description} onChange={(e) => handleProjectChange(project.id, 'description', e.target.value)} className="w-full h-24 bg-slate-900 border border-slate-600 rounded p-2 text-white text-sm resize-none" />
                                
                                <label className="block text-xs text-slate-400 mt-3 mb-1">Image URL</label>
                                <div className="flex gap-2">
                                    <input value={project.image} onChange={(e) => handleProjectChange(project.id, 'image', e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-white text-sm" />
                                    <a href={project.image} target="_blank" rel="noreferrer" className="p-2 bg-slate-700 rounded text-slate-300 hover:text-white"><ExternalLink size={16}/></a>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ServicesEditor = () => {
    const { data, updateData } = useData();
    const [services, setServices] = useState(data.services);

    const handleChange = (id: string, field: string, value: string) => {
        setServices(services.map(s => s.id === id ? { ...s, [field]: value } : s));
    };

    const deleteService = (id: string) => {
        if(window.confirm('Delete this service?')) {
            setServices(services.filter(s => s.id !== id));
        }
    };

    const addService = () => {
        const newService = {
            id: Date.now().toString(),
            title: "New Service",
            description: "Service description...",
            icon: "Code"
        };
        setServices([...services, newService]);
    };

    const saveAll = () => {
        updateData({ services });
        alert('Services saved successfully!');
    };

    return (
        <div className="space-y-6">
             <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Manage Services</h2>
                <div className="space-x-2">
                    <Button variant="outline" onClick={addService}><Plus className="w-4 h-4 mr-2" /> Add Service</Button>
                    <Button onClick={saveAll}><Save className="w-4 h-4 mr-2" /> Save Changes</Button>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-6">
                {services.map((service) => (
                    <div key={service.id} className="bg-slate-800 p-6 rounded-xl border border-slate-700 relative">
                        <button onClick={() => deleteService(service.id)} className="absolute top-4 right-4 text-slate-500 hover:text-red-500">
                            <Trash2 size={20} />
                        </button>
                        <div className="space-y-4 pr-8">
                            <div>
                                <label className="block text-xs text-slate-400 mb-1">Service Title</label>
                                <input value={service.title} onChange={(e) => handleChange(service.id, 'title', e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-white" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs text-slate-400 mb-1">Icon Name (Lucide React)</label>
                                    <input value={service.icon} onChange={(e) => handleChange(service.id, 'icon', e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-white" placeholder="e.g. Code, Globe, Database" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs text-slate-400 mb-1">Description</label>
                                <textarea value={service.description} onChange={(e) => handleChange(service.id, 'description', e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-white" rows={2} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ExperienceEditor = () => {
    const { data, updateData } = useData();
    const [experience, setExperience] = useState(data.experience);

    const handleChange = (id: string, field: string, value: string) => {
        setExperience(experience.map(e => e.id === id ? { ...e, [field]: value } : e));
    };

    const handleDescChange = (id: string, value: string) => {
        // Split by newline to create array
        const descriptionArray = value.split('\n').filter(line => line.trim() !== '');
        setExperience(experience.map(e => e.id === id ? { ...e, description: descriptionArray } : e));
    };

    const deleteExp = (id: string) => {
        if(window.confirm('Remove this experience entry?')) {
            setExperience(experience.filter(e => e.id !== id));
        }
    };

    const addExp = () => {
        const newExp = {
            id: Date.now().toString(),
            company: "Company Name",
            role: "Job Title",
            period: "2024 - Present",
            description: ["Responsibility 1"]
        };
        setExperience([newExp, ...experience]);
    };

    const saveAll = () => {
        updateData({ experience });
        alert('Experience saved successfully!');
    };

    return (
        <div className="space-y-6">
             <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Manage Experience</h2>
                <div className="space-x-2">
                    <Button variant="outline" onClick={addExp}><Plus className="w-4 h-4 mr-2" /> Add Job</Button>
                    <Button onClick={saveAll}><Save className="w-4 h-4 mr-2" /> Save Changes</Button>
                </div>
            </div>
            <div className="space-y-6">
                {experience.map((exp) => (
                    <div key={exp.id} className="bg-slate-800 p-6 rounded-xl border border-slate-700 relative">
                        <button onClick={() => deleteExp(exp.id)} className="absolute top-4 right-4 text-slate-500 hover:text-red-500">
                            <Trash2 size={20} />
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-8">
                            <div>
                                <label className="block text-xs text-slate-400 mb-1">Company</label>
                                <input value={exp.company} onChange={(e) => handleChange(exp.id, 'company', e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-white" />
                            </div>
                            <div>
                                <label className="block text-xs text-slate-400 mb-1">Role</label>
                                <input value={exp.role} onChange={(e) => handleChange(exp.id, 'role', e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-white" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs text-slate-400 mb-1">Period</label>
                                <input value={exp.period} onChange={(e) => handleChange(exp.id, 'period', e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-white" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs text-slate-400 mb-1">Description (One point per line)</label>
                                <textarea 
                                    value={exp.description.join('\n')} 
                                    onChange={(e) => handleDescChange(exp.id, e.target.value)} 
                                    className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-white font-mono text-sm" 
                                    rows={5} 
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const TestimonialsEditor = () => {
    const { data, updateData } = useData();
    const [testimonials, setTestimonials] = useState(data.testimonials);

    const handleChange = (id: string, field: string, value: string) => {
        setTestimonials(testimonials.map(t => t.id === id ? { ...t, [field]: value } : t));
    };

    const deleteTestimonial = (id: string) => {
        if(window.confirm('Delete this testimonial?')) {
            setTestimonials(testimonials.filter(t => t.id !== id));
        }
    };

    const addTestimonial = () => {
        const newTestimonial = {
            id: Date.now().toString(),
            name: "Client Name",
            role: "Client Role",
            company: "Company",
            text: "Feedback text...",
            avatar: "https://picsum.photos/100/100"
        };
        setTestimonials([...testimonials, newTestimonial]);
    };

    const saveAll = () => {
        updateData({ testimonials });
        alert('Testimonials saved successfully!');
    };

    return (
        <div className="space-y-6">
             <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Manage Testimonials</h2>
                <div className="space-x-2">
                    <Button variant="outline" onClick={addTestimonial}><Plus className="w-4 h-4 mr-2" /> Add New</Button>
                    <Button onClick={saveAll}><Save className="w-4 h-4 mr-2" /> Save Changes</Button>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-6">
                {testimonials.map((t) => (
                    <div key={t.id} className="bg-slate-800 p-6 rounded-xl border border-slate-700 relative">
                        <button onClick={() => deleteTestimonial(t.id)} className="absolute top-4 right-4 text-slate-500 hover:text-red-500">
                            <Trash2 size={20} />
                        </button>
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="shrink-0">
                                <img src={t.avatar} alt="Avatar" className="w-16 h-16 rounded-full border border-slate-600 mb-2" />
                                <input 
                                    value={t.avatar} 
                                    onChange={(e) => handleChange(t.id, 'avatar', e.target.value)} 
                                    className="w-32 bg-slate-900 border border-slate-600 rounded p-1 text-xs text-white" 
                                    placeholder="Image URL"
                                />
                            </div>
                            <div className="flex-1 space-y-3">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    <input value={t.name} onChange={(e) => handleChange(t.id, 'name', e.target.value)} className="bg-slate-900 border border-slate-600 rounded p-2 text-white text-sm" placeholder="Name" />
                                    <input value={t.role} onChange={(e) => handleChange(t.id, 'role', e.target.value)} className="bg-slate-900 border border-slate-600 rounded p-2 text-white text-sm" placeholder="Role" />
                                    <input value={t.company} onChange={(e) => handleChange(t.id, 'company', e.target.value)} className="bg-slate-900 border border-slate-600 rounded p-2 text-white text-sm" placeholder="Company" />
                                </div>
                                <textarea value={t.text} onChange={(e) => handleChange(t.id, 'text', e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-white text-sm" rows={3} placeholder="Testimonial text..." />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- Main Admin Router Component ---

export const AdminDashboard: React.FC = () => {
    // Hash-based routing manually handling the sub-routes for the admin panel
    // Logic: Remove '#/admin' from the hash to get the sub-path
    const hash = window.location.hash;
    const path = hash.replace('#/admin', '');
    
    let content;
    
    // Switch on the sub-path
    switch (true) {
        case path === '' || path === '/':
            content = <Overview />;
            break;
        case path === '/profile':
            content = <ProfileEditor />;
            break;
        case path === '/services':
            content = <ServicesEditor />;
            break;
        case path === '/experience':
            content = <ExperienceEditor />;
            break;
        case path === '/projects':
            content = <ProjectsEditor />;
            break;
        case path === '/testimonials':
            content = <TestimonialsEditor />;
            break;
        default:
            // Fallback for unknown routes
            content = <Overview />;
    }

    return (
        <AdminLayout>
            {content}
        </AdminLayout>
    );
};
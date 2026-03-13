/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Smartphone, 
  Code, 
  Layout, 
  Server,
  Github,
  Twitter,
  Linkedin,
  Instagram
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const TABS = ['My Work', 'Projects', 'Resume'];

export default function App() {
  const [activeTab, setActiveTab] = useState('My Work');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 lg:p-12">
      <div className="max-w-7xl w-full flex flex-col lg:flex-row gap-6 items-start">
        
        {/* Sidebar */}
        <aside className="w-full lg:w-[300px] bg-[#1e1e1f] border border-[#383838] rounded-3xl p-8 flex flex-col items-center sticky top-12">
          <div className="relative mb-6">
            <div className="w-32 h-32 bg-[#383838] rounded-3xl overflow-hidden flex items-center justify-center">
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aakash&backgroundColor=383838" 
                alt="Avatar" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 border-2 border-[#1e1e1f] rounded-full"></div>
          </div>

          <h1 className="text-2xl font-semibold text-white mb-2 text-center">Sergio Garcia</h1>
          <div className="bg-[#2b2b2c] text-xs font-medium px-4 py-1.5 rounded-lg text-white/90 mb-8">
            Manufacturing Engineering Student
          </div>

          <div className="w-full h-px bg-[#383838] mb-8"></div>

          <div className="w-full space-y-6">
            <ContactItem 
              icon={<Mail size={18} className="text-[#a3e635]" />} 
              label="EMAIL" 
              value="sergio.garcia02@utrgv.edu" 
            />
            <ContactItem 
              icon={<Phone size={18} className="text-[#a3e635]" />} 
              label="PHONE" 
              value="(956) 369-7743" 
            />
            <ContactItem 
              icon={<MapPin size={18} className="text-[#a3e635]" />} 
              label="LOCATION" 
              value="Edinburg, TX" 
            />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-[#1e1e1f] border border-[#383838] rounded-3xl relative overflow-hidden min-h-[800px] w-full">
          
          {/* Navigation */}
          <nav className="absolute top-0 right-0 bg-[#2b2b2c] border-b border-l border-[#383838] rounded-bl-3xl px-8 py-4 z-10 hidden md:block">
            <ul className="flex gap-8">
              {TABS.map(tab => (
                <li key={tab}>
                  <button 
                    onClick={() => setActiveTab(tab)}
                    className={`text-sm font-medium transition-colors ${activeTab === tab ? 'text-[#a3e635]' : 'text-white/60 hover:text-white/80'}`}
                  >
                    {tab}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden bg-[#2b2b2c] border-b border-[#383838] p-4 flex justify-around overflow-x-auto">
             {TABS.map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-xs font-medium px-3 py-1 rounded-full transition-colors ${activeTab === tab ? 'bg-[#383838] text-[#a3e635]' : 'text-white/60'}`}
                >
                  {tab}
                </button>
              ))}
          </div>

          <div className="p-8 md:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'Resume' && <ResumeSection />}
                {activeTab === 'Projects' && <ProjectsSection />}
                {activeTab === 'My Work' && <MyWorkSection onImageClick={setSelectedImage} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.img 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={selectedImage} 
              alt="Full size" 
              className="max-w-full max-h-full rounded-lg shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ContactItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 bg-[#2b2b2c] border border-[#383838] rounded-xl flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div className="overflow-hidden">
        <p className="text-[10px] text-white/40 font-semibold tracking-wider">{label}</p>
        <p className="text-sm text-white/90 truncate">{value}</p>
      </div>
    </div>
  );
}

function SocialIcon({ icon, href = "#" }: { icon: React.ReactNode, href?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#ffdb70] transition-colors">
      {icon}
    </a>
  );
}

function TimelineItem({ title, subtitle, date, location, description, points }: { 
  title: string, 
  subtitle: string, 
  date: string, 
  location?: string, 
  description?: string,
  points?: string[]
}) {
  return (
    <div className="relative pl-8 pb-2">
      <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 bg-[#a3e635] rounded-full border-2 border-[#1e1e1f] z-10 shadow-[0_0_0_4px_#383838]"></div>
      <h4 className="text-white font-bold mb-1">{title}</h4>
      <p className="text-[#a3e635] text-sm font-medium mb-1">{subtitle}</p>
      <p className="text-[#a3e635] text-xs font-semibold mb-2">{date}</p>
      {location && <p className="text-white/40 text-xs italic mb-2">{location}</p>}
      {description && <p className="text-white/60 text-sm leading-relaxed">{description}</p>}
      {points && (
        <ul className="space-y-2 mt-3">
          {points.map((point, i) => (
            <li key={i} className="text-white/60 text-sm leading-relaxed flex gap-2">
              <span className="text-[#a3e635]">•</span>
              {point}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function SkillCategory({ title, skills }: { title: string, skills: string }) {
  return (
    <div className="bg-[#2b2b2c] border border-[#383838] p-4 rounded-xl">
      <h4 className="text-[#a3e635] text-sm font-bold mb-1 uppercase tracking-wider">{title}</h4>
      <p className="text-white/70 text-sm">{skills}</p>
    </div>
  );
}

function ResumeSection() {
  return (
    <section>
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white mb-4">Resume</h2>
          <div className="w-10 h-1.5 bg-[#a3e635] rounded-full"></div>
        </div>
      </header>

      <div className="space-y-12">
        <div>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-[#2b2b2c] border border-[#383838] rounded-xl flex items-center justify-center text-[#a3e635]">
              <Code size={24} />
            </div>
            <h3 className="text-2xl font-bold text-white">Education</h3>
          </div>

          <div className="ml-6 border-l border-[#383838] space-y-10">
            <TimelineItem 
              title="University of Texas Rio Grande Valley"
              subtitle="Bachelor of Science in Manufacturing Engineering (ABET Accredited)"
              date="Expected May 2026"
              location="Edinburg, TX"
              description="HSF Scholar (Hispanic Scholarship Fund)"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-[#2b2b2c] border border-[#383838] rounded-xl flex items-center justify-center text-[#a3e635]">
              <Code size={24} />
            </div>
            <h3 className="text-2xl font-bold text-white">Experience</h3>
          </div>

          <div className="ml-6 border-l border-[#383838] space-y-10">
            <TimelineItem 
              title="Research Assistant"
              subtitle="University of Texas Rio Grande Valley"
              date="Aug 2025 — Present"
              location="Edinburg, TX"
              description="Senior Capstone Project Sponsored by Los Alamos National Lab & Savannah River Nuclear Solutions"
              points={[
                "Developed 5-DOF automated pick-and-place system with 1 kg rated payload for glovebox manufacturing operations",
                "Collaborated on link sizing using Excel kinematics model to optimize reach and payload capacity",
                "Integrated Arduino-based control enabling manual GUI control and pre-programmed motion sequences",
                "Applied GD&T to robotic components and assemblies to support manufacturing and fabrication documentation",
                "Designed manufacturable robot architecture using DFM and DFA principles for scalable production",
                "Designed 3-tier electronics enclosure housing power supply, control hardware, and cable management"
              ]}
            />
            <TimelineItem 
              title="Division Lead, Marketing & Special Events"
              subtitle="City of McAllen"
              date="May 2022 — Nov 2024"
              location="McAllen, TX"
              points={[
                "Coordinated cross-functional teams delivering 8 regional events reaching 314K+ attendees annually",
                "Implemented process tracking systems and SOPs supporting continuous improvement initiatives",
                "Produced technical drawings and specifications for race medals supporting vendor bidding and procurement",
                "Led teams of 20+ staff improving processes and logistics and received the City of McAllen Innovation Award"
              ]}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-[#2b2b2c] border border-[#383838] rounded-xl flex items-center justify-center text-[#a3e635]">
              <Code size={24} />
            </div>
            <h3 className="text-2xl font-bold text-white">Leadership</h3>
          </div>

          <div className="ml-6 border-l border-[#383838] space-y-10">
            <TimelineItem 
              title="Marketing Chair"
              subtitle="Society of Hispanic Professional Engineers (SHPE)"
              date="Present"
              description="Led branding initiatives and developed promotional materials to increase SHPE engagement and chapter visibility"
            />
            <TimelineItem 
              title="Mentor"
              subtitle="MentorSHPE, Society of Hispanic Professional Engineers"
              date="Present"
              description="Serve as a MentorSHPE mentor, delivering structured career and STEM development guidance to mentees"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-[#2b2b2c] border border-[#383838] rounded-xl flex items-center justify-center text-[#a3e635]">
              <Code size={24} />
            </div>
            <h3 className="text-2xl font-bold text-white">Technical Skills</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ml-6">
            <SkillCategory title="CAD & Simulation" skills="Creo, SolidWorks, Siemens NX, Inventor, Onshape, GD&T" />
            <SkillCategory title="Manufacturing" skills="CNC Machining, 3D Printing, SPC, Continuous Improvement, SOPs" />
            <SkillCategory title="Programming" skills="C++, Python, Arduino IDE, API Integration, JavaScript, VBA" />
            <SkillCategory title="Robotics" skills="Pick-and-Place, End-Effectors, Pneumatics, Actuator Integration" />
          </div>
        </div>
      </div>
    </section>
  );
}

function MyWorkSection({ onImageClick }: { onImageClick: (src: string) => void }) {
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Engineering', 'Creative', 'Management'];
  
  // List your filenames here. The code will automatically categorize them!
  const imageFiles = [
    '1.e.webp', '2.e.webp', '3.e.webp', '4.e.webp', '5.e.webp',
    '6.e.webp', '7.e.webp', '8.e.webp', '9.e.webp', '10.e.webp',
    '11.c.webp', '12.c.webp', '13.c.webp', '14.c.webp', '15.c.webp',
    '16.m.webp', '17.m.webp', '18.m.webp', '19.m.webp', '20.m.webp'
  ];

  const photos = imageFiles.map(filename => {
    const parts = filename.split('.');
    const code = parts[1]; // Get the 'e', 'c', or 'm'
    
    let category = 'Engineering';
    if (code === 'c') category = 'Creative';
    if (code === 'm') category = 'Management';
    
    return {
      category,
      image: `/images/${filename}`
    };
  });

  const filteredPhotos = filter === 'All' ? photos : photos.filter(p => p.category === filter);

  return (
    <section>
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">My Work</h2>
        <div className="w-10 h-1.5 bg-[#a3e635] rounded-full mb-6"></div>
        <p className="text-white/70 leading-relaxed">
          I am a Manufacturing Engineering student at the University of Texas Rio Grande Valley, specializing in robotics, 
          automated systems, and production analysis. My experience ranges from developing 5-DOF automated pick-and-place 
          systems for nuclear research facilities to leading large-scale event operations. With a strong foundation in CAD/Simulation (Creo, SolidWorks), 
          manufacturing processes, and programming (C++, Python), I am passionate about optimizing industrial workflows and designing scalable robotic architectures. 
          I am currently serving as a Research Assistant and an HSF Scholar, committed to driving innovation in engineering.
        </p>
      </header>

      <div className="flex gap-6 mb-10 overflow-x-auto pb-2">
        {filters.map(f => (
          <button 
            key={f}
            onClick={() => setFilter(f)}
            className={`text-sm font-medium transition-colors whitespace-nowrap ${filter === f ? 'text-[#a3e635]' : 'text-white/60 hover:text-white/80'}`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-1 md:gap-2">
        {filteredPhotos.map((photo, i) => (
          <motion.div 
            key={i}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="group cursor-pointer relative aspect-[3/4] bg-[#2b2b2c] overflow-hidden"
            onClick={() => onImageClick(photo.image)}
          >
            <img 
              src={photo.image} 
              alt="Work" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ProjectsSection() {
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

  const projects = [
    { 
      title: '5-DOF Pick-and-Place System', 
      image: 'https://picsum.photos/seed/robot/600/800',
      pdf: '/pdfs/5-dof-system.pdf',
      description: 'Developed a 5-DOF automated pick-and-place system with a 1 kg rated payload for glovebox manufacturing operations.'
    },
    { 
      title: 'House of Blanks Analysis', 
      image: 'https://picsum.photos/seed/factory/600/800',
      pdf: '/pdfs/house-of-blanks.pdf',
      description: 'Production analysis and bottleneck identification for high-volume apparel manufacturing.'
    },
    { 
      title: 'Mobile STEM Innovation Unit', 
      image: 'https://picsum.photos/seed/stem/600/800',
      pdf: '/pdfs/stem-unit.pdf',
      description: 'Mobile outreach trailer concept for interactive engineering activities and STEM education.'
    },
    { 
      title: 'Automotive Systems Mechanics', 
      image: 'https://picsum.photos/seed/car/600/800',
      pdf: '/pdfs/automotive.pdf',
      description: 'Servicing radiator, cooling, and electrical faults using OBD-II tools and mechanical expertise.'
    },
    { title: 'Project 1', image: 'https://picsum.photos/seed/p1/600/800', pdf: '/pdfs/project1.pdf', description: 'Engineering design and analysis project focusing on manufacturing efficiency.' },
    { title: 'Project 2', image: 'https://picsum.photos/seed/p2/600/800', pdf: '/pdfs/project2.pdf', description: 'Robotic integration and control system development for industrial applications.' },
    { title: 'Project 3', image: 'https://picsum.photos/seed/p3/600/800', pdf: '/pdfs/project3.pdf', description: 'CAD modeling and simulation of complex mechanical assemblies.' },
    { title: 'Project 4', image: 'https://picsum.photos/seed/p4/600/800', pdf: '/pdfs/project4.pdf', description: 'Quality control and statistical process analysis for manufacturing lines.' },
    { title: 'Project 5', image: 'https://picsum.photos/seed/p5/600/800', pdf: '/pdfs/project5.pdf', description: 'Sustainable manufacturing processes and material selection research.' },
  ];

  if (selectedPdf) {
    return (
      <section className="h-full flex flex-col">
        <header className="mb-6 flex items-center justify-between">
          <button 
            onClick={() => setSelectedPdf(null)}
            className="text-[#a3e635] text-sm font-medium flex items-center gap-2 hover:underline"
          >
            ← Back to Projects
          </button>
        </header>
        <div className="flex-1 bg-white rounded-2xl overflow-hidden min-h-[600px]">
          <iframe 
            src={selectedPdf} 
            className="w-full h-full border-none"
            title="Project PDF"
          />
        </div>
      </section>
    );
  }

  return (
    <section>
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Projects</h2>
        <div className="w-10 h-1.5 bg-[#a3e635] rounded-full"></div>
      </header>

      <div className="space-y-6">
        {projects.map((project, i) => (
          <motion.div 
            key={i}
            layout
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#2b2b2c] border border-[#383838] rounded-2xl overflow-hidden flex flex-col sm:flex-row cursor-pointer hover:border-[#a3e635]/50 transition-colors group"
            onClick={() => setSelectedPdf(project.pdf)}
          >
            <div className="w-full sm:w-48 aspect-[3/4] shrink-0 overflow-hidden">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            </div>
            <div className="p-6 flex flex-col justify-center">
              <h4 className="text-xl font-bold text-white mb-2 group-hover:text-[#a3e635] transition-colors">{project.title}</h4>
              <p className="text-white/60 text-sm leading-relaxed mb-4">{project.description}</p>
              <div className="text-[#a3e635] text-xs font-bold uppercase tracking-wider">View Full Project →</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}




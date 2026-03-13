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

const TABS = ['Portfolio', 'Resume', 'About'];

export default function App() {
  const [activeTab, setActiveTab] = useState('Portfolio');

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
                {activeTab === 'About' && <AboutSection />}
                {activeTab === 'Resume' && <ResumeSection />}
                {activeTab === 'Portfolio' && <PortfolioSection />}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
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

function AboutSection() {
  return (
    <section>
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">About Me</h2>
        <div className="w-10 h-1.5 bg-[#a3e635] rounded-full"></div>
      </header>

      <div className="space-y-6 text-white/70 leading-relaxed mb-12">
        <p>
          I am a Manufacturing Engineering student at the University of Texas Rio Grande Valley, specializing in robotics, 
          automated systems, and production analysis. My experience ranges from developing 5-DOF automated pick-and-place 
          systems for nuclear research facilities to leading large-scale event operations.
        </p>
        <p>
          With a strong foundation in CAD/Simulation (Creo, SolidWorks), manufacturing processes, and programming (C++, Python), 
          I am passionate about optimizing industrial workflows and designing scalable robotic architectures. I am currently 
          serving as a Research Assistant and an HSF Scholar, committed to driving innovation in engineering.
        </p>
      </div>

      <h3 className="text-2xl font-bold text-white mb-8">What I'm Doing</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <ServiceCard 
          icon={<Smartphone size={32} className="text-[#a3e635]" />}
          title="Robotics & Automation"
          description="Designing and integrating 5-DOF robotic systems and Arduino-based controls for industrial applications."
        />
        <ServiceCard 
          icon={<Code size={32} className="text-[#a3e635]" />}
          title="CAD & Simulation"
          description="Creating manufacturable architectures using Creo, SolidWorks, and Siemens NX with DFM/DFA principles."
        />
        <ServiceCard 
          icon={<Layout size={32} className="text-[#a3e635]" />}
          title="Production Analysis"
          description="Forecasting requirements and identifying bottlenecks through cycle time, WIP, and throughput analysis."
        />
        <ServiceCard 
          icon={<Server size={32} className="text-[#a3e635]" />}
          title="Manufacturing Quality"
          description="Implementing SOPs and continuous improvement initiatives using Statistical Process Control."
        />
      </div>

      <h3 className="text-2xl font-bold text-white mb-8">Technical Skills</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SkillCategory title="CAD & Simulation" skills="Creo, SolidWorks, Siemens NX, Inventor, Onshape, GD&T" />
        <SkillCategory title="Manufacturing" skills="CNC Machining, 3D Printing, SPC, Continuous Improvement, SOPs" />
        <SkillCategory title="Programming" skills="C++, Python, Arduino IDE, API Integration, JavaScript, VBA" />
        <SkillCategory title="Robotics" skills="Pick-and-Place, End-Effectors, Pneumatics, Actuator Integration" />
      </div>
    </section>
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
      </div>
    </section>
  );
}

function PortfolioSection() {
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Robotics', 'Analysis', 'Mechanics'];
  
  const projects = [
    { 
      title: '5-DOF Pick-and-Place System', 
      category: 'Robotics', 
      image: 'https://picsum.photos/seed/robot/400/250',
      description: 'Automated system with 1kg payload for glovebox manufacturing operations.'
    },
    { 
      title: 'House of Blanks Analysis', 
      category: 'Analysis', 
      image: 'https://picsum.photos/seed/factory/400/250',
      description: 'Production analysis and bottleneck identification for high-volume apparel.'
    },
    { 
      title: 'Mobile STEM Innovation Unit', 
      category: 'Robotics', 
      image: 'https://picsum.photos/seed/stem/400/250',
      description: 'Mobile outreach trailer concept for interactive engineering activities.'
    },
    { 
      title: 'Automotive Systems Mechanics', 
      category: 'Mechanics', 
      image: 'https://picsum.photos/seed/car/400/250',
      description: 'Servicing radiator, cooling, and electrical faults using OBD-II tools.'
    },
  ];

  const filteredProjects = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  return (
    <section>
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Engineering Projects</h2>
        <div className="w-10 h-1.5 bg-[#a3e635] rounded-full"></div>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, i) => (
          <motion.div 
            key={project.title}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="group cursor-pointer"
          >
            <div className="relative aspect-[4/3] bg-[#2b2b2c] rounded-2xl overflow-hidden mb-4">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-6 text-center">
                <p className="text-white text-sm">{project.description}</p>
              </div>
            </div>
            <h4 className="text-white font-semibold mb-1">{project.title}</h4>
            <p className="text-sm text-white/40">{project.category}</p>
          </motion.div>
        ))}
      </div>
    </section>
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

function ServiceCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-[#2b2b2c] border border-[#383838] p-6 rounded-2xl flex gap-5 items-start">
      <div className="shrink-0 mt-1">{icon}</div>
      <div>
        <h4 className="text-lg font-bold text-white mb-2">{title}</h4>
        <p className="text-sm text-white/60 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function SkillIcon({ src }: { src: string }) {
  return (
    <div className="w-20 h-20 bg-[#2b2b2c] border border-[#383838] rounded-2xl flex items-center justify-center p-4 hover:scale-105 transition-transform cursor-pointer">
      <img src={src} alt="Skill" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
    </div>
  );
}

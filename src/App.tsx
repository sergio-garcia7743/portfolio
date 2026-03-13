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

          <h1 className="text-2xl font-semibold text-white mb-2 text-center">Aakash Rajbanshi</h1>
          <div className="bg-[#2b2b2c] text-xs font-medium px-4 py-1.5 rounded-lg text-white/90 mb-8">
            Software Developer
          </div>

          <div className="w-full h-px bg-[#383838] mb-8"></div>

          <div className="w-full space-y-6">
            <ContactItem 
              icon={<Mail size={18} className="text-[#ffdb70]" />} 
              label="EMAIL" 
              value="aakashrajbanshi58@..." 
            />
            <ContactItem 
              icon={<Phone size={18} className="text-[#ffdb70]" />} 
              label="PHONE" 
              value="+977 9812345678" 
            />
            <ContactItem 
              icon={<MapPin size={18} className="text-[#ffdb70]" />} 
              label="LOCATION" 
              value="Kathmandu, Nepal" 
            />
          </div>

          <div className="flex gap-4 mt-10">
            <SocialIcon icon={<Github size={18} />} />
            <SocialIcon icon={<Twitter size={18} />} />
            <SocialIcon icon={<Linkedin size={18} />} />
            <SocialIcon icon={<Instagram size={18} />} />
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
                    className={`text-sm font-medium transition-colors ${activeTab === tab ? 'text-[#ffdb70]' : 'text-white/60 hover:text-white/80'}`}
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
                  className={`text-xs font-medium px-3 py-1 rounded-full transition-colors ${activeTab === tab ? 'bg-[#383838] text-[#ffdb70]' : 'text-white/60'}`}
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

function SocialIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <a href="#" className="text-white/40 hover:text-[#ffdb70] transition-colors">
      {icon}
    </a>
  );
}

function AboutSection() {
  return (
    <section>
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">About Me</h2>
        <div className="w-10 h-1.5 bg-[#ffdb70] rounded-full"></div>
      </header>

      <div className="space-y-6 text-white/70 leading-relaxed mb-12">
        <p>
          A passionate Flutter developer with strong expertise in cross-platform apps, REST APIs, UI/UX, widgets, and state 
          management solutions. Proven track record in delivering cutting-edge solutions, including API integration, third-party 
          libraries, and performance optimization. Adept at debugging to ensure high-quality, responsive apps and An agile 
          collaborator committed to staying current with industry trends.
        </p>
        <p>
          If you're seeking a skilled Flutter developer to breathe life into your project and exceed your expectations, I am here to 
          collaborate and create magic together. Reach out, and let's transform your vision into a reality!
        </p>
      </div>

      <h3 className="text-2xl font-bold text-white mb-8">What I'm Doing</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <ServiceCard 
          icon={<Smartphone size={32} className="text-[#ffdb70]" />}
          title="Mobile Apps"
          description="Professional development of applications for Android and ios."
        />
        <ServiceCard 
          icon={<Code size={32} className="text-[#ffdb70]" />}
          title="Web Development"
          description="High-quality development of sites at the professional level."
        />
        <ServiceCard 
          icon={<Layout size={32} className="text-[#ffdb70]" />}
          title="UI/UX Design"
          description="The most modern and high-quality design made at a professional level."
        />
        <ServiceCard 
          icon={<Server size={32} className="text-[#ffdb70]" />}
          title="Backend Development"
          description="High-performance backend services designed for scalability and seamless user experience."
        />
      </div>

      <h3 className="text-2xl font-bold text-white mb-8">Skills</h3>
      <div className="flex flex-wrap gap-6">
        <SkillIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" />
        <SkillIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg" />
        <SkillIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" />
        <SkillIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" />
        <SkillIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" />
      </div>
    </section>
  );
}

function ResumeSection() {
  return (
    <section>
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white mb-4">Resume</h2>
          <div className="w-10 h-1.5 bg-[#ffdb70] rounded-full"></div>
        </div>
        <button className="bg-[#2b2b2c] border border-[#383838] text-[#ffdb70] px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-[#383838] transition-colors text-sm font-medium">
          <Smartphone size={18} />
          Download CV
        </button>
      </header>

      <div className="space-y-12">
        <div>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-[#2b2b2c] border border-[#383838] rounded-xl flex items-center justify-center text-[#ffdb70]">
              <Code size={24} />
            </div>
            <h3 className="text-2xl font-bold text-white">Education</h3>
          </div>

          <div className="ml-6 border-l border-[#383838] space-y-10">
            <TimelineItem 
              title="Nihareeka College Of Management And Information Technology"
              subtitle="Bachelor of Science in Computer Science and Information Technology (B.Sc. CSIT)"
              date="2017 — 2021"
            />
            <TimelineItem 
              title="Greenland International College"
              subtitle="+2 Science"
              date="2015 — 2017"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-[#2b2b2c] border border-[#383838] rounded-xl flex items-center justify-center text-[#ffdb70]">
              <Code size={24} />
            </div>
            <h3 className="text-2xl font-bold text-white">Experience</h3>
          </div>

          <div className="ml-6 border-l border-[#383838] space-y-10">
            <TimelineItem 
              title="Flutter Developer"
              subtitle="Adzen Tech Pvt. Ltd"
              date="Feb, 2025 — Present • 1 yr 1 mo"
              location="Kathmandu, Nepal"
              description="Responsible for designing and developing mobile applications using Flutter."
            />
            <TimelineItem 
              title="Mid-Level Flutter Developer"
              subtitle="Tokma Technologies"
              date="Aug, 2024 — Feb, 2025 • 6 mo"
              location="Kathmandu, Nepal"
              points={[
                "Developed new features and implemented UI designs into code using Flutter.",
                "Designed and created custom e-form features including scrolling features and data entries.",
                "Integrated Google and Facebook sign-in for user authentication.",
                "Designed dynamic functionalities using the BLOC design pattern.",
                "Integrated APIs for seamless data communication and backend functionality.",
                "Implemented payment gateway integration like Khalti for secure transactions.",
                "Collaborated with other developers and backend team to deliver features.",
                "Participated in team meetings to discuss new features and project updates.",
                "Ensured smooth functionality and user-friendly experiences throughout the app.",
                "Performed code review and deployed the app in Playstore and Appstore."
              ]}
            />
            <TimelineItem 
              title="Flutter Developer"
              subtitle="Inflancer Technology"
              date="Oct, 2022 — Aug, 2024 • 1 yr 10 mo"
              location="Kathmandu, Nepal"
              points={[
                "Developed new features and transformed UI designs into fully functional user interfaces.",
                "Integrated payment solution like eSewa, for secure and seamless transactions.",
                "Optimized application performance to ensure a smooth and engaging user experience.",
                "Supported other team members initiatives by developing solutions to common problems and sharing those solutions.",
                "Identified and resolved bugs, improving app stability and performance.",
                "Wrote clean, maintainable, and testable code following best practices.",
                "Utilization of latest version of support libraries to ensure backend compatibility.",
                "Integrated payment solution like eSewa, for secure and seamless transactions.",
                "Collaborated with backend developers, designers, and cross-functional teams to deliver scalable, high-quality solutions.",
                "Performed code review and deployed the app in Playstore and Appstore."
              ]}
            />
            <TimelineItem 
              title="Flutter Developer Intern"
              subtitle="YAJ Tech Pvt. Ltd"
              date="May, 2022 — Sep, 2022 • 4 mo"
              location="Kathmandu, Nepal"
              points={[
                "Assisted in developing and maintaining Flutter applications, ensuring seamless functionality and user-friendly interfaces.",
                "Supported the implementation of visually appealing UI designs that aligned with client requirements and design principles.",
                "Collaborated with cross-functional teams, including back-end developers and designers, to deliver efficient, high-quality, and scalable solutions.",
                "Gained hands-on experience in debugging, troubleshooting, and refining app features to improve user experience."
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function PortfolioSection() {
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Applications', 'Web development', 'UI/UX'];
  
  const projects = [
    { title: 'Nagarik App', category: 'Applications', image: 'https://picsum.photos/seed/nagarik/400/250' },
    { title: 'Ambition Guru', category: 'Applications', image: 'https://picsum.photos/seed/ambition/400/250' },
    { title: 'Sociair', category: 'Applications', image: 'https://picsum.photos/seed/sociair/400/250' },
    { title: 'Tokma', category: 'Applications', image: 'https://picsum.photos/seed/tokma/400/250' },
    { title: 'Saara', category: 'Applications', image: 'https://picsum.photos/seed/saara/400/250' },
    { title: 'Ifood', category: 'Applications', image: 'https://picsum.photos/seed/ifood/400/250' },
    { title: 'MeroDate', category: 'Applications', image: 'https://picsum.photos/seed/merodate/400/250' },
    { title: 'Weather App', category: 'Applications', image: 'https://picsum.photos/seed/weather/400/250' },
    { title: 'Music App', category: 'Applications', image: 'https://picsum.photos/seed/music/400/250' },
  ];

  const filteredProjects = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  return (
    <section>
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Portfolio</h2>
        <div className="w-10 h-1.5 bg-[#ffdb70] rounded-full"></div>
      </header>

      <div className="flex gap-6 mb-10 overflow-x-auto pb-2">
        {filters.map(f => (
          <button 
            key={f}
            onClick={() => setFilter(f)}
            className={`text-sm font-medium transition-colors whitespace-nowrap ${filter === f ? 'text-[#ffdb70]' : 'text-white/60 hover:text-white/80'}`}
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
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-12 h-12 bg-[#383838] rounded-xl flex items-center justify-center text-[#ffdb70]">
                  <Smartphone size={20} />
                </div>
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
      <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 bg-[#ffdb70] rounded-full border-2 border-[#1e1e1f] z-10 shadow-[0_0_0_4px_#383838]"></div>
      <h4 className="text-white font-bold mb-1">{title}</h4>
      <p className="text-[#ffdb70] text-sm font-medium mb-1">{subtitle}</p>
      <p className="text-[#ffdb70] text-xs font-semibold mb-2">{date}</p>
      {location && <p className="text-white/40 text-xs italic mb-2">{location}</p>}
      {description && <p className="text-white/60 text-sm leading-relaxed">{description}</p>}
      {points && (
        <ul className="space-y-2 mt-3">
          {points.map((point, i) => (
            <li key={i} className="text-white/60 text-sm leading-relaxed flex gap-2">
              <span className="text-[#ffdb70]">•</span>
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

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

const TABS = ['About', 'Resume', 'Portfolio', 'Blog', 'Contact'];

export default function App() {
  const [activeTab, setActiveTab] = useState('About');

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
                {activeTab !== 'About' && (
                  <div className="flex flex-col items-center justify-center h-[500px] text-white/40 italic">
                    <p>{activeTab} section coming soon...</p>
                  </div>
                )}
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

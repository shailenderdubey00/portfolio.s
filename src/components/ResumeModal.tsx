import React from 'react';
import { Download, Printer, X, Mail, Phone, Linkedin, ExternalLink, MapPin, Award, BookOpen, Code, Briefcase } from 'lucide-react';
import './ResumeModal.css';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  resumeUrl?: string;
  fileName?: string;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
  resumeUrl = '/Shailender_Dubey_Resume.pdf',
  fileName = 'Shailender_Dubey_Resume.pdf'
}) => {
  if (!isOpen) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="resume-modal-overlay" onClick={onClose}>
      <div className="resume-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Top Modal Controls */}
        <div className="resume-modal-toolbar">
          <div className="resume-modal-title-group">
            <span className="resume-badge">Resume</span>
            <h2 className="resume-modal-heading">Shailender Dubey</h2>
          </div>

          <div className="resume-modal-actions">
            <button className="resume-action-btn print-btn" onClick={handlePrint} title="Print Resume">
              <Printer size={16} />
              <span>Print</span>
            </button>
            <button className="resume-action-btn download-btn" onClick={handleDownload} title="Download PDF">
              <Download size={16} />
              <span>Download PDF</span>
            </button>
            <button className="resume-close-btn" onClick={onClose} aria-label="Close modal">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Scrollable Resume Content */}
        <div className="resume-modal-body" id="printable-resume">
          {/* Header Section */}
          <header className="resume-doc-header">
            <div className="resume-header-top">
              <img src="/profile.jpg" alt="Shailender Dubey" className="resume-avatar-img" />
              <div className="resume-header-main">
                <h1 className="resume-name">Shailender Dubey</h1>
                <p className="resume-tagline">Python Developer &bull; Web Developer &bull; AI Enthusiast</p>
              </div>
            </div>
            
            <div className="resume-contact-grid">
              <a href="mailto:shailenderdubey00@gmail.com" className="resume-contact-item">
                <Mail size={14} />
                <span>shailenderdubey00@gmail.com</span>
              </a>
              <a href="tel:+918707322859" className="resume-contact-item">
                <Phone size={14} />
                <span>+91 8707322859</span>
              </a>
              <a href="https://www.linkedin.com/in/shailender-dubey-b12a32336" target="_blank" rel="noopener noreferrer" className="resume-contact-item">
                <Linkedin size={14} />
                <span>LinkedIn Profile</span>
                <ExternalLink size={12} />
              </a>
              <div className="resume-contact-item">
                <MapPin size={14} />
                <span>India</span>
              </div>
            </div>
          </header>

          <hr className="resume-divider" />

          {/* Profile Summary */}
          <section className="resume-section">
            <h3 className="resume-section-title">
              <BookOpen size={18} />
              <span>Profile Summary</span>
            </h3>
            <p className="resume-summary">
              Motivated Computer Science student with expertise in Python development, modern web applications, 
              and AI technology integration. Skilled in designing scalable software, clean interactive user interfaces, 
              and leveraging generative AI APIs to build high-impact digital solutions.
            </p>
          </section>

          {/* Technical Skills */}
          <section className="resume-section">
            <h3 className="resume-section-title">
              <Code size={18} />
              <span>Technical Skills</span>
            </h3>
            <div className="resume-skills-grid">
              <div className="resume-skill-cat">
                <span className="skill-cat-name">Programming</span>
                <div className="skill-tags">
                  <span className="skill-tag">Python</span>
                  <span className="skill-tag">JavaScript</span>
                </div>
              </div>
              <div className="resume-skill-cat">
                <span className="skill-cat-name">Web Development</span>
                <div className="skill-tags">
                  <span className="skill-tag">HTML5 / CSS3</span>
                  <span className="skill-tag">React</span>
                  <span className="skill-tag">Vite</span>
                  <span className="skill-tag">Responsive Design</span>
                </div>
              </div>
              <div className="resume-skill-cat">
                <span className="skill-cat-name">Databases</span>
                <div className="skill-tags">
                  <span className="skill-tag">SQL</span>
                  <span className="skill-tag">DBMS</span>
                  <span className="skill-tag">Supabase</span>
                </div>
              </div>
              <div className="resume-skill-cat">
                <span className="skill-cat-name">AI & Machine Learning</span>
                <div className="skill-tags">
                  <span className="skill-tag">Generative AI</span>
                  <span className="skill-tag">Gemini API</span>
                  <span className="skill-tag">AI-Powered Apps</span>
                </div>
              </div>
              <div className="resume-skill-cat">
                <span className="skill-cat-name">Tools & Platforms</span>
                <div className="skill-tags">
                  <span className="skill-tag">Git</span>
                  <span className="skill-tag">GitHub</span>
                  <span className="skill-tag">VS Code</span>
                  <span className="skill-tag">Power BI</span>
                </div>
              </div>
            </div>
          </section>

          {/* Projects */}
          <section className="resume-section">
            <h3 className="resume-section-title">
              <Briefcase size={18} />
              <span>Featured Projects</span>
            </h3>
            <div className="resume-projects-list">
              <div className="resume-project-card">
                <div className="project-head">
                  <h4 className="project-title">AI Chatbox</h4>
                  <span className="project-tech">Python, Gemini API, WebSockets</span>
                </div>
                <p className="project-desc">
                  An intelligent conversational AI interface featuring real-time natural language processing, 
                  context retention, and seamless response stream rendering.
                </p>
              </div>

              <div className="resume-project-card">
                <div className="project-head">
                  <h4 className="project-title">Sahay</h4>
                  <span className="project-tech">React, Node.js, Supabase, Web</span>
                </div>
                <p className="project-desc">
                  A community assistance web platform connecting individuals with local support networks, 
                  volunteers, and essential emergency resources in real time.
                </p>
              </div>

              <div className="resume-project-card">
                <div className="project-head">
                  <h4 className="project-title">Moodify</h4>
                  <span className="project-tech">Python, OpenCV, Gemini API, React</span>
                </div>
                <p className="project-desc">
                  AI-driven mood detection and music recommendation system utilizing computer vision 
                  and sentiment analysis to generate personalized playlists.
                </p>
              </div>

              <div className="resume-project-card">
                <div className="project-head">
                  <h4 className="project-title">Personal Developer Portfolio</h4>
                  <span className="project-tech">React, Vite, TypeScript, CSS3</span>
                </div>
                <p className="project-desc">
                  Modern interactive portfolio showcasing software projects, custom WebGL fluid simulations, 
                  and dynamic UI micro-interactions.
                </p>
              </div>
            </div>
          </section>

          {/* Education */}
          <section className="resume-section">
            <h3 className="resume-section-title">
              <Award size={18} />
              <span>Education</span>
            </h3>
            <div className="resume-edu-card">
              <div className="edu-head">
                <h4 className="edu-degree">Bachelor of Technology (B.Tech) in Computer Science</h4>
                <span className="edu-year">2023 &ndash; 2027 (Expected)</span>
              </div>
              <p className="edu-details">Focusing on Algorithms, Data Structures, Web Engineering, and Artificial Intelligence.</p>
            </div>
          </section>
        </div>

        {/* Footer Actions */}
        <div className="resume-modal-footer">
          <button className="resume-download-full-btn" onClick={handleDownload}>
            <Download size={18} />
            <span>Download PDF Resume</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeModal;

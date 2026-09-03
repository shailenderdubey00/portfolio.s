import React, { useEffect, useState, useRef } from 'react';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Resume } from './components/Resume';
import { ResumeModal } from './components/ResumeModal';
import { Toast } from './components/Toast';
import { CursorTrailContact } from './components/CursorTrailContact';
import { AtmosphericBlueCursor } from './components/AtmosphericBlueCursor';
import { ShapeGrid } from './components/ShapeGrid';
import { Magnet } from './components/Magnet';
import { StaggeredMenu } from './components/StaggeredMenu';
import { ProfileCard } from './components/ProfileCard';
import { Footer } from './components/Footer';
import { MobileNav } from './components/MobileNav';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [toastVisible, setToastVisible] = useState(false);

  const homeSectionRef = useRef<HTMLElement>(null);
  const aboutSectionRef = useRef<HTMLElement>(null);
  const contactSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Ensure website always opens directly at the Home page on load/reload
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('section');
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.getAttribute('id') || 'home');
        }
      });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));

    return () => {
      sections.forEach(section => sectionObserver.unobserve(section));
    };
  }, []);

  useEffect(() => {
    const fadeUpElements = document.querySelectorAll('.fade-up');
    const fadeUpObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -100px 0px',
      threshold: 0.1
    });

    fadeUpElements.forEach(element => fadeUpObserver.observe(element));
    
    return () => {
      fadeUpElements.forEach(element => fadeUpObserver.unobserve(element));
    };
  }, []);
  
  useEffect(() => {
    if (isMenuOpen || isResumeModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMenuOpen, isResumeModalOpen]);

  const menuItems = [
    { label: 'Home', ariaLabel: 'Go to home section', link: '#home' },
    { label: 'About', ariaLabel: 'Go to about section', link: '#about' },
    { label: 'Skills', ariaLabel: 'Go to skills section', link: '#skills' },
    { label: 'Projects', ariaLabel: 'Go to projects section', link: '#projects' },
    { label: 'Contact', ariaLabel: 'Go to contact section', link: '#contact' }
  ];

  const socialItems = [
    { label: 'LinkedIn', link: 'https://www.linkedin.com/in/shailender-dubey-b12a32336' },
    { label: 'WhatsApp', link: 'https://wa.me/918707322859' },
    { label: 'Gmail', link: 'mailto:shailenderdubey00@gmail.com' },
    { label: 'Phone', link: 'tel:+918707322859' }
  ];

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/Shailender_Dubey_Resume.pdf';
    link.download = 'Shailender_Dubey_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {/* Atmospheric Multi-Shade Blue Interactive Cursor Canvas */}
      <AtmosphericBlueCursor />

      {/* GSAP Staggered Menu Navigation from React Bits */}
      <StaggeredMenu
        position="right"
        items={menuItems}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={true}
        menuButtonColor="#ffffff"
        openMenuButtonColor="#38bdf8"
        accentColor="#38bdf8"
        colors={['#010819', '#002677', '#0066ff']}
        logoText="PORTFOLIO"
        isFixed={true}
        onMenuOpen={() => setIsMenuOpen(true)}
        onMenuClose={() => setIsMenuOpen(false)}
        onViewResume={() => setIsResumeModalOpen(true)}
        onDownloadResume={handleDownloadResume}
      />

      <main style={{ position: 'relative', zIndex: 10 }}>
        {/* MINIMAL HERO SECTION */}
        <section id="home" className="section fade-up" ref={homeSectionRef} style={{ position: 'relative' }}>
          <div className="container home-container">
            <div className="home-content">
              <Magnet padding={70} magnetStrength={3.5} wrapperClassName="hero-magnet-name">
                <h1 className="main-title">Shailender Dubey</h1>
              </Magnet>
              <h2 className="sub-title">Python Developer &middot; Web Developer &middot; AI Enthusiast</h2>
              <p className="intro-text">
                Building clean digital experiences with Python, web technologies and AI.
              </p>
              
              <div className="home-actions">
                <a href="#projects" className="explore-projects-btn">
                  Explore Projects
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </a>
                <Resume resumeUrl="/Shailender_Dubey_Resume.pdf" fileName="Shailender_Dubey_Resume.pdf" />
              </div>
            </div>

            {/* RIGHT SIDE PROFILE CARD */}
            <div className="home-profile-card-wrapper">
              <ProfileCard
                avatarUrl="/profile.jpg"
                name="Shailender Dubey"
                title="Python & AI Developer"
                handle="shailender"
                status="Available for Work"
                showUserInfo={true}
                behindGlowEnabled={true}
                behindGlowColor="rgba(56, 189, 248, 0.5)"
                behindGlowSize="50%"
                enableTilt={true}
                onContactClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              />
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="section fade-up about-section-relative" ref={aboutSectionRef}>
          <div className="shapegrid-bg-wrapper">
            <ShapeGrid
              speed={0.4}
              squareSize={42}
              direction="diagonal"
              borderColor="rgba(0, 102, 255, 0.16)"
              hoverFillColor="rgba(0, 102, 255, 0.35)"
              shape="hexagon"
              hoverTrailAmount={6}
            />
            <div className="shapegrid-bg-overlay" />
          </div>

          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            <div className="section-header">
              <span className="section-num">01</span>
              <h2 className="section-title">About Me</h2>
            </div>
            
            <div className="about-content">
              <p className="about-text">
                I am a Computer Science student passionate about Python development, web development, artificial intelligence and building useful digital products.
              </p>
              
              <ul className="about-list">
                <li><span>Degree</span>B.Tech in Computer Science</li>
                <li><span>Expected Graduation</span>2027</li>
                <li><span>Current Focus</span>Python, Web Development, AI and Data</li>
                <li><span>Location</span>India</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <Skills />

        {/* PROJECTS SECTION */}
        <Projects />

        {/* CONTACT SECTION */}
        <section id="contact" ref={contactSectionRef} style={{ position: 'relative', padding: 0 }}>
          <CursorTrailContact />
        </section>

        {/* SITE FOOTER */}
        <Footer
          onViewResume={() => setIsResumeModalOpen(true)}
          onDownloadResume={handleDownloadResume}
        />
      </main>
      
      <Toast message="Thanks for reaching out! I'll get back to you soon." isVisible={toastVisible} onClose={() => setToastVisible(false)} />
      
      {/* Resume Modal */}
      <ResumeModal isOpen={isResumeModalOpen} onClose={() => setIsResumeModalOpen(false)} />

      {/* Floating Mobile Bottom Navigation Dock (<= 768px) */}
      <MobileNav activeSection={activeSection} />
    </>
  );
}

export default App;

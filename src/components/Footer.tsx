import React from 'react';
import { ArrowUp } from 'lucide-react';
import './Footer.css';

interface FooterProps {
  onViewResume?: () => void;
  onDownloadResume?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onViewResume, onDownloadResume }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDownload = () => {
    if (onDownloadResume) {
      onDownloadResume();
    } else {
      const link = document.createElement('a');
      link.href = '/Shailender_Dubey_Resume.pdf';
      link.download = 'Shailender_Dubey_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <footer className="minimal-footer">
      <div className="minimal-footer-glow" aria-hidden="true" />

      <div className="container minimal-footer-container">
        {/* Left Branding & Copyright */}
        <div className="minimal-footer-left">
          <span className="minimal-footer-brand">&copy; {new Date().getFullYear()} Shailender Dubey</span>
          <span className="minimal-footer-dot">&bull;</span>
          <span className="minimal-footer-sub">Python &amp; Web Developer</span>
        </div>

        {/* Center Quick Links */}
        <div className="minimal-footer-center">
          <a
            href="https://www.linkedin.com/in/shailender-dubey-b12a32336"
            target="_blank"
            rel="noopener noreferrer"
            className="minimal-footer-link"
          >
            LinkedIn
          </a>
          <a
            href="https://wa.me/918707322859"
            target="_blank"
            rel="noopener noreferrer"
            className="minimal-footer-link"
          >
            WhatsApp
          </a>
          <a href="mailto:shailenderdubey00@gmail.com" className="minimal-footer-link">
            Gmail
          </a>
          {onViewResume ? (
            <button type="button" className="minimal-footer-btn-link" onClick={onViewResume}>
              Resume
            </button>
          ) : (
            <button type="button" className="minimal-footer-btn-link" onClick={handleDownload}>
              Resume PDF
            </button>
          )}
        </div>

        {/* Right Back To Top Button */}
        <div className="minimal-footer-right">
          <button
            type="button"
            className="minimal-back-to-top"
            onClick={scrollToTop}
            aria-label="Scroll to top"
            title="Back to Top"
          >
            <span>Top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React, { useState } from 'react';
import { Mail, Phone, Linkedin, Copy, Check, X, ExternalLink } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!isOpen) return null;

  const email = "shailenderdubey00@gmail.com";
  const phone = "8707322859";
  const formattedPhone = "+91 8707322859";
  const linkedin = "https://www.linkedin.com/in/shailender-dubey-b12a32336";

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content contact-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <X size={24} />
        </button>

        <div className="contact-modal-header">
          <span className="section-num">Get In Touch</span>
          <h2 className="modal-title">Contact Information</h2>
          <p className="modal-desc">
            Feel free to reach out for collaborations, project inquiries, or just to say hello!
          </p>
        </div>

        <div className="contact-info-list">
          {/* Email Item */}
          <div className="contact-info-card">
            <div className="contact-info-icon">
              <Mail size={24} />
            </div>
            <div className="contact-info-details">
              <span className="contact-label">Email Address</span>
              <a href={`mailto:${email}`} className="contact-value-link">
                {email}
              </a>
            </div>
            <div className="contact-info-actions">
              <button 
                className="contact-action-btn" 
                onClick={() => handleCopy(email, 'email')}
                title="Copy Email"
              >
                {copiedField === 'email' ? <Check size={18} color="#10B981" /> : <Copy size={18} />}
              </button>
              <a 
                href={`mailto:${email}`} 
                className="contact-action-btn"
                title="Send Email"
              >
                <ExternalLink size={18} />
              </a>
            </div>
          </div>

          {/* Phone Item */}
          <div className="contact-info-card">
            <div className="contact-info-icon">
              <Phone size={24} />
            </div>
            <div className="contact-info-details">
              <span className="contact-label">Phone Number</span>
              <a href={`tel:${phone}`} className="contact-value-link">
                {formattedPhone}
              </a>
            </div>
            <div className="contact-info-actions">
              <button 
                className="contact-action-btn" 
                onClick={() => handleCopy(phone, 'phone')}
                title="Copy Phone Number"
              >
                {copiedField === 'phone' ? <Check size={18} color="#10B981" /> : <Copy size={18} />}
              </button>
              <a 
                href={`tel:${phone}`} 
                className="contact-action-btn"
                title="Call Now"
              >
                <ExternalLink size={18} />
              </a>
            </div>
          </div>

          {/* LinkedIn Item */}
          <div className="contact-info-card">
            <div className="contact-info-icon">
              <Linkedin size={24} />
            </div>
            <div className="contact-info-details">
              <span className="contact-label">LinkedIn Profile</span>
              <a href={linkedin} target="_blank" rel="noopener noreferrer" className="contact-value-link">
                shailender-dubey-b12a32336
              </a>
            </div>
            <div className="contact-info-actions">
              <button 
                className="contact-action-btn" 
                onClick={() => handleCopy(linkedin, 'linkedin')}
                title="Copy Profile Link"
              >
                {copiedField === 'linkedin' ? <Check size={18} color="#10B981" /> : <Copy size={18} />}
              </button>
              <a 
                href={linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="contact-action-btn"
                title="Visit LinkedIn Profile"
              >
                <ExternalLink size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="contact-modal-footer">
          <button className="contact-close-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

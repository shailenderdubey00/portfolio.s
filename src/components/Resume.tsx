import React, { useState } from 'react';
import './Resume.css';

interface ResumeProps {
  resumeUrl?: string;
  fileName?: string;
}

export const Resume: React.FC<ResumeProps> = ({
  resumeUrl = '/resume.pdf',
  fileName = 'Shailender_Dubey_Resume.pdf'
}) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked && !isChecked) {
      setIsChecked(true);

      // Trigger actual resume download after animation progress
      setTimeout(() => {
        const link = document.createElement('a');
        link.href = resumeUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, 3500);
    }
  };

  return (
    <div className="download-resume-container">
      <label className={`download-resume-label ${isChecked ? 'checked' : ''}`}>
        <input
          type="checkbox"
          className="input"
          checked={isChecked}
          onChange={handleChange}
        />
        <div className="circle">
          <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          <div className="square"></div>
        </div>
        <span className="title">Resume</span>
        <span className="title">Downloaded</span>
      </label>
    </div>
  );
};

export default Resume;

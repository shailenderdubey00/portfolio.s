import React from 'react';
import { Project } from '../data/portfolio';
import { getProjectIcon } from './Projects';
import { X, Github, ExternalLink } from 'lucide-react';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <X size={24} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
          <div className="project-card-icon" style={{ width: '56px', height: '56px' }}>
            {getProjectIcon(project.icon, 28)}
          </div>
          <div>
            <span className="project-badge" style={{ display: 'inline-block', marginBottom: '6px' }}>
              {project.category.toUpperCase()}
            </span>
            <h2 className="modal-title" style={{ margin: 0 }}>{project.name}</h2>
          </div>
        </div>

        <p className="modal-desc">{project.desc}</p>
        
        <div className="modal-tech">
          <strong>Tech Stack:</strong> {project.tech}
        </div>

        <div className="modal-actions" style={{ marginTop: '30px', display: 'flex', gap: '16px' }}>
          {project.github && (
            <a 
              href={project.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 24px', borderRadius: '24px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)' }}
            >
              <Github size={18} />
              <span>GitHub</span>
            </a>
          )}
          {project.live && (
            <a 
              href={project.live} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 24px', borderRadius: '24px', background: 'var(--accent-color)', color: '#FFFFFF', border: '1px solid var(--accent-color)' }}
            >
              <ExternalLink size={18} />
              <span>Live Demo</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

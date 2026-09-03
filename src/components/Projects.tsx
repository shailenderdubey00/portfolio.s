import React, { useState } from 'react';
import { projectsData, Project } from '../data/portfolio';
import { ProjectModal } from './ProjectModal';
import { 
  Bot, 
  HelpingHand, 
  Smile, 
  Layout, 
  Layers
} from 'lucide-react';

export const getProjectIcon = (iconName: string, size = 36) => {
  switch (iconName) {
    case 'bot':
      return <Bot size={size} />;
    case 'helping-hand':
      return <HelpingHand size={size} />;
    case 'smile':
      return <Smile size={size} />;
    case 'layout':
      return <Layout size={size} />;
    default:
      return <Layers size={size} />;
  }
};

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Rotation angles for the 4 Uiverse stacked glass cards
  const deckAngles = [-15, -5, 5, 15];

  return (
    <>
      <section id="projects" className="section fade-up">
        <div className="container">
          <div className="section-header">
            <span className="section-num">03</span>
            <h2 className="section-title">Selected Projects</h2>
          </div>

          {/* Uiverse Glass Cards Stack Showcase (by codebykay101) */}
          <div className="uiverse-deck-wrapper">
            <div className="uiverse-deck-container">
              {projectsData.map((project, idx) => {
                const angle = deckAngles[idx % deckAngles.length];
                return (
                  <div
                    key={project.id}
                    className="glass"
                    data-text={project.name}
                    style={{ '--r': angle } as React.CSSProperties}
                    onClick={() => setSelectedProject(project)}
                    title={`View ${project.name} details`}
                  >
                    {getProjectIcon(project.icon, 40)}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </>
  );
};

export default Projects;

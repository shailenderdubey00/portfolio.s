import React from 'react';
import { skillsData } from '../data/portfolio';
import { BounceCards, BounceCardItem } from './BounceCards';

const categoryIcons: Record<string, string> = {
  Programming: '⚡',
  Web: '🌐',
  Database: '🗄️',
  AI: '🤖',
  Tools: '🛠️'
};

export const Skills: React.FC = () => {
  const skillItems: BounceCardItem[] = skillsData.map((s, idx) => ({
    id: idx,
    category: s.category,
    icon: categoryIcons[s.category] || '⚡',
    items: s.items
  }));

  const transformStyles = [
    'rotate(-12deg) translate(-220px, 12px)',
    'rotate(-6deg) translate(-110px, -8px)',
    'rotate(0deg) translate(0px, 0px)',
    'rotate(6deg) translate(110px, -8px)',
    'rotate(12deg) translate(220px, 12px)'
  ];

  return (
    <section id="skills" className="section fade-up" style={{ position: 'relative' }}>
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div className="section-header">
          <span className="section-num">02</span>
          <h2 className="section-title">Technical Skills</h2>
        </div>

        <div className="bounce-cards-wrapper">
          <BounceCards
            items={skillItems}
            containerWidth={600}
            containerHeight={380}
            animationDelay={0.4}
            animationStagger={0.08}
            easeType="elastic.out(1, 0.75)"
            transformStyles={transformStyles}
            enableHover={true}
          />
        </div>
      </div>
    </section>
  );
};

export default Skills;

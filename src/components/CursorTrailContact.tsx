import React, { useEffect, useRef, useState } from 'react';
import { Phone, Linkedin, Mail } from 'lucide-react';

export const CursorTrailContact: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    const mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2, active: false };
    const ripples: { x: number; y: number; radius: number; maxRadius: number; opacity: number }[] = [];

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.active = true;

      if (Math.random() < 0.2) {
        ripples.push({
          x: mouse.targetX,
          y: mouse.targetY,
          radius: 0,
          maxRadius: 140 + Math.random() * 80,
          opacity: 0.7
        });
      }
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    const container = canvas.parentElement;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    const spacing = 28;
    let time = 0;

    const render = () => {
      time += 0.02;
      mouse.x += (mouse.targetX - mouse.x) * 0.12;
      mouse.y += (mouse.targetY - mouse.y) * 0.12;

      // Transparent background so blue fluid simulation renders through
      ctx.clearRect(0, 0, width, height);

      // Update ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += 2.8;
        r.opacity *= 0.955;
        if (r.opacity < 0.01 || r.radius > r.maxRadius) {
          ripples.splice(i, 1);
        }
      }

      // Cursor glow aura
      if (mouse.active) {
        const glowGrad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 260);
        glowGrad.addColorStop(0, 'rgba(0, 102, 255, 0.28)');
        glowGrad.addColorStop(0.4, 'rgba(0, 102, 255, 0.09)');
        glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = glowGrad;
        ctx.fillRect(0, 0, width, height);
      }

      // Draw dot matrix grid
      const cols = Math.ceil(width / spacing);
      const rows = Math.ceil(height / spacing);

      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const x = i * spacing;
          const y = j * spacing;

          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const twinkle = Math.sin(time + i * 0.35 + j * 0.45) * 0.5 + 0.5;
          let baseAlpha = 0.13 + twinkle * 0.12;
          let dotSize = 1.25;

          if (mouse.active && dist < 240) {
            const proximityFactor = 1 - dist / 240;
            baseAlpha += proximityFactor * 0.8;
            dotSize += proximityFactor * 2.6;
          }

          for (const r of ripples) {
            const rdx = x - r.x;
            const rdy = y - r.y;
            const rDist = Math.sqrt(rdx * rdx + rdy * rdy);
            if (Math.abs(rDist - r.radius) < 28) {
              baseAlpha += r.opacity * 0.55;
              dotSize += r.opacity * 1.8;
            }
          }

          ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, baseAlpha)})`;
          ctx.beginPath();
          ctx.arc(x, y, dotSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <main className="cursor-trail-contact-main">
      <div className="shader-wrapper" aria-hidden="true">
        <canvas
          ref={canvasRef}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
        />
      </div>

      <section className="contact-invite">
        {!isOpen ? (
          <div className="contact-prompt-wrapper">
            <h2 className="reveal" style={{ '--reveal-delay': '0.1s' } as React.CSSProperties}>
              Got something to make?
            </h2>
            <button
              className="reveal cta-link"
              style={{ '--reveal-delay': '0.25s' } as React.CSSProperties}
              onClick={() => setIsOpen(true)}
            >
              Contact us
              <span className="cta-underline" />
            </button>
          </div>
        ) : (
          <div className="contact-active-card">
            <span className="contact-active-subtitle">Get In Touch</span>
            <h2 className="contact-active-title">Let's Work Together</h2>

            <div id="SocailIcons" className="social-icons-center">
              {/* Phone (in place of Instagram) */}
              <div className="icons phoneIcon">
                <span className="iconName">Phone</span>
                <a className="icon phone" href="tel:8707322859" aria-label="Call Phone">
                  <Phone size={22} />
                </a>
              </div>

              {/* LinkedIn */}
              <div className="icons linkedin">
                <span className="iconName">LinkedIn</span>
                <a
                  className="icon link"
                  href="https://www.linkedin.com/in/shailender-dubey-b12a32336"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin size={22} />
                </a>
              </div>

              {/* WhatsApp */}
              <div className="icons whatsapp">
                <span className="iconName">WhatsApp</span>
                <a
                  className="icon whats"
                  href="https://wa.me/918707322859"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat on WhatsApp"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.972.586 1.769.879 2.796.879 3.18 0 5.767-2.587 5.767-5.766.001-3.18-2.585-5.766-5.767-5.766zm9.969 5.766c-.004 5.419-4.411 9.824-9.97 9.824-1.722 0-3.328-.445-4.733-1.222l-5.297 1.388 1.416-5.163c-.878-1.464-1.386-3.178-1.386-5.007.004-5.418 4.41-9.824 9.97-9.824 2.662.001 5.165 1.037 7.046 2.92 1.882 1.882 2.918 4.385 2.914 7.084z" />
                  </svg>
                </a>
              </div>

              {/* Gmail (in place of YouTube) */}
              <div className="icons gmail">
                <span className="iconName">Gmail</span>
                <a className="icon g-mail" href="mailto:shailenderdubey00@gmail.com" aria-label="Send Email">
                  <Mail size={22} />
                </a>
              </div>
            </div>

            <div className="contact-quick-details">
              <a href="mailto:shailenderdubey00@gmail.com" className="quick-detail-pill">
                shailenderdubey00@gmail.com
              </a>
              <a href="tel:8707322859" className="quick-detail-pill">
                +91 8707322859
              </a>
            </div>

            <button className="contact-reset-btn" onClick={() => setIsOpen(false)}>
              &larr; Back
            </button>
          </div>
        )}
      </section>
    </main>
  );
};

export default CursorTrailContact;

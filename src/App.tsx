import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  Search, 
  Share2, 
  PenTool, 
  BarChart3, 
  Mail,
  ArrowRight,
  MousePointerClick,
  Globe,
  Zap,
  Target,
  Cpu
} from 'lucide-react';
import Navbar from './components/Navbar';
import { SectionHeader, ProjectCard, FadeSection, SwipeRevealLine } from './components/SectionElements';
import { ServiceCard } from './components/ServiceCard';
import LogoSplitLoader from './components/LogoSplitLoader';
import { unblockAudio, playHoverSound } from './utils/audio';
import { useInView } from 'framer-motion';
import { Counter } from './components/Counter';

const ServicesGrid: React.FC<{ services: any[] }> = ({ services }) => {
  const gridRef = React.useRef(null);
  const isInView = useInView(gridRef, { once: true, amount: 0.1 });

  return (
    <div ref={gridRef}>
      <SectionHeader title="Services" subtitle="Precision tools for digital expansion." />
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
        gap: '1px', 
        background: 'var(--grid-color)',
        marginTop: '60px'
      }}>
        {services.map((service, i) => (
          <ServiceCard key={i} index={i} {...service} sectionInView={isInView} />
        ))}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  const services = [
    {
      icon: <TrendingUp className="text-accent" />,
      title: "Performance Marketing",
      description: "Aggressive, data-driven scaling across global ad networks. We optimize for high-intent conversion and maximum ROAS.",
      tags: ["Paid Social", "Search", "Programmatic"]
    },
    {
      icon: <Globe className="text-accent" />,
      title: "Next-Gen Web Architecture",
      description: "High-performance, SEO-optimized digital experiences built with modern frameworks for speed and conversion.",
      tags: ["React/Next.js", "Headless CMS", "UX/UI"]
    },
    {
      icon: <Cpu className="text-accent" />, 
      title: "AI Workflow Orchestration",
      description: "Automating complex business processes with intelligent agents to reduce overhead and eliminate human error.",
      tags: ["n8n/Zapier", "Auto-GPT", "Agentic Workflows"]
    },
    {
      icon: <Zap className="text-accent" />,
      title: "Custom Neural Solutions",
      description: "Tailored AI models and LLM integrations designed to solve specific business challenges and drive innovation.",
      tags: ["Fine-Tuning", "RAG", "Predictive Analytics"]
    },
    {
      icon: <Target className="text-accent" />,
      title: "Application Development",
      description: "Scalable native and hybrid mobile solutions designed for high user retention and seamless performance.",
      tags: ["React Native", "Flutter", "iOS/Android"]
    },
    {
      icon: <BarChart3 className="text-accent" />,
      title: "Analytics & Attribution",
      description: "Deep-dive data infrastructure that provides a single source of truth for your entire growth ecosystem.",
      tags: ["GA4", "Custom Tracking", "BI"]
    }
  ];

  return (
    <div 
      style={{ position: 'relative', width: '100%', minHeight: '100vh', backgroundColor: '#050505', overflowX: 'hidden' }}
    >
      <AnimatePresence>
        {loading && <LogoSplitLoader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999,
        opacity: 0.04,
        backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")',
        filter: 'contrast(170%) brightness(1000%)'
      }} />

      <Navbar />

      <main style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.5s ease 0.5s' }}>
        {/* HERO SECTION */}
        <FadeSection id="hero" style={{ 
          minHeight: '100vh', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          background: 'radial-gradient(circle at 80% 20%, rgba(0, 255, 65, 0.05) 0%, transparent 50%)',
          padding: '0 10%' 
        }}>
          <div style={{ position: 'relative', zIndex: 10 }}>
            {!loading && (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="mono"
                  style={{ color: 'var(--accent-color)', marginBottom: '24px', fontSize: '0.9rem', letterSpacing: '0.2em' }}
                >
                  [ YOUR ONLINE LEVERAGE & OPTIMIZATION ]
                </motion.div>
                
                <SwipeRevealLine delay={0.2}>
                  <h1 style={{ fontSize: 'clamp(3.5rem, 12vw, 9rem)', fontWeight: 600, lineHeight: 0.9, letterSpacing: '-0.05em' }}>
                    WE SCALE
                  </h1>
                </SwipeRevealLine>

                <SwipeRevealLine delay={0.4}>
                  <h1 style={{ fontSize: 'clamp(3.5rem, 12vw, 9rem)', fontWeight: 600, lineHeight: 0.9, letterSpacing: '-0.05em' }}>
                    <span style={{ color: 'white', WebkitTextStroke: '1px rgba(255,255,255,0.2)', WebkitTextFillColor: 'transparent' }}>MODERN</span>
                  </h1>
                </SwipeRevealLine>

                <SwipeRevealLine delay={0.6} style={{ marginBottom: '40px' }}>
                  <h1 style={{ fontSize: 'clamp(3.5rem, 12vw, 9rem)', fontWeight: 600, lineHeight: 0.9, letterSpacing: '-0.05em' }}>
                    BRANDS<span style={{ color: 'var(--accent-color)' }}>.</span>
                  </h1>
                </SwipeRevealLine>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 1 }}
                  style={{ display: 'flex', gap: '30px', alignItems: 'flex-start', flexWrap: 'wrap' }}
                >
                  <p style={{ 
                    fontSize: '1.2rem', 
                    color: 'var(--text-secondary)', 
                    maxWidth: '500px',
                    lineHeight: 1.5
                  }}>
                    YOLO is a full-stack digital marketing agency focused on aggressive growth, technical precision, and creative dominance.
                  </p>
                  
                  <motion.button
                    onHoverStart={playHoverSound}
                    whileHover={{ 
                      scale: 1.05, 
                      backgroundColor: 'var(--accent-color)', 
                      color: 'black',
                      transition: { duration: 0.1, ease: "linear" }
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="mono"
                    style={{
                      background: 'transparent',
                      border: '1px solid var(--accent-color)',
                      color: 'var(--accent-color)',
                      padding: '20px 40px',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px'
                    }}
                  >
                    START YOUR GROWTH <ArrowRight size={18} />
                  </motion.button>
                </motion.div>
              </>
            )}
          </div>

          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: 'absolute',
              right: '10%',
              top: '30%',
              width: '200px',
              height: '200px',
              border: '1px solid var(--grid-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              opacity: 0.2
            }}
          >
            <MousePointerClick size={40} color="var(--accent-color)" />
          </motion.div>
        </FadeSection>

        {/* SERVICES SECTION */}
        <FadeSection id="capabilities" style={{ borderTop: '1px solid var(--grid-color)', padding: '100px 10%' }}>
          <ServicesGrid services={services} />
        </FadeSection>

        {/* WORKS SECTION */}
        <FadeSection id="works" style={{ padding: '100px 10%' }}>
          <SectionHeader title="Selected Case Studies" subtitle="Proof of performance in the wild." />
          <div style={{ marginTop: '60px' }}>
            {[
              { title: "PeakAutomation", category: "340% Revenue Growth / Meta Ads" },
              { title: "Aether Lifestyle", category: "Brand Identity & Global Launch" },
              { title: "Solaris SaaS", category: "Enterprise SEO Dominance" },
              { title: "Lumina Beauty", category: "Social Community Building" }
            ].map((work, i) => (
              <ProjectCard key={i} index={i} {...work} />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
            <motion.button
              onHoverStart={playHoverSound}
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: 'var(--accent-color)', 
                color: 'black',
                transition: { duration: 0.1, ease: "linear" }
              }}
              whileTap={{ scale: 0.95 }}
              className="mono"
              style={{
                background: 'transparent',
                border: '1px solid var(--accent-color)',
                color: 'var(--accent-color)',
                padding: '15px 40px',
                cursor: 'pointer',
                fontSize: '0.8rem',
                letterSpacing: '0.1em'
              }}
            >
              VIEW ALL ARCHIVES [ENTER]
            </motion.button>
          </div>
        </FadeSection>

        {/* STATS SECTION */}
        <FadeSection id="stats" style={{ padding: '80px 10%', background: 'var(--accent-color)', color: 'black', minHeight: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '40px' }}>
            <div className="mono">
              <div style={{ fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '8px', opacity: 0.7 }}>Ad Spend Managed</div>
              <div style={{ fontSize: '3rem', fontWeight: 'bold' }}>
                <Counter value={50} prefix="$" suffix="M+" />
              </div>
            </div>
            <div className="mono">
              <div style={{ fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '8px', opacity: 0.7 }}>Active Clients</div>
              <div style={{ fontSize: '3rem', fontWeight: 'bold' }}>
                <Counter value={120} suffix="+" />
              </div>
            </div>
            <div className="mono">
              <div style={{ fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '8px', opacity: 0.7 }}>Avg. ROAS</div>
              <div style={{ fontSize: '3rem', fontWeight: 'bold' }}>
                <Counter value={4.8} suffix="x" decimals={1} />
              </div>
            </div>
            <div className="mono">
              <div style={{ fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '8px', opacity: 0.7 }}>Global Reach</div>
              <div style={{ fontSize: '3rem', fontWeight: 'bold' }}>
                <Counter value={24} suffix=" Countries" />
              </div>
            </div>
          </div>
        </FadeSection>

        {/* PHILOSOPHY SECTION */}
        <FadeSection id="philosophy" style={{ padding: '100px 10%' }}>
          <SectionHeader title="Why Us" subtitle="We don't just 'manage' accounts. We own the outcome." />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '80px' }}>
            <p style={{ fontSize: '1.8rem', lineHeight: 1.4, color: 'var(--text-secondary)' }}>
              Most agencies provide reports. We provide <span style={{ color: 'white' }}>revenue.</span> Our methodology blends 
              creative intuition with rigorous algorithmic testing to find the "unfair advantage" for your brand.
            </p>
            <div className="mono">
              <div style={{ borderLeft: '2px solid var(--accent-color)', paddingLeft: '30px', marginBottom: '40px' }}>
                <h4 style={{ color: 'white', marginBottom: '10px' }}>The Technical Edge</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>We use custom scripts and API integrations to automate optimizations that human managers miss.</p>
              </div>
              <div style={{ borderLeft: '2px solid var(--accent-color)', paddingLeft: '30px' }}>
                <h4 style={{ color: 'white', marginBottom: '10px' }}>Speed to Market</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Creative refreshes in hours, not weeks. We move at the speed of the internet.</p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* TEAM SECTION */}
        <FadeSection id="team" style={{ padding: '100px 10%' }}>
          <SectionHeader title="Team" subtitle="The architects of digital dominance." />
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '40px',
            marginTop: '60px'
          }}>
            {[
              { name: "Shri Jayaram R", role: "Founder & Lead Strategist", image: "/images/team-1.png" },
              { name: "Member Name", role: "Creative Director", image: null },
              { name: "Member Name", role: "AI Solutions Architect", image: null },
              { name: "Member Name", role: "Growth Operations Lead", image: null }
            ].map((member, i) => (
              <motion.div 
                key={i}
                onHoverStart={playHoverSound}
                whileHover={{ y: -10 }}
                style={{ textAlign: 'left' }}
              >
                <div style={{ 
                  width: '100%', 
                  aspectRatio: '4/5', 
                  background: '#0a0a0a', 
                  border: '1px solid var(--grid-color)',
                  marginBottom: '20px',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}>
                  {member.image ? (
                    <motion.img 
                      whileHover={{ filter: 'grayscale(0%) contrast(100%)', scale: 1.05 }}
                      src={member.image} 
                      alt={member.name} 
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover', 
                        filter: 'grayscale(100%) contrast(110%)',
                        transition: 'filter 0.5s ease, transform 0.5s ease'
                      }} 
                    />
                  ) : (
                    <div className="mono" style={{ opacity: 0.1, fontSize: '0.7rem', textAlign: 'center' }}>
                      [ SYSTEM.USER_PENDING ]<br/>RECRUITING_CORE_TALENT
                    </div>
                  )}
                  <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '2px', background: member.image ? 'var(--accent-color)' : 'transparent', opacity: 0.5 }} />
                </div>
                <h4 className="mono" style={{ fontSize: '1rem', marginBottom: '5px', letterSpacing: '0.05em' }}>
                  {member.name}
                </h4>
                <p className="mono" style={{ color: 'var(--accent-color)', fontSize: '0.65rem', textTransform: 'uppercase', opacity: 0.7 }}>
                  {member.role}
                </p>
              </motion.div>
            ))}
          </div>
        </FadeSection>

        {/* CONTACT SECTION */}
        <FadeSection id="contact" style={{ textAlign: 'center', padding: '150px 10%', borderTop: '1px solid var(--grid-color)' }}>
          <SectionHeader title="Let's Talk" />
          <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)', marginBottom: '40px', fontWeight: 600 }}>Ready for the next level?</h2>
          <motion.button
            onHoverStart={playHoverSound}
            whileHover={{ 
              scale: 1.05, 
              backgroundColor: 'white', 
              color: 'black',
              transition: { duration: 0.1, ease: "linear" }
            }}
            whileTap={{ scale: 0.95 }}
            className="mono"
            style={{
              background: 'var(--accent-color)',
              border: 'none',
              color: 'black',
              padding: '25px 60px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 'bold',
              marginBottom: '80px'
            }}
          >
            BOOK A GROWTH AUDIT [FREE]
          </motion.button>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '60px' }} className="mono">
            <div style={{ textAlign: 'left' }}>
              <div style={{ color: 'var(--accent-color)', fontSize: '0.7rem', marginBottom: '10px' }}>/EMAIL</div>
              <a href="mailto:growth@yolo.agency">growth@yolo.agency</a>
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ color: 'var(--accent-color)', fontSize: '0.7rem', marginBottom: '10px' }}>/OFFICE</div>
              <p>Digital Nomad / Global</p>
            </div>
          </div>
        </FadeSection>
      </main>

      {/* Background Grid Elements */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `linear-gradient(var(--grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)`,
        backgroundSize: '80px 80px',
        pointerEvents: 'none',
        zIndex: -1
      }} />
    </div>
  );
};

export default App;

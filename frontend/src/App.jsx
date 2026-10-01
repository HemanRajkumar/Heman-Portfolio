import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Download,
  Github,
  Linkedin,
  Mail,
  Phone,
  Menu,
  X,
  ChevronDown,
  Code2,
  Database,
  BrainCircuit,
  ShieldCheck,
  Globe2,
  Terminal,
  Coffee,
  BarChart3,
  Table2,
  LineChart,
  Palette,
  GitBranch,
  Cloud,
  Monitor,
  Network,
  Users,
  RefreshCw,
  Sun,
  Moon,
} from "lucide-react";
import projects from "./data/projects.json";
import { SKILLS, CERTIFICATIONS, ACHIEVEMENTS } from "./data/cvData.js";
import AIChatBot from "./components/AIChatBot.jsx";

const skillIcons = {
  C: Code2,
  "C++": Code2,
  Python: Terminal,
  Java: Coffee,
  SQL: Database,
  NumPy: BarChart3,
  Pandas: Table2,
  "Scikit-learn": BrainCircuit,
  Matplotlib: LineChart,
  HTML: Code2,
  CSS: Palette,
  JavaScript: Code2,
  Git: GitBranch,
  GitHub: Github,
  "Google Colab": Cloud,
  "VS Code": Monitor,
  Linux: Terminal,
  "Cisco Packet Tracer": Network,
  "Problem-Solving": BrainCircuit,
  "Team Player": Users,
  Adaptability: RefreshCw,
};

const skillColors = {
  C: "#5c6bc0",
  "C++": "#00599c",
  Python: "#3776ab",
  Java: "#ed8b00",
  SQL: "#00758f",
  NumPy: "#4dabcf",
  Pandas: "#150458",
  "Scikit-learn": "#f7931e",
  Matplotlib: "#11557c",
  HTML: "#e34f26",
  CSS: "#1572b6",
  JavaScript: "#f7df1e",
  Git: "#f05032",
  GitHub: "#181717",
  "Google Colab": "#f9ab00",
  "VS Code": "#007acc",
  Linux: "#fcc624",
  "Cisco Packet Tracer": "#1ba0d7",
  "Problem-Solving": "#8b5cf6",
  "Team Player": "#10b981",
  Adaptability: "#06b6d4",
};

function SkillIcon({ name }) {
  const Icon = skillIcons[name] || Code2;
  return (
    <span
      className="skill-icon"
      style={{ "--skill-accent": skillColors[name] || "#9ca3af" }}
      aria-hidden="true"
    >
      <Icon size={17} strokeWidth={1.8} />
    </span>
  );
}

function Reveal({ children, className = "" }) {
  return <div className={`reveal ${className}`}>{children}</div>;
}

function SectionTitle({ number, eyebrow, title, text }) {
  return (
    <div className="section-title reveal">
      <div className="section-number">{number}</div>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        {text && <p className="section-copy">{text}</p>}
      </div>
    </div>
  );
}

function ProjectCard({ project, index }) {
  return (
    <motion.article
      className="project-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      whileHover={{ y: -8 }}
    >
      <div className="project-media">
        {(project.cover || project.gif) ? (
          <img
            src={project.cover || project.gif}
            alt={`${project.title} cover`}
            onError={(e) => {
              if (project.gif && !e.currentTarget.dataset.gifFallback) {
                e.currentTarget.dataset.gifFallback = "1";
                e.currentTarget.src = project.gif;
              } else {
                e.currentTarget.style.display = "none";
              }
            }}
          />
        ) : null}
        <div className="project-media-fallback">
          <Code2 size={42} strokeWidth={1.2} />
        </div>
        <span className="project-index">0{index + 1}</span>
      </div>
      <div className="project-content">
        <div className="project-heading">
          <h3>{project.title}</h3>
          <a href={project.github} target="_blank" rel="noreferrer" aria-label={`${project.title} GitHub`}>
            <ArrowUpRight size={18} />
          </a>
        </div>
        <p>{project.description}</p>
        <div className="tag-row">
          {project.tech.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}
        </div>
      </div>
    </motion.article>
  );
}

function SkillPanel() {
  return (
    <section id="skills" className="section">
      <SectionTitle
        number="03"
        eyebrow="TECHNICAL STACK"
        title="Tools I use to turn ideas into working software."
      />
      <div className="skills-layout reveal">
        {Object.entries(SKILLS).map(([category, items]) => (
          <div className="skill-group" key={category}>
            <div className="skill-group-title">{category}</div>
            <div className="skill-grid">
              {items.map((item) => (
                <div className="skill-item" key={item}>
                  <SkillIcon name={item} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="experience" className="section education-section">
      <SectionTitle
        number="04"
        eyebrow="EXPERIENCE & EDUCATION"
        title="The path behind the work."
        text="A timeline of my academic journey and current development."
      />
      <div className="timeline reveal">
        <div className="timeline-item timeline-current">
          <span className="timeline-dot" />
          <div className="timeline-card">
            <p className="timeline-date">August 2024 — Present</p>
            <h3>Bachelor of Technology, Computer Science & Engineering</h3>
            <p>Lovely Professional University · Phagwara, Punjab</p>
            <span className="timeline-meta">CGPA: 7.87</span>
          </div>
        </div>
        <div className="timeline-item">
          <span className="timeline-dot" />
          <div className="timeline-card">
            <p className="timeline-date">April 2022 — March 2024</p>
            <h3>Intermediate</h3>
            <p>Army Public School Bengdubi · Siliguri, West Bengal</p>
            <span className="timeline-meta">Percentage: 71.6%</span>
          </div>
        </div>
        <div className="timeline-item">
          <span className="timeline-dot" />
          <div className="timeline-card">
            <p className="timeline-date">April 2014 — March 2022</p>
            <h3>Matriculation</h3>
            <p>Army Public School Bengdubi · Siliguri, West Bengal</p>
            <span className="timeline-meta">Percentage: 84.2%</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Certifications() {
  return (
    <section id="certifications" className="section">
      <SectionTitle
        number="07"
        eyebrow="CERTIFICATIONS"
        title="Continuous learning."
        text="Professional certifications and learning milestones."
      />
      <div className="cert-grid reveal">
        {CERTIFICATIONS.map((cert) => (
          <a className="cert-card" href={cert.url} target="_blank" rel="noreferrer" key={cert.title}>
            <span>{cert.date}</span>
            <h3>{cert.title}</h3>
            <p>{cert.issuer || "Professional certification"}</p>
            <ArrowUpRight size={18} />
          </a>
        ))}
      </div>
    </section>
  );
}

function Achievements() {
  return (
    <section id="achievements" className="section achievements-section">
      <SectionTitle
        number="08"
        eyebrow="ACHIEVEMENTS"
        title="Milestones beyond the classroom."
        text="Hackathons, ambassador programs, recognitions, and other accomplishments."
      />
      <div className="achievement-grid reveal">
        {ACHIEVEMENTS.map((item) => (
          <a className="achievement-card" href={item.url} target="_blank" rel="noreferrer" key={item.title}>
            <span>{item.date}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <ArrowUpRight size={18} />
          </a>
        ))}
      </div>
    </section>
  );
}

function App() {
  const [menu, setMenu] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [contactStatus, setContactStatus] = useState("");
  const [theme, setTheme] = useState(() => localStorage.getItem("portfolio-theme") || "dark");

  const handleContactSubmit = (event) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const message = String(form.get("message") || "").trim();

    if (!name || !email || !message) {
      setContactStatus("Please complete all fields.");
      return;
    }

    const to = "hemanrajkumar359660070@gmail.com";
    const subject = encodeURIComponent(name);
    const body = encodeURIComponent(message);
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${subject}&body=${body}`;

    setContactStatus("Opening Gmail with your message ready to send…");
    window.open(gmailUrl, "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  useEffect(() => {
    const sections = ["about", "skills", "projects", "experience", "resume", "assistant", "certifications", "achievements", "contact"]
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.15, 0.4] }
    );
    sections.forEach((section) => sectionObserver.observe(section));

    const revealElements = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      revealElements.forEach((element) => element.classList.add("is-visible"));
      return () => sectionObserver.disconnect();
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -70px 0px" }
    );

    revealElements.forEach((element) => revealObserver.observe(element));

    return () => {
      sectionObserver.disconnect();
      revealObserver.disconnect();
    };
  }, []);

  const closeMenu = () => setMenu(false);

  return (
    <div className={`portfolio ${theme === "light" ? "light-theme" : ""}`}>
      <header className="navbar">
        <a className="brand" href="#top" onClick={closeMenu}>
          <span>HR</span>
          <b>HEMAN RAJKUMAR</b>
        </a>

        <button className="mobile-menu" onClick={() => setMenu(!menu)} aria-label="Menu">
          {menu ? <X /> : <Menu />}
        </button>

        <nav className={menu ? "nav-links open" : "nav-links"}>
          {[
            ["About", "#about", "about"],
            ["Skills", "#skills", "skills"],
            ["Projects", "#projects", "projects"],
            ["Experience", "#experience", "experience"],
            ["Resume", "#resume", "resume"],
            ["Certification", "#certifications", "certifications"],
            ["Achievements", "#achievements", "achievements"],
            ["Contact", "#contact", "contact"],
          ].map(([label, href, id]) => (
            <a
              key={label}
              href={href}
              onClick={closeMenu}
              className={activeSection === id ? "active" : ""}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <button
            className="theme-toggle"
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            {theme === "dark" ? (
            <Sun size={19} strokeWidth={1.8} />
          ) : (
            <svg viewBox="0 0 24 24" width="19" height="19" aria-hidden="true">
              <path
                d="M21 14.2A8.7 8.7 0 0 1 9.8 3a8.8 8.8 0 1 0 11.2 11.2Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
          </button>
          <a className="download-btn" href="/resume.pdf" download>
            <Download size={16} />
            Download CV
          </a>
        </div>
      </header>

      <main>
        <section id="top" className="hero">
          <div className="hero-grid" />
          <div className="hero-content">
            <motion.div
              className="hero-copy"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="eyebrow">Computer Science Student &amp; AI/ML Enthusiast</p>
              <h1>
                HEMAN
                <span>RAJKUMAR</span>
              </h1>
              <p className="hero-title">
                B.Tech Computer Science &amp; Engineering — AI/ML Enthusiast
              </p>
              <p className="hero-description">
                I study computer science at Lovely Professional University and spend most of my time turning that coursework into working software — FastAPI services, machine-learning pipelines, and interactive front ends. I’m drawn to problems where software development and applied AI meet.
              </p>
              <div className="hero-actions">
                <a className="primary-btn" href="#projects">View Projects <ArrowUpRight size={17} /></a>
                <a className="secondary-btn" href="#contact">Let's Connect <Mail size={17} /></a>
              </div>
              <div className="socials">
                <a href="https://github.com/HemanRajkumar" target="_blank" rel="noreferrer"><Github size={19} /></a>
                <a href="https://linkedin.com/in/hemanrajkumar" target="_blank" rel="noreferrer"><Linkedin size={19} /></a>
                <a href="mailto:hemanrajkumar359660070@gmail.com"><Mail size={19} /></a>
              </div>
            </motion.div>

            <motion.div
              className="hero-visual"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              <div className="orbit orbit-one" />
              <div className="orbit orbit-two" />
              <div className="planet">
                <div className="planet-core" />
              </div>
              <div className="floating-cube cube-one" />
              <div className="floating-cube cube-two" />
              <div className="floating-cube cube-three" />
              <div className="mountains" />
              <div className="profile-card">
                <div className="profile-photo">
                  <img
                    src="/assets/profile.jpg"
                    alt="Heman Rajkumar"
                    onError={(e) => {
                      if (e.currentTarget.dataset.fallback !== "1") {
                        e.currentTarget.dataset.fallback = "1";
                        e.currentTarget.src = "/assets/profile.jpg";
                      } else {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.parentElement.classList.add("image-missing");
                      }
                    }}
                  />
                </div>
                <div className="stats">
                  <div><strong>7.87</strong><span>CGPA</span></div>
                  <div><strong>5+</strong><span>Projects</span></div>
                  <div><strong>10+</strong><span>Technologies</span></div>
                </div>
                <div className="availability"><i /> Open to internships & collaborations</div>
              </div>
            </motion.div>
          </div>

          <div className="scroll-cue"><ChevronDown size={17} /> SCROLL</div>
        </section>

        <section id="about" className="section about-section">
          <SectionTitle number="01" eyebrow="ABOUT ME" title="A developer who learns by building." />
          <div className="about-grid reveal">
            <div className="about-large">
              <p>
                I’m a Computer Science and Engineering undergraduate at Lovely
                Professional University, building toward a career at the
                intersection of software development and applied machine learning.
              </p>
              <p>
                That's meant writing FastAPI backends, training Scikit-learn and
                TensorFlow models, wiring up Streamlit dashboards, and shipping
                plain HTML/CSS/JavaScript front ends when a project calls for it.
                I like the discipline of taking a rough problem — "what skills am
                I missing for this career path", "what should a farmer plant this
                season" — and turning it into something a person can actually use.
              </p>
              <p>
                Outside of solo projects, I've competed in hackathons and
                ambassador programs, which has meant working under time pressure
                with people I'd just met. I'd describe myself as a steady
                problem-solver: comfortable adapting to a new stack or a new
                teammate when a project needs it.
              </p>
            </div>
            <div className="about-facts">
              <div><span>FOCUS</span><strong>AI/ML · Software · Web</strong></div>
              <div><span>EDUCATION</span><strong>B.Tech CSE · LPU</strong></div>
              <div><span>APPROACH</span><strong>Problem-solving · Teamwork</strong></div>
              <div><span>INTEREST</span><strong>Building useful products</strong></div>
            </div>
          </div>
        </section>

        <section id="projects" className="section projects-section">
          <SectionTitle
            number="02"
            eyebrow="FEATURED PROJECTS"
            title="Selected work."
            text="A collection of AI/ML, web development, and software projects."
          />
          <div className="projects-grid reveal">
            {projects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}
          </div>
        </section>

        <SkillPanel />
        <Education />

        <section id="resume" className="resume-section section">
          <SectionTitle
            number="05"
            eyebrow="RESUME"
            title="A closer look at my work."
            text="My latest resume, with my education, technical skills, projects, certifications, and achievements."
          />
          <Reveal className="resume-card">
            <div className="resume-document">
              <div className="resume-file-icon"><Download size={22} /></div>
              <div>
                <span className="resume-kicker">HEMAN RAJKUMAR</span>
                <h3>Curriculum Vitae</h3>
                <p>Computer Science & Engineering · AI/ML · Full-Stack Development</p>
                <br />
              </div>
            </div>
            <div className="resume-actions">
              <a className="secondary-btn" href="/resume.html">View Resume <ArrowUpRight size={16} /></a>
              <a className="primary-btn" href="/resume.pdf" download><Download size={16} /> Download CV</a>
            </div>
          </Reveal>
        </section>
        <section id="assistant" className="section assistant-section">
          <SectionTitle
            number="06"
            eyebrow="AI PROJECT ASSISTANT"
            title="Explore my work."
            text="Ask about my projects, technical skills, technologies, or development experience."
          />
          <div className="assistant-shell">
            <div className="assistant-orb orb-one" />
            <div className="assistant-orb orb-two" />
            <div className="assistant-intro">
              <div className="assistant-icon"><BrainCircuit size={22} /></div>
              <div>
                <span className="assistant-label">PROJECT KNOWLEDGE BASE</span>
                <h3>Heman's Project Assistant</h3>
                <p>Ask about my projects, technical skills, technologies, or development experience.</p>
              </div>
            </div>
            <div className="assistant-interface">
              <AIChatBot />
            </div>
          </div>
        </section>
        <Certifications />
        <Achievements />

        <section id="contact" className="contact-section">
          <div className="contact-inner">
            <div className="contact-copy">
              <p className="eyebrow">09 / CONTACT</p>
              <h2>Let's connect.</h2>
              <p className="contact-lead">
                Open to internships, collaborations, and conversations about
                AI/ML or web projects.
              </p>
              <div className="contact-mini-links">
                <a href="mailto:hemanrajkumar359660070@gmail.com"><Mail size={16} /> Email me</a>
                <a href="tel:+919339026536"><Phone size={16} /> +91 93390 26536</a>
                <a href="https://github.com/HemanRajkumar" target="_blank" rel="noreferrer"><Github size={16} /> GitHub</a>
                <a href="https://linkedin.com/in/hemanrajkumar" target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn</a>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleContactSubmit}>
              <div className="form-heading">
                <span>START A CONVERSATION</span>
                <strong>Send me a message.</strong>
              </div>

              <div className="form-row">
                <label>
                  <span>Your name</span>
                  <input name="name" type="text" placeholder="Enter your name" autoComplete="name" />
                </label>
                <label>
                  <span>Email address</span>
                  <input name="email" type="email" placeholder="you@example.com" autoComplete="email" />
                </label>
              </div>

              <label>
                <span>Your message</span>
                <textarea name="message" rows="6" placeholder="Tell me about your idea, opportunity, or project…" />
              </label>

              <div className="form-footer">
                <p>{contactStatus || "I’ll get back to you as soon as possible."}</p>
                <button className="primary-btn contact-submit" type="submit">
                  Send Message <ArrowUpRight size={18} />
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>© {new Date().getFullYear()} Heman Rajkumar</span>
        <span>AI • ML • FULL-STACK</span>
      </footer>
    </div>
  );
}

export default App;

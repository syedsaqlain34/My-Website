import { useEffect, useState } from 'react';

const typingOptions = [
  'Frontend Developer',
  'React.js Developer',
  'UI/UX Enthusiast',
  'Web Developer'
];

const skills = [
  { label: 'HTML5 & CSS3', level: 95 },
  { label: 'React.js', level: 92 },
  { label: 'Tailwind CSS', level: 92 },
  { label: 'JavaScript (ES6+)', level: 90 },
  { label: 'Git & GitHub', level: 88 },
  { label: 'Node.js', level: 85 }
];

const projects = [

  {
    title: 'E-Tutor',
    description: 'Modern Responsive E-Learning Platform built with React.js, Tailwind CSS, and Framer-Motion',
    image: 'images/E-tutor1.webp',
    href: 'https://e-tutor-tcj.netlify.app/',
    tags: ['React', 'Tailwind', 'FramerMotion']
  },

  {
    title: 'Job Portal Dashboard',
    description: 'Modern project built with React and Tailwind CSS. Smooth animations and responsive design.',
    image: 'images/job-portal-pic.jpg',
    href: 'https://job-portaldashboard.netlify.app/',
    tags: ['React', 'Tailwind', 'JavaScript']
  },

  {
    title: 'Plant.Pk Shop',
    description: 'Pakistan premier online nursery. Shop plants, flowers, seeds and professional gardening services with doorstep delivery.',
    image: 'images/plant,pk picture.jpg',
    href: 'https://plant-pk-shop.vercel.app/',
    tags: ['React', 'Tailwind', 'JavaScript']
  },

  {
    title: 'Damelo Real Estate',
    description: 'Client project. Built with React.js & Tailwind CSS. Real estate platform with modern UI.',
    image: 'images/Damelo.png',
    href: 'https://damelo.vercel.app/',
    tags: ['React', 'Tailwind', 'Client']
  },
  {
    title: 'Coffee Shop',
    description: 'Single-page website with HTML, CSS & JavaScript. Two stakeholders (Buyer and Seller).',
    image: 'images/coffee-shop-logo.jpg',
    href: 'https://cafea.netlify.app',
    tags: ['HTML', 'CSS', 'JavaScript']
  },
  {
    title: 'Spark Landing Page',
    description: 'Modern landing page with React and Tailwind CSS. Smooth animations and responsive design.',
    image: 'images/spark.jpeg',
    href: 'https://sparklandingpage.netlify.app/',
    tags: ['React', 'Tailwind', 'JavaScript']
  }
];

function App() {
  const [typingText, setTypingText] = useState(typingOptions[0]);
  const [typingIndex, setTypingIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formErrors, setFormErrors] = useState({});
  const [formMessage, setFormMessage] = useState('');
  const [year] = useState(new Date().getFullYear());

  useEffect(() => {
    const interval = setInterval(() => {
      setTypingIndex((current) => {
        const next = (current + 1) % typingOptions.length;
        setTypingText(typingOptions[next]);
        return next;
      });
    }, 2400);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      setHeaderScrolled(scrollY > 60);
      setShowScrollTop(scrollY > 400);
    };

    window.addEventListener('scroll', onScroll);
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
  }, [isMenuOpen]);

  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.1
      }
    );

    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (event, href) => {
    event.preventDefault();
    setIsMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const errors = {};
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Enter a valid email';
    }
    if (!formData.subject.trim()) {
      errors.subject = 'Subject is required';
    }
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    }

    setFormErrors(errors);
    if (Object.keys(errors).length) return;

    setFormMessage('Message sent successfully!');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setFormMessage(''), 4000);
  };

  return (
    <>
      <button
        className={`scroll-top ${showScrollTop ? 'visible' : ''}`}
        aria-label="Scroll to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <i className="fas fa-arrow-up" />
      </button>

      <header className={`header ${headerScrolled ? 'scrolled' : ''}`} id="header">
        <nav className="nav container">
          <a href="#home" className="nav-logo" onClick={(e) => handleNavClick(e, '#home')}>
            Syed<span>Saqlain</span>.
          </a>

          <div className={`nav-overlay ${isMenuOpen ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)} aria-hidden="true" />

          <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`} id="nav-menu" role="navigation" aria-label="Main menu">
            <li>
              <a href="#home" className="nav-link" onClick={(e) => handleNavClick(e, '#home')}>
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="nav-link" onClick={(e) => handleNavClick(e, '#about')}>
                About
              </a>
            </li>
            <li>
              <a href="#experience" className="nav-link" onClick={(e) => handleNavClick(e, '#experience')}>
                Experience
              </a>
            </li>
            <li>
              <a href="#services" className="nav-link" onClick={(e) => handleNavClick(e, '#services')}>
                Services
              </a>
            </li>
            <li>
              <a href="#skills" className="nav-link" onClick={(e) => handleNavClick(e, '#skills')}>
                Skills
              </a>
            </li>
            <li>
              <a href="#projects" className="nav-link" onClick={(e) => handleNavClick(e, '#projects')}>
                Projects
              </a>
            </li>
            <li>
              <a href="#contact" className="nav-link" onClick={(e) => handleNavClick(e, '#contact')}>
                Contact
              </a>
            </li>
          </ul>

          <button
            className={`nav-toggle ${isMenuOpen ? 'active' : ''}`}
            id="nav-toggle"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span className="nav-toggle-bar" />
            <span className="nav-toggle-bar" />
            <span className="nav-toggle-bar" />
          </button>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-bg">
            <div className="hero-gradient" />
            <div className="hero-grid" />
            <div className="hero-blur hero-blur-1" />
            <div className="hero-blur hero-blur-2" />
          </div>
          <div className="container hero-container">
            <div className="hero-content">
              <p className="hero-badge reveal" data-delay="0">
                Based in Doha, Qatar · Available now
              </p>
              <h1 className="hero-title reveal" data-delay="100">
                <span className="line">Hi, I'm</span>
                <span className="line name">Syed Saqlain</span>
              </h1>
              <p className="hero-subtitle reveal" data-delay="200">
                <span className="typing">{typingText}</span>
              </p>
              <p className="hero-desc reveal" data-delay="300">
                Building modern, responsive & scalable web applications with React.js & Tailwind CSS. Open to Frontend / Web Developer opportunities.
              </p>
              <div className="hero-actions reveal" data-delay="400">
                <a href="#contact" className="btn btn-primary">
                  <span>Get in touch</span>
                  <i className="fas fa-arrow-right" />
                </a>
                <a href="assests/Syed-Saqlain-Web-Developer-CV.pdf" download className="btn btn-outline">
                  <i className="fas fa-download" />
                  <span>Download CV</span>
                </a>
              </div>
              <div className="hero-social reveal" data-delay="500">
                <a href="https://github.com/syedsaqlain34" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <i className="fab fa-github" />
                </a>
                <a href="https://www.linkedin.com/in/syed-saqlain-06330b318?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <i className="fab fa-linkedin-in" />
                </a>
                <a href="https://www.instagram.com/syed_saqlain34?igsh=MXNocWgxcjJnb2l3dA==" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <i className="fab fa-instagram" />
                </a>
              </div>
            </div>
            <div className="hero-visual reveal" data-delay="200">
              <div className="hero-card">
                <div className="hero-card-glow" aria-hidden="true" />
                <div className="hero-img-wrap">
                  <img src="images/my-pic.jpeg" alt="Syed Saqlain - Frontend Developer" className="hero-img" width="320" height="320" />
                </div>
              </div>
            </div>
          </div>
          <div className="hero-scroll">
            <span>Scroll</span>
            <div className="hero-scroll-line" />
          </div>
        </section>

        <section className="section about" id="about">
          <div className="container">
            <div className="section-head reveal">
              <span className="section-label">About me</span>
              <h2 className="section-title">Who I am</h2>
            </div>
            <div className="about-grid">
              <div className="about-stats-wrap reveal">
                <div className="about-stats">
                  <div className="stat">
                    <strong className="stat-num">3</strong>
                    <span>Years Experience</span>
                  </div>
                  <div className="stat">
                    <strong className="stat-num">15</strong>
                    <span>Projects Done</span>
                  </div>
                  <div className="stat">
                    <strong className="stat-num">30</strong>
                    <span>% UI Impact</span>
                  </div>
                </div>
              </div>
              <div className="about-content">
                <p className="about-lead reveal">
                  I'm <strong>Syed Saqlain</strong>, a <span className="typing-2">{typingText}</span> with <strong>3+ years</strong> of experience building modern, responsive, and scalable web applications.
                </p>
                <p className="reveal">
                  Frontend Web Developer with over 3+ years of experience building responsive and scalable web applications using React.js, JavaScript, HTML5,
                  CSS3, and Tailwind CSS. Experienced in developing real-world web applications including job portals, dashboards, e-commerce platforms, and
                  business websites. Strong background in component-based architecture, REST API integration, and responsive UI development. Skilled at
                  collaborating with cross-functional teams in Agile environments to deliver high-quality software solutions.
                  Currently based in Doha, Qatar with a transferable visa and immediate availability. Actively seeking Frontend Developer or Web Developer
                  opportunities.
                </p>

                <div className="about-meta reveal">
                  <span><i className="fas fa-map-marker-alt" /> Doha, Qatar</span>
                  <span><i className="fas fa-id-card" /> Transferable Iqama</span>
                  <span><i className="fas fa-language" /> English, Urdu, Hindi</span>
                </div>
                <a href="assests/Syed-Saqlain-Web-Developer-CV.pdf" download className="btn btn-primary reveal">
                  <i className="fas fa-download" /> Download Resume
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="section experience" id="experience">
          <div className="container">
            <div className="section-head reveal">
              <span className="section-label">Experience</span>
              <h2 className="section-title">Work history</h2>
            </div>
            <div className="timeline">
              <article className="timeline-item reveal">
                <div className="timeline-dot" />
                <div className="timeline-content">
                  <span className="timeline-date">Sep 2025 – Oct 2025</span>
                  <h3>Frontend Developer</h3>
                  <p className="timeline-company">CodeAlpha</p>
                  <p className="timeline-location">Remote, Pakistan</p>
                  <p>
                    Innovative Frontend Developer focused on responsive, user-friendly web applications. Developed dynamic user interfaces using HTML, CSS, and JavaScript frameworks, resulting in a <strong>30% increase in user interaction</strong>.
                  </p>
                </div>
              </article>
              <article className="timeline-item reveal">
                <div className="timeline-dot" />
                <div className="timeline-content">
                  <span className="timeline-date">Jan 2024 – Feb 2025</span>
                  <h3>Frontend Developer</h3>
                  <p className="timeline-company">Xenova Soft</p>
                  <p className="timeline-location">Bahria Town Phase 8, Islamabad, Pakistan</p>
                  <ul>
                    <li>Developed responsive web interfaces using React.js and Tailwind CSS for real client projects including job portals and business websites</li>
                    <li> Built reusable UI components and scalable frontend architecture to improve development efficiency</li>
                    <li>Integrated REST APIs to dynamically load and display application data.</li>
                    <li>Collaborated with senior developers using Git and GitHub in Agile workflows</li>
                    <li>Contributed to real client projects including landing pages and job portal interfaces</li>
                    <li>Improved UI performance and cross-browser compatibility</li>
                  </ul>
                </div>
              </article>
              <article className="timeline-item reveal">
                <div className="timeline-dot" />
                <div className="timeline-content">
                  <span className="timeline-date">Nov 2021 – Feb 2024</span>
                  <h3>Web Developer</h3>
                  <p className="timeline-company">Giga Developers</p>
                  <p className="timeline-location">Islamabad, Pakistan</p>
                  <ul>
                    <li> Worked on web development projects involving frontend development, data processing, and performance optimization.
                    </li>
                    <li>Built reusable UI components and scalable frontend architecture</li>
                    <li>Collaborated with crossfunctional teams to deliver highquality web applications aligned with client requirements</li>
                    <li>Troubleshot and resolved development issues to ensure application stability and reliability</li>
                    <li>Demonstrated strong analytical and technical problemsolving skills in project implementation.
                    </li>
                  </ul>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="section education">
          <div className="container">
            <div className="section-head reveal">
              <span className="section-label">Education</span>
              <h2 className="section-title">Background</h2>
            </div>
            <div className="edu-card reveal">
              <div className="edu-icon"><i className="fas fa-graduation-cap" /></div>
              <h3>Bachelor of Science – Software Engineering</h3>
              <p className="edu-school">Riphah International University</p>
              <p className="edu-place">Pakistan</p>
            </div>
          </div>
        </section>

        <section className="section services" id="services">
          <div className="container">
            <div className="section-head reveal">
              <span className="section-label">Services</span>
              <h2 className="section-title">What I provide</h2>
            </div>
            <div className="services-grid">
              <article className="service-card reveal">
                <div className="service-icon"><i className="fas fa-code" /></div>
                <h3>Web Development</h3>
                <p>Responsive, SEO-optimized web interfaces using React.js, Tailwind CSS, HTML5 & JavaScript.</p>
              </article>
              <article className="service-card reveal">
                <div className="service-icon"><i className="fas fa-paint-brush" /></div>
                <h3>UI/UX & Front-End Design</h3>
                <p>User-friendly interfaces, landing pages, and scalable frontend architecture.</p>
              </article>
              <article className="service-card reveal">
                <div className="service-icon"><i className="fas fa-mobile-alt" /></div>
                <h3>Responsive Design</h3>
                <p>Mobile-first, cross-browser compatible layouts that work on all devices.</p>
              </article>
              <article className="service-card reveal">
                <div className="service-icon"><i className="fas fa-rocket" /></div>
                <h3>Performance & SEO</h3>
                <p>On-page optimization and performance tuning for faster, SEO-friendly apps.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section skills" id="skills">
          <div className="container">
            <div className="section-head reveal">
              <span className="section-label">Skills</span>
              <h2 className="section-title">Technical expertise</h2>
            </div>
            <div className="skills-wrap">
              <div className="skills-intro reveal">
                <p>I work with modern front-end technologies and tools to deliver clean, maintainable code and great user experiences.</p>
              </div>
              <div className="skills-grid reveal">
                {skills.map((skill) => (
                  <div className="skill-item" key={skill.label} data-level={skill.level}>
                    <div className="skill-header">
                      <span>{skill.label}</span>
                      <span className="skill-pct">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <div className="skill-fill" style={{ width: `${skill.level}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section projects" id="projects">
          <div className="container">
            <div className="section-head reveal">
              <span className="section-label">Projects</span>
              <h2 className="section-title">Featured work</h2>
            </div>
            <div className="project-filters reveal">
              <button type="button" className="filter-btn active" data-filter="all">
                All
              </button>
              <button type="button" className="filter-btn" data-filter="react">
                React
              </button>
              <button type="button" className="filter-btn" data-filter="fullstack">
                Full Stack
              </button>
              <button type="button" className="filter-btn" data-filter="ui">
                UI / Design
              </button>
            </div>
            <div className="projects-grid">
              {projects.map((project) => (
                <article className="project-card reveal" data-category={project.tags[0].toLowerCase()} key={project.title}>
                  <div className="project-media">
                    <img src={project.image} alt={project.title} />
                    <div className="project-overlay">
                      <a href={project.href} target="_blank" rel="noopener noreferrer" className="project-link">
                        View Live <i className="fas fa-external-link-alt" />
                      </a>
                    </div>
                  </div>
                  <div className="project-body">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="project-tags">
                      {project.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section contact" id="contact">
          <div className="container">
            <div className="section-head reveal">
              <span className="section-label">Contact</span>
              <h2 className="section-title">Get in touch</h2>
            </div>
            <div className="contact-grid">
              <div className="contact-info reveal">
                <p>
                  I'm open to Frontend / Web Developer opportunities. Based in <strong>Doha, Qatar</strong> with transferable Iqama — available immediately.
                </p>
                <div className="contact-list">
                  <div className="contact-item">
                    <i className="fas fa-user" />
                    <div>
                      <span className="contact-label">Name</span>
                      <span>Syed Saqlain</span>
                    </div>
                  </div>
                  <div className="contact-item">
                    <i className="fas fa-map-marker-alt" />
                    <div>
                      <span className="contact-label">Location</span>
                      <span>Doha, Qatar</span>
                    </div>
                  </div>
                  <div className="contact-item">
                    <i className="fas fa-envelope" />
                    <div>
                      <span className="contact-label">Email</span>
                      <a href="mailto:software.engr34@gmail.com">software.engr34@gmail.com</a>
                    </div>
                  </div>
                  <div className="contact-item">
                    <i className="fas fa-phone" />
                    <div>
                      <span className="contact-label">Phone</span>
                      <a href="tel:+97433949820">+974 33949820</a>
                    </div>
                  </div>
                </div>
                <div className="contact-social">
                  <a href="https://github.com/syedsaqlain34" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <i className="fab fa-github" />
                  </a>
                  <a href="https://www.linkedin.com/in/syed-saqlain-06330b318?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <i className="fab fa-linkedin-in" />
                  </a>
                  <a href="https://www.instagram.com/syed_saqlain34?igsh=MXNocWgxcjJnb2l3dA==" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <i className="fab fa-instagram" />
                  </a>
                  <a href="https://folioray.com/hktevuvt1p" target="_blank" rel="noopener noreferrer" aria-label="MyWebsite">
                    <i className="fab fa-codepen" />
                  </a>
                </div>
              </div>
              <form className="contact-form reveal" id="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <input type="text" id="name" name="name" placeholder="Your Name *" required value={formData.name} onChange={handleFormChange} />
                    <span className="error">{formErrors.name}</span>
                  </div>
                  <div className="form-group">
                    <input type="email" id="email" name="email" placeholder="Your Email *" required value={formData.email} onChange={handleFormChange} />
                    <span className="error">{formErrors.email}</span>
                  </div>
                </div>
                <div className="form-group">
                  <input type="text" id="subject" name="subject" placeholder="Subject *" required value={formData.subject} onChange={handleFormChange} />
                  <span className="error">{formErrors.subject}</span>
                </div>
                <div className="form-group">
                  <textarea id="message" name="message" rows="5" placeholder="Your Message *" required value={formData.message} onChange={handleFormChange} />
                  <span className="error">{formErrors.message}</span>
                </div>
                <button type="submit" className="btn btn-primary">
                  <span>Send Message</span>
                  <i className="fas fa-paper-plane" />
                </button>
                <p className="form-feedback">{formMessage}</p>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-inner">
            <div className="footer-brand">
              <h3>Syed Saqlain</h3>
              <p>Frontend Developer · Doha, Qatar</p>
            </div>
            <ul className="footer-links">
              <li><a href="#home" onClick={(e) => handleNavClick(e, '#home')}>Home</a></li>
              <li><a href="#about" onClick={(e) => handleNavClick(e, '#about')}>About</a></li>
              <li><a href="#experience" onClick={(e) => handleNavClick(e, '#experience')}>Experience</a></li>
              <li><a href="#projects" onClick={(e) => handleNavClick(e, '#projects')}>Projects</a></li>
              <li><a href="#contact" onClick={(e) => handleNavClick(e, '#contact')}>Contact</a></li>
            </ul>
            <div className="footer-social">
              <a href="https://github.com/syedsaqlain34" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><i className="fab fa-github" /></a>
              <a href="https://www.linkedin.com/in/syed-saqlain-06330b318?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="fab fa-linkedin-in" /></a>
              <a href="https://www.instagram.com/syed_saqlain34?igsh=MXNocWgxcjJnb2l3dA==" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fab fa-instagram" /></a>
            </div>
          </div>
          <p className="footer-copy">&copy; {year} Syed Saqlain. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default App;

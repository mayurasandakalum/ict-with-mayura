import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "../components/ThemeToggle";
import MarkmapPreview from "../components/MarkmapPreview";

export function HomePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const scrollToJoin = () => {
    document.getElementById("join")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, phone } = formData;

    if (!name.trim() || !email.trim() || !phone.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    alert("Thank you! Your PDF will be sent to your email shortly.");
    setFormData({ name: "", email: "", phone: "" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleToolClick = (toolName: string) => {
    alert(`${toolName} functionality would be implemented here!`);
  };

  const handleMarkmapPreviewClick = () => {
    // You could navigate to a dedicated grades page or show a modal
    alert(
      "Click on 'View Mind Maps' button to explore detailed mind maps for each grade!"
    );
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="logo">Mayura ICT</div>
          <nav className="nav">
            <a href="#mindmaps">Mind Maps</a>
            <a href="#notes">Notes</a>
            <a href="#schedule">Schedule</a>
            <a href="#results">Results</a>
            <a href="#contact">Contact</a>
            <button className="btn primary" onClick={scrollToJoin}>
              Join Class
            </button>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>ICT පටන් ගන්න කලින් සිතියම බලමු</h1>
            <p>
              Start with the mind map. See the big picture, master the details,
              score higher.
            </p>
            <div className="hero-buttons">
              <a href="#mindmaps" className="btn primary">
                View Mind Maps
              </a>
              <button className="btn" onClick={scrollToJoin}>
                Join Class
              </button>
            </div>
            <div className="hero-tags">
              <span className="tag">O/L</span>
              <span className="tag">A/L</span>
              <span className="tag">සිංහල + English</span>
            </div>
          </div>
          <div className="hero-visual">
            <MarkmapPreview />
          </div>
        </div>
      </section>

      {/* Method Strip */}
      <section className="method-strip">
        <div className="container">
          <div className="method-items">
            <div className="method-item">
              <div className="method-item-icon">🗺️</div>
              <h3>Map</h3>
              <p>Big-picture first for confidence.</p>
            </div>
            <div className="method-item">
              <div className="method-item-icon">📝</div>
              <h3>Short Notes</h3>
              <p>Exam-focused, bite-sized.</p>
            </div>
            <div className="method-item">
              <div className="method-item-icon">✅</div>
              <h3>Quick Quizzes</h3>
              <p>Instant feedback with "why".</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mind Maps */}
      <section id="mindmaps" className="section">
        <div className="container">
          <div className="section-header">
            <h2>Mind Maps by Grade</h2>
          </div>
          <div className="grade-grid">
            <div
              className="card grade-card"
              style={{ "--color": "var(--grade-10)" } as React.CSSProperties}
            >
              <div className="grade-card-header">
                <div className="grade-info">
                  <h3>Grade 10</h3>
                  <span>24 topics</span>
                </div>
                <button
                  className="btn primary"
                  onClick={() => navigate("/study/ol")}
                >
                  Open Map
                </button>
              </div>
              <p>Foundation of ICT.</p>
            </div>
            <div
              className="card grade-card"
              style={{ "--color": "var(--grade-11)" } as React.CSSProperties}
            >
              <div className="grade-card-header">
                <div className="grade-info">
                  <h3>Grade 11</h3>
                  <span>26 topics</span>
                </div>
                <button
                  className="btn primary"
                  onClick={() => navigate("/study/ol")}
                >
                  Open Map
                </button>
              </div>
              <p>Exam-focused practice.</p>
            </div>
            <div
              className="card grade-card"
              style={{ "--color": "var(--grade-12)" } as React.CSSProperties}
            >
              <div className="grade-card-header">
                <div className="grade-info">
                  <h3>Grade 12</h3>
                  <span>32 topics</span>
                </div>
                <button
                  className="btn primary"
                  onClick={() => navigate("/study/al-12")}
                >
                  Open Map
                </button>
              </div>
              <p>Core A/L theory.</p>
            </div>
            <div
              className="card grade-card"
              style={{ "--color": "var(--grade-13)" } as React.CSSProperties}
            >
              <div className="grade-card-header">
                <div className="grade-info">
                  <h3>Grade 13</h3>
                  <span>28 topics</span>
                </div>
                <button
                  className="btn primary"
                  onClick={() => navigate("/study/al-12")}
                >
                  Open Map
                </button>
              </div>
              <p>Advanced + revision.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Notes + Quiz */}
      <section id="notes" className="section">
        <div className="container">
          <div className="two-column">
            <div className="card notes-section">
              <h3>Short Notes</h3>
              <ul>
                <li>Data Representation – 2 min read</li>
                <li>Logic Gates – 2 min read</li>
                <li>Networking Basics – 3 min read</li>
              </ul>
              <button className="btn primary">Browse Notes</button>
            </div>
            <div className="card quiz-section">
              <h3>Quick Quiz</h3>
              <p>Try 5 MCQs with explanations</p>
              <button className="btn primary">Start Quiz</button>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section id="schedule" className="section">
        <div className="container">
          <div className="section-header">
            <h2>Schedule</h2>
          </div>
          <div className="schedule-list">
            <div className="card schedule-card">
              <div className="schedule-info">
                <h4>O/L Grade 10</h4>
                <p>Sun 10:00–12:00 - Center - EBS Kuliyapitiya</p>
              </div>
              <button className="btn primary">Reserve Seat</button>
            </div>
            <div className="card schedule-card">
              <div className="schedule-info">
                <h4>O/L Grade 11</h4>
                <p>Sun 10:00–12:00 - Center - EBS Kuliyapitiya</p>
              </div>
              <button className="btn primary">Reserve Seat</button>
            </div>
            <div className="card schedule-card">
              <div className="schedule-info">
                <h4>A/L Grade 12</h4>
                <p>Sat 10:00–12:00 - Online - Zoom</p>
              </div>
              <button className="btn primary">Reserve Seat</button>
            </div>
            <div className="card schedule-card">
              <div className="schedule-info">
                <h4>A/L Grade 13</h4>
                <p>Sat 10:00–12:00 - Online - Zoom</p>
              </div>
              <button className="btn primary">Reserve Seat</button>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section id="results" className="section">
        <div className="container">
          <div className="results-stats">
            <div className="card stat-card">
              <div className="stat-number">+18</div>
              <p>average marks in 6 weeks</p>
            </div>
            <div className="card stat-card">
              <div className="stat-number">92%</div>
              <p>attendance streak</p>
            </div>
            <div className="card stat-card">
              <div className="stat-number">120+</div>
              <p>students supported</p>
            </div>
          </div>
          <div className="testimonials">
            <div className="testimonial">
              <h4>Student 1</h4>
              <p>"Mind maps helped me revise fast before exams."</p>
            </div>
            <div className="testimonial">
              <h4>Student 2</h4>
              <p>"Mind maps helped me revise fast before exams."</p>
            </div>
            <div className="testimonial">
              <h4>Student 3</h4>
              <p>"Mind maps helped me revise fast before exams."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Quick Tools</h2>
          </div>
          <div className="tools-grid">
            <div
              className="tool-card"
              onClick={() => handleToolClick("Binary ⇄ Decimal")}
            >
              <span className="tool-icon">🔢</span>
              <span>Binary ⇄ Decimal</span>
            </div>
            <div
              className="tool-card"
              onClick={() => handleToolClick("Truth Table")}
            >
              <span className="tool-icon">📐</span>
              <span>Truth Table</span>
            </div>
            <div
              className="tool-card"
              onClick={() => handleToolClick("Subnet Helper")}
            >
              <span className="tool-icon">🌐</span>
              <span>Subnet Helper</span>
            </div>
            <div
              className="tool-card"
              onClick={() => handleToolClick("SQL Sample")}
            >
              <span className="tool-icon">🗄️</span>
              <span>SQL Sample</span>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="section">
        <div className="container">
          <div className="about-content">
            <div className="about-photo">Your Photo</div>
            <div className="about-text">
              <h2>About Mayura</h2>
              <ul>
                <li>AI Engineer - B.Sc. (Hons) in Data Science</li>
                <li>Mind map–first learning method</li>
                <li>Exam-focused practice with feedback</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>FAQ</h2>
          </div>
          <div className="faq-list">
            <div className="card faq-item">
              <h4>Is the class Sinhala or English?</h4>
              <p>
                Sinhala medium with English technical terms for exam alignment.
              </p>
            </div>
            <div className="card faq-item">
              <h4>Online or physical?</h4>
              <p>Both options; schedule shows details.</p>
            </div>
            <div className="card faq-item">
              <h4>Are mind maps printable?</h4>
              <p>Yes, each grade has a PDF.</p>
            </div>
            <div className="card faq-item">
              <h4>Do I get past paper links?</h4>
              <p>Nodes are tagged with past questions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Magnet */}
      <section id="join" className="section lead-magnet">
        <div className="container">
          <h2>Free O/L ICT Power Sheet</h2>
          <form className="lead-form" onSubmit={handleFormSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="WhatsApp Number"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
            <button type="submit" className="btn primary">
              Get PDF
            </button>
          </form>
          <p className="privacy-note">We respect your privacy.</p>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="footer">
        <div className="container">
          <div className="footer-contact">
            <a href="tel:0701235142">Call: 070 123 5142</a>
            <a href="#">WhatsApp</a>
            <a href="mailto:">Email</a>
          </div>
          <p>&copy; 2025 Mayura ICT</p>
        </div>
      </footer>
    </div>
  );
}

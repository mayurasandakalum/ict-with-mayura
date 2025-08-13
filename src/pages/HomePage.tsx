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
      alert("කරුණාකර සියලුම ක්ෂේත්‍ර පුරවන්න.");
      return;
    }

    alert("ස්තූතියි! ඔබගේ PDF කෙටි වේලාවකින් ඔබගේ විද්‍යුත් තැපෑලට එවනු ලැබේ.");
    setFormData({ name: "", email: "", phone: "" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleToolClick = (toolName: string) => {
    alert(`${toolName} ක්‍රියාකාරීත්වය මෙහි ක්‍රියාත්මක වනු ඇත!`);
  };

  // const handleMarkmapPreviewClick = () => {
  //   // You could navigate to a dedicated grades page or show a modal
  //   alert(
  //     "Click on 'View Mind Maps' button to explore detailed mind maps for each grade!"
  //   );
  // };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="logo">මයურ ICT</div>
          <nav className="nav">
            <a href="#mindmaps">Mind Maps</a>
            <a href="#notes">සටහන්</a>
            <a href="#schedule">කාලසටහන</a>
            <a href="#results">ප්‍රතිඵල</a>
            <a href="#contact">සම්බන්ධ වන්න</a>
            <button className="btn primary" onClick={scrollToJoin}>
              පන්තියට සහභාගී වන්න
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
              Mind Maps වලින් පටන් ගන්න. විශාල චිත්‍රය බලන්න, විස්තර ප්‍රගුණ
              කරන්න, ඉහළ ලකුණු ලබා ගන්න.
            </p>
            <div className="hero-buttons">
              <a href="#mindmaps" className="btn primary">
                Mind Maps බලන්න
              </a>
              <button className="btn" onClick={scrollToJoin}>
                පන්තියට සහභාගී වන්න
              </button>
            </div>
            <div className="hero-tags">
              <span className="tag">සා/පෙළ</span>
              <span className="tag">උ/පෙළ</span>
              <span className="tag">සිංහල + ඉංග්‍රීසි</span>
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
              <h3>සිතියම</h3>
              <p>විශ්වාසය සඳහා පළමුව විශාල චිත්‍රය.</p>
            </div>
            <div className="method-item">
              <div className="method-item-icon">📝</div>
              <h3>කෙටි සටහන්</h3>
              <p>විභාග ඉලක්ක කරගත්, කුඩා කොටස්.</p>
            </div>
            <div className="method-item">
              <div className="method-item-icon">📄</div>
              <h3>ප්‍රශ්න පත්‍ර</h3>
              <p>පසුගිය ප්‍රශ්න පත්‍ර සමඟ පුහුණු වන්න.</p>
            </div>
            <div className="method-item">
              <div className="method-item-icon">🖋️</div>
              <h3>Marking Schemes</h3>
              <p>ලකුණු දීමේ නිර්ණායක තේරුම් ගන්න.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mind Maps */}
      <section id="mindmaps" className="section">
        <div className="container">
          <div className="section-header">
            <h2>ශ්‍රේණිය අනුව Mind Maps</h2>
          </div>
          <div className="grade-grid">
            <div
              className="card grade-card"
              style={{ "--color": "var(--grade-10)" } as React.CSSProperties}
            >
              <div className="grade-card-header">
                <div className="grade-info">
                  <h3>10 ශ්‍රේණිය</h3>
                  <span>මාතෘකා 24</span>
                </div>
                <button
                  className="btn primary"
                  onClick={() => navigate("/study/ol")}
                >
                  සිතියම විවෘත කරන්න
                </button>
              </div>
              <p>ICT හි පදනම.</p>
            </div>
            <div
              className="card grade-card"
              style={{ "--color": "var(--grade-11)" } as React.CSSProperties}
            >
              <div className="grade-card-header">
                <div className="grade-info">
                  <h3>11 ශ්‍රේණිය</h3>
                  <span>මාතෘකා 26</span>
                </div>
                <button
                  className="btn primary"
                  onClick={() => navigate("/study/ol")}
                >
                  සිතියම විවෘත කරන්න
                </button>
              </div>
              <p>විභාග ඉලක්ක කරගත් පුහුණුව.</p>
            </div>
            <div
              className="card grade-card"
              style={{ "--color": "var(--grade-12)" } as React.CSSProperties}
            >
              <div className="grade-card-header">
                <div className="grade-info">
                  <h3>12 ශ්‍රේණිය</h3>
                  <span>මාතෘකා 32</span>
                </div>
                <button
                  className="btn primary"
                  onClick={() => navigate("/study/al-12")}
                >
                  සිතියම විවෘත කරන්න
                </button>
              </div>
              <p>උ/පෙළ මූලික සිද්ධාන්ත.</p>
            </div>
            <div
              className="card grade-card"
              style={{ "--color": "var(--grade-13)" } as React.CSSProperties}
            >
              <div className="grade-card-header">
                <div className="grade-info">
                  <h3>13 ශ්‍රේණිය</h3>
                  <span>මාතෘකා 28</span>
                </div>
                <button
                  className="btn primary"
                  onClick={() => navigate("/study/al-12")}
                >
                  සිතියම විවෘත කරන්න
                </button>
              </div>
              <p>උසස් + පුනරීක්ෂණ.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Notes + Quiz */}
      <section id="notes" className="section">
        <div className="container">
          <div className="two-column">
            <div className="card notes-section">
              <h3>කෙටි සටහන්</h3>
              <ul>
                <li>දත්ත නිරූපණය – මිනිත්තු 2ක කියවීමකි</li>
                <li>තාර්කික ද්වාර – මිනිත්තු 2ක කියවීමකි</li>
                <li>ජාලකරණ මූලික කරුණු – මිනිත්තු 3ක කියවීමකි</li>
              </ul>
              <button className="btn primary">සටහන් පිරික්සන්න</button>
            </div>
            <div className="card quiz-section">
              <h3>ප්‍රශ්න පත්‍ර සහ ලකුණු දීමේ ක්‍රම</h3>
              <p>
                පුහුණුව සහ අවබෝධය සඳහා පසුගිය ප්‍රශ්න පත්‍ර සහ ඒවායේ ලකුණු දීමේ
                ක්‍රම වෙත පිවිසෙන්න.
              </p>
              <button className="btn primary">සම්පත් බලන්න</button>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section id="schedule" className="section">
        <div className="container">
          <div className="section-header">
            <h2>කාලසටහන</h2>
          </div>
          <div className="schedule-list">
            <div className="card schedule-card">
              <div className="schedule-info">
                <h4>සා/පෙළ 10 ශ්‍රේණිය</h4>
                <p>ඉරිදා 10:00–12:00 - මධ්‍යස්ථානය - EBS කුලියාපිටිය</p>
              </div>
              <button className="btn primary">ආසනයක් වෙන්කරවා ගන්න</button>
            </div>
            <div className="card schedule-card">
              <div className="schedule-info">
                <h4>සා/පෙළ 11 ශ්‍රේණිය</h4>
                <p>ඉරිදා 10:00–12:00 - මධ්‍යස්ථානය - EBS කුලියාපිටිය</p>
              </div>
              <button className="btn primary">ආසනයක් වෙන්කරවා ගන්න</button>
            </div>
            <div className="card schedule-card">
              <div className="schedule-info">
                <h4>උ/පෙළ 12 ශ්‍රේණිය</h4>
                <p>සෙනසුරාදා 10:00–12:00 - මාර්ගගත - Zoom</p>
              </div>
              <button className="btn primary">ආසනයක් වෙන්කරවා ගන්න</button>
            </div>
            <div className="card schedule-card">
              <div className="schedule-info">
                <h4>උ/පෙළ 13 ශ්‍රේණිය</h4>
                <p>සෙනසුරාදා 10:00–12:00 - මාර්ගගත - Zoom</p>
              </div>
              <button className="btn primary">ආසනයක් වෙන්කරවා ගන්න</button>
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
              <p>සති 6ක් තුළ සාමාන්‍ය ලකුණු</p>
            </div>
            <div className="card stat-card">
              <div className="stat-number">92%</div>
              <p>පැමිණීමේ ප්‍රවණතාවය</p>
            </div>
            <div className="card stat-card">
              <div className="stat-number">120+</div>
              <p>සහයෝගය ලබන සිසුන්</p>
            </div>
          </div>
          <div className="testimonials">
            <div className="testimonial">
              <h4>ශිෂ්‍ය 1</h4>
              <p>
                "විභාගයට පෙර වේගයෙන් පුනරීක්ෂණය කිරීමට මනෝ සිතියම් මට උපකාර
                විය."
              </p>
            </div>
            <div className="testimonial">
              <h4>ශිෂ්‍ය 2</h4>
              <p>
                "විභාගයට පෙර වේගයෙන් පුනරීක්ෂණය කිරීමට Mind Maps මට උපකාර විය."
              </p>
            </div>
            <div className="testimonial">
              <h4>ශිෂ්‍ය 3</h4>
              <p>
                "විභාගයට පෙර වේගයෙන් පුනරීක්ෂණය කිරීමට Mind Maps මට උපකාර විය."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>ඉක්මන් මෙවලම්</h2>
          </div>
          <div className="tools-grid">
            <div
              className="tool-card"
              onClick={() => handleToolClick("Binary ⇄ Decimal")}
            >
              <span className="tool-icon">🔢</span>
              <span>ද්විමය ⇄ දශමය</span>
            </div>
            <div
              className="tool-card"
              onClick={() => handleToolClick("Truth Table")}
            >
              <span className="tool-icon">📐</span>
              <span>සත්‍ය වගුව</span>
            </div>
            <div
              className="tool-card"
              onClick={() => handleToolClick("Subnet Helper")}
            >
              <span className="tool-icon">🌐</span>
              <span>උපජාල සහායක</span>
            </div>
            <div
              className="tool-card"
              onClick={() => handleToolClick("SQL Sample")}
            >
              <span className="tool-icon">🗄️</span>
              <span>SQL නියැදිය</span>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="section">
        <div className="container">
          <div className="about-content">
            <div className="about-photo">ඔබේ ඡායාරූපය</div>
            <div className="about-text">
              <h2>මයურ ගැන</h2>
              <ul>
                <li>AI ඉංජිනේරු - දත්ත විද්‍යාව පිළිබඳ B.Sc. (ගෞರವ)</li>
                <li>Mind Maps–පළමු ඉගෙනුම් ක්‍රමය</li>
                <li>ප්‍රතිපෝෂණ සහිත විභාග ඉලක්ක කරගත් පුහුණුව</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>නිතර අසන පැන</h2>
          </div>
          <div className="faq-list">
            <div className="card faq-item">
              <h4>පන්තිය සිංහල ද ඉංග්‍රීසි ද?</h4>
              <p>
                විභාගයට ගැළපෙන පරිදි ඉංග්‍රීසි තාක්ෂණික වචන සහිතව සිංහල
                මාධ්‍යයෙන්.
              </p>
            </div>
            <div className="card faq-item">
              <h4>මාර්ගගත ද භෞතික ද?</h4>
              <p>විකල්ප දෙකම; කාලසටහනේ විස්තර ඇත.</p>
            </div>
            <div className="card faq-item">
              <h4>Mind Maps මුද්‍රණය කළ හැකි ද?</h4>
              <p>ඔව්, සෑම ශ්‍රේණියකටම PDF එකක් ඇත.</p>
            </div>
            <div className="card faq-item">
              <h4>පසුගිය ප්‍රශ්න පත්‍ර සබැඳි ලැබෙනවාද?</h4>
              <p>නෝඩ්ස් පසුගිය ප්‍රශ්න සමඟ ටැග් කර ඇත.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Magnet */}
      <section id="join" className="section lead-magnet">
        <div className="container">
          <h2>නොමිලේ සා/පෙළ ICT Power Sheet</h2>
          <form className="lead-form" onSubmit={handleFormSubmit}>
            <input
              type="text"
              name="name"
              placeholder="ඔබගේ නම"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="ඔබගේ විද්‍යුත් තැපෑල"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="WhatsApp අංකය"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
            <button type="submit" className="btn primary">
              PDF ලබා ගන්න
            </button>
          </form>
          <p className="privacy-note">අපි ඔබගේ පෞද්ගලිකත්වයට ගරු කරමු.</p>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="footer">
        <div className="container">
          <div className="footer-contact">
            <a href="tel:0701235142">අමතන්න: 070 123 5142</a>
            <a href="#">WhatsApp</a>
            <a href="mailto:">විද්‍යුත් තැපෑල</a>
          </div>
          <p>&copy; 2025 මයურ ICT</p>
        </div>
      </footer>
    </div>
  );
}

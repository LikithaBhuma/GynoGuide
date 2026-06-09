import React, { useState, useEffect } from 'react'
import { Outlet, NavLink, useLocation } from 'react-router-dom'
import {
  MessageCircleHeart, BookOpen, Pill, Play, Home,
  Stethoscope, Menu, X, Heart, ExternalLink
} from 'lucide-react'
import './Layout.css'

const navItems = [
  { to: '/', label: 'Home', icon: Home, exact: true },
  { to: '/chat', label: 'AI Assistant', icon: MessageCircleHeart },
  { to: '/diseases', label: 'Conditions', icon: Stethoscope },
  { to: '/medicines', label: 'Medicines', icon: Pill },
  { to: '/learn', label: 'Learn', icon: BookOpen },
  { to: '/videos', label: 'Videos', icon: Play },
]

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  return (
    <div className="layout">
      {/* Navbar */}
      <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar__inner container">
          <NavLink to="/" className="navbar__brand">
            <span className="navbar__logo">
              <Heart size={22} fill="currentColor" />
            </span>
            <span className="navbar__name">
              <span className="navbar__name-gyno">Gyno</span>Guide
              <span className="navbar__name-ai">AI</span>
            </span>
          </NavLink>

          <nav className={`navbar__nav ${menuOpen ? 'navbar__nav--open' : ''}`}>
            {navItems.map(({ to, label, icon: Icon, exact }) => (
              <NavLink
                key={to}
                to={to}
                end={exact}
                className={({ isActive }) =>
                  `navbar__link ${isActive ? 'navbar__link--active' : ''}`
                }
              >
                <Icon size={16} />
                {label}
              </NavLink>
            ))}
          </nav>

          <button
            className="navbar__burger btn btn-ghost"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      {menuOpen && (
        <div className="mobile-overlay" onClick={() => setMenuOpen(false)} />
      )}

      {/* Page content */}
      <main className="main-content">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer__grid">
            <div className="footer__brand">
              <div className="footer__logo">
                <Heart size={20} fill="currentColor" />
                <span>GynoGuideAI</span>
              </div>
              <p>
                An AI-powered platform for gynecology education, condition
                awareness, and personalized health guidance.
              </p>
              <p className="footer__disclaimer">
                ⚕️ For educational purposes only. Always consult a qualified
                gynecologist for medical advice.
              </p>
            </div>

            <div className="footer__links">
              <h4>Platform</h4>
              <ul>
                {navItems.slice(1).map(({ to, label }) => (
                  <li key={to}><NavLink to={to}>{label}</NavLink></li>
                ))}
              </ul>
            </div>

            <div className="footer__links">
              <h4>Resources</h4>
              <ul>
                <li><a href="https://www.acog.org" target="_blank" rel="noreferrer">ACOG <ExternalLink size={11}/></a></li>
                <li><a href="https://www.who.int/health-topics/reproductive-health" target="_blank" rel="noreferrer">WHO Reproductive Health <ExternalLink size={11}/></a></li>
                <li><a href="https://www.nhs.uk/conditions/periods/" target="_blank" rel="noreferrer">NHS Women's Health <ExternalLink size={11}/></a></li>
              </ul>
            </div>
          </div>

          <div className="footer__bottom">
            <p>© {new Date().getFullYear()} GynoGuideAI. Built with ❤️ for women's health education.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

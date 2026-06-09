import React from 'react'
import { Link } from 'react-router-dom'
import {
  MessageCircleHeart, Stethoscope, Pill, BookOpen,
  Play, ArrowRight, Heart, ShieldCheck, Sparkles, Users
} from 'lucide-react'
import './HomePage.css'

const features = [
  {
    to: '/chat',
    icon: MessageCircleHeart,
    title: 'AI Assistant',
    desc: 'Chat with an AI trained on gynecology — ask about symptoms, conditions, and care.',
    color: 'rose',
  },
  {
    to: '/diseases',
    icon: Stethoscope,
    title: 'Conditions A–Z',
    desc: 'In-depth guides on 50+ gynecological conditions with symptoms, causes, and treatments.',
    color: 'plum',
  },
  {
    to: '/medicines',
    icon: Pill,
    title: 'Medicine Guide',
    desc: 'Detailed information on gynecology medications, dosages, interactions, and safety.',
    color: 'teal',
  },
  {
    to: '/learn',
    icon: BookOpen,
    title: 'Knowledge Hub',
    desc: 'Structured learning paths from anatomy basics to advanced reproductive health.',
    color: 'amber',
  },
  {
    to: '/videos',
    icon: Play,
    title: 'Video Library',
    desc: 'Curated educational videos from leading medical institutions and educators.',
    color: 'rose',
  },
]

const stats = [
  { icon: Stethoscope, value: '50+', label: 'Conditions covered' },
  { icon: Pill, value: '30+', label: 'Medicines detailed' },
  { icon: Play, value: '25+', label: 'Educational videos' },
  { icon: Users, value: '24/7', label: 'AI assistance' },
]

const trustPoints = [
  { icon: ShieldCheck, text: 'Based on ACOG, WHO & RCOG clinical guidelines' },
  { icon: Heart, text: 'Designed with compassion for women\'s health' },
  { icon: Sparkles, text: 'AI-powered personalized guidance' },
]

export default function HomePage() {
  return (
    <div className="home">
      {/* ─── Hero ─── */}
      <section className="hero">
        <div className="hero__bg-orb hero__bg-orb--1" />
        <div className="hero__bg-orb hero__bg-orb--2" />
        <div className="container hero__content">
          <div className="hero__badge">
            <Heart size={13} fill="currentColor" />
            Women's Health Intelligence
          </div>
          <h1 className="hero__headline">
            Your trusted guide to<br />
            <span className="hero__headline-accent">gynecological health</span>
          </h1>
          <p className="hero__sub">
            GynoGuideAI combines clinical knowledge with compassionate AI to help
            you understand conditions, medications, and care — always in plain language.
          </p>
          <div className="hero__actions">
            <Link to="/chat" className="btn btn-primary hero__cta">
              <MessageCircleHeart size={18} />
              Chat with AI Assistant
            </Link>
            <Link to="/diseases" className="btn btn-outline">
              Explore Conditions
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="hero__trust">
            {trustPoints.map(({ icon: Icon, text }) => (
              <div key={text} className="hero__trust-item">
                <Icon size={14} />
                {text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Stats ─── */}
      <section className="stats-bar">
        <div className="container stats-bar__inner">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="stat">
              <Icon size={20} className="stat__icon" />
              <span className="stat__value">{value}</span>
              <span className="stat__label">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Features ─── */}
      <section className="features">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Platform Features</span>
            <h2>Everything you need, in one place</h2>
            <p>From quick AI answers to deep clinical knowledge — GynoGuideAI covers your entire gynecological health journey.</p>
          </div>

          <div className="features__grid">
            {features.map(({ to, icon: Icon, title, desc, color }) => (
              <Link key={to} to={to} className={`feature-card feature-card--${color}`}>
                <div className="feature-card__icon">
                  <Icon size={24} />
                </div>
                <h3>{title}</h3>
                <p>{desc}</p>
                <div className="feature-card__arrow">
                  <ArrowRight size={16} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Banner ─── */}
      <section className="cta-banner">
        <div className="container">
          <div className="cta-banner__inner">
            <div className="cta-banner__text">
              <h2>Have a gynecology question?</h2>
              <p>Our AI assistant is available 24/7 to provide evidence-based answers, explain conditions, and guide your understanding.</p>
            </div>
            <Link to="/chat" className="btn btn-primary cta-banner__btn">
              <MessageCircleHeart size={18} />
              Start a Conversation
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Disclaimer ─── */}
      <div className="container">
        <div className="disclaimer">
          <ShieldCheck size={16} />
          <p>
            <strong>Medical Disclaimer:</strong> GynoGuideAI provides educational information only.
            Always consult a qualified gynecologist or healthcare provider for personal medical advice, diagnosis, or treatment.
          </p>
        </div>
      </div>
    </div>
  )
}

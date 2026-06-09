import React from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  ArrowLeft, AlertCircle, Stethoscope, FlaskConical,
  Heart, Pill, ChevronRight, MessageCircleHeart
} from 'lucide-react'
import { getDiseaseById } from '../data/diseases.js'
import { medicines } from '../data/medicines.js'
import './DiseaseDetailPage.css'

export default function DiseaseDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const disease = getDiseaseById(id)

  if (!disease) {
    return (
      <div className="container" style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
        <h2>Condition not found</h2>
        <Link to="/diseases" className="btn btn-outline" style={{ marginTop: '1rem' }}>
          Back to Conditions
        </Link>
      </div>
    )
  }

  const relatedMeds = medicines.filter(m =>
    disease.relatedMedicines?.includes(m.id)
  )

  return (
    <div className="detail-page">
      {/* Back */}
      <div className="container">
        <button className="btn btn-ghost back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} /> Back to Conditions
        </button>
      </div>

      {/* Header */}
      <div className="detail-hero">
        <div className="container">
          <div className="detail-hero__icon">{disease.icon}</div>
          <div className="detail-hero__meta">
            <span className="tag tag-rose">{disease.category}</span>
            {disease.tags.map(t => (
              <span key={t} className="tag tag-rose" style={{ opacity: 0.7 }}>{t}</span>
            ))}
          </div>
          <h1>{disease.name}</h1>
          <p className="detail-hero__summary">{disease.summary}</p>
          <div className="detail-hero__stats">
            <div className="detail-stat">
              <span className="detail-stat__label">Prevalence</span>
              <span className="detail-stat__value">{disease.prevalence}</span>
            </div>
            <div className="detail-stat">
              <span className="detail-stat__label">Severity</span>
              <span className="detail-stat__value">{disease.severity}</span>
            </div>
            {disease.stagingSystem && (
              <div className="detail-stat">
                <span className="detail-stat__label">Staging</span>
                <span className="detail-stat__value">{disease.stagingSystem}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container detail-content">
        <div className="detail-main">
          {/* Overview */}
          <section className="detail-section">
            <h2><Heart size={20} />Overview</h2>
            <p>{disease.description}</p>
          </section>

          {/* Symptoms */}
          <section className="detail-section">
            <h2><AlertCircle size={20} />Signs & Symptoms</h2>
            <ul className="detail-list">
              {disease.symptoms.map(s => (
                <li key={s}><ChevronRight size={14} />{s}</li>
              ))}
            </ul>
          </section>

          {/* Causes */}
          <section className="detail-section">
            <h2><FlaskConical size={20} />Causes & Risk Factors</h2>
            <ul className="detail-list">
              {disease.causes.map(c => (
                <li key={c}><ChevronRight size={14} />{c}</li>
              ))}
            </ul>
          </section>

          {/* Diagnosis */}
          <section className="detail-section">
            <h2><Stethoscope size={20} />Diagnosis</h2>
            <ul className="detail-list">
              {disease.diagnosis.map(d => (
                <li key={d}><ChevronRight size={14} />{d}</li>
              ))}
            </ul>
          </section>

          {/* Treatment */}
          <section className="detail-section">
            <h2><Pill size={20} />Treatment Options</h2>
            <ul className="detail-list">
              {disease.treatment.map(t => (
                <li key={t}><ChevronRight size={14} />{t}</li>
              ))}
            </ul>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="detail-aside">
          {/* Related medicines */}
          {relatedMeds.length > 0 && (
            <div className="aside-card">
              <h3><Pill size={16} />Related Medicines</h3>
              <div className="aside-meds">
                {relatedMeds.map(med => (
                  <Link key={med.id} to="/medicines" className="aside-med">
                    <span className="aside-med__icon">{med.icon}</span>
                    <div>
                      <strong>{med.name}</strong>
                      <p>{med.category}</p>
                    </div>
                    <ChevronRight size={14} />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Ask AI */}
          <div className="aside-card aside-card--ai">
            <div className="aside-ai-icon">
              <MessageCircleHeart size={22} />
            </div>
            <h3>Have questions about {disease.name.split(' ')[0]}?</h3>
            <p>Chat with GynoGuideAI for personalized answers and deeper explanations.</p>
            <Link
              to={`/chat`}
              state={{ initialMessage: `Tell me more about ${disease.name} — symptoms, diagnosis, and treatment options.` }}
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              Ask AI Assistant
            </Link>
          </div>

          {/* Disclaimer */}
          <div className="aside-disclaimer">
            <AlertCircle size={14} />
            <p>This information is educational. Please consult a gynecologist for personal medical guidance.</p>
          </div>
        </aside>
      </div>
    </div>
  )
}

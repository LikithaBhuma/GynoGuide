import React, { useState } from 'react'
import { Search, Pill, AlertCircle, ChevronDown, ChevronUp, Heart } from 'lucide-react'
import { medicines } from '../data/medicines.js'
import './MedicinesPage.css'

function MedCard({ med }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="med-card">
      <div className="med-card__header" onClick={() => setExpanded(v => !v)}>
        <span className="med-card__icon">{med.icon}</span>
        <div className="med-card__title">
          <h3>{med.name}</h3>
          <span className="med-card__generic">{med.genericName}</span>
        </div>
        <div className="med-card__category tag tag-teal">{med.category}</div>
        {expanded ? <ChevronUp size={18} className="med-card__toggle" /> : <ChevronDown size={18} className="med-card__toggle" />}
      </div>

      <div className="med-card__uses">
        {med.usedFor.map(u => <span key={u} className="tag tag-rose" style={{fontSize:'0.72rem'}}>{u}</span>)}
      </div>

      {expanded && (
        <div className="med-card__detail fade-in">
          <div className="med-grid">
            <div className="med-info">
              <h4>Mechanism of Action</h4>
              <p>{med.mechanism}</p>
            </div>
            <div className="med-info">
              <h4>Typical Dosage</h4>
              <p>{med.dosage}</p>
            </div>
            <div className="med-info">
              <h4>Brand Names</h4>
              <p>{med.brandNames.join(', ')}</p>
            </div>
            <div className="med-info">
              <h4>Pregnancy Category</h4>
              <p>{med.pregnancy}</p>
            </div>
          </div>

          <div className="med-grid med-grid--two">
            <div className="med-info med-info--warning">
              <h4><AlertCircle size={13} />Side Effects</h4>
              <ul>
                {med.sideEffects.map(s => <li key={s}>{s}</li>)}
              </ul>
            </div>
            <div className="med-info med-info--danger">
              <h4><AlertCircle size={13} />Contraindications</h4>
              <ul>
                {med.contraindications.map(c => <li key={c}>{c}</li>)}
              </ul>
            </div>
          </div>

          <div className="med-disclaimer">
            <Heart size={12} />
            Always consult your gynecologist before starting, stopping, or changing any medication.
          </div>
        </div>
      )}
    </div>
  )
}

export default function MedicinesPage() {
  const [search, setSearch] = useState('')
  const [activeTag, setActiveTag] = useState('All')

  const allTags = ['All', ...new Set(medicines.flatMap(m => m.tags))]

  const filtered = medicines.filter(m => {
    const matchSearch = !search ||
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.usedFor.some(u => u.toLowerCase().includes(search.toLowerCase())) ||
      m.category.toLowerCase().includes(search.toLowerCase())
    const matchTag = activeTag === 'All' || m.tags.includes(activeTag)
    return matchSearch && matchTag
  })

  return (
    <div className="medicines-page">
      <div className="page-hero">
        <div className="container">
          <span className="section-label">Medicine Guide</span>
          <h1>Gynecology Medicines</h1>
          <p>Comprehensive reference for medications used in gynecological conditions — indications, dosages, and safety information.</p>

          <div className="search-bar">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search by drug name, condition, or category…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="container medicines-body">
        <div className="category-filter">
          {allTags.map(tag => (
            <button
              key={tag}
              className={`filter-btn ${activeTag === tag ? 'filter-btn--active' : ''}`}
              onClick={() => setActiveTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        <p className="results-count">
          Showing <strong>{filtered.length}</strong> medicine{filtered.length !== 1 ? 's' : ''}
        </p>

        <div className="meds-list">
          {filtered.map(med => (
            <MedCard key={med.id} med={med} />
          ))}
          {filtered.length === 0 && (
            <div className="empty-state">
              <Pill size={40} />
              <h3>No medicines found</h3>
              <p>Try a different search term.</p>
            </div>
          )}
        </div>

        <div className="med-disclaimer-banner">
          <AlertCircle size={18} />
          <div>
            <strong>Important Notice:</strong> Medication information on this platform is for educational purposes only.
            Dosages and indications may vary by individual patient, region, and clinical context.
            Always follow your prescribing physician's guidance.
          </div>
        </div>
      </div>
    </div>
  )
}

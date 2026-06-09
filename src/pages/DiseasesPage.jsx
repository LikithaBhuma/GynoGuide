import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, ArrowRight, Stethoscope } from 'lucide-react'
import { diseases, categories } from '../data/diseases.js'
import './DiseasesPage.css'

export default function DiseasesPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = diseases.filter(d => {
    const matchSearch = !search ||
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.summary.toLowerCase().includes(search.toLowerCase()) ||
      d.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
    const matchCat = activeCategory === 'All' || d.category === activeCategory
    return matchSearch && matchCat
  })

  return (
    <div className="diseases-page">
      {/* Hero */}
      <div className="page-hero">
        <div className="container">
          <span className="section-label">Conditions Library</span>
          <h1>Gynecological Conditions</h1>
          <p>Evidence-based information on conditions affecting women's reproductive health — from symptoms to treatments.</p>

          {/* Search */}
          <div className="search-bar">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search conditions, symptoms, tags…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="container diseases-body">
        {/* Category filter */}
        <div className="category-filter">
          <Filter size={14} />
          {['All', ...categories].map(cat => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'filter-btn--active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="results-count">
          Showing <strong>{filtered.length}</strong> condition{filtered.length !== 1 ? 's' : ''}
          {search && ` for "${search}"`}
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="diseases-grid">
            {filtered.map(disease => (
              <Link key={disease.id} to={`/diseases/${disease.id}`} className="disease-card">
                <div className="disease-card__header">
                  <span className="disease-card__icon">{disease.icon}</span>
                  <div className="disease-card__meta">
                    <span className="tag tag-rose">{disease.category}</span>
                    <span className={`severity-badge severity-badge--${disease.severity.toLowerCase().replace(/[^a-z]/g, '-').split('–')[0]}`}>
                      {disease.severity}
                    </span>
                  </div>
                </div>
                <h3>{disease.name}</h3>
                <p>{disease.summary}</p>
                <div className="disease-card__footer">
                  <span className="disease-card__prevalence">
                    <Stethoscope size={12} />
                    {disease.prevalence}
                  </span>
                  <div className="disease-card__tags">
                    {disease.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="tag tag-rose" style={{fontSize:'0.7rem'}}>{tag}</span>
                    ))}
                  </div>
                  <ArrowRight size={16} className="disease-card__arrow" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Search size={40} />
            <h3>No conditions found</h3>
            <p>Try a different search term or clear the filter.</p>
            <button className="btn btn-outline" onClick={() => { setSearch(''); setActiveCategory('All') }}>
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

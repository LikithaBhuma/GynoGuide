import React, { useState } from 'react'
import { Play, Search, X, ExternalLink, Clock } from 'lucide-react'
import { videos, videoCategories } from '../data/videos.js'
import './VideosPage.css'

function VideoModal({ video, onClose }) {
  return (
    <div className="video-modal-overlay" onClick={onClose}>
      <div className="video-modal" onClick={e => e.stopPropagation()}>
        <div className="video-modal__header">
          <h3>{video.title}</h3>
          <button className="btn btn-ghost" onClick={onClose}><X size={20} /></button>
        </div>
        <div className="video-modal__embed">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="video-modal__info">
          <div>
            <p className="video-modal__channel">{video.channel}</p>
            <p>{video.description}</p>
          </div>
          <a
            href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline"
          >
            <ExternalLink size={14} />
            Open on YouTube
          </a>
        </div>
      </div>
    </div>
  )
}

export default function VideosPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeVideo, setActiveVideo] = useState(null)

  const filtered = videos.filter(v => {
    const matchSearch = !search ||
      v.title.toLowerCase().includes(search.toLowerCase()) ||
      v.channel.toLowerCase().includes(search.toLowerCase()) ||
      v.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
    const matchCat = activeCategory === 'All' || v.category === activeCategory
    return matchSearch && matchCat
  })

  return (
    <div className="videos-page">
      {/* Modal */}
      {activeVideo && (
        <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
      )}

      <div className="page-hero">
        <div className="container">
          <span className="section-label">Video Library</span>
          <h1>Gynecology Video Learning</h1>
          <p>Curated educational videos from leading medical institutions, clinicians, and health educators.</p>

          <div className="search-bar">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search videos by topic or channel…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="container videos-body">
        <div className="category-filter">
          {['All', ...videoCategories].map(cat => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'filter-btn--active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <p className="results-count">
          <strong>{filtered.length}</strong> video{filtered.length !== 1 ? 's' : ''} available
        </p>

        <div className="videos-grid">
          {filtered.map(video => (
            <div
              key={video.id}
              className="video-card"
              onClick={() => setActiveVideo(video)}
            >
              <div className="video-card__thumb">
                <img
                  src={video.thumbnail}
                  onError={e => { e.currentTarget.src = `https://placehold.co/320x180/5a0d34/ffffff?text=Video` }}
                  alt={video.title}
                  loading="lazy"
                />
                <div className="video-card__play">
                  <Play size={22} fill="currentColor" />
                </div>
                <div className="video-card__duration">
                  <Clock size={11} />
                  {video.duration}
                </div>
              </div>
              <div className="video-card__body">
                <span className="tag tag-rose" style={{fontSize:'0.7rem'}}>{video.category}</span>
                <h3>{video.title}</h3>
                <p className="video-card__channel">{video.channel}</p>
                <p className="video-card__desc">{video.description}</p>
                <div className="video-card__tags">
                  {video.tags.map(t => (
                    <span key={t} className="tag tag-teal" style={{fontSize:'0.7rem'}}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="empty-state">
            <Play size={40} />
            <h3>No videos found</h3>
            <p>Try a different search or category.</p>
          </div>
        )}

        <div className="videos-note">
          <p>
            Videos are sourced from publicly available YouTube content by recognized medical institutions and educators.
            GynoGuideAI does not own or host these videos.
          </p>
        </div>
      </div>
    </div>
  )
}
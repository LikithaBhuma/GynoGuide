import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import HomePage from './pages/HomePage.jsx'
import ChatPage from './pages/ChatPage.jsx'
import DiseasesPage from './pages/DiseasesPage.jsx'
import DiseaseDetailPage from './pages/DiseaseDetailPage.jsx'
import MedicinesPage from './pages/MedicinesPage.jsx'
import LearnPage from './pages/LearnPage.jsx'
import VideosPage from './pages/VideosPage.jsx'

export default function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="chat" element={<ChatPage />} />
          <Route path="diseases" element={<DiseasesPage />} />
          <Route path="diseases/:id" element={<DiseaseDetailPage />} />
          <Route path="medicines" element={<MedicinesPage />} />
          <Route path="learn" element={<LearnPage />} />
          <Route path="videos" element={<VideosPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
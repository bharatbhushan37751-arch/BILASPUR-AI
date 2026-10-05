import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AiProblemSolutionFlow } from './components/AiProblemSolutionFlow';
import { TripPlanner } from './components/TripPlanner';
import { ChatbotGuide } from './components/ChatbotGuide';
import { ExploreSection } from './components/ExploreSection';
import { PostcardGenerator } from './components/PostcardGenerator';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { ProjectPitchModal } from './components/ProjectPitchModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [pitchModalOpen, setPitchModalOpen] = useState<boolean>(false);

  const handleScrollToSection = (sectionId: string, tabName: string) => {
    setActiveTab(tabName);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tab === 'planner') {
      handleScrollToSection('plan-trip', 'planner');
    } else if (tab === 'explore') {
      handleScrollToSection('explore', 'explore');
    } else if (tab === 'guide') {
      handleScrollToSection('ask-bilaspur-ai', 'guide');
    } else if (tab === 'visualizer') {
      handleScrollToSection('ai-visualizer', 'visualizer');
    } else if (tab === 'about') {
      handleScrollToSection('about', 'about');
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        onOpenDemoInfo={() => setPitchModalOpen(true)}
      />

      {/* Main Content Layout */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection
          onPlanTripClick={() => handleScrollToSection('plan-trip', 'planner')}
          onAskAiClick={() => handleScrollToSection('ask-bilaspur-ai', 'guide')}
          onExploreClick={() => handleScrollToSection('explore', 'explore')}
        />

        {/* 2. How Bilaspur AI Solves the Problem (Flow Section for College Demo) */}
        <AiProblemSolutionFlow />

        {/* 3. Core Feature 1: AI Trip Planner */}
        <TripPlanner />

        {/* 4. Core Feature 2: Ask Bilaspur AI (Chatbot) */}
        <ChatbotGuide />

        {/* 5. Core Feature 3: Explore Bilaspur (Places, Food, Products, Businesses) */}
        <ExploreSection />

        {/* 6. AI Scene Visualizer & Aspect Ratio Engine (Mandated feature) */}
        <PostcardGenerator />

        {/* 7. About Section (Problem, AI Solution, Impact & Academic Architecture) */}
        <AboutSection />
      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={handleTabChange}
        onOpenPitch={() => setPitchModalOpen(true)}
      />

      {/* College Project Evaluation Pitch Modal */}
      <ProjectPitchModal
        isOpen={pitchModalOpen}
        onClose={() => setPitchModalOpen(false)}
        onRunDemoPreset={() => {
          handleScrollToSection('plan-trip', 'planner');
        }}
      />
    </div>
  );
}

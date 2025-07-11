"use client";
import React, { useState } from "react";
import {
  Palette,
  Smartphone,
  Settings,
  Zap,
  Users,
  FileText,
  Rocket,
  Check,
  Star,
  Download,
  Bot,
  Folder,
  Brain,
  Share2,
  Database,
  Shield,
  BarChart3,
  Send,
  Edit3,
  Monitor,
  Tablet,
  Briefcase,
  GraduationCap,
  UserCheck,
} from "lucide-react";

const BormLandingPage = () => {
  const [previewMode, setPreviewMode] = useState<
    "desktop" | "tablet" | "mobile"
  >("desktop");

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-pink-50 to-purple-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b  border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-black bg-clip-text text-transparent">
                borm
              </h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a
                href="#features"
                className="text-gray-700 hover:text-indigo-600 transition-colors font-medium"
              >
                Features
              </a>
              <a
                href="#use-cases"
                className="text-gray-700 hover:text-indigo-600 transition-colors font-medium"
              >
                Use Cases
              </a>
              <a
                href="#demo"
                className="text-gray-700 hover:text-indigo-600 transition-colors font-medium"
              >
                Demo
              </a>
            </nav>
            <div className="flex items-center space-x-4">
              <button className="text-gray-700 hover:text-indigo-600 transition-colors cursor-pointer font-medium">
                Sign In
              </button>
              <button className="bg-black text-white px-6 cursor-pointer py-2 rounded-xl hover: -lg transition-all transform  -105 font-medium border-black border ">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-200/30 via-pink-200/30 to-purple-200/30"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/70 backdrop-blur-sm text-gray-700 text-sm font-medium mb-8 border  border-black">
              <Zap className="w-4 h-4 mr-2 text-indigo-600" />
              Smart Form Builder
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                Create Smart, Shareable Forms in Seconds
              </span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Use AI to auto-generate your form, or pick from pre-made
              templates. Customize, share, and collect responses — all from one
              clean dashboard.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-black from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover: -xl transition-all transform  -105 flex items-center justify-center cursor-pointer">
                <Bot className="w-5 h-5 mr-2" />
                Build with AI
              </button>
              <button className="bg-white/70 backdrop-blur-sm text-gray-700 px-8 py-4 rounded-xl font-semibold hover:bg-white/90 transition-all border  border-black flex items-center justify-center cursor-pointer  ">
                <Folder className="w-5 h-5 mr-2" />
                Choose a Template
              </button>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center justify-center space-x-8 mt-12 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>10k+ Forms Created</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>4.9 Rating</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>Zero Setup Required</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Two Ways to Get Started
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {`Whether you want full control or instant suggestions — we've got
              you.`}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="group">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 hover: -xl transition-all duration-300 transform  -y-1 border border-black">
                <div className="bg-black from-blue-500 to-indigo-600 text-white w-16 h-16 rounded-xl flex items-center justify-center mb-6 group- -110 transition-transform">
                  <Brain className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Build with AI
                </h3>
                <ul className="space-y-3 text-gray-600 mb-6">
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>
                     {` Just describe your form idea — e.g., "a student feedback
                      form"`}
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>
                      Get an instant, editable form with titles, fields, logic
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Perfect for speed and creativity</span>
                  </li>
                </ul>
                <button className="bg-gray-900 text-white px-6 py-3 rounded-xl cursor-pointer font-medium hover:bg-gray-800 transition-colors w-full">
                  Try AI Builder
                </button>
              </div>
            </div>

            <div className="group">
              <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-2xl p-8 hover: -xl transition-all duration-300 transform  -y-1 border border-black">
                <div className="bg-black from-purple-500 to-pink-600 text-white w-16 h-16 rounded-xl flex items-center justify-center mb-6 group- -110 transition-transform">
                  <Folder className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Use a Template
                </h3>
                <ul className="space-y-3 text-gray-600 mb-6">
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>
                      Pick from our curated collection: Contact Forms, Job
                      Applications, Surveys
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Customize layout, text, logic, and styles</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Great for standard use cases</span>
                  </li>
                </ul>
                <button className="bg-gray-900 text-white px-6 py-3 rounded-xl font-medium cursor-pointer hover:bg-gray-800 transition-colors w-full">
                  Browse Templates
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Smart Features, Simple Experience
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Bot className="w-6 h-6" />,
                title: "AI Form Generator",
                description: "Just type an idea, and get a form built for you",
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                icon: <FileText className="w-6 h-6" />,
                title: "Form Templates",
                description: "Select from ready-made, proven templates",
                gradient: "from-purple-500 to-pink-500",
              },
              {
                icon: <Settings className="w-6 h-6" />,
                title: "Custom Logic",
                description: "Add conditional logic with ease",
                gradient: "from-green-500 to-teal-500",
              },
              {
                icon: <Palette className="w-6 h-6" />,
                title: "Beautiful Themes",
                description: "Light, modern themes with font and color options",
                gradient: "from-orange-500 to-red-500",
              },
              {
                icon: <Share2 className="w-6 h-6" />,
                title: "Instant Sharing",
                description: "Get a live form link to share",
                gradient: "from-indigo-500 to-purple-500",
              },
              {
                icon: <Database className="w-6 h-6" />,
                title: "Response Dashboard",
                description: "All submissions saved automatically",
                gradient: "from-pink-500 to-rose-500",
              },
              {
                icon: <Send className="w-6 h-6" />,
                title: "Send Bulk Emails",
                description: "Connect your EmailJS API and reach respondents",
                gradient: "from-yellow-500 to-orange-500",
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: "Privacy-Friendly",
                description: "No data tracking, just clean responses",
                gradient: "from-emerald-500 to-green-500",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 hover: -xl transition-all duration-300 transform  -y-1 border border-black"
              >
                <div
                  className={`bg-gradient-to-r ${feature.gradient} text-white w-12 h-12 rounded-xl flex items-center justify-center mb-4`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Form Preview */}
      <section id="demo" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Real-Time Form Preview
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See how your form looks on mobile, tablet, and desktop — as you
              build it. Instantly test changes and logic.
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8  -2xl border  border-black">
            <div className="flex justify-center mb-8">
              <div className="bg-gray-100 p-1 flex rounded-xl">
                <button
                  onClick={() => setPreviewMode("desktop")}
                  className={`px-4 py-2 rounded-lg  transition-all cursor-pointer flex items-center space-x-2 ${
                    previewMode === "desktop"
                      ? "bg-white text-gray-900  -sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Monitor className="w-4 h-4" />
                  <span>Desktop</span>
                </button>
                <button
                  onClick={() => setPreviewMode("tablet")}
                  className={`px-4 py-2 rounded-lg cursor-pointer transition-all flex items-center space-x-2 ${
                    previewMode === "tablet"
                      ? "bg-white text-gray-900  -sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Tablet className="w-4 h-4" />
                  <span>Tablet</span>
                </button>
                <button
                  onClick={() => setPreviewMode("mobile")}
                  className={`px-4 py-2 rounded-lg  cursor-pointer transition-all flex items-center space-x-2 ${
                    previewMode === "mobile"
                      ? "bg-white text-gray-900  -sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Mobile</span>
                </button>
              </div>
            </div>

            <div className="flex justify-center">
              <div
                className={`bg-white rounded-2xl  -xl border  border-black transition-all duration-300 ${
                  previewMode === "desktop"
                    ? "w-full max-w-2xl"
                    : previewMode === "tablet"
                    ? "w-96"
                    : "w-80"
                }`}
              >
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Student Feedback Form
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Help us improve your learning experience
                  </p>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Student Name
                      </label>
                      <input
                        className="w-full px-4 py-3 rounded-xl border  border-black focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Course
                      </label>
                      <select className="w-full px-4 py-3 rounded-xl border  border-black focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                        <option>Select your course</option>
                        <option>Mathematics</option>
                        <option>Science</option>
                        <option>English</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Overall Rating
                      </label>
                      <div className="flex space-x-2">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <Star
                            key={rating}
                            className="w-8 h-8 text-yellow-400 fill-current cursor-pointer  -110 transition-transform"
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Additional Comments
                      </label>
                      <textarea
                        className="w-full px-4 py-3 rounded-xl border  border-black focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 h-24 resize-none"
                        placeholder="Share your thoughts..."
                      />
                    </div>
                    <button className="w-full cursor-pointer bg-black from-indigo-600 to-purple-600 text-white py-4 rounded-xl hover: -lg transition-all transform  -105 font-semibold">
                      Submit Feedback
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Overview */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Manage Everything from One Clean Dashboard
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <BarChart3 className="w-6 h-6" />,
                title: "View & Export Responses",
                description: "Filter and export all your form submissions",
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                icon: <BarChart3 className="w-6 h-6" />,
                title: "Visual Stats",
                description: "Get quick insights with beautiful charts",
                gradient: "from-green-500 to-teal-500",
              },
              {
                icon: <Send className="w-6 h-6" />,
                title: "Email Campaigns",
                description: "One-click email campaigns using your EmailJS key",
                gradient: "from-purple-500 to-pink-500",
              },
              {
                icon: <Edit3 className="w-6 h-6" />,
                title: "Edit & Duplicate",
                description: "Edit or duplicate forms anytime",
                gradient: "from-orange-500 to-red-500",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 hover: -xl transition-all duration-300 transform  -y-1 border  border-black"
              >
                <div
                  className={`bg-gradient-to-r ${feature.gradient} text-white w-12 h-12 rounded-xl flex items-center justify-center mb-4`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section id="use-cases" className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Built for Everyone
            </h2>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              {
                icon: <Rocket className="w-6 h-6" />,
                title: "Startups",
                description: "Get feedback or signups with zero dev effort",
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: "Creators",
                description: "Run surveys and giveaways",
                gradient: "from-purple-500 to-pink-500",
              },
              {
                icon: <GraduationCap className="w-6 h-6" />,
                title: "Teachers",
                description: "Collect assignments and student input",
                gradient: "from-green-500 to-teal-500",
              },
              {
                icon: <UserCheck className="w-6 h-6" />,
                title: "HR Teams",
                description: "Job applications and onboarding",
                gradient: "from-orange-500 to-red-500",
              },
              {
                icon: <Briefcase className="w-6 h-6" />,
                title: "Agencies",
                description: "Build client forms faster",
                gradient: "from-indigo-500 to-purple-500",
              },
            ].map((useCase, index) => (
              <div
                key={index}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 hover: -xl transition-all duration-300 transform  -y-1 border  border-black"
              >
                <div
                  className={`bg-gradient-to-r ${useCase.gradient} text-white w-12 h-12 rounded-xl flex items-center justify-center mb-4`}
                >
                  {useCase.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {useCase.title}
                </h3>
                <p className="text-gray-600 text-sm">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-black from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Start Building Smarter Forms Today
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Pick a template or describe your idea — Borm handles the rest.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-gray-900 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-all transform  -105  -lg flex items-center justify-center cursor-pointer">
              <Bot className="w-5 h-5 mr-2" />
              Try the AI Builder
            </button>
            <button className="bg-white/20 backdrop-blur-sm text-white border  border-black px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/30 transition-all flex items-center justify-center cursor-pointer">
              <Folder className="w-5 h-5 mr-2" />
              Browse Templates
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-4 text-center text-black">
        Made with Meow by <span className="font-bold">@vaibhavgupta5</span>
      </footer>
    </div>
  );
};

export default BormLandingPage;

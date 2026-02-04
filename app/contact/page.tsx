"use client";

import { Mail, MessageCircleHeart, User } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 3000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden ">
      {/* Floating Sparkles */}
      <div className="fixed inset-0 pointer-events-none z-10 sparkles-container"></div>

      {/* Animated Background Pattern */}
      <div className="fixed inset-0 bg-pattern opacity-30"></div>

      {/* Floating Hearts */}
      <div className="fixed inset-0 pointer-events-none z-10 hearts-container"></div>

      <div className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Title Section */}
          <div className="text-center mb-12">
            <div className="anime-title-wrapper mb-6">
              <h1 className="anime-title font-pixel text-6xl sm:text-7xl text-lime-300 text-shadow-green-600 text-shadow-lg md:text-8xl mb-4">
                CONTACT
              </h1>
            </div>
            <div className="anime-subtitle text-lg sm:text-xl text-violet-400 md:text-2xl mb-8">
              Lets Connect!
            </div>
            <div className="flex justify-center gap-4 mb-8 flex-wrap">
              <div className="anime-badge pink font-pixel">
                <span>{" READY"}</span>
              </div>
              <div className="anime-badge lavender font-pixel">
                <span>{" ONLINE"}</span>
              </div>
              <div className="anime-badge mint font-pixel">
                <span>{" ACTIVE"}</span>
              </div>
            </div>
          </div>

          {/* Main Content Box */}
          <div className="anime-container">
            {/* Status Bar */}
            <div className="anime-status-bar">
              <div className="flex items-center gap-2">
                <span className="anime-dot pink"></span>
                <span className="text-sm">Contact</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="anime-dot mint"></span>
                <span className="text-sm">Help</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="anime-dot lavender"></span>
                <span className="text-sm">Happy</span>
              </div>
            </div>

            {/* Form Section */}
            <div className="p-6 sm:p-8 md:p-12">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="anime-success text-5xl mb-6">{"GREAT!"}</div>
                  <div className="anime-success-en text-2xl mb-4">
                    {"Message Sent Successfully!"}
                  </div>
                  <div className="text-lg">
                    {"Thank you! We'll get back to you soon "}
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Name Field */}
                  <div className="anime-input-group">
                    <label className="anime-label">
                      <span className="label-icon">
                        <User className="h-8 w-8" />
                      </span>
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="anime-input"
                      placeholder="Enter your name..."
                    />
                  </div>

                  {/* Email Field */}
                  <div className="anime-input-group">
                    <label className="anime-label">
                      <span className="label-icon">
                        <Mail className="h-8 w-8" />
                      </span>
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="anime-input"
                      placeholder="your.email@domain.com"
                    />
                  </div>

                  {/* Message Field */}
                  <div className="anime-input-group">
                    <label className="anime-label">
                      <span className="label-icon">
                        <MessageCircleHeart className="h-8 w-8" />
                      </span>
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={8}
                      className="anime-textarea"
                      placeholder="Type your message here..."
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-center pt-4">
                    <button type="submit" className="anime-button group">
                      <span className="anime-button-text">
                        {"送信する / Send Message"}
                      </span>
                      <span className="anime-button-sparkle">{"✨"}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Contact Info Section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="anime-info-box pink">
              <div className="text-sm mb-2 opacity-80">{"Email"}</div>
              <div className="font-semibold">contact@toenae.com</div>
            </div>
            <div className="anime-info-box lavender">
              <div className="text-sm mb-2 opacity-80">{"Status"}</div>
              <div className="font-semibold">Available 24/7</div>
            </div>
            <div className="anime-info-box mint">
              <div className="text-sm mb-2 opacity-80">{"Response Time"}</div>
              <div className="font-semibold">{"< 24 Hours"}</div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="mt-16 flex justify-center gap-6 flex-wrap">
            <div className="anime-decoration pink">{"★"}</div>
            <div className="anime-decoration lavender">{"☆"}</div>
            <div className="anime-decoration mint">{"✦"}</div>
            <div className="anime-decoration peach">{"✧"}</div>
            <div className="anime-decoration sky">{"✩"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Mail, Phone, Github, Linkedin, MapPin } from "lucide-react";
import Particles from "../../utils/Particles";

const ContactSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById("contact");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const contactInfo = [
    {
      icon: Phone,
      label: "Phone",
      value: "+63 929 309 1777",
      href: "tel:+639293091777",
    },
    {
      icon: Mail,
      label: "Email",
      value: "dev.canj@gmail.com",
      href: "mailto:dev.canj@gmail.com",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "@canjdev",
      href: "https://github.com/canjdev",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/canjdev/",
      href: "https://linkedin.com/in/canjdev/",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Cabuyao City, Laguna",
      href: "#",
    },
  ];

  return (
    <section
      id="contact"
      className="section-container relative overflow-hidden"
    >
      {/* Particles Background */}
      <div className="absolute inset-0 w-full h-full">
        <Particles
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={200}
          particleSpread={12}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
          particleHoverFactor={0.5}
          className="opacity-70"
        />
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto relative z-10">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Get In Touch
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Let's Connect</h3>
                <p className="text-gray-300 text-lg">
                  I'm always interested in new opportunities and collaborations.
                  Feel free to reach out if you'd like to work together!
                </p>
              </div>

              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className={`flex items-center space-x-4 p-4 bg-gray-900 rounded-lg border border-gray-800 
                              hover:border-gray-700 transition-all duration-300 hover:scale-105 group
                              ${isVisible ? "slide-up" : ""}`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <item.icon className="w-6 h-6 text-gray-400 group-hover:text-white group-hover:scale-110 transition-all" />
                    <div>
                      <div className="text-sm text-gray-400">{item.label}</div>
                      <div className="text-white group-hover:text-gray-200 transition-colors">
                        {item.value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div
              className={`${isVisible ? "fade-in" : "opacity-0"}`}
              style={{ animationDelay: "600ms" }}
            >
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-gray-600 focus:outline-none transition-colors"
                    placeholder="Your Name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-gray-600 focus:outline-none transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-gray-600 focus:outline-none transition-colors resize-none"
                    placeholder="Your message..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 px-6 rounded-lg transition-colors duration-300 font-medium"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

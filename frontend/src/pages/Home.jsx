import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { NavLink } from 'react-router-dom'
import { FaWhatsapp, FaPhone, FaCheck } from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import group1 from "../assets/Group 1.png";
import doctor from "../assets/doctor.jpeg";
import militry from "../assets/militry people.jpeg";
import heartMachine from "../assets/heart monitoragain.jpeg";
import heroImg from "../assets/people waiting.avif";

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const carouselRef = useRef(null)

  const testimonials = [
    {
      id: 1,
      name: "Rajesh Kumar",
      initials: "RK",
      review: "OxyCare provided excellent service for my mother's oxygen needs. The equipment quality is outstanding and their support team is always there to help. Highly satisfied!"
    },
    {
      id: 2,
      name: "Priya Sharma",
      initials: "PS",
      review: "Renting the wheelchair from OxyCare was the best decision. Affordable, reliable, and the delivery was so fast. Their technicians were professional and courteous."
    },
    {
      id: 3,
      name: "Amit Patel",
      initials: "AP",
      review: "Amazing experience with OxyCare! Got the medical equipment in perfect condition and the installation was done by trained professionals. 24/7 support is a lifesaver."
    },
    {
      id: 4,
      name: "Neha Gupta",
      initials: "NG",
      review: "Very impressed with the transparency and pricing. No hidden charges, just honest service. The equipment arrived on time and the quality exceeded my expectations."
    },
    {
      id: 5,
      name: "Vikram Singh",
      initials: "VS",
      review: "OxyCare made getting medical equipment so easy and stress-free. Their customer care team handled everything smoothly. Would definitely recommend to family and friends."
    }
  ]

  // GSAP animation when testimonial changes
  useEffect(() => {
    if (carouselRef.current) {
      gsap.to(carouselRef.current, {
        x: -currentTestimonial * 100 + "%",
        duration: 0.6,
        ease: "power2.inOut"
      })
    }
  }, [currentTestimonial])

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index)
  }

  const goToPrevious = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToNext = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }
  return (
    <div className="min-h-screen text-gray-800">
      <Navbar />

      {/* HERO */}
      <section className="bg-[#2f5b4f] text-white">
        <div className="max-w-6xl mx-auto px-6 py-20 flex flex-col lg:flex-row items-center gap-8">
          <div className="lg:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold">
              Making Healthcare Accessible for Every Home
            </h1>
            <p className="mt-6 text-lg text-gray-200">
              Rent or buy high-quality medical equipment with reliable doorstep delivery.
            </p>
            <div className="mt-8 flex gap-4">
              <button onClick={() => window.open('https://wa.me/917748905785?text=Hello!%20I%20have%20a%20query%20about%20your%20medical%20equipment%20rental%20and%20sales%20services.')} className="flex items-center gap-2 bg-yellow-400 text-[#0b3b2a] px-5 py-3 rounded-full">
                <FaWhatsapp /> WhatsApp Us
              </button>
              <button onClick={() => window.location.href = 'tel:+917748905785'} className="flex items-center gap-2 border border-gray-200 px-5 py-3 rounded-full">
                <FaPhone /> Call Now
              </button>
            </div>
          </div>

          <div className="lg:w-1/2">
            <img src={group1} alt="hero" className="max-w-md w-full" />
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-12 grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-lg font-semibold">Why Choose Us</h2>
            <p className="text-gray-600 mt-3">
              Comprehensive medical equipment solutions with unmatched service.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4">
              {[
                "Fast & Free Shipping",
                "Easy to Rent",
                "24/7 Support",
                "Hassle Free Returns",
              ].map((item) => (
                <div key={item} className="flex gap-3">
                  <FaCheck className="text-green-600 mt-1" />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <img
            src={doctor}
            alt="doctor"
            className="rounded-lg max-w-md w-full"
          />
        </div>
      </section>

      {/* HELP SECTION */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-12 grid lg:grid-cols-2 gap-8">
          <div>
            <div className="flex gap-4">
              <img src={militry} className="w-1/2 rounded-md" />
              <img src={heartMachine} className="w-1/2 rounded-md" />
            </div>

            <h3 className="text-xl font-semibold mt-6">
              We Help You Make Quality Healthcare Available
            </h3>

            <p className="text-gray-600 mt-3">
              Affordable, high-quality devices ensuring comfort and care at home.
            </p>

            <ul className="list-disc list-inside mt-4 text-gray-600 space-y-1">
              <li>Certified equipment</li>
              <li>Professional installation</li>
              <li>Transparent pricing</li>
              <li>24/7 support</li>
            </ul>

            <NavLink to="/about" className="mt-6 inline-block bg-black text-white px-4 py-2 text-center">
              Explore
            </NavLink>
          </div>

          <img src={heroImg} className="rounded-md max-w-md w-full" />
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h2 className="text-xl font-semibold">Testimonials</h2>
          <p className="text-gray-500 text-sm mt-2">
            Hear from our satisfied customers who have experienced quality care
            and reliable service with OxyCare medical equipment.
          </p>

          <div className="mt-10 max-w-2xl mx-auto">
            <div className="overflow-hidden rounded-lg">
              <div
                ref={carouselRef}
                className="flex"
              >
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="w-full shrink-0">
                    <div className="bg-white border-gray-200 border rounded-lg shadow-sm p-8">
                      <p className="text-gray-600 italic">
                        "{testimonial.review}"
                      </p>

                      <div className="mt-6 flex items-center justify-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-semibold">
                          {testimonial.initials}
                        </div>
                        <div className="text-left">
                          <div className="font-semibold">{testimonial.name}</div>
                          <div className="text-sm text-gray-500">
                            OxyCare Customer
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                onClick={goToPrevious}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
              >
                ← Prev
              </button>

              {/* Dots Indicator */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToTestimonial(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentTestimonial
                        ? "bg-[#2f5b4f] w-8"
                        : "bg-gray-300 w-2"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={goToNext}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

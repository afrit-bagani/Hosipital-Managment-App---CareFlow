import React from "react";
import { Link } from "react-router-dom";
import {
  Activity,
  Calendar,
  ShieldCheck,
  User,
  Clock,
  HeartPulse,
  Award,
  Users,
  Globe,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      {/* --- Navbar --- */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-2 rounded-lg shadow-sm">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 tracking-tight">
                CareFlow
              </span>
            </div>

            {/* Desktop Links (Removed Doctors Tab) */}
            <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-600">
              <a
                href="#features"
                className="hover:text-blue-600 transition duration-200"
              >
                Features
              </a>
              <a
                href="#about"
                className="hover:text-blue-600 transition duration-200"
              >
                About Us
              </a>
            </div>

            {/* Sign In Button */}
            <div>
              <Link to="/sign-in">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-medium transition shadow-md shadow-blue-200 hover:shadow-lg transform hover:-translate-y-0.5">
                  Sign In
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-12">
        <div className="lg:w-1/2 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold border border-blue-100">
            <ShieldCheck className="w-4 h-4" /> Trusted Healthcare Management
          </div>
          <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
            Streamlining Surgery <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500">
              Scheduling & Care
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
            Experience the future of hospital operations. Automated OT
            scheduling, real-time surgeon availability, and a seamless patient
            experience all in one platform.
          </p>
          <div className="flex gap-4 pt-4">
            <Link to="/sign-in">
              <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-lg shadow-blue-200 transition transform hover:-translate-y-1">
                Get Started
              </button>
            </Link>
            <a href="#features">
              <button className="px-8 py-3 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg font-semibold transition">
                Learn More
              </button>
            </a>
          </div>
        </div>

        {/* Hero Image */}
        <div className="lg:w-1/2 relative group">
          <div className="absolute -z-10 top-0 right-0 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-50 group-hover:bg-cyan-100 transition duration-700"></div>
          <img
            src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80&w=2800&ixlib=rb-4.0.3"
            alt="Hospital Team"
            className="rounded-2xl shadow-2xl border-4 border-white object-cover"
          />
          {/* Floating Card */}
          <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-gray-100 hidden md:block animate-bounce-slow">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-full">
                <HeartPulse className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">
                  Status
                </p>
                <p className="text-lg font-bold text-gray-900">
                  OT Fully Operational
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Features Section --- */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">
              Why Choose CareFlow?
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              We replace outdated static timetables with dynamic, intelligent
              models designed for modern healthcare needs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Calendar className="w-6 h-6 text-blue-600" />}
              title="Dynamic Scheduling"
              desc="Automated conflict detection for Operating Theaters ensures zero double-booking and maximizes room utilization."
            />
            <FeatureCard
              icon={<User className="w-6 h-6 text-purple-600" />}
              title="Patient Centric"
              desc="Patients can view surgery details, pre-op instructions, and doctor profiles instantly via a secure portal."
            />
            <FeatureCard
              icon={<Clock className="w-6 h-6 text-green-600" />}
              title="Real-time Updates"
              desc="Admin dashboard updates in real-time to manage emergencies, cancellations, and delays efficiently."
            />
          </div>
        </div>
      </section>

      {/* --- About Us Section (Completed) --- */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Content */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">
                Transforming Healthcare Logistics
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                At CareFlow, we understand that surgical scheduling is more than
                just a calendar—it's a critical component of patient safety and
                hospital efficiency.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Founded by a team of engineers and healthcare administrators,
                our mission is to eliminate the logistical bottlenecks in
                operating rooms. By leveraging data-driven insights, we help
                hospitals prioritize patient care over paperwork.
              </p>

              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="border-l-4 border-blue-600 pl-4">
                  <h4 className="text-xl font-bold text-gray-900">99.9%</h4>
                  <p className="text-sm text-gray-500">Uptime Reliability</p>
                </div>
                <div className="border-l-4 border-cyan-500 pl-4">
                  <h4 className="text-xl font-bold text-gray-900">50+</h4>
                  <p className="text-sm text-gray-500">Partner Hospitals</p>
                </div>
              </div>

              <div className="pt-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-500" /> Our Core Values
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-gray-600">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>{" "}
                    Transparency in Scheduling
                  </li>
                  <li className="flex items-center gap-2 text-gray-600">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>{" "}
                    Patient-First Approach
                  </li>
                  <li className="flex items-center gap-2 text-gray-600">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>{" "}
                    Data Security & Privacy
                  </li>
                </ul>
              </div>
            </div>

            {/* Right: Images/Grid */}
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800"
                alt="Hospital Hallway"
                className="rounded-2xl shadow-lg mt-8"
              />
              <img
                src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800"
                alt="Doctors Meeting"
                className="rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- Call to Action --- */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Optimize Your Operations?
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Join the network of modern hospitals using CareFlow to save time and
            save lives.
          </p>
          <Link to="/sign-in">
            <button className="px-10 py-4 bg-white text-blue-700 font-bold rounded-full shadow-xl hover:bg-gray-100 transition transform hover:scale-105">
              Create Free Account
            </button>
          </Link>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="h-6 w-6 text-blue-500" />
              <span className="text-2xl font-bold text-white">CareFlow</span>
            </div>
            <p className="text-sm opacity-60 max-w-xs">
              Advanced Operation Theater scheduling and hospital management
              solutions for the modern era.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <a href="#" className="hover:text-blue-400">
                  Home
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-blue-400">
                  Features
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-blue-400">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li className="flex items-center gap-2">
                <Globe className="w-4 h-4" /> www.careflow.com
              </li>
              <li className="flex items-center gap-2">
                <Users className="w-4 h-4" /> support@careflow.com
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-12 pt-8 border-t border-gray-800 text-sm opacity-40">
          © 2025 CareFlow Hospital Management. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

// Helper Component for Features
function FeatureCard({ icon, title, desc }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition duration-300">
      <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{desc}</p>
    </div>
  );
}

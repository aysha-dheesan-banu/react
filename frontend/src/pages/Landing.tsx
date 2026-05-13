import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Rocket, Shield, Zap, ChevronRight } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="container flex justify-between items-center py-6">
        <div className="text-2xl font-bold gradient-text">VortexFlow</div>
        <div className="space-x-8 hidden md:flex items-center">
          <a href="#features" className="text-text-muted hover:text-white transition">Features</a>
          <Link to="/login" className="text-text-muted hover:text-white transition">Login</Link>
          <Link to="/signup" className="bg-primary hover:bg-primary-hover px-6 py-2 rounded-full font-medium transition">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="container mt-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Accelerate Your <span className="gradient-text">Workflow</span>
          </h1>
          <p className="text-xl text-text-muted mb-10 max-w-2xl mx-auto">
            The next generation of SaaS management. Beautifully designed, lightning fast, and built for modern teams.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link to="/signup" className="bg-primary hover:bg-primary-hover px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition text-lg">
              Start Building Now <ChevronRight size={20} />
            </Link>
            <button className="glass px-8 py-4 rounded-xl font-semibold hover:bg-white/5 transition text-lg">
              Book a Demo
            </button>
          </div>
        </motion.div>
      </header>

      {/* Features */}
      <section id="features" className="container my-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Zap className="text-yellow-400" />}
            title="Blazing Fast"
            description="Optimized for performance with under 100ms response times globally."
          />
          <FeatureCard 
            icon={<Shield className="text-primary" />}
            title="Enterprise Security"
            description="Bank-grade encryption and advanced security protocols as standard."
          />
          <FeatureCard 
            icon={<Rocket className="text-accent" />}
            title="Seamless Scale"
            description="Scale from 1 to 100 million users without changing a single line of code."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 mt-20">
        <div className="container flex flex-col md:flex-row justify-between items-center text-text-muted">
          <div>© 2024 VortexFlow. All rights reserved.</div>
          <div className="flex gap-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="glass p-8"
  >
    <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-text-muted">{description}</p>
  </motion.div>
);

export default Landing;

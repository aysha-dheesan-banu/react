import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserPlus, Mail, Lock, User } from 'lucide-react';

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Account created! Please login.');
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass p-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Create Account</h1>
          <p className="text-text-muted">Join VortexFlow today</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-muted">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3.5 text-text-muted" size={18} />
              <input type="text" className="w-full pl-10" placeholder="John Doe" required />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-muted">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-text-muted" size={18} />
              <input type="email" className="w-full pl-10" placeholder="john@example.com" required />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-muted">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-text-muted" size={18} />
              <input type="password" className="w-full pl-10" placeholder="••••••••" required />
            </div>
          </div>

          <button type="submit" className="w-full bg-primary hover:bg-primary-hover py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition">
            <UserPlus size={20} /> Create Account
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-text-muted">
          Already have an account? <Link to="/login" className="text-primary hover:underline">Log in</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;

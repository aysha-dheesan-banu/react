import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, Mail, Lock, ShieldCheck } from 'lucide-react';
import { initiateSSOLogin } from '../utils/auth';

const Login = () => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('password');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate backend call
    if (username === 'admin' && password === 'password') {
      navigate('/dashboard');
    } else {
      alert('Invalid credentials (use admin/password)');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass p-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-text-muted">Enter your credentials to continue</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-muted">Username</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-text-muted" size={18} />
              <input 
                type="text" 
                className="w-full pl-10" 
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-muted">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-text-muted" size={18} />
              <input 
                type="password" 
                className="w-full pl-10" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="w-full bg-primary hover:bg-primary-hover py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition">
            <LogIn size={20} /> Sign In
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#0f172a] px-2 text-text-muted">Or continue with</span>
          </div>
        </div>

        <button 
          onClick={() => initiateSSOLogin()}
          className="w-full bg-slate-800 hover:bg-slate-700 border border-white/10 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition text-white"
        >
          <ShieldCheck size={20} className="text-indigo-400" /> Sign in with WytPass
        </button>

        <div className="mt-8 text-center text-sm text-text-muted">
          Don't have an account? <Link to="/signup" className="text-primary hover:underline">Sign up</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;

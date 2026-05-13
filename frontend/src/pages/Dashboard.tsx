import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut,
  Bell,
  Search,
  TrendingUp,
  Clock,
  CheckCircle2
} from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-[#020617]">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 p-6 flex flex-col">
        <div className="text-xl font-bold gradient-text mb-10">VortexFlow</div>
        
        <nav className="flex-1 space-y-2">
          <SidebarItem icon={<LayoutDashboard size={20} />} label="Overview" active />
          <SidebarItem icon={<Users size={20} />} label="Customers" />
          <SidebarItem icon={<BarChart3 size={20} />} label="Analytics" />
          <SidebarItem icon={<Settings size={20} />} label="Settings" />
        </nav>

        <button className="mt-auto flex items-center gap-3 text-text-muted hover:text-red-400 transition p-3 rounded-lg">
          <LogOut size={20} /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div className="relative w-96">
            <Search className="absolute left-3 top-3 text-text-muted" size={18} />
            <input type="text" className="w-full pl-10 bg-white/5" placeholder="Search analytics..." />
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 bg-white/5 rounded-full text-text-muted hover:text-white">
              <Bell size={20} />
            </button>
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center font-bold">JD</div>
          </div>
        </header>

        <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <StatCard title="Total Revenue" value="$45,231.89" change="+20.1%" icon={<TrendingUp className="text-accent" />} />
          <StatCard title="Active Users" value="2,350" change="+180.1%" icon={<Users className="text-primary" />} />
          <StatCard title="Sales" value="+12,234" change="+19%" icon={<BarChart3 className="text-yellow-400" />} />
          <StatCard title="Active Now" value="573" change="+201" icon={<Clock className="text-purple-400" />} />
        </div>

        {/* Recent Activity */}
        <div className="glass p-6">
          <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
          <div className="space-y-6">
            <ActivityItem title="Payment received from John Doe" time="2 minutes ago" status="Success" />
            <ActivityItem title="New user registered: Sarah Smith" time="15 minutes ago" status="Pending" />
            <ActivityItem title="Server maintenance completed" time="1 hour ago" status="Success" />
            <ActivityItem title="Weekly report generated" time="3 hours ago" status="Success" />
          </div>
        </div>
      </main>
    </div>
  );
};

const SidebarItem = ({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) => (
  <button className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${active ? 'bg-primary/10 text-primary font-medium' : 'text-text-muted hover:bg-white/5 hover:text-white'}`}>
    {icon}
    {label}
  </button>
);

const StatCard = ({ title, value, change, icon }: { title: string, value: string, change: string, icon: React.ReactNode }) => (
  <div className="glass p-6">
    <div className="flex justify-between items-start mb-4">
      <div className="text-text-muted text-sm">{title}</div>
      {icon}
    </div>
    <div className="text-2xl font-bold mb-1">{value}</div>
    <div className="text-xs text-accent">{change} from last month</div>
  </div>
);

const ActivityItem = ({ title, time, status }: { title: string, time: string, status: string }) => (
  <div className="flex items-center justify-between border-b border-white/5 pb-4 last:border-0 last:pb-0">
    <div className="flex items-center gap-4">
      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-accent">
        <CheckCircle2 size={18} />
      </div>
      <div>
        <div className="font-medium">{title}</div>
        <div className="text-xs text-text-muted">{time}</div>
      </div>
    </div>
    <div className={`px-2 py-1 rounded text-xs font-medium ${status === 'Success' ? 'bg-accent/10 text-accent' : 'bg-yellow-400/10 text-yellow-400'}`}>
      {status}
    </div>
  </div>
);

export default Dashboard;

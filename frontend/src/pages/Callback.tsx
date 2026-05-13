import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const Callback = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');
      const state = params.get('state');
      const storedState = sessionStorage.getItem('oauth_state');
      const verifier = sessionStorage.getItem('pkce_verifier');

      if (!code || !state) {
        setError('Missing code or state from identity provider.');
        return;
      }

      if (state !== storedState) {
        setError('Invalid state. This could be a CSRF attack.');
        return;
      }

      if (!verifier) {
        setError('PKCE verifier not found in session.');
        return;
      }

      try {
        // Send code and verifier to our backend for exchange
        // Using /api/ prefix which is proxied to the backend in production
        const response = await fetch('/api/auth/sso-callback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code, code_verifier: verifier }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || 'Failed to exchange token');
        }

        const tokens = await response.json();

        // Store tokens
        localStorage.setItem('access_token', tokens.access_token);
        if (tokens.refresh_token) localStorage.setItem('refresh_token', tokens.refresh_token);
        if (tokens.id_token) localStorage.setItem('id_token', tokens.id_token);

        // Clean up session storage
        sessionStorage.removeItem('oauth_state');
        sessionStorage.removeItem('pkce_verifier');

        // Redirect to dashboard
        navigate('/dashboard');
      } catch (err: any) {
        console.error('SSO Error:', err);
        setError(err.message || 'An error occurred during SSO authentication.');
      }
    };

    handleCallback();
  }, [navigate]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white p-4">
        <div className="max-w-md w-full bg-slate-800 p-8 rounded-2xl border border-red-500/30 text-center">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Authentication Error</h2>
          <p className="text-slate-300 mb-6">{error}</p>
          <button 
            onClick={() => navigate('/login')}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mx-auto mb-4" />
        <h2 className="text-2xl font-semibold">Completing sign in...</h2>
        <p className="text-slate-400 mt-2">Please wait while we verify your credentials.</p>
      </div>
    </div>
  );
};

export default Callback;

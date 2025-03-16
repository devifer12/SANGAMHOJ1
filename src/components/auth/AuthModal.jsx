import React from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../config/supabaseClient";

export default function AuthModal({
  isOpen,
  onClose,
  isLoading,
  setIsLoading,
  error,
  setError,
}) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError(null);

      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters long");
      }

      const result = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (result.error) {
        throw result.error;
      }

      if (result.data.user) {
        navigate("/dashboard");
        onClose();
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[9999] p-4">
      <div className="bg-burgundy rounded-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gold hover:text-gold/80 text-xl"
        >
          ×
        </button>

        <h2 className="text-2xl font-serif text-gold mb-6">Login</h2>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleEmailAuth} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/10 border border-gold/30 rounded p-2 text-gold"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/10 border border-gold/30 rounded p-2 text-gold"
              required
              minLength={6}
            />
            <p className="text-gold/60 text-sm mt-1">
              Password must be at least 6 characters long
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gold text-burgundy py-2 rounded hover:bg-gold/90 transition-colors disabled:opacity-50"
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

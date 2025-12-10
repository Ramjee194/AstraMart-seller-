import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, googleLogin } from "../../store/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const Register = () => {
  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    password: "", 
    confirmPassword: "" 
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [shake, setShake] = useState(false);
  const [isFocused, setIsFocused] = useState({ 
    name: false, 
    email: false, 
    password: false, 
    confirmPassword: false 
  });
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((s) => s.user);

  // Google OAuth Client ID
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "your-google-client-id.apps.googleusercontent.com";

  // Form validation
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isPasswordMatch = form.password === form.confirmPassword;
    const isValid = 
      form.name.length >= 2 && 
      emailRegex.test(form.email) && 
      form.password.length >= 6 && 
      isPasswordMatch &&
      acceptedTerms;
    
    setIsFormValid(isValid);
    setPasswordMatch(isPasswordMatch);
  }, [form.name, form.email, form.password, form.confirmPassword, acceptedTerms]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    const res = await dispatch(registerUser(form));
    if (res.meta.requestStatus === "fulfilled") navigate("/");
  };

  // Google Success Handler
  const googleSuccess = async (credentialResponse) => {
    try {
      // Decode the JWT token to get user info
      const decoded = JSON.parse(atob(credentialResponse.credential.split('.')[1]));
      
      const googleData = {
        name: decoded.name,
        email: decoded.email,
        googleId: decoded.sub,
        imageUrl: decoded.picture,
        token: credentialResponse.credential
      };

      const res = await dispatch(googleLogin(googleData));
      if (res.meta.requestStatus === "fulfilled") {
        navigate("/");
      }
    } catch (error) {
      console.error('Google login failed:', error);
    }
  };

  // Google Error Handler
  const googleError = () => {
    console.error('Google Login Failed');
  };

  const handleInputChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleFocus = (field) => {
    setIsFocused(prev => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field) => {
    setIsFocused(prev => ({ ...prev, [field]: false }));
  };

  // Inline CSS for animations
  const styles = `
    @keyframes blob {
      0% { transform: translate(0px, 0px) scale(1); }
      33% { transform: translate(30px, -50px) scale(1.1); }
      66% { transform: translate(-20px, 20px) scale(0.9); }
      100% { transform: translate(0px, 0px) scale(1); }
    }
    @keyframes fadeIn {
      0% { opacity: 0; transform: translateY(-10px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-8px); }
      75% { transform: translateX(8px); }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
    }
    @keyframes slideIn {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    .animate-blob {
      animation: blob 7s infinite;
    }
    .animate-fade-in {
      animation: fadeIn 0.5s ease-in-out;
    }
    .animate-shake {
      animation: shake 0.5s ease-in-out;
    }
    .animate-float {
      animation: float 6s ease-in-out infinite;
    }
    .animate-slide-in {
      animation: slideIn 0.6s ease-out;
    }
  `;

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="min-h-screen 
      bg-gradient-to-br  from-slate-700 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Inject inline styles */}
        <style>{styles}</style>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute -top-40 -right-32 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"
            style={{ animationDelay: '0s' }}
          ></div>
          <div 
            className="absolute -bottom-40 -left-32 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"
            style={{ animationDelay: '2s' }}
          ></div>
          <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"
            style={{ animationDelay: '4s' }}
          ></div>
        </div>

        {/* Register Card */}
        <div className="relative w-full max-w-md">
          <div className={`bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 transition-all duration-300 animate-slide-in ${
            shake ? 'animate-shake' : 'hover:shadow-3xl'
          }`}>
            
            {/* Header */}
            <div className="text-center mb-8">
             
              <h1 className="text-4xl font-bold text-white mb-2">Join Us</h1>
              <p className="text-purple-200 text-lg">Create your account to get started</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-2xl flex items-center space-x-3 animate-fade-in">
                <div className="flex-shrink-0 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-red-100 text-sm flex-1">{error}</p>
              </div>
            )}

            {/* Google Signup Button */}
            <div className="mb-6">
              <GoogleLogin
                onSuccess={googleSuccess}
                onError={googleError}
                useOneTap
                shape="rectangular"
                size="large"
                text="signup_with"
                width="100%"
              />
            </div>

            {/* Divider */}
            <div className="flex items-center mb-6">
              <div className="flex-1 border-t border-white/20"></div>
              <span className="px-4 text-sm text-purple-200">or with email</span>
              <div className="flex-1 border-t border-white/20"></div>
            </div>

            <form onSubmit={submitHandler} className="space-y-5">
              {/* Name Field */}
              <div className="space-y-3">
                <div className="relative">
                  <input
                    className={`w-full px-5 py-4 bg-white/5 border-2 rounded-2xl text-white placeholder-purple-200/60 focus:outline-none transition-all duration-300 backdrop-blur-sm pl-12 ${
                      isFocused.name 
                        ? 'border-green-400 shadow-lg shadow-green-500/20' 
                        : 'border-white/10 hover:border-white/20'
                    }`}
                    placeholder="Full name"
                    type="text"
                    value={form.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    onFocus={() => handleFocus('name')}
                    onBlur={() => handleBlur('name')}
                    disabled={loading}
                  />
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
                {form.name && form.name.length < 2 && (
                  <p className="text-red-300 text-xs animate-fade-in">Name must be at least 2 characters</p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-3">
                <div className="relative">
                  <input
                    className={`w-full px-5 py-4 bg-white/5 border-2 rounded-2xl text-white placeholder-purple-200/60 focus:outline-none transition-all duration-300 backdrop-blur-sm pl-12 ${
                      isFocused.email 
                        ? 'border-green-400 shadow-lg shadow-green-500/20' 
                        : 'border-white/10 hover:border-white/20'
                    }`}
                    placeholder="Email address"
                    type="email"
                    value={form.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    onFocus={() => handleFocus('email')}
                    onBlur={() => handleBlur('email')}
                    disabled={loading}
                  />
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                </div>
                {form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) && (
                  <p className="text-red-300 text-xs animate-fade-in">Please enter a valid email address</p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-3">
                <div className="relative">
                  <input
                    className={`w-full px-5 py-4 bg-white/5 border-2 rounded-2xl text-white placeholder-purple-200/60 focus:outline-none transition-all duration-300 backdrop-blur-sm pl-12 pr-12 ${
                      isFocused.password 
                        ? 'border-green-400 shadow-lg shadow-green-500/20' 
                        : 'border-white/10 hover:border-white/20'
                    }`}
                    placeholder="Create password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    onFocus={() => handleFocus('password')}
                    onBlur={() => handleBlur('password')}
                    disabled={loading}
                  />
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-300 hover:text-green-400 transition-colors duration-200 p-1 rounded-lg hover:bg-white/10"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m9.02 9.02l3.411 3.411M9.88 9.88l-3.41-3.41m9.02 9.02L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {form.password && form.password.length < 6 && (
                  <p className="text-red-300 text-xs animate-fade-in">Password must be at least 6 characters</p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-3">
                <div className="relative">
                  <input
                    className={`w-full px-5 py-4 bg-white/5 border-2 rounded-2xl text-white placeholder-purple-200/60 focus:outline-none transition-all duration-300 backdrop-blur-sm pl-12 pr-12 ${
                      isFocused.confirmPassword 
                        ? passwordMatch 
                          ? 'border-green-400 shadow-lg shadow-green-500/20' 
                          : 'border-red-400 shadow-lg shadow-red-500/20'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                    placeholder="Confirm password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={form.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    onFocus={() => handleFocus('confirmPassword')}
                    onBlur={() => handleBlur('confirmPassword')}
                    disabled={loading}
                  />
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-300 hover:text-green-400 transition-colors duration-200 p-1 rounded-lg hover:bg-white/10"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m9.02 9.02l3.411 3.411M9.88 9.88l-3.41-3.41m9.02 9.02L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {form.confirmPassword && !passwordMatch && (
                  <p className="text-red-300 text-xs animate-fade-in">Passwords do not match</p>
                )}
              </div>

              {/* Terms and Conditions */}
              <label className="flex items-start space-x-3 cursor-pointer group">
                <div className="relative mt-1">
                  <input 
                    type="checkbox" 
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="w-5 h-5 appearance-none border-2 border-purple-300 rounded-lg checked:bg-green-500 checked:border-green-500 transition-all duration-200 cursor-pointer"
                  />
                  <svg 
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white pointer-events-none opacity-0 checked:opacity-100 transition-opacity duration-200" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-purple-200 text-sm group-hover:text-white transition-colors duration-200 flex-1">
                  I agree to the{" "}
                  <Link to="/terms" className="text-green-400 hover:text-green-300 underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-green-400 hover:text-green-300 underline">
                    Privacy Policy
                  </Link>
                </span>
              </label>

              {/* Submit Button */}
              <button
                disabled={loading || !isFormValid}
                className={`w-full py-4 px-6 rounded-2xl font-semibold text-white transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-green-500/30 ${
                  loading || !isFormValid
                    ? 'bg-gray-600 cursor-not-allowed opacity-50'
                    : 'bg-gradient-to-r from-blue-500 to-blue-600  hover:to-indigo-700 shadow-lg hover:shadow-green-500/25'
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>

            {/* Login Link */}
            <p className="text-center text-purple-200 mt-6">
              Already have an account?{" "}
              <Link 
                to="/login" 
                className="text-green-400 hover:text-green-300 font-semibold transition-colors duration-200 hover:underline"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Register;
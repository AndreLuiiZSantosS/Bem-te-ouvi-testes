// frontend/src/pages/AuthPage.jsx

import React, { useState } from 'react';
import LoginForm from '../components/LoginForm.jsx';
import RegisterForm from '../components/RegisterForm.jsx';

const AuthPage = () => {
  const [isLoginView, setIsLoginView] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d1b2a] via-[#1b263b] to-[#2e2e54] flex items-center justify-center p-4">
      
      <div className="w-full max-w-md">
        
        {isLoginView ? (
          <>
            <LoginForm />
            <p className="text-center text-sm text-slate-200 mt-4">
              Não tem uma conta?{' '}
              <button onClick={() => setIsLoginView(false)} className="font-semibold text-[#90BFD3] hover:text-[#65b7db] transition">
                Cadastre-se
              </button>
            </p>
          </>
        ) : (
          <>
            <RegisterForm />
            <p className="text-center text-sm text-slate-200 mt-4">
              Já tem uma conta?{' '}
              <button onClick={() => setIsLoginView(true)} className="font-semibold text-[#90BFD3] hover:text-[#65b7db] transition">
                Faça login
              </button>
            </p>
          </>
        )}
        
      </div> 
    </div>   
  );
};

export default AuthPage;
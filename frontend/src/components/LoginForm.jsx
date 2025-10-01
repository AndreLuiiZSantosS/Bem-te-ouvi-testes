import React, { useState } from 'react';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados de Login:', { username, password });
    alert('Login simulado com sucesso!');
  };

  return (
    // Container do formulário com fundo semi-transparente
    <div className="w-full p-8 bg-black/50 rounded-2xl shadow-lg font-['Inter'] text-slate-100">
      <h2 className="text-center mb-6 text-3xl font-bold text-[#90BFD3]">
        Login
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="login-username" className="block font-semibold mb-1 text-white">
            Usuário
          </label>
          <input
            id="login-username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-4 py-2 border-2 border-[#90BFD3] rounded-full bg-transparent text-white outline-none focus:border-[#65b7db] focus:bg-white/5 transition-colors"
          />
        </div>
        <div>
          <label htmlFor="login-password" className="block font-semibold mb-1 text-white">
            Senha
          </label>
          <input
            id="login-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border-2 border-[#90BFD3] rounded-full bg-transparent text-white outline-none focus:border-[#65b7db] focus:bg-white/5 transition-colors"
          />
        </div>
        <button type="submit" className="mt-4 px-4 py-3 bg-[#90BFD3] text-[#101c25] font-bold rounded-full cursor-pointer text-lg hover:bg-[#65b7db] transition-colors">
          Entrar
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
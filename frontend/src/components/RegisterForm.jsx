import React, { useState } from 'react';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password2: '',
        userType: '',
        cpf: '',
        pixKey: '',
        profilePic: null,
      });
    
      const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData(prev => ({ 
            ...prev, 
            [name]: type === 'file' ? files[0] : value 
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.password2) {
            alert('As senhas não coincidem!');
            return;
        }
        console.log('Dados de Cadastro:', formData);
        alert('Cadastro simulado com sucesso!');
      };

  return (
    <div className="w-full p-8 bg-black/50 rounded-2xl shadow-lg font-['Inter'] text-slate-100">
      <h1 className="text-center mb-6 text-3xl font-bold text-[#90BFD3]">
        Cadastre-se
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col">
        
        <div className="mb-4">
          <label htmlFor="reg-username" className="block font-semibold mb-1 text-white">Nome de usuário</label>
          <input type="text" id="reg-username" name="username" value={formData.username} onChange={handleChange} required className="box-border w-full px-4 py-2 border-2 border-[#90BFD3] rounded-full bg-transparent text-white outline-none focus:border-[#65b7db] focus:bg-white/5 transition-colors" />
        </div>
        <div className="mb-4">
          <label htmlFor="reg-email" className="block font-semibold mb-1 text-white">Email</label>
          <input type="email" id="reg-email" name="email" value={formData.email} onChange={handleChange} required className="box-border w-full px-4 py-2 border-2 border-[#90BFD3] rounded-full bg-transparent text-white outline-none focus:border-[#65b7db] focus:bg-white/5 transition-colors" />
        </div>
        <div className="mb-4">
          <label htmlFor="reg-password" className="block font-semibold mb-1 text-white">Senha</label>
          <input type="password" id="reg-password" name="password" value={formData.password} onChange={handleChange} required className="box-border w-full px-4 py-2 border-2 border-[#90BFD3] rounded-full bg-transparent text-white outline-none focus:border-[#65b7db] focus:bg-white/5 transition-colors" />
        </div>
        <div className="mb-4">
          <label htmlFor="reg-password2" className="block font-semibold mb-1 text-white">Confirme a Senha</label>
          <input type="password" id="reg-password2" name="password2" value={formData.password2} onChange={handleChange} required className="box-border w-full px-4 py-2 border-2 border-[#90BFD3] rounded-full bg-transparent text-white outline-none focus:border-[#65b7db] focus:bg-white/5 transition-colors" />
        </div>
        <div className="mb-4">
          <label htmlFor="userType" className="block font-semibold mb-1 text-white">Tipo de Usuário</label>
          <select id="userType" name="userType" value={formData.userType} onChange={handleChange} required className="box-border w-full px-4 py-2 border-2 border-[#90BFD3] rounded-full bg-transparent text-white outline-none focus:border-[#65b7db] focus:bg-white/5 transition-colors">
            <option value="" disabled>Escolha uma opção</option>
            <option value="ouvinte">Ouvinte</option>
            <option value="musico">Músico</option>
          </select>
        </div>

        {formData.userType === 'musico' && (
          <div className="flex flex-col gap-4 mb-4">
            <div>
              <label htmlFor="cpf" className="block font-semibold mb-1 text-white">CPF</label>
              <input type="text" id="cpf" name="cpf" value={formData.cpf} onChange={handleChange} placeholder="000.000.000-00" className="box-border w-full px-4 py-2 border-2 border-[#90BFD3] rounded-full bg-transparent text-white outline-none focus:border-[#65b7db] focus:bg-white/5 transition-colors" />
            </div>
            <div>
              <label htmlFor="pixKey" className="block font-semibold mb-1 text-white">Chave Pix (opcional)</label>
              <input type="text" id="pixKey" name="pixKey" value={formData.pixKey} onChange={handleChange} className="box-border w-full px-4 py-2 border-2 border-[#90BFD3] rounded-full bg-transparent text-white outline-none focus:border-[#65b7db] focus:bg-white/5 transition-colors" />
            </div>
          </div>
        )}
        <div className="mb-4">
            <label htmlFor="profilePic" className="block font-semibold mb-1 text-white">Foto de Perfil (opcional)</label>
            <input type="file" id="profilePic" name="profilePic" onChange={handleChange} accept="image/*" className="w-full text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#90BFD3] file:text-[#101c25] hover:file:bg-[#65b7db]"/>
        </div>

        <button type="submit" className="box-border w-full px-4 py-2 bg-[#90BFD3] text-[#101c25] font-bold rounded-full cursor-pointer text-lg hover:bg-[#65b7db] transition-colors border-2 border-[#90BFD3]">
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
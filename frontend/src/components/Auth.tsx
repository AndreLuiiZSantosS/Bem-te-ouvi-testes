import { useState } from "react";
import LoginIllustration from "../assets/foto_login.png";
import Login from "../routes/Login";
import Registrar from "../routes/Registrar";

export default function Auth() {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="flex w-full h-screen bg-[#fafafa] overflow-hidden">
      
      <div className="w-full md:w-1/2 h-full flex flex-col justify-center items-center p-8 relative z-10">
        <div className="w-full max-w-[580px] flex flex-col items-center py-10">

          {!isRegister && (
            <h1 className="text-[42px] font-medium text-[#D43F5D] mb-8 text-center leading-tight">
              Seja bem-vindo de volta!
            </h1>
          )}

          <div className="bg-white rounded-[32px] shadow-[0_10px_40px_rgba(0,0,0,0.06)] p-10 w-full border border-gray-100 max-h-[80vh] overflow-y-auto">
            
            {isRegister ? (
              <Registrar toggle={() => setIsRegister(false)} />
            ) : (
              <Login toggle={() => setIsRegister(true)} />
            )}

          </div>
        </div>
      </div>

      <div className="hidden md:flex w-1/2 h-full justify-center items-center bg-[#fafafa]">
        <img
          src={LoginIllustration}
          alt="Ilustração"
          className="h-[85%] w-auto object-contain"
        />
      </div>
    </div>
  );
}

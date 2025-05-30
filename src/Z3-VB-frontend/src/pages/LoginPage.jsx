import React from "react";
import { AuthClient } from "@dfinity/auth-client";
import { createActor } from "declarations/Z3-VB-backend"; //Ajustar si el nombre no es el mismo
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const login = async () => {
    const authClient = await AuthClient.create();

    await authClient.login({
      identityProvider: "https://identity.ic0.app",
      onSuccess: async () => {
        const identity = authClient.getIdentity();

        const actor = createActor("uxrrr-q7777-77774-qaaaq-cai", {
          agentOptions: { identity },
        });

        const rol = await actor.obtenerRol();

        if (rol === "admin") {
          navigate("/dashboard-admin");
        } else if (rol === "docente") {
          navigate("/dashboard-docente");
        } else {
          alert("No tienes un rol asignado.");
        }
      },
    });
  };

  return (
    <div className="min-h-screen bg-indigo-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <div className="mb-6 text-center">
          <img src="/Z3.png" alt="Logo" className="mx-auto w-20 h-20" />
          <h1 className="text-2xl font-bold text-indigo-700 mt-2">Sistema de Reservas</h1>
          <p className="text-sm text-gray-500">Plataforma Z3</p>
        </div>
        <button
          onClick={login}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-lg transition"
        >
          Iniciar sesión con Internet Identity
        </button>
        <p className="mt-4 text-center text-sm text-gray-400">
          Acceso exclusivo para docentes y administradores.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

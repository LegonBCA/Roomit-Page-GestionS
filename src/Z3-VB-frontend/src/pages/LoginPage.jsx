import React, { useEffect } from "react";
import { AuthClient } from "@dfinity/auth-client";
import { createActor } from "declarations/Z3-VB-backend";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  // ✅ Verifica si el usuario ya está autenticado
  useEffect(() => {
    const checkAuth = async () => {
      const authClient = await AuthClient.create();
      const isAuthenticated = await authClient.isAuthenticated();

      if (isAuthenticated) {
        const identity = authClient.getIdentity();
        const actor = createActor("uxrrr-q7777-77774-qaaaq-cai", {
          agentOptions: { identity },
        });

        const rol = await actor.obtenerRol();
        console.log("Autenticado como:", rol);

        if (rol === "admin") {
          navigate("/dashboard-admin");
        } else if (rol === "docente") {
          navigate("/dashboard-docente");
        } else {
          console.log("No tiene un rol asignado");
        }
      }
    };

    checkAuth();
  }, [navigate]);

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
        console.log("Rol tras login:", rol);

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
    <div className="login-container">
      <div className="login-card">
        <div className="text-center">
          <img src="/Z3.png" alt="Logo" className="login-logo" />
          <h1 className="login-title">Sistema de Reservas</h1>
          <p className="text-sm text-gray-500">Plataforma Z3</p>
        </div>
        <button onClick={login} className="login-button">
          Iniciar sesión con Internet Identity
        </button>
        <p className="login-note">
          Acceso exclusivo para docentes y administradores.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;


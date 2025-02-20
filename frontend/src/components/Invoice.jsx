import React from "react";
import { useNavigate } from "react-router-dom";

const Invoice = ({ data = null }) => {
  if (data === null) {
    return (
      <div className="factura bg-azul6 shadow-md rounded p-6 max-w-md mx-auto mt-6">
        <div className="flex justify-center mb-4">
          <img
            src={`../../public/img/logo2.png`}
            alt="Logo"
            className="mb-4 w-46"
          />
        </div>
        <h2 className="text-2xl font-bold mb-4 text-white">
          Problema de facturacion{" "}
        </h2>
        <div className="factura-content">
          <div className="factura-section mb-4">
            <p className="text-gray-300">
              Hubo un problema de facturación. Si se realizó un cobro a tu
              cuenta, te recomendamos crear un ticket de soporte adjuntando el
              recibo de pago. Un técnico especializado revisará tu caso y
              trabajará contigo para resolver el problema lo antes posible.
              Agradecemos tu paciencia y comprensión mientras solucionamos este
              inconveniente.
            </p>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={() => {
              navigate("/logout");
            }}
            className="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Continuar
          </button>
        </div>
      </div>
    );
  }
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="factura bg-azul6 shadow-md rounded p-6 max-w-md mx-auto mt-6">
      <div className="flex justify-center mb-4">
        <img
          src={`../../public/img/logo2.png`}
          alt="Logo"
          className="mb-4 w-46"
        />
      </div>
      <h2 className="text-2xl font-bold mb-4 text-white">
        Detalles de la Factura
      </h2>
      <div className="factura-content">
        <div className="factura-section mb-4">
          <h3 className="text-xl font-semibold mb-2 text-gray-200">
            Información del Usuario
          </h3>
          <p className="text-gray-300 capitalize">
            <strong>Nombre:</strong> {data.userID.name} {data.userID.lastName}
          </p>
        </div>
        <div className="factura-section mb-4">
          <h3 className="text-xl font-semibold mb-2 text-gray-200">
            Información del Pago
          </h3>
          <p className="text-gray-300">
            <strong>Monto:</strong> ${data.amount}
          </p>
          <p className="text-gray-300">
            <strong>Fecha de Pago:</strong>{" "}
            {new Date(data.paymentDate).toLocaleDateString()}
          </p>
        </div>
        <div className="factura-section mb-4">
          <h3 className="text-xl font-semibold mb-2 text-white">
            Datos de la Factura
          </h3>
          <p className="text-gray-300">
            <strong>ID de la Factura:</strong> {data._id}
          </p>
          <p className="text-gray-300">
            <strong>Creado el:</strong>{" "}
            {new Date(data.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="factura-section mb-4">
          <h3 className="text-xl font-semibold mb-2 text-white">Plan</h3>
          <p className="text-gray-300">Premium</p>
        </div>
      </div>
      <div className="flex justify-between">
        <button
          onClick={handlePrint}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Imprimir
        </button>
        <button
          onClick={() => {
            navigate("/logout");
          }}
          className="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Continuar
        </button>
      </div>
    </div>
  );
};

export default Invoice;

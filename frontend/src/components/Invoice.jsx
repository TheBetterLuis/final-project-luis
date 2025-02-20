import React from "react";

const Invoice = ({ data = null }) => {
  if (!data) {
    return <p>No invoice data provided</p>;
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
      <button
        onClick={handlePrint}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Imprimir
      </button>
    </div>
  );
};

export default Invoice;

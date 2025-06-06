import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-6 mt-auto">
      <div className="container-custom">
        <div className="text-center">
          <p className="text-sm">
            © {currentYear} AGROINVEST - Crédito e Assessoria Rural. Todos os direitos reservados.
          </p>
          <p className="text-sm mt-2">
            Buritis - Rondônia
          </p>
        </div>
      </div>
    </footer>
  );
} 
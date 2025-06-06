import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-green-600 text-white py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Seu Parceiro em Crédito e Assessoria Rural
            </h1>
            <p className="text-xl mb-8">
              Soluções financeiras e consultoria especializada para o agronegócio em Buritis - RO
            </p>
            <Link
              to="/contato"
              className="inline-block bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Fale Conosco
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="card">
              <h3 className="text-xl font-semibold mb-4">Cotações Atualizadas</h3>
              <p className="text-gray-600">
                Acompanhe os preços do mercado agropecuário local em tempo real
              </p>
              <Link to="/cotacoes" className="text-green-600 hover:text-green-700 mt-4 inline-block">
                Ver cotações →
              </Link>
            </div>

            <div className="card">
              <h3 className="text-xl font-semibold mb-4">Análise de Mercado</h3>
              <p className="text-gray-600">
                Relatórios semanais e insights sobre o mercado do boi gordo
              </p>
              <Link to="/analises" className="text-green-600 hover:text-green-700 mt-4 inline-block">
                Ver análises →
              </Link>
            </div>

            <div className="card">
              <h3 className="text-xl font-semibold mb-4">Calculadora de Rentabilidade</h3>
              <p className="text-gray-600">
                Simule e analise a rentabilidade das suas operações pecuárias
              </p>
              <Link to="/rentabilidade" className="text-green-600 hover:text-green-700 mt-4 inline-block">
                Calcular rentabilidade →
              </Link>
            </div>

            <div className="card">
              <h3 className="text-xl font-semibold mb-4">Oportunidades</h3>
              <p className="text-gray-600">
                Encontre as melhores oportunidades de negócio na região
              </p>
              <Link to="/oportunidades" className="text-green-600 hover:text-green-700 mt-4 inline-block">
                Ver oportunidades →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">Precisa de assessoria especializada?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Nossa equipe está pronta para ajudar você a alcançar seus objetivos no agronegócio
          </p>
          <Link
            to="/contato"
            className="btn-primary text-lg"
          >
            Solicitar Consultoria
          </Link>
        </div>
      </section>
    </div>
  );
} 
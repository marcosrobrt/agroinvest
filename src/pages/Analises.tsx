import React from 'react';
import { CalendarIcon, ChartBarIcon, NewspaperIcon } from '@heroicons/react/24/outline';

interface Analise {
  id: number;
  data: string;
  titulo: string;
  resumo: string;
  conteudo: string;
  autor: string;
  tendencia: 'alta' | 'baixa' | 'estavel';
}

const analises: Analise[] = [
  {
    id: 1,
    data: '31/05/2025',
    titulo: 'Análise do Mercado do Boi Gordo - Rondônia',
    resumo: 'Mercado apresenta tendência de alta com forte demanda chinesa',
    autor: 'Equipe AGROINVEST',
    tendencia: 'alta',
    conteudo: `O mercado do boi gordo em Rondônia apresenta sinais positivos nesta última semana de maio. 
    A arroba do boi gordo atingiu R$ 235,00, representando um aumento de 2,5% em relação à semana anterior.

    Principais fatores que influenciam o mercado:

    1. Demanda Internacional
    - China aumentou as importações em 15% este mês
    - Novos mercados se abrem no Oriente Médio
    - Câmbio favorável para exportações

    2. Cenário Local
    - Oferta restrita de animais prontos para abate
    - Pastagens em boas condições devido às chuvas
    - Frigoríficos com escalas de abate mais longas

    3. Perspectivas
    - Tendência de sustentação dos preços nos próximos 30 dias
    - Expectativa de novos aumentos com a entressafra
    - Produtores mais capitalizados seguram animais

    Notícias Relevantes da Região:
    
    - Nova planta frigorífica será inaugurada em Porto Velho
    - Programa de melhoramento genético atinge 1000 produtores em Rondônia
    - Leilão virtual em Buritis registra média de R$ 2.800 para bezerros
    - Exportações de carne bovina pelo porto de Porto Velho crescem 25%

    Recomendações:
    - Momento favorável para comercialização
    - Importante manter planejamento de vendas
    - Atenção às oportunidades de mercado futuro`
  }
];

export default function Analises() {
  return (
    <div className="py-8">
      <div className="container-custom">
        <h1 className="text-3xl font-bold mb-8">Análises de Mercado</h1>
        
        {analises.map((analise) => (
          <article key={analise.id} className="card mb-8">
            <header className="mb-6">
              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center text-gray-500">
                  <CalendarIcon className="h-5 w-5 mr-2" />
                  <span>{analise.data}</span>
                </div>
                <div className="flex items-center">
                  <ChartBarIcon className={`h-5 w-5 mr-2 ${
                    analise.tendencia === 'alta' ? 'text-green-500' :
                    analise.tendencia === 'baixa' ? 'text-red-500' :
                    'text-yellow-500'
                  }`} />
                  <span className={`font-medium ${
                    analise.tendencia === 'alta' ? 'text-green-600' :
                    analise.tendencia === 'baixa' ? 'text-red-600' :
                    'text-yellow-600'
                  }`}>
                    Tendência de {analise.tendencia}
                  </span>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold mb-2">{analise.titulo}</h2>
              <p className="text-lg text-gray-600">{analise.resumo}</p>
            </header>

            <div className="prose prose-green max-w-none">
              {analise.conteudo.split('\n\n').map((paragrafo, index) => (
                <p key={index} className="mb-4">
                  {paragrafo}
                </p>
              ))}
            </div>

            <footer className="mt-8 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Por {analise.autor}
                </div>
                <button className="inline-flex items-center text-green-600 hover:text-green-700">
                  <NewspaperIcon className="h-5 w-5 mr-2" />
                  Compartilhar análise
                </button>
              </div>
            </footer>
          </article>
        ))}
      </div>
    </div>
  );
} 
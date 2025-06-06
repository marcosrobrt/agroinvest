import React from 'react';
import { ArrowTrendingUpIcon } from '@heroicons/react/24/outline';

interface CotacaoBoi {
  id: number;
  tipo: string;
  prazo: string;
  valor: number;
  funRural: string;
}

interface CotacaoBezerro {
  praca: string;
  valorMacho: number;
  valorFemea: number;
}

interface CotacaoCommodity {
  id: number;
  produto: string;
  valor: number;
  unidade: string;
}

interface ContratoFuturo {
  mes: string;
  valor: number;
}

const cotacoesBoi: CotacaoBoi[] = [
  { id: 1, tipo: "BOI INTEIRO", prazo: "à vista", valor: 267.00, funRural: "Fun. Rural 1,50%" },
  { id: 2, tipo: "BOI INTEIRO", prazo: "a prazo", valor: 270.00, funRural: "Fun. Rural 1,50%" },
  { id: 3, tipo: "VACA", prazo: "a prazo", valor: 240.00, funRural: "Fun. Rural 1,50%" },
  { id: 4, tipo: "NOVILHA", prazo: "à vista", valor: 257.00, funRural: "Fun. Rural 1,50%" },
  { id: 5, tipo: "NOVILHA", prazo: "a prazo", valor: 260.00, funRural: "Fun. Rural 1,50%" },
  { id: 6, tipo: "BEZERRO", prazo: "", valor: 2150.00, funRural: "-" },
  { id: 7, tipo: "BEZERRA", prazo: "", valor: 1433.33, funRural: "-" },
];

const cotacoesCommodities: CotacaoCommodity[] = [
  { id: 1, produto: "SOJA", valor: 138.00, unidade: "saca" },
  { id: 2, produto: "MILHO", valor: 52.00, unidade: "saca" },
  { id: 3, produto: "CAFÉ", valor: 845.00, unidade: "saca" },
];

const cotacoesBezerro: CotacaoBezerro[] = [
  { praca: "Vale do Jamari", valorMacho: 2200.00, valorFemea: 1400.00 },
];

const contratosFuturos: ContratoFuturo[] = [
  { mes: "Maio/2025", valor: 305.00 },
  { mes: "Junho/2025", valor: 312.65 },
  { mes: "Julho/2025", valor: 321.20 },
  { mes: "Agosto/2025", valor: 324.85 },
  { mes: "Setembro/2025", valor: 331.50 },
];

export default function Cotacoes() {
  return (
    <div className="py-8 bg-gray-50">
      <div className="container-custom">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Cotação AGROINVEST
            <span className="block text-sm font-normal text-gray-500 mt-1">
              30 de Maio 2025
            </span>
          </h1>
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Dólar - R$ 5,67</span>
              <ArrowTrendingUpIcon className="h-4 w-4 text-green-600" />
            </div>
          </div>
        </div>

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-12">
          {/* Cotações de Gado */}
          <div className="lg:col-span-7 bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-4 py-3 bg-green-50 border-b border-green-100">
              <h2 className="font-semibold text-gray-800">COTAÇÕES DE GADO</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {cotacoesBoi.map((cotacao) => (
                <div key={cotacao.id} className="px-4 py-3 flex items-center justify-between hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-gray-900">
                      {cotacao.tipo} {cotacao.prazo}
                    </span>
                  </div>
                  <div className="flex items-center gap-8">
                    <span className="text-gray-900 font-medium">
                      R$ {cotacao.valor.toFixed(2)}
                    </span>
                    <span className="text-gray-600 w-24 text-right text-sm">
                      {cotacao.funRural}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Outras Commodities */}
          <div className="lg:col-span-5 bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-4 py-3 bg-green-50 border-b border-green-100">
              <h2 className="font-semibold text-gray-800">OUTRAS COMMODITIES</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {cotacoesCommodities.map((commodity) => (
                <div key={commodity.id} className="px-4 py-3 flex justify-between hover:bg-gray-50">
                  <span className="text-gray-900 font-medium">{commodity.produto}</span>
                  <div className="text-right">
                    <span className="font-medium text-gray-900">R$ {commodity.valor.toFixed(2)}</span>
                    <span className="text-sm text-gray-500 ml-2">/{commodity.unidade}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contratos Futuros */}
          <div className="lg:col-span-7 bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-4 py-3 bg-green-50 border-b border-green-100">
              <h2 className="font-semibold text-gray-800">CONTRATOS FUTUROS - BOI GORDO B3</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {contratosFuturos.map((contrato, index) => (
                <div key={index} className="px-4 py-3 flex justify-between hover:bg-gray-50">
                  <span className="text-gray-900">{contrato.mes}</span>
                  <span className="font-medium text-gray-900">R$ {contrato.valor.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tabela de Bezerros por Região */}
          <div className="lg:col-span-5 bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-4 py-3 bg-green-50 border-b border-green-100">
              <h2 className="font-semibold text-gray-800">BEZERRO(A) - PREÇOS POR REGIÃO</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Região</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">Macho</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">Fêmea</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {cotacoesBezerro.map((cotacao, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-900">{cotacao.praca}</td>
                      <td className="px-4 py-3 text-right text-gray-900">
                        R$ {cotacao.valorMacho.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-right text-gray-900">
                        R$ {cotacao.valorFemea.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500 italic">
          Informação precisa para decisões inteligentes no agronegócio.
        </div>
      </div>
    </div>
  );
} 
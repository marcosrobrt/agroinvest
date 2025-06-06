import React, { useState, useEffect } from 'react';

interface Suplemento {
  nome: string;
  ganhoAguasMacho: number;
  ganhoSecaMacho: number;
  ganhoAguasFemea: number;
  ganhoSecaFemea: number;
  consumo_dia_g: number;
  preco_suplemento_kg: number;
  tipo: 'suplemento' | 'racao';
}

interface ResultadoCalculo {
  nome: string;
  ganho_total_kg: number;
  arrobas_produzidas: number;
  consumo_total_kg: number;
  custo_total: number;
  receita: number;
  lucro: number;
  custo_por_arroba: number;
  ganho_diario: number;
}

const suplementosIniciais: Suplemento[] = [
  {
    nome: "Sal Branco",
    ganhoAguasMacho: 200,
    ganhoSecaMacho: -100,
    ganhoAguasFemea: 140,
    ganhoSecaFemea: -100,
    consumo_dia_g: 30,
    preco_suplemento_kg: 1.0,
    tipo: 'suplemento'
  },
  {
    nome: "Suplemento Mineral",
    ganhoAguasMacho: 350,
    ganhoSecaMacho: 0,
    ganhoAguasFemea: 245,
    ganhoSecaFemea: 0,
    consumo_dia_g: 70,
    preco_suplemento_kg: 2.0,
    tipo: 'suplemento'
  },
  {
    nome: "Suplemento Mineral + Aditivos",
    ganhoAguasMacho: 500,
    ganhoSecaMacho: 100,
    ganhoAguasFemea: 350,
    ganhoSecaFemea: 70,
    consumo_dia_g: 150,
    preco_suplemento_kg: 3.0,
    tipo: 'suplemento'
  },
  {
    nome: "Suplemento Mineral Proteico",
    ganhoAguasMacho: 700,
    ganhoSecaMacho: 250,
    ganhoAguasFemea: 490,
    ganhoSecaFemea: 175,
    consumo_dia_g: 450,
    preco_suplemento_kg: 3.5,
    tipo: 'suplemento'
  },
  {
    nome: "Suplemento Mineral Proteico Energético (0,2%)",
    ganhoAguasMacho: 900,
    ganhoSecaMacho: 350,
    ganhoAguasFemea: 630,
    ganhoSecaFemea: 245,
    consumo_dia_g: 900,
    preco_suplemento_kg: 4.0,
    tipo: 'suplemento'
  },
  {
    nome: "Ração a 0,5% PV",
    ganhoAguasMacho: 1150,
    ganhoSecaMacho: 500,
    ganhoAguasFemea: 805,
    ganhoSecaFemea: 350,
    consumo_dia_g: 2250,
    preco_suplemento_kg: 2.5,
    tipo: 'racao'
  },
  {
    nome: "Ração a 1% PV",
    ganhoAguasMacho: 1400,
    ganhoSecaMacho: 800,
    ganhoAguasFemea: 980,
    ganhoSecaFemea: 560,
    consumo_dia_g: 4500,
    preco_suplemento_kg: 2.5,
    tipo: 'racao'
  }
];

const ViabilidadeSuplemCalculator: React.FC = () => {
  const [diasSuplementacao, setDiasSuplementacao] = useState<number>(90);
  const [precoArroba, setPrecoArroba] = useState<number>(300);
  const [categoria, setCategoria] = useState<'macho' | 'femea'>('macho');
  const [periodo, setPeriodo] = useState<'aguas' | 'seca'>('aguas');
  const [suplementos, setSuplementos] = useState<Suplemento[]>(suplementosIniciais);
  const [resultados, setResultados] = useState<ResultadoCalculo[]>([]);

  const atualizarPrecoSuplemento = (nome: string, novoPreco: number) => {
    setSuplementos(suplementosAtuais => {
      const novosSuplementos = suplementosAtuais.map(suplemento => {
        if (suplemento.nome === nome) {
          return { ...suplemento, preco_suplemento_kg: novoPreco };
        }
        return suplemento;
      });
      return novosSuplementos;
    });
  };

  const atualizarPrecoRacao = (novoPreco: number) => {
    setSuplementos(suplementosAtuais => {
      const novosSuplementos = suplementosAtuais.map(suplemento => {
        if (suplemento.tipo === 'racao') {
          return { ...suplemento, preco_suplemento_kg: novoPreco };
        }
        return suplemento;
      });
      return novosSuplementos;
    });
  };

  const calcularResultados = () => {
    const novosResultados = suplementos.map(suplemento => {
      let ganho_dia_g = 0;
      if (categoria === 'macho') {
        ganho_dia_g = periodo === 'aguas' ? suplemento.ganhoAguasMacho : suplemento.ganhoSecaMacho;
      } else {
        ganho_dia_g = periodo === 'aguas' ? suplemento.ganhoAguasFemea : suplemento.ganhoSecaFemea;
      }

      const ganho_total_kg = (ganho_dia_g * diasSuplementacao) / 1000;
      const arrobas_produzidas = ganho_total_kg / 30;
      const consumo_total_kg = (suplemento.consumo_dia_g * diasSuplementacao) / 1000;
      const custo_total = consumo_total_kg * suplemento.preco_suplemento_kg;
      const receita = arrobas_produzidas * precoArroba;
      const lucro = receita - custo_total;
      const custo_por_arroba = arrobas_produzidas > 0 ? custo_total / arrobas_produzidas : 0;

      return {
        nome: suplemento.nome,
        ganho_total_kg,
        arrobas_produzidas,
        consumo_total_kg,
        custo_total,
        receita,
        lucro,
        custo_por_arroba,
        ganho_diario: ganho_dia_g
      };
    });

    setResultados(novosResultados);
  };

  useEffect(() => {
    calcularResultados();
  }, [diasSuplementacao, precoArroba, categoria, periodo, suplementos]);

  const formatarNumero = (valor: number): string => {
    return valor.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-green-700 text-white p-6">
          <h1 className="text-3xl font-bold text-center">
            Calculadora de Viabilidade da Suplementação
          </h1>
          <p className="text-center mt-2 text-green-100">
            Bovinos de Corte
          </p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Categoria
              </label>
              <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value as 'macho' | 'femea')}
                className="w-full border rounded-md px-3 py-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="macho">Machos</option>
                <option value="femea">Fêmeas</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Período
              </label>
              <select
                value={periodo}
                onChange={(e) => setPeriodo(e.target.value as 'aguas' | 'seca')}
                className="w-full border rounded-md px-3 py-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="aguas">Águas</option>
                <option value="seca">Seca</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dias de Suplementação
              </label>
              <input
                type="number"
                value={diasSuplementacao}
                onChange={(e) => setDiasSuplementacao(Number(e.target.value))}
                className="w-full border rounded-md px-3 py-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preço da Arroba (R$)
              </label>
              <input
                type="number"
                value={precoArroba}
                onChange={(e) => setPrecoArroba(Number(e.target.value))}
                className="w-full border rounded-md px-3 py-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>

          {/* Seção de Preços dos Suplementos */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Preços dos Suplementos (R$/kg)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {suplementos
                .filter(suplemento => suplemento.tipo === 'suplemento')
                .map(suplemento => (
                  <div key={suplemento.nome}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {suplemento.nome}
                    </label>
                    <input
                      type="number"
                      value={suplemento.preco_suplemento_kg}
                      onChange={(e) => atualizarPrecoSuplemento(suplemento.nome, Number(e.target.value))}
                      step="0.01"
                      className="w-full border rounded-md px-3 py-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                ))}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ração (0,5% e 1% PV)
                </label>
                <input
                  type="number"
                  value={suplementos.find(s => s.tipo === 'racao')?.preco_suplemento_kg || 0}
                  onChange={(e) => atualizarPrecoRacao(Number(e.target.value))}
                  step="0.01"
                  className="w-full border rounded-md px-3 py-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Suplemento
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ganho Diário (g)
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ganho Total (kg)
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Arrobas (@)
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Consumo (kg)
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Custo (R$)
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Receita (R$)
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lucro (R$)
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Custo/@ (R$)
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {resultados.map((resultado, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {resultado.nome}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatarNumero(resultado.ganho_diario)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatarNumero(resultado.ganho_total_kg)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatarNumero(resultado.arrobas_produzidas)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatarNumero(resultado.consumo_total_kg)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatarNumero(resultado.custo_total)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatarNumero(resultado.receita)}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                      resultado.lucro >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {formatarNumero(resultado.lucro)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatarNumero(resultado.custo_por_arroba)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViabilidadeSuplemCalculator; 
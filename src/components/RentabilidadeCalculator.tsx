import React, { useState, useEffect } from 'react';

interface CalculatorState {
  // Dados e Zootécnicos
  pesoVivoInicial: number;
  pesoArroba: number;
  pesoVivoFinal: number;
  pesoArrobaFinal: number;
  pesoCarcaca: number;
  pesoArrobaCarcaca: number;
  periodoDias: number;
  dataInicial: string;
  dataFinal: string;
  consumoKg: number | string;
  consumoEstimadoPerc: number | string;
  
  // Dados Financeiros
  racaoProvemix: number;
  precoInicial: number;
  precoVenda: number;
  custoOperacional: number;
  custoPastagens: number;

  // Assinatura de índice para permitir acesso dinâmico às propriedades
  [key: string]: number | string;
}

const RentabilidadeCalculator: React.FC = () => {
  const [dados, setDados] = useState<CalculatorState>({
    pesoVivoInicial: 415.55,
    pesoArroba: 0,
    pesoVivoFinal: 558.00,
    pesoArrobaFinal: 0,
    pesoCarcaca: 308.30,
    pesoArrobaCarcaca: 0,
    periodoDias: 126,
    dataInicial: '2023-08-20',
    dataFinal: '2023-12-24',
    consumoKg: '3.400',
    consumoEstimadoPerc: '0.699',
    racaoProvemix: 1.92,
    precoInicial: 209.06,
    precoVenda: 209.06,
    custoOperacional: 0.12,
    custoPastagens: 0
  });

  const [resultados, setResultados] = useState({
    gmd: 0,
    arrobasProduzidas: 0,
    rendimentoCarcaca: 0,
    ganhoDiarioCarcaca: 0,
    consumoEstimado: 0,
    custoSuplementacao: 0,
    custoCompraAnimais: 0,
    precoVendaTotal: 0,
    lucroBruto: 0,
    custoTotalSuplementacao: 0,
    custoTotalOperacional: 0,
    custoTotalPastagens: 0,
    investimentoTotal: 0,
    custoProducao: 0,
    custoPorArroba: 0,
    lucroLiquido: 0,
    rentabilidadeTotal: 0,
    rentabilidadeMensal: 0
  });

  useEffect(() => {
    // Converte valores de string para número para cálculos
    const consumoKgNum = typeof dados.consumoKg === 'string' ? parseFloat(dados.consumoKg) || 0 : dados.consumoKg;
    const consumoEstimadoPercNum = typeof dados.consumoEstimadoPerc === 'string' ? parseFloat(dados.consumoEstimadoPerc) || 0 : dados.consumoEstimadoPerc;
    const racaoProvemixNum = typeof dados.racaoProvemix === 'string' ? parseFloat(dados.racaoProvemix) || 0 : dados.racaoProvemix || 0;

    // Cálculos baseados nas fórmulas fornecidas
    const pesoArroba = dados.pesoVivoInicial / 30;
    const pesoArrobaFinal = dados.pesoVivoFinal / 30;
    const arrobasProduzidas = (dados.pesoCarcaca - (dados.pesoVivoInicial / 2)) / 15;
    const rendimentoCarcaca = dados.pesoCarcaca / dados.pesoVivoFinal * 100;
    const ganhoDiarioCarcaca = (dados.pesoCarcaca - (dados.pesoVivoInicial / 2)) / dados.periodoDias;
    const pesoArrobaCarcaca = dados.pesoCarcaca / 15;
    const consumoEstimado = consumoKgNum * racaoProvemixNum;
    const custoCompraAnimais = dados.precoInicial * pesoArroba;
    const precoVendaTotal = dados.precoVenda * pesoArrobaCarcaca;
    const lucroBruto = precoVendaTotal - custoCompraAnimais;
    
    const custoTotalSuplementacao = consumoEstimado * dados.periodoDias;
    const custoTotalOperacional = dados.custoOperacional * dados.periodoDias;
    const custoTotalPastagens = dados.custoPastagens * dados.periodoDias;
    const investimentoTotal = custoCompraAnimais + custoTotalSuplementacao + custoTotalOperacional + custoTotalPastagens;
    
    const custoProducao = custoTotalSuplementacao + custoTotalOperacional + custoTotalPastagens;
    const custoPorArroba = custoProducao / arrobasProduzidas;
    
    const gmd = (dados.pesoVivoFinal - dados.pesoVivoInicial) / dados.periodoDias;

    setResultados({
      gmd,
      arrobasProduzidas,
      rendimentoCarcaca,
      ganhoDiarioCarcaca,
      consumoEstimado: consumoEstimadoPercNum,
      custoSuplementacao: racaoProvemixNum,
      custoCompraAnimais,
      precoVendaTotal,
      lucroBruto,
      custoTotalSuplementacao,
      custoTotalOperacional,
      custoTotalPastagens,
      investimentoTotal,
      custoProducao,
      custoPorArroba,
      lucroLiquido: lucroBruto - custoProducao,
      rentabilidadeTotal: ((lucroBruto - custoProducao) / investimentoTotal) * 100,
      rentabilidadeMensal: (((lucroBruto - custoProducao) / investimentoTotal) * 100) / (dados.periodoDias / 30.4)
    });
  }, [dados]);

  // Função para formatar números removendo zeros à esquerda
  const formatNumber = (value: number | string): string => {
    // Se for string, retorna como está para preservar zeros e decimais durante edição
    if (typeof value === 'string') return value;
    
    if (value === 0) return '0';
    const strValue = value.toString();
    
    // Se o número é entre 0 e 1 (ou -1 e 0), adiciona zero se necessário
    if ((value > -1 && value < 0) || (value > 0 && value < 1)) {
      if (strValue.startsWith('.')) return '0' + strValue;
      if (strValue.startsWith('-.')) return '-0' + strValue.slice(1);
    }
    
    return strValue;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDados(prev => {
      const newDados = {
        ...prev
      };

      // Tratar campos numéricos
      if (name !== 'dataInicial' && name !== 'dataFinal') {
        if (value === '' || value === '-' || value === '.' || value === '0.') {
          newDados[name] = value === '' ? 0 : value;
          // Se um campo for zerado, zera o outro campo de consumo também
          if (value === '' && (name === 'consumoKg' || name === 'consumoEstimadoPerc')) {
            newDados[name === 'consumoKg' ? 'consumoEstimadoPerc' : 'consumoKg'] = '';
          }
        } else {
          // Aceita qualquer número válido, incluindo zeros entre dígitos após o decimal
          if (value.match(/^-?\d*\.?\d*$/)) {
            // Para campos de consumo, mantém como string para preservar zeros
            if (name === 'consumoKg' || name === 'consumoEstimadoPerc') {
              newDados[name] = value;
            } else {
              // Para outros campos numéricos, converte para número
              const parsedValue = parseFloat(value);
              if (!isNaN(parsedValue)) {
                newDados[name] = parsedValue;
              }
            }

            // Atualiza o valor numérico apenas se for um número válido
            const parsedValue = parseFloat(value);
            if (!isNaN(parsedValue)) {
              // Calcular média do peso vivo
              const mediaPesoVivo = (newDados.pesoVivoInicial + newDados.pesoVivoFinal) / 2;

              // Atualizar consumo kg ou percentual dependendo de qual campo foi alterado
              if (name === 'consumoKg') {
                const newPerc = (parsedValue / mediaPesoVivo) * 100;
                newDados.consumoEstimadoPerc = newPerc.toString();
              } else if (name === 'consumoEstimadoPerc') {
                const newKg = (parsedValue * mediaPesoVivo) / 100;
                newDados.consumoKg = newKg.toString();
              }
            }
          }
        }
      } else {
        newDados[name] = value;
      }

      // Atualizar período quando as datas mudarem
      if (name === 'dataInicial' || name === 'dataFinal') {
        const dataInicial = new Date(newDados.dataInicial);
        const dataFinal = new Date(newDados.dataFinal);
        if (!isNaN(dataInicial.getTime()) && !isNaN(dataFinal.getTime())) {
          const diffTime = Math.abs(dataFinal.getTime() - dataInicial.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          newDados.periodoDias = diffDays;
        }
      }

      return newDados;
    });
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-green-700 text-white p-6">
          <h1 className="text-3xl font-bold text-center">
            Calculadora de Rentabilidade
          </h1>
          <p className="text-center mt-2 text-green-100">
            Bovinos de Corte
          </p>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Dados e Zootécnicos */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="bg-green-600 text-white px-4 py-2 rounded-t-lg">
                <h2 className="text-lg font-semibold">Dados Zootécnicos</h2>
              </div>
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Peso Vivo Inicial (kg)
                    </label>
                    <input
                      type="number"
                      name="pesoVivoInicial"
                      value={formatNumber(dados.pesoVivoInicial)}
                      onChange={handleInputChange}
                      className="w-full border rounded-md px-3 py-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Peso Vivo Final (kg)
                    </label>
                    <input
                      type="number"
                      name="pesoVivoFinal"
                      value={formatNumber(dados.pesoVivoFinal)}
                      onChange={handleInputChange}
                      className="w-full border rounded-md px-3 py-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Peso de Carcaça (kg)
                    </label>
                    <input
                      type="number"
                      name="pesoCarcaca"
                      value={formatNumber(dados.pesoCarcaca)}
                      onChange={handleInputChange}
                      className="w-full border rounded-md px-3 py-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Período (dias)
                    </label>
                    <div className="w-full bg-gray-50 border rounded-md px-3 py-2 text-gray-700">
                      {dados.periodoDias}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Data Inicial
                    </label>
                    <input
                      type="date"
                      name="dataInicial"
                      value={dados.dataInicial}
                      onChange={handleInputChange}
                      className="w-full border rounded-md px-3 py-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Data Final
                    </label>
                    <input
                      type="date"
                      name="dataFinal"
                      value={dados.dataFinal}
                      onChange={handleInputChange}
                      className="w-full border rounded-md px-3 py-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Consumo (kg/dia)
                    </label>
                    <input
                      type="number"
                      name="consumoKg"
                      value={formatNumber(dados.consumoKg)}
                      onChange={handleInputChange}
                      step="0.001"
                      className="w-full border rounded-md px-3 py-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Consumo estimado (%)
                    </label>
                    <input
                      type="number"
                      name="consumoEstimadoPerc"
                      value={formatNumber(dados.consumoEstimadoPerc)}
                      onChange={handleInputChange}
                      step="0.001"
                      className="w-full border rounded-md px-3 py-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Indicadores */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="bg-green-600 text-white px-4 py-2 rounded-t-lg">
                <h2 className="text-lg font-semibold">Indicadores</h2>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 grid grid-cols-2 gap-x-4 gap-y-2">
                    <span className="text-sm font-medium text-gray-600">GMD:</span>
                    <span className="text-sm bg-gray-50 p-2 rounded">{resultados.gmd.toFixed(3)} kg/dia</span>
                    
                    <span className="text-sm font-medium text-gray-600">Arrobas produzidas:</span>
                    <span className="text-sm bg-gray-50 p-2 rounded">{resultados.arrobasProduzidas.toFixed(2)} @</span>
                    
                    <span className="text-sm font-medium text-gray-600">Rendimento de Carcaça:</span>
                    <span className="text-sm bg-gray-50 p-2 rounded">{resultados.rendimentoCarcaca.toFixed(2)}%</span>
                    
                    <span className="text-sm font-medium text-gray-600">Ganho Diário de Carcaça:</span>
                    <span className="text-sm bg-gray-50 p-2 rounded">{resultados.ganhoDiarioCarcaca.toFixed(3)} kg/dia</span>
                    
                    <span className="text-sm font-medium text-gray-600">Consumo estimado:</span>
                    <span className="text-sm bg-gray-50 p-2 rounded">{resultados.consumoEstimado.toFixed(3)}%</span>
                    
                    <span className="text-sm font-medium text-gray-600">Custo Suplementação:</span>
                    <span className="text-sm bg-gray-50 p-2 rounded">R$ {resultados.custoSuplementacao.toFixed(2)}/kg</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Dados Financeiros */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="bg-green-600 text-white px-4 py-2 rounded-t-lg">
                <h2 className="text-lg font-semibold">Dados Financeiros</h2>
              </div>
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ração (R$/kg)
                    </label>
                    <input
                      type="number"
                      name="racaoProvemix"
                      value={formatNumber(dados.racaoProvemix)}
                      onChange={handleInputChange}
                      className="w-full border rounded-md px-3 py-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Preço @ Inicial (R$)
                    </label>
                    <input
                      type="number"
                      name="precoInicial"
                      value={formatNumber(dados.precoInicial)}
                      onChange={handleInputChange}
                      className="w-full border rounded-md px-3 py-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Preço @ Venda (R$)
                    </label>
                    <input
                      type="number"
                      name="precoVenda"
                      value={formatNumber(dados.precoVenda)}
                      onChange={handleInputChange}
                      className="w-full border rounded-md px-3 py-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Custo Operacional (R$/dia)
                    </label>
                    <input
                      type="number"
                      name="custoOperacional"
                      value={formatNumber(dados.custoOperacional)}
                      onChange={handleInputChange}
                      className="w-full border rounded-md px-3 py-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Custo de Pastagens (R$/dia)
                    </label>
                    <input
                      type="number"
                      name="custoPastagens"
                      value={formatNumber(dados.custoPastagens)}
                      onChange={handleInputChange}
                      className="w-full border rounded-md px-3 py-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Resultados Financeiros */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="bg-green-600 text-white px-4 py-2 rounded-t-lg">
                <h2 className="text-lg font-semibold">Resultados Financeiros</h2>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  <span className="text-sm font-medium text-gray-600">Custo Compra Animais:</span>
                  <span className="text-sm bg-gray-50 p-2 rounded">R$ {resultados.custoCompraAnimais.toFixed(2)}</span>
                  
                  <span className="text-sm font-medium text-gray-600">Preço de Venda:</span>
                  <span className="text-sm bg-gray-50 p-2 rounded">R$ {resultados.precoVendaTotal.toFixed(2)}</span>
                  
                  <span className="text-sm font-medium text-gray-600">Lucro Bruto:</span>
                  <span className="text-sm bg-gray-50 p-2 rounded font-medium text-green-600">
                    R$ {resultados.lucroBruto.toFixed(2)}
                  </span>
                  
                  <span className="text-sm font-medium text-gray-600">Custo Total Suplementação:</span>
                  <span className="text-sm bg-gray-50 p-2 rounded">R$ {resultados.custoTotalSuplementacao.toFixed(2)}</span>
                  
                  <span className="text-sm font-medium text-gray-600">Custo Total Operacional:</span>
                  <span className="text-sm bg-gray-50 p-2 rounded">R$ {resultados.custoTotalOperacional.toFixed(2)}</span>
                  
                  <span className="text-sm font-medium text-gray-600">Custo Total Pastagens:</span>
                  <span className="text-sm bg-gray-50 p-2 rounded">R$ {resultados.custoTotalPastagens.toFixed(2)}</span>
                  
                  <span className="text-sm font-medium text-gray-600">Investimento Total:</span>
                  <span className="text-sm bg-gray-50 p-2 rounded">R$ {resultados.investimentoTotal.toFixed(2)}</span>
                  
                  <span className="text-sm font-medium text-gray-600">Custo de Produção:</span>
                  <span className="text-sm bg-gray-50 p-2 rounded">R$ {resultados.custoProducao.toFixed(2)}</span>
                  
                  <span className="text-sm font-medium text-gray-600">Custo por @ produzida:</span>
                  <span className="text-sm bg-gray-50 p-2 rounded">R$ {resultados.custoPorArroba.toFixed(2)}</span>
                </div>

                {/* Resultados Finais em Destaque */}
                <div className="mt-6 grid grid-cols-3 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <span className="block text-sm font-medium text-gray-600">Lucro Líquido</span>
                    <span className="block text-xl font-bold text-green-600 mt-1">
                      R$ {resultados.lucroLiquido.toFixed(2)}
                    </span>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <span className="block text-sm font-medium text-gray-600">Rentabilidade Total</span>
                    <span className="block text-xl font-bold text-green-600 mt-1">
                      {resultados.rentabilidadeTotal.toFixed(2)}%
                    </span>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <span className="block text-sm font-medium text-gray-600">Rentabilidade Mensal</span>
                    <span className="block text-xl font-bold text-green-600 mt-1">
                      {resultados.rentabilidadeMensal.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentabilidadeCalculator; 
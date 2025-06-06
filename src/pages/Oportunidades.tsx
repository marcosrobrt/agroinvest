import React from 'react';

interface Oportunidade {
  id: number;
  tipo: string;
  categoria: string;
  titulo: string;
  descricao: string;
  preco: string;
  contato: string;
  dataPublicacao: string;
  detalhes: {
    quantidade?: number;
    area?: string;
    peso?: string;
    raca?: string;
    idade?: string;
    localizacao?: string;
    infraestrutura?: string[];
    documentacao?: string[];
  };
}

const oportunidades: Oportunidade[] = [
  {
    id: 1,
    tipo: 'venda',
    categoria: 'gado',
    titulo: 'Lote de Bezerros Nelore',
    descricao: 'Excelente lote de bezerros Nelore, bem uniformes e de ótima procedência.',
    preco: 'R$ 9,50/kg',
    contato: '69998765432',
    dataPublicacao: '31/05/2025',
    detalhes: {
      quantidade: 28,
      peso: '260kg (média)',
      raca: 'Nelore',
      idade: '8-10 meses',
      localizacao: 'Fazenda São Marcos - Buritis/RO'
    }
  },
  {
    id: 2,
    tipo: 'venda',
    categoria: 'fazenda',
    titulo: 'Fazenda 500 Hectares - Pronta para Pecuária',
    descricao: 'Excelente propriedade com pastagem formada, água abundante e toda infraestrutura para criação de gado.',
    preco: 'R$ 8.500.000,00',
    contato: '69998765432',
    dataPublicacao: '31/05/2025',
    detalhes: {
      area: '500 hectares',
      localizacao: 'Buritis/RO - 15km da cidade',
      infraestrutura: [
        'Casa sede',
        'Curral completo',
        '8 divisões de pasto',
        'Energia trifásica',
        '3 represas',
        '2 poços artesianos'
      ],
      documentacao: [
        'CAR ativo',
        'Georreferenciamento',
        'Escritura pública'
      ]
    }
  },
  {
    id: 3,
    tipo: 'arrendamento',
    categoria: 'terra',
    titulo: 'Área para Plantio - 200 Hectares',
    descricao: 'Área disponível para arrendamento, ideal para plantio de soja. Terra de alta fertilidade.',
    preco: '12 sacas/hectare/ano',
    contato: '69998765432',
    dataPublicacao: '31/05/2025',
    detalhes: {
      area: '200 hectares',
      localizacao: 'Buritis/RO - Linha 05',
      infraestrutura: [
        'Pronta para plantio',
        'Acesso ano todo',
        'Energia disponível'
      ]
    }
  }
];

export default function Oportunidades() {
  return (
    <div className="py-8">
      <div className="container-custom">
        <h1 className="text-3xl font-bold mb-8">Oportunidades de Negócios Rurais</h1>
        
        <div className="grid gap-6">
          {oportunidades.map((oportunidade) => (
            <div key={oportunidade.id} className="card hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row md:items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      oportunidade.tipo === 'venda' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {oportunidade.tipo.toUpperCase()}
                    </span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800`}>
                      {oportunidade.categoria.toUpperCase()}
                    </span>
                    <span className="text-sm text-gray-500">
                      Publicado em {oportunidade.dataPublicacao}
                    </span>
                  </div>
                  
                  <h2 className="text-xl font-semibold mb-3">{oportunidade.titulo}</h2>
                  <p className="text-gray-600 mb-4">{oportunidade.descricao}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <h3 className="font-semibold mb-2">Detalhes:</h3>
                      <ul className="space-y-1 text-gray-600">
                        {oportunidade.detalhes.quantidade && (
                          <li>Quantidade: {oportunidade.detalhes.quantidade} animais</li>
                        )}
                        {oportunidade.detalhes.area && (
                          <li>Área total: {oportunidade.detalhes.area}</li>
                        )}
                        {oportunidade.detalhes.peso && (
                          <li>Peso médio: {oportunidade.detalhes.peso}</li>
                        )}
                        {oportunidade.detalhes.raca && (
                          <li>Raça: {oportunidade.detalhes.raca}</li>
                        )}
                        {oportunidade.detalhes.idade && (
                          <li>Idade: {oportunidade.detalhes.idade}</li>
                        )}
                        <li>Localização: {oportunidade.detalhes.localizacao}</li>
                      </ul>

                      {oportunidade.detalhes.infraestrutura && (
                        <>
                          <h3 className="font-semibold mt-4 mb-2">Infraestrutura:</h3>
                          <ul className="space-y-1 text-gray-600">
                            {oportunidade.detalhes.infraestrutura.map((item, index) => (
                              <li key={index}>• {item}</li>
                            ))}
                          </ul>
                        </>
                      )}

                      {oportunidade.detalhes.documentacao && (
                        <>
                          <h3 className="font-semibold mt-4 mb-2">Documentação:</h3>
                          <ul className="space-y-1 text-gray-600">
                            {oportunidade.detalhes.documentacao.map((doc, index) => (
                              <li key={index}>• {doc}</li>
                            ))}
                          </ul>
                        </>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Valor:</h3>
                      <p className="text-2xl font-bold text-green-600">{oportunidade.preco}</p>
                      <p className="text-sm text-gray-500">
                        {oportunidade.categoria === 'gado' ? 'Valor por kg' : 'Valor total'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4 mt-4">
                <a
                  href={`https://wa.me/55${oportunidade.contato}?text=Olá! Vi seu anúncio de ${oportunidade.titulo.toLowerCase()} no site da AGROINVEST e gostaria de mais informações.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full md:w-auto px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
                  </svg>
                  Contatar Vendedor
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 
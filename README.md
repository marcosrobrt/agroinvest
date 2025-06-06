# AGROINVEST - Aplicativo Web

Aplicativo web responsivo para o escritório de crédito e assessoria rural AGROINVEST em Buritis - Rondônia.

## Funcionalidades

- Página inicial com apresentação do escritório
- Cotações atualizadas de produtos agropecuários
- Análises de mercado do boi gordo
- Notícias do agronegócio local
- Oportunidades de negócio
- Contato direto via WhatsApp

## Tecnologias Utilizadas

- React
- TypeScript
- Tailwind CSS
- React Router
- Heroicons
- Headless UI

## Requisitos

- Node.js 14.0.0 ou superior
- npm 6.0.0 ou superior

## Instalação

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITORIO]
cd agroinvest
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm start
```

O aplicativo estará disponível em `http://localhost:3000`.

## Build para Produção

Para criar uma versão otimizada para produção:

```bash
npm run build
```

Os arquivos de build estarão na pasta `build/`.

## Estrutura do Projeto

```
agroinvest/
  ├── src/
  │   ├── components/    # Componentes reutilizáveis
  │   ├── pages/        # Páginas da aplicação
  │   ├── App.tsx       # Componente principal
  │   └── index.tsx     # Ponto de entrada
  ├── public/           # Arquivos públicos
  └── package.json      # Dependências e scripts
```

## Contribuição

Para contribuir com o projeto:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Faça commit das mudanças (`git commit -m 'Adiciona nova feature'`)
4. Faça push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes. 
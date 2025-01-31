# Robo SEFAZ

Este é um bot desenvolvido para automatizar o processo de contagem de cupons fiscais no SEFAZ, utilizando dados de uma planilha Excel contendo os números de série dos PDVs. O bot acessa o site do SEFAZ, preenche os campos de pesquisa, e realiza a contagem dos cupons de cada PDV.

## Funcionalidades

### 1. **Acessar o SEFAZ**
O bot realiza o login no SEFAZ utilizando um certificado digital, acessando a página de consulta de lotes enviados.

### 2. **Ler Números de Série**
O bot lê os números de série e PDVs a partir de uma planilha Excel. Ele processa os dados para utilizá-los na pesquisa.

### 3. **Preencher Formulário**
- **Número de Série**: O bot preenche automaticamente o campo de número de série.
- **Datas**: O bot preenche os campos de data de início e data de término com a data do dia anterior.
  
### 4. **Pesquisar e Contar Cupons**
O bot pesquisa os lotes de cupons fiscais para cada PDV e conta o número total de cupons encontrados.

### 5. **Fechar Alertas**
Caso haja um alerta na página do SEFAZ, o bot fecha automaticamente a caixa de diálogo e continua o fluxo.

## Estrutura do Projeto

- `src/`: Contém os arquivos TypeScript responsáveis pela automação.
  - `index.ts`: Arquivo principal que controla o fluxo de execução.
  - `modules/`: Contém os módulos para acessar o SEFAZ, preencher o formulário, contar cupons, etc.

## Como Rodar

1. Clone o repositório:
   ```bash
   git clone https://github.com/Gaabriel22/robo-sefaz.git  
2. Instale as dependências:
   ```bash
   npm install
3. Compile o TypeScript para JavaScript:
   ```bash
   npx tsc
4. Execute o bot:
   ```bash
   node dist/index.js

## Observações

- O código foi desenvolvido para atender às minhas necessidades, utilizando login via certificado digital e extraindo as informações de uma planilha Excel. Caso necessário, sinta-se à vontade para adaptá-lo às suas próprias exigências.

## Licença

- Este projeto é licenciado sob a ISC License.




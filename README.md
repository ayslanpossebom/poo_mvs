# 🎮 MVC QUEST — A Jornada do Código

> Um jogo educacional gamificado no formato RPG 2D desenvolvido com **React, TypeScript, Phaser 3, Tailwind CSS e Monaco Editor**, projetado para ensinar com profundidade a arquitetura de software **MVC (Model-View-Controller)** utilizando a linguagem **Java**.

---

## 🌟 Visão Geral

O jogo se passa no universo fictício de **CodeLand**, um reino digital à beira do colapso devido à falta de organização arquitetural: regras de negócio estão misturadas em botões de interface, componentes acessam o banco sem controle e pequenas alterações causam efeitos colaterais catastróficos.

O jogador assume o papel de um jovem arquiteto de software que deve viajar por **5 regiões temáticas**, dialogar com NPCs especialistas, superar desafios práticos em Java e construir o **Sistema de Cadastro de Alunos** no Laboratório Final com o Monaco Editor.

---

## 🗺️ As 5 Regiões de CodeLand

1. **🏛️ Região 1: Vila da Arquitetura**
   - **Tutor:** Professor Byte *(Arquiteto Supremo)*
   - **Foco:** Fundamentos de modularidade, separação de responsabilidades (SoC), problemas do "código espaguete".
   - **Recompensa:** *Insígnia do Arquiteto Iniciante*.

2. **🌲 Região 2: Floresta dos Dados**
   - **Tutor:** Modelina *(Guardiã do Domínio)*
   - **Foco:** Pilar **Model**, encapsulamento (`private`), construtores, getters/setters, invariantes e regras de negócio (`calcularMedia()`), além da abstração de coleções com *Repository*.
   - **Recompensa:** *Cristal do Model*.

3. **🏙️ Região 3: Cidade das Interfaces**
   - **Tutor:** Lady View *(Grã-Mestra das Interfaces)*
   - **Foco:** Pilar **View**, apresentação de dados formatados, menus de terminal, leitura de inputs (`Scanner`), e proibição estrita de cálculos matemáticos de negócio na interface.
   - **Recompensa:** *Cristal da View*.

4. **🏰 Região 4: Castelo dos Controladores**
   - **Tutor:** Capitão Controller *(Comandante do Fluxo)*
   - **Foco:** Pilar **Controller**, recepção de requisições, coordenação entre Model e View, prevenção do antipadrão *Fat Controller* e injeção de dependências.
   - **Recompensa:** *Cristal do Controller*.

5. **🔬 Região 5: Laboratório Final**
   - **Tutor:** Doutor Debug *(Perito Forense de Sistemas)*
   - **Foco:** IDE completa integrada no navegador com o **Monaco Editor** para o desenvolvimento prático do projeto completo em Java (`SistemaAlunos`). Avaliação em rubrica exata de 100 pontos.
   - **Recompensa:** *Troféu Mestre Arquiteto de CodeLand*.

---

## 🕹️ Mecânicas de Jogo e Gamificação

- **Quiz Relâmpago:** Perguntas de múltipla escolha com cronômetro regressivo (15 a 30s), bônus de velocidade (+50 XP) e explicação técnica imediata.
- **Complete o Código (Lacunas):** Trechos reais de Java com opções ou digitação livre.
- **Ligue os Componentes:** Associação interativa de responsabilidades aos pilares (Model / View / Controller).
- **Caçador de Bugs (Depuração):** Identificação de anti-padrões arquiteturais com exibição de código refatorado.
- **Organize o Fluxo MVC:** Reordenação sequencial do ciclo de vida de requisição e resposta.
- **Sistema de Dicas:** Até 3 níveis progressivos por desafio (Conceitual, Raciocínio, Específica) com dedução balanceada de pontos.
- **Inventário:** Pedestal com os três cristais primordiais, insígnias, moedas e itens cosméticos.
- **Áudio & Efeitos Sonoros:** Sintetizador sonoro 100% autônomo baseado na **Web Audio API** (sons de passos, moedas, portais, diálogos e chiptune retro opcional), sem dependência de links externos.
- **Persistência Completa:** `LocalStorage` versionado com auto-save automático e opção de reset com confirmação.

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Finalidade no Projeto |
| :--- | :--- |
| **React 18** | Estrutura de telas, HUD, modais, diálogos e dashboard |
| **TypeScript** | Modelagem robusta de tipos, validações e dados pedagógicos |
| **Phaser 3** | Motor de jogo 2D, física Arcade, movimentação, colisões e renderização |
| **Tailwind CSS** | Estilização temática indie com paleta de cores arquiteturais |
| **Framer Motion** | Animações fluidas, transições de tela e efeitos visuais |
| **Monaco Editor** | Editor de código com realce de sintaxe Java e abas de arquivos |
| **Lucide React** | Conjunto completo de ícones de interface |
| **Web Audio API** | Sintetizador de efeitos sonoros retro e música chiptune |
| **Canvas Confetti** | Efeitos festivos de vitória e conquistas |

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn**

### Passo a Passo

1. **Instalar as dependências:**
   ```bash
   npm install
   ```

2. **Iniciar o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   *A aplicação estará acessível em `http://localhost:3000` (ou na porta indicada pelo Vite).*

3. **Gerar o Build de Produção:**
   ```bash
   npm run build
   ```
   *Os arquivos estáticos otimizados serão gerados na pasta `dist/`.*

4. **Visualizar o build de produção localmente:**
   ```bash
   npm run preview
   ```

---

## 🌐 Publicação em Hospedagem Estática

Como a aplicação é 100% client-side (SPA estática), o conteúdo gerado na pasta `dist/` pode ser publicado diretamente em qualquer provedor de hospedagem estática:
- **Vercel** (`vercel deploy --prod`)
- **Netlify** (`netlify deploy --prod --dir=dist`)
- **GitHub Pages**
- **Firebase Hosting**
- **Cloudflare Pages**

---

## 🎓 Guia do Professor / Avaliador

- O jogo foi estruturado com foco na sala de aula: os conceitos abordados seguem o currículo padrão de cursos técnicos e de graduação em Computação e Engenharia de Software.
- O validador do **Laboratório Final** (`JavaCodeValidator.ts`) realiza uma análise estrutural e de conformidade com os princípios de *Clean Architecture* e *Separation of Concerns* (SoC), diferenciando claramente a análise estrutural da execução real em JVM.
- O painel **Desempenho** gera diagnósticos adaptativos que identificam com precisão se o estudante tem maior facilidade com Model, View ou Controller.

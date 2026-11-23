# 📚 Guia Pedagógico & Arquitetural — MVC QUEST

## 1. Princípios de Gamificação Educacional Aplicados

O **MVC Quest** combina as teorias pedagógicas de aprendizagem significativa (David Ausubel) e aprendizagem baseada em jogos (Game-Based Learning - GBL) com os seguintes elementos:

- **Loop de Feedback Imediato:** Cada desafio oferece resposta instantânea com explicação fundamentada, evitando a fixação de conceitos errôneos.
- **Progressão Espiral:** Os conceitos são apresentados no nível conceitual (Vila da Arquitetura), aprofundados individualmente em cada pilar (Florestas, Cidades e Castelos) e integrados na atividade prática holística (Laboratório Final).
- **Andaime Pedagógico (Scaffolding):** Sistema de dicas em 3 camadas que estimula a autonomia do estudante sem deixá-lo estagnado.
- **Narrativa Envolvente:** A metáfora do reino de CodeLand em colapso devido ao acoplamento desregrado ressoa com os desafios reais enfrentados por engenheiros de software na manutenção de sistemas legados.

---

## 2. Matriz de Conteúdos e Desafios

| Modalidade | Quantidade | Foco Educacional |
| :--- | :---: | :--- |
| **Quiz Relâmpago** | 16 | Fixação conceitual, termos técnicos, tomada rápida de decisão e velocidade de raciocínio. |
| **Complete o Código (Lacunas)** | 10 | Sintaxe Java 17+, visibilidade de membros (`private`), construtores com `this`, tipagem de retorno e chamadas de métodos. |
| **Ligue os Componentes** | 10 | Discernimento de responsabilidades e mapeamento mental entre requisitos funcionais e as camadas do MVC. |
| **Caçador de Bugs (Depuração)** | 10 | Análise crítica de código, identificação de antipadrões (*Fat Controller*, vazamento de regras para a View, acoplamento de GUI no Model). |
| **Organize o Fluxo MVC** | 5 | Compreensão do ciclo completo de requisição-resposta tanto em aplicações desktop/console quanto em ecossistemas Web. |
| **Laboratório Final** | 1 Projeto (5 arquivos) | Implementação autônoma de um sistema em Java com validação de 100 pontos. |

---

## 3. Rubrica de Avaliação do Laboratório Final (100 Pontos)

| Critério | Pontuação | Verificações do Validador |
| :--- | :---: | :--- |
| **Model** | **20 pts** | Declaração da classe `Aluno`, atributos `private`, construtor consistente, métodos getters e cálculo da média aritmética (`calcularMedia()`). Coleção em memória com `AlunoRepository`. |
| **View** | **15 pts** | Métodos para exibição formatada (`exibirAluno`, `exibirLista`), menus no console e **ausência total** de cálculos de regras de negócio na classe de apresentação. |
| **Controller** | **20 pts** | Injeção de dependências via construtor (referências a `AlunoRepository` e `AlunoView`) e métodos orquestradores (`cadastrarAluno`, `listarAlunos`). |
| **Comunicação entre Camadas** | **20 pts** | Model puro sem importação de componentes gráficos (`AlunoView`); Controller delegando para a View renderizar dados obtidos do Repositório. |
| **Funcionalidades** | **15 pts** | Cadastro de alunos, recuperação da listagem completa e cálculo de notas implementados de ponta a ponta. |
| **Organização do Código** | **10 pts** | Ponto de entrada `Main.java` com o método `main()`, inicialização e amarração correta das instâncias do ecossistema. |

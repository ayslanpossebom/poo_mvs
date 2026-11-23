import { LabFile, LabValidationResult } from '../../types';

export class JavaCodeValidator {
  public static validate(files: LabFile[]): LabValidationResult {
    let modelScore = 0;
    let viewScore = 0;
    let controllerScore = 0;
    let communicationScore = 0;
    let functionalityScore = 0;
    let organizationScore = 0;

    const checklist: LabValidationResult['checklist'] = [];
    const errors: string[] = [];
    const suggestions: string[] = [];

    const getFile = (name: string): string => {
      const f = files.find(file => file.name.toLowerCase().includes(name.toLowerCase()));
      return f ? f.code : '';
    };

    const alunoCode = getFile('Aluno.java');
    const repoCode = getFile('AlunoRepository.java');
    const viewCode = getFile('AlunoView.java');
    const controllerCode = getFile('AlunoController.java');
    const mainCode = getFile('Main.java');

    // ---------------------------------------------------------
    // 1. MODEL VALIDATION (20 pts)
    // ---------------------------------------------------------
    // 1.1 Aluno class declaration and encapsulation (private fields)
    const hasAlunoClass = /public\s+class\s+Aluno\b/.test(alunoCode);
    const hasPrivateFields = /private\s+String\s+nome/.test(alunoCode) && 
                             (/private\s+(double|Double|List<Double>)/.test(alunoCode) || /private\s+double\s+nota/.test(alunoCode));
    const hasAlunoConstructor = /public\s+Aluno\s*\(/.test(alunoCode);
    const hasGetters = /public\s+String\s+get(Nome|nome)\s*\(/.test(alunoCode) || /public\s+double\s+get/.test(alunoCode);
    const hasBusinessLogicInModel = /calcularMedia\s*\(/.test(alunoCode) || /obterMedia\s*\(/.test(alunoCode) || /verificarAprovacao\s*\(/.test(alunoCode);

    if (hasAlunoClass && hasPrivateFields && hasAlunoConstructor) {
      modelScore += 10;
      checklist.push({
        id: 'model_encapsulation',
        label: 'Aluno.java: Encapsulamento correto (atributos private, construtor e getters)',
        satisfied: true,
        layer: 'MODEL',
        hint: 'Perfeito! Os dados do aluno estão devidamente protegidos com private.'
      });
    } else {
      checklist.push({
        id: 'model_encapsulation',
        label: 'Aluno.java: Encapsulamento correto (atributos private, construtor e getters)',
        satisfied: false,
        layer: 'MODEL',
        hint: 'Verifique se os atributos "nome" e "nota" estão como "private" e se há um construtor público.'
      });
      if (!hasPrivateFields) errors.push('Aluno.java: Atributos devem ser privados (private String nome, private double nota).');
    }

    if (hasBusinessLogicInModel) {
      modelScore += 5;
      checklist.push({
        id: 'model_business_logic',
        label: 'Aluno.java: Regra de negócio (método calcularMedia ou obterMedia no Model)',
        satisfied: true,
        layer: 'MODEL',
        hint: 'Excelente! O cálculo de média pertence à regra de negócio do Model.'
      });
    } else {
      checklist.push({
        id: 'model_business_logic',
        label: 'Aluno.java: Regra de negócio (método calcularMedia ou obterMedia no Model)',
        satisfied: false,
        layer: 'MODEL',
        hint: 'Implemente o método public double calcularMedia() dentro da classe Aluno.'
      });
      errors.push('Aluno.java: Não foi encontrado o método de cálculo de regra de negócio (ex: calcularMedia()).');
    }

    // 1.2 Repository check
    const hasRepo = /class\s+AlunoRepository\b/.test(repoCode) && 
                    (/List<\s*Aluno\s*>/.test(repoCode) || /ArrayList<\s*Aluno\s*>/.test(repoCode) || /Map<\s*String,\s*Aluno\s*>/.test(repoCode));
    const hasRepoAdd = /void\s+(salvar|adicionar|cadastrar|adicionarAluno)\s*\(/.test(repoCode);
    const hasRepoList = /List<\s*Aluno\s*>\s*(listar|listarTodos|buscarTodos|obterTodos)\s*\(/.test(repoCode);

    if (hasRepo && (hasRepoAdd || hasRepoList)) {
      modelScore += 5;
      checklist.push({
        id: 'model_repo',
        label: 'AlunoRepository.java: Abstração de persistência em memória (List<Aluno>, adicionar, listar)',
        satisfied: true,
        layer: 'MODEL',
        hint: 'Ótimo uso de Repository para gerenciar a coleção de Alunos.'
      });
    } else {
      checklist.push({
        id: 'model_repo',
        label: 'AlunoRepository.java: Abstração de persistência em memória (List<Aluno>, adicionar, listar)',
        satisfied: false,
        layer: 'MODEL',
        hint: 'No AlunoRepository, mantenha uma List<Aluno> e métodos para salvar e listar.'
      });
      errors.push('AlunoRepository.java: Métodos de adição ou listagem ausentes ou incompletos.');
    }

    // ---------------------------------------------------------
    // 2. VIEW VALIDATION (15 pts)
    // ---------------------------------------------------------
    const hasViewClass = /public\s+class\s+AlunoView\b/.test(viewCode);
    const hasDisplayMethods = /exibir|mostrar|imprimir|print/.test(viewCode);
    const hasScannerOrInput = /Scanner\b/.test(viewCode) || /ler|capturar|pedir/.test(viewCode) || /System\.out\.print/.test(viewCode);
    const hasCalculationInView = /calcularMedia|calculaMedia|preco\s*-\s*preco/.test(viewCode);

    if (hasViewClass && hasDisplayMethods && hasScannerOrInput) {
      viewScore += 10;
      checklist.push({
        id: 'view_presentation',
        label: 'AlunoView.java: Interface de apresentação e entrada/saída de dados com o usuário',
        satisfied: true,
        layer: 'VIEW',
        hint: 'Muito bem! A View cuida apenas da interação e formatação visual dos dados.'
      });
    } else {
      checklist.push({
        id: 'view_presentation',
        label: 'AlunoView.java: Interface de apresentação e entrada/saída de dados com o usuário',
        satisfied: false,
        layer: 'VIEW',
        hint: 'Implemente métodos como exibirAluno(Aluno a), exibirLista(List<Aluno> lista) e leitura de dados.'
      });
      errors.push('AlunoView.java: Faltam métodos para exibir informações ou interagir com o usuário.');
    }

    if (!hasCalculationInView) {
      viewScore += 5;
      checklist.push({
        id: 'view_no_business_logic',
        label: 'AlunoView.java: Ausência de regras de negócio na View (sem cálculos)',
        satisfied: true,
        layer: 'VIEW',
        hint: 'Excelente! A View não realiza cálculos matemáticos de regras de negócio.'
      });
    } else {
      checklist.push({
        id: 'view_no_business_logic',
        label: 'AlunoView.java: Ausência de regras de negócio na View (sem cálculos)',
        satisfied: false,
        layer: 'VIEW',
        hint: 'Regras de negócio (como calcular média) foram encontradas na View! Mova-as para o Model.'
      });
      errors.push('Violação arquitetural: AlunoView está realizando cálculo de regras de negócio!');
      suggestions.push('Remova qualquer cálculo de média da View. Peça ao Aluno (Model) sua média já calculada.');
    }

    // ---------------------------------------------------------
    // 3. CONTROLLER VALIDATION (20 pts)
    // ---------------------------------------------------------
    const hasControllerClass = /public\s+class\s+AlunoController\b/.test(controllerCode);
    const hasRepoFieldInCtrl = /AlunoRepository\b/.test(controllerCode) || /repository\b/i.test(controllerCode);
    const hasViewFieldInCtrl = /AlunoView\b/.test(controllerCode) || /view\b/i.test(controllerCode);
    const hasActionsInCtrl = /(cadastrar|adicionar|salvar|listar|iniciar|executar|buscar)/.test(controllerCode);

    if (hasControllerClass && hasActionsInCtrl) {
      controllerScore += 10;
      checklist.push({
        id: 'controller_coordination',
        label: 'AlunoController.java: Coordenação de ações e mediação entre camadas',
        satisfied: true,
        layer: 'CONTROLLER',
        hint: 'O Controller atua como maestro coordenando as intenções do usuário.'
      });
    } else {
      checklist.push({
        id: 'controller_coordination',
        label: 'AlunoController.java: Coordenação de ações e mediação entre camadas',
        satisfied: false,
        layer: 'CONTROLLER',
        hint: 'Crie métodos como cadastrarAluno(...) e listarAlunos() no AlunoController.'
      });
      errors.push('AlunoController.java: Não foram encontrados métodos de coordenação no Controller.');
    }

    if (hasRepoFieldInCtrl && hasViewFieldInCtrl) {
      controllerScore += 10;
      checklist.push({
        id: 'controller_dependencies',
        label: 'AlunoController.java: Injeção/referência correta de View e Model/Repository',
        satisfied: true,
        layer: 'CONTROLLER',
        hint: 'Correto! O Controller possui referências necessárias para orquestrar View e Model.'
      });
    } else {
      checklist.push({
        id: 'controller_dependencies',
        label: 'AlunoController.java: Injeção/referência correta de View e Model/Repository',
        satisfied: false,
        layer: 'CONTROLLER',
        hint: 'O AlunoController precisa referenciar o AlunoRepository e a AlunoView em seu construtor.'
      });
      suggestions.push('Adicione atributos AlunoRepository e AlunoView no AlunoController para possibilitar a comunicação.');
    }

    // ---------------------------------------------------------
    // 4. LAYER COMMUNICATION & DECOUPLING (20 pts)
    // ---------------------------------------------------------
    // Model must NOT import or instantiate View or Controller
    const modelImportsView = /import.*AlunoView/.test(alunoCode) || /new\s+AlunoView/.test(alunoCode);
    const modelImportsCtrl = /import.*AlunoController/.test(alunoCode) || /new\s+AlunoController/.test(alunoCode);
    const hasCleanModel = !modelImportsView && !modelImportsCtrl;

    if (hasCleanModel) {
      communicationScore += 10;
      checklist.push({
        id: 'clean_model',
        label: 'Desacoplamento do Model: O Model não conhece a View nem o Controller',
        satisfied: true,
        layer: 'MODEL',
        hint: 'Perfeito! O Model é totalmente independente de interfaces visuais.'
      });
    } else {
      checklist.push({
        id: 'clean_model',
        label: 'Desacoplamento do Model: O Model não conhece a View nem o Controller',
        satisfied: false,
        layer: 'MODEL',
        hint: 'O Model nunca deve instanciar ou conhecer a View ou o Controller.'
      });
      errors.push('Violação de MVC: Aluno.java tem dependência direta de View ou Controller.');
    }

    // Controller passes Model data to View
    const ctrlCallsView = /view\.(exibir|mostrar)/i.test(controllerCode);
    const ctrlCallsRepo = /repository\.(salvar|adicionar|listar|buscar)/i.test(controllerCode) || /repo\./i.test(controllerCode);

    if (ctrlCallsView || ctrlCallsRepo) {
      communicationScore += 10;
      checklist.push({
        id: 'ctrl_flow_communication',
        label: 'Fluxo MVC: Controller recupera dados do Model e repassa para a View',
        satisfied: true,
        layer: 'CONTROLLER',
        hint: 'Fluxo de dados orquestrado de forma exemplar pelo Controller.'
      });
    } else {
      checklist.push({
        id: 'ctrl_flow_communication',
        label: 'Fluxo MVC: Controller recupera dados do Model e repassa para a View',
        satisfied: false,
        layer: 'CONTROLLER',
        hint: 'Faça o Controller chamar repository.listar() e repassar para view.exibirLista(...).'
      });
      suggestions.push('No Controller, chame os dados do repositório e envie para os métodos de exibição da View.');
    }

    // ---------------------------------------------------------
    // 5. FUNCTIONAL REQUIREMENTS (15 pts)
    // ---------------------------------------------------------
    const canRegister = /(cadastrar|adicionar|salvar)/i.test(controllerCode) && /(cadastrar|adicionar|salvar)/i.test(repoCode);
    const canList = /(listar|obterTodos|buscar)/i.test(controllerCode) && /(listar|exibir)/i.test(viewCode);
    const canCalculateGrade = hasBusinessLogicInModel;

    let funcCount = 0;
    if (canRegister) funcCount += 5;
    if (canList) funcCount += 5;
    if (canCalculateGrade) funcCount += 5;
    functionalityScore = funcCount;

    checklist.push({
      id: 'functional_specs',
      label: 'Funcionalidades: Cadastro, listagem e cálculo de média de alunos',
      satisfied: funcCount >= 10,
      layer: 'ARCHITECTURE',
      hint: `Funcionalidades implementadas: ${funcCount / 5} de 3 principais.`
    });

    // ---------------------------------------------------------
    // 6. CODE ORGANIZATION & MAIN ENTRY POINT (10 pts)
    // ---------------------------------------------------------
    const hasMainClass = /public\s+class\s+Main\b/.test(mainCode);
    const hasMainMethod = /public\s+static\s+void\s+main\s*\(/.test(mainCode);
    const mainInstantiatesMVC = /new\s+Aluno(Repository|View|Controller)/.test(mainCode);

    if (hasMainClass && hasMainMethod && mainInstantiatesMVC) {
      organizationScore = 10;
      checklist.push({
        id: 'main_bootstrap',
        label: 'Main.java: Inicialização e injeção de dependências do ecossistema MVC',
        satisfied: true,
        layer: 'ARCHITECTURE',
        hint: 'Excelente inicialização! As instâncias foram criadas e conectadas no Main.'
      });
    } else {
      organizationScore = 5;
      checklist.push({
        id: 'main_bootstrap',
        label: 'Main.java: Inicialização e injeção de dependências do ecossistema MVC',
        satisfied: false,
        layer: 'ARCHITECTURE',
        hint: 'No Main.java, instancie o repositório, a view e o controller, conectando-os.'
      });
      suggestions.push('Instancie o Repository, View e Controller dentro do método main() da classe Main.');
    }

    const totalScore = modelScore + viewScore + controllerScore + communicationScore + functionalityScore + organizationScore;
    const passed = totalScore >= 70;

    let diagnosticReport = '';
    if (totalScore >= 90) {
      diagnosticReport = 'Parabéns Arquiteto(a)! Sua implementação seguiu rigorosamente os preceitos de Clean Architecture e separação de responsabilidades do padrão MVC.';
    } else if (totalScore >= 70) {
      diagnosticReport = 'Bom trabalho! O sistema atende aos requisitos básicos do MVC. Pequenos refinamentos podem tornar as camadas ainda mais desacopladas.';
    } else {
      diagnosticReport = 'Ainda há violações arquiteturais ou requisitos incompletos. Consulte a checklist e as dicas para ajustar a comunicação entre as camadas.';
    }

    return {
      score: totalScore,
      modelScore,
      viewScore,
      controllerScore,
      communicationScore,
      functionalityScore,
      organizationScore,
      passed,
      checklist,
      errors,
      suggestions,
      diagnosticReport
    };
  }
}

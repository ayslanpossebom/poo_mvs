import { LabFile } from '../types';

export const STARTER_LAB_FILES: LabFile[] = [
  {
    name: 'Aluno.java',
    path: 'model/Aluno.java',
    layer: 'MODEL',
    code: `package model;

/**
 * Entidade Aluno - Representa os dados e regras de negócio.
 * COMPLETE OS ATRIBUTOS, CONSTRUTOR E O MÉTODO calcularMedia().
 */
public class Aluno {
    // TODO: Declare os atributos privados: nome (String), nota1 (double), nota2 (double)
    private String nome;
    private double nota1;
    private double nota2;

    public Aluno(String nome, double nota1, double nota2) {
        // TODO: Valide e inicialize os atributos
        this.nome = nome;
        this.nota1 = nota1;
        this.nota2 = nota2;
    }

    public String getNome() {
        return this.nome;
    }

    public double getNota1() {
        return this.nota1;
    }

    public double getNota2() {
        return this.nota2;
    }

    // TODO: Implemente a regra de negócio para calcular e retornar a média aritmética
    public double calcularMedia() {
        return (this.nota1 + this.nota2) / 2.0;
    }
}
`,
    starterCode: `package model;

public class Aluno {
    // TODO: Complete a modelagem
    private String nome;
    private double nota;

    public Aluno(String nome, double nota) {
        this.nome = nome;
        this.nota = nota;
    }

    public String getNome() {
        return nome;
    }

    public double calcularMedia() {
        return nota;
    }
}
`,
    referenceCode: `package model;

public class Aluno {
    private String nome;
    private double nota1;
    private double nota2;

    public Aluno(String nome, double nota1, double nota2) {
        if (nome == null || nome.trim().isEmpty()) {
            throw new IllegalArgumentException("Nome não pode ser vazio");
        }
        if (nota1 < 0 || nota1 > 10 || nota2 < 0 || nota2 > 10) {
            throw new IllegalArgumentException("Notas devem estar entre 0 e 10");
        }
        this.nome = nome;
        this.nota1 = nota1;
        this.nota2 = nota2;
    }

    public String getNome() { return nome; }
    public double getNota1() { return nota1; }
    public double getNota2() { return nota2; }

    public double calcularMedia() {
        return (nota1 + nota2) / 2.0;
    }

    public boolean estaAprovado() {
        return calcularMedia() >= 6.0;
    }
}
`
  },
  {
    name: 'AlunoRepository.java',
    path: 'model/AlunoRepository.java',
    layer: 'MODEL',
    code: `package model;

import java.util.ArrayList;
import java.util.List;

/**
 * Repositório em memória para a coleção de Alunos.
 */
public class AlunoRepository {
    private List<Aluno> alunos = new ArrayList<>();

    public void salvar(Aluno aluno) {
        if (aluno != null) {
            this.alunos.add(aluno);
        }
    }

    public List<Aluno> listarTodos() {
        return new ArrayList<>(this.alunos);
    }

    public Aluno buscarPorNome(String nome) {
        for (Aluno a : this.alunos) {
            if (a.getNome().equalsIgnoreCase(nome)) {
                return a;
            }
        }
        return null;
    }
}
`,
    starterCode: `package model;

import java.util.ArrayList;
import java.util.List;

public class AlunoRepository {
    private List<Aluno> alunos = new ArrayList<>();

    public void salvar(Aluno aluno) {
        // TODO: Adicionar aluno à lista
        this.alunos.add(aluno);
    }

    public List<Aluno> listarTodos() {
        // TODO: Retornar lista
        return this.alunos;
    }
}
`,
    referenceCode: `package model;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class AlunoRepository {
    private final List<Aluno> alunos = new ArrayList<>();

    public void salvar(Aluno aluno) {
        if (aluno == null) throw new IllegalArgumentException("Aluno inválido");
        this.alunos.add(aluno);
    }

    public List<Aluno> listarTodos() {
        return Collections.unmodifiableList(this.alunos);
    }

    public Aluno buscarPorNome(String nome) {
        return this.alunos.stream()
            .filter(a -> a.getNome().equalsIgnoreCase(nome))
            .findFirst()
            .orElse(null);
    }
}
`
  },
  {
    name: 'AlunoView.java',
    path: 'view/AlunoView.java',
    layer: 'VIEW',
    code: `package view;

import model.Aluno;
import java.util.List;

/**
 * Camada de Apresentação.
 * Apenas exibe dados e mensagens formatadas ao usuário.
 * NUNCA realize cálculos de regras de negócio aqui!
 */
public class AlunoView {

    public void exibirMenu() {
        System.out.println("\\n=== SISTEMA DE GESTÃO DE ALUNOS (MVC) ===");
        System.out.println("1 - Cadastrar Aluno");
        System.out.println("2 - Listar Alunos");
        System.out.println("3 - Consultar Aluno");
        System.out.println("0 - Sair");
        System.out.print("Escolha uma opção: ");
    }

    public void exibirAluno(Aluno aluno) {
        if (aluno == null) {
            System.out.println("Aluno não encontrado!");
            return;
        }
        System.out.println("Nome: " + aluno.getNome() + 
            " | Média: " + String.format("%.2f", aluno.calcularMedia()));
    }

    public void exibirLista(List<Aluno> lista) {
        if (lista.isEmpty()) {
            System.out.println("Nenhum aluno cadastrado no momento.");
            return;
        }
        System.out.println("\\n--- LISTAGEM DE ALUNOS ---");
        for (Aluno a : lista) {
            exibirAluno(a);
        }
    }

    public void exibirMensagem(String msg) {
        System.out.println("[INFO] " + msg);
    }

    public void exibirErro(String erro) {
        System.err.println("[ERRO] " + erro);
    }
}
`,
    starterCode: `package view;

import model.Aluno;
import java.util.List;

public class AlunoView {
    public void exibirAluno(Aluno aluno) {
        // TODO: Imprimir dados do aluno
        System.out.println("Aluno: " + aluno.getNome());
    }

    public void exibirLista(List<Aluno> lista) {
        // TODO: Imprimir lista
    }

    public void exibirMensagem(String msg) {
        System.out.println(msg);
    }
}
`,
    referenceCode: `package view;

import model.Aluno;
import java.util.List;

public class AlunoView {
    public void exibirCabecalho() {
        System.out.println("=================================");
        System.out.println("   SISTEMA DE ALUNOS - MVC QUEST ");
        System.out.println("=================================");
    }

    public void exibirAluno(Aluno aluno) {
        if (aluno == null) {
            System.out.println("[View] Aluno não encontrado.");
            return;
        }
        System.out.printf("Nome: %-20s | Média: %.2f%n", aluno.getNome(), aluno.calcularMedia());
    }

    public void exibirLista(List<Aluno> lista) {
        if (lista == null || lista.isEmpty()) {
            System.out.println("[View] Não há alunos cadastrados.");
            return;
        }
        System.out.println("---------------------------------");
        lista.forEach(this::exibirAluno);
        System.out.println("---------------------------------");
    }

    public void exibirMensagem(String msg) {
        System.out.println("[Sucesso] " + msg);
    }

    public void exibirErro(String erro) {
        System.out.println("[Erro] " + erro);
    }
}
`
  },
  {
    name: 'AlunoController.java',
    path: 'controller/AlunoController.java',
    layer: 'CONTROLLER',
    code: `package controller;

import model.Aluno;
import model.AlunoRepository;
import view.AlunoView;
import java.util.List;

/**
 * Camada Controladora.
 * Recebe comandos, orquestra o repositório/model e repassa dados para a view.
 */
public class AlunoController {
    private AlunoRepository repository;
    private AlunoView view;

    public AlunoController(AlunoRepository repository, AlunoView view) {
        this.repository = repository;
        this.view = view;
    }

    public void cadastrarAluno(String nome, double nota1, double nota2) {
        try {
            Aluno novoAluno = new Aluno(nome, nota1, nota2);
            this.repository.salvar(novoAluno);
            this.view.exibirMensagem("Aluno cadastrado com sucesso: " + nome);
        } catch (IllegalArgumentException e) {
            this.view.exibirErro(e.getMessage());
        }
    }

    public void listarAlunos() {
        List<Aluno> alunos = this.repository.listarTodos();
        this.view.exibirLista(alunos);
    }

    public void consultarAluno(String nome) {
        Aluno aluno = this.repository.buscarPorNome(nome);
        this.view.exibirAluno(aluno);
    }
}
`,
    starterCode: `package controller;

import model.Aluno;
import model.AlunoRepository;
import view.AlunoView;

public class AlunoController {
    private AlunoRepository repository;
    private AlunoView view;

    public AlunoController(AlunoRepository repository, AlunoView view) {
        this.repository = repository;
        this.view = view;
    }

    public void cadastrarAluno(String nome, double n1, double n2) {
        // TODO: Criar aluno, salvar no repositório e avisar a view
    }

    public void listarAlunos() {
        // TODO: Obter lista e repassar para view
    }
}
`,
    referenceCode: `package controller;

import model.Aluno;
import model.AlunoRepository;
import view.AlunoView;
import java.util.List;

public class AlunoController {
    private final AlunoRepository repository;
    private final AlunoView view;

    public AlunoController(AlunoRepository repository, AlunoView view) {
        this.repository = repository;
        this.view = view;
    }

    public void cadastrarAluno(String nome, double nota1, double nota2) {
        try {
            Aluno aluno = new Aluno(nome, nota1, nota2);
            repository.salvar(aluno);
            view.exibirMensagem("Aluno cadastrado com sucesso: " + nome);
        } catch (IllegalArgumentException ex) {
            view.exibirErro("Falha no cadastro: " + ex.getMessage());
        }
    }

    public void listarAlunos() {
        List<Aluno> lista = repository.listarTodos();
        view.exibirLista(lista);
    }

    public void buscarPorNome(String nome) {
        Aluno aluno = repository.buscarPorNome(nome);
        view.exibirAluno(aluno);
    }
}
`
  },
  {
    name: 'Main.java',
    path: 'Main.java',
    layer: 'MAIN',
    code: `import model.AlunoRepository;
import view.AlunoView;
import controller.AlunoController;

/**
 * Ponto de entrada da aplicação.
 * Instancia os componentes e inicializa a orquestração MVC.
 */
public class Main {
    public static void main(String[] args) {
        System.out.println("Inicializando Sistema de Alunos MVC...");

        // 1. Instanciação das camadas
        AlunoRepository repository = new AlunoRepository();
        AlunoView view = new AlunoView();
        AlunoController controller = new AlunoController(repository, view);

        // 2. Operações coordenadas pelo Controller
        controller.cadastrarAluno("Ada Lovelace", 9.5, 10.0);
        controller.cadastrarAluno("Alan Turing", 10.0, 9.0);
        controller.cadastrarAluno("Grace Hopper", 8.5, 9.5);

        // 3. Listagem delegada à View
        controller.listarAlunos();

        // 4. Consulta específica
        controller.consultarAluno("Ada Lovelace");
    }
}
`,
    starterCode: `public class Main {
    public static void main(String[] args) {
        // TODO: Instanciar Repository, View e Controller
        // Executar cadastro e listagem
    }
}
`,
    referenceCode: `import model.AlunoRepository;
import view.AlunoView;
import controller.AlunoController;

public class Main {
    public static void main(String[] args) {
        AlunoRepository repo = new AlunoRepository();
        AlunoView view = new AlunoView();
        AlunoController controller = new AlunoController(repo, view);

        controller.cadastrarAluno("Ada Lovelace", 9.5, 10.0);
        controller.cadastrarAluno("Alan Turing", 10.0, 9.0);
        controller.listarAlunos();
    }
}
`
  }
];

export const LAB_TIPS = [
  {
    level: 1,
    title: 'Dica Conceitual',
    text: 'Lembre-se da Separação de Responsabilidades: Aluno.java guarda os atributos e calcula a média. AlunoView.java só exibe informações com System.out.println. AlunoController.java coordena a ponte entre Repository e View.'
  },
  {
    level: 2,
    title: 'Dica de Raciocínio',
    text: 'No AlunoController, faça o método listarAlunos() chamar repository.listarTodos() e em seguida chamar view.exibirLista(alunos). Nunca use System.out.println dentro do Controller!'
  },
  {
    level: 3,
    title: 'Dica Específica',
    text: 'Certifique-se de que os atributos em Aluno.java são "private String nome" e "private double nota1, nota2". No construtor, use "this.nome = nome". No AlunoRepository, implemente "salvar(Aluno a)" com "this.alunos.add(a)".'
  }
];

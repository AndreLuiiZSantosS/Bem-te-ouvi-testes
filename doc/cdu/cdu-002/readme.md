# CDU002. Criar Álbum

- **Ator principal**: Músico.
- **Resumo**: Permite que o músico crie um álbum com suas músicas.
- **Pré-condição**: O usuário deve estar autenticado como músico.
- **Pós-condição**: O álbum é criado e vinculado ao(s) músico(s).

## Fluxo Principal – Álbum criado com sucesso
| Ações do ator | Ações do sistema |
| :----------------- | :----------------- | 
| 1 - Acessa página para criar álbum	                | | 
|                                                       | 2 - Exibe o formulário |
| 3 - Preenche os dados do álbum e insere suas músicas  | | 
|                                                       | 4 - Valida os dados preenchidos |
| 5 - Confirma a criação do álbum	                    | | 
|                                                       | 6 - Armazena o álbum com suas músicas e vincula o álbum ao(s) músico(s) envolvidos |

## Fluxo Alternativo I – Campos obrigatórios não preenchidos
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: | 
| 3.1 - Deixa algum campo obrigatório em branco	| | 
|                                               | 3.2 - Exibe mensagem: “Preencha todos os campos obrigatórios” |

## Fluxo Alternativo II – Arquivo de áudio ou formato de capa inválidos
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: | 
| 5.1 - Tenta enviar um arquivo de áudio ou de imagem inválido (formato ou tamanho não permitido)	| |
|                                                                                                   | 5.2 - Exibe mensagem: “Tipo de arquivo inválido ou tamanho excedido” |

<!-- > Obs. as seções a seguir apenas serão utilizadas na segunda unidade do PDSWeb (segundo orientações do gerente do projeto). -->

<!-- ## Diagrama de Interação (Sequência ou Comunicação) -->

<!-- > Substituir pela imagem correspondente... -->


<!-- ## Diagrama de Classes de Projeto -->

<!-- > Substituir pela imagem contendo as classes (modelo, visão e templates) que implementam o respectivo CDU... -->



# CDU007. Anunciar Evento

- **Ator principal**: Músico.
- **Resumo**: Permite que o músico divulgue um evento, tornando-o visível ao público na plataforma.
- **Pré-condição**: O usuário deve estar autenticado como músico.
- **Pós-condição**: O evento é registrado no sistema e exibido no perfil do músico e na agenda pública da plataforma.

## Fluxo Principal – Evento postado com sucesso
| Ações do ator | Ações do sistema |
| :----------------- | :----------------- | 
| 1 - Acessa página para anunciar evento	   | | 
|                                              | 2 - Exibe o formulário|
| 3 - Preenche os dados obrigatórios do evento | | 
|                                              | 4 - Valida os campos preenchidos |
| 5 - Confirma a criação do evento 	           | | 
|                                              | 6 - Armazena o evento e vincula ao músico | 

## Fluxo Alternativo I – Campos obrigatórios não preenchidos
| Ações do ator | Ações do sistema |
| :----------------- | :----------------- | 
| 3.1 - Deixa algum campo obrigatório em branco	| |
|                                               | 3.2 - Exibe mensagem: “Preencha todos os campos obrigatórios.” |

## Fluxo Alternativo II – Data inválida
| Ações do ator | Ações do sistema |
| :----------------- | :----------------- | 
| 3.1 - Informa uma data no passado	| | 
|                                   | 3.2 - Exibe mensagem: “A data do evento deve ser posterior à data atual.” |

<!-- > Obs. as seções a seguir apenas serão utilizadas na segunda unidade do PDSWeb (segundo orientações do gerente do projeto). -->

<!-- ## Diagrama de Interação (Sequência ou Comunicação) -->

<!-- > Substituir pela imagem correspondente... -->


<!-- ## Diagrama de Classes de Projeto -->

<!-- > Substituir pela imagem contendo as classes (modelo, visão e templates) que implementam o respectivo CDU... -->
# CDU008: Ver Estatísticas

- **Ator principal**: Músico.
- **Atores secundários**: —
- **Resumo**: Permite que o músico visualize estatísticas sobre suas músicas, playlists e eventos, como número de reproduções, curtidas, seguidores e engajamento dos ouvintes.
- **Pré-condição**: O músico deve estar autenticado no sistema.
- **Pós-condição**: As estatísticas são exibidas na tela, mas nenhuma alteração é feita nos dados do sistema.

## Fluxo Principal – Estatísticas exibidas com sucesso
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: | 
| 1 - Acessa o painel de estatísticas                                              | | 
|                                                                                  | 2 - Recupera os dados de interações e engajamento do perfil |
| 3 - Escolhe o tipo de estatística (músicas, playlists, eventos, seguidores etc.) | | 
|                                                                                  |4 - Exibe os gráficos, tabelas ou dados solicitados |

## Fluxo Alternativo I – Falha na recuperação de dados
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: | 
| 1.1 - Acessa o painel	| | 
|                       | 1.2 - Exibe mensagem: “Não foi possível carregar os dados. Tente novamente mais tarde.” |

> Obs. as seções a seguir apenas serão utilizadas na segunda unidade do PDSWeb (segundo orientações do gerente do projeto).

## Diagrama de Interação (Sequência ou Comunicação)

> Substituir pela imagem correspondente...

## Diagrama de Classes de Projeto

> Substituir pela imagem contendo as classes (modelo, visão e templates) que implementam o respectivo CDU...
# CDU006. Buscar

- **Ator principal**: Usuário.
- **Resumo**: Permite que qualquer usuário(autenticado ou não autenticado) busque músicas, músicos, playlists, álbums, ouvintes e eventos. 
- **Pré-condição**: O sistema deve possuir dados previamente cadastrados para que haja resultados correspondentes às buscas realizadas.
- **Pós-condição**: Os resultados que atendem aos critérios de busca são exibidos ao usuário.

## Fluxo Principal – Busca realizada com sucesso
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: | 
| 1 - Insere dados no campo de busca                | |     
| 2 - Confirma o que deve ser pesquisado na busca	| | 
|                                                   | 3 - Processa os dados da busca e realiza a busca no banco de dados |
|                                                   | 4 - Redireciona para outra página e exibe os resultados da busca |

## Fluxo Alternativo I – Nenhum resultado encontrado
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: | 
| 2.1 - Digita termo que não retorna resultados | |
|                                               | 2.2 - Exibe mensagem: “Nenhuma resultado encontrado para sua busca” |

## Fluxo Alternativo II – Campo de busca vazio
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: | 
| 2.1 - Tenta buscar sem preencher o campo de busca | |	
|                                                   | 2.2 - Exibe mensagem: “Digite algum termo para buscar” |

<!-- > Obs. as seções a seguir apenas serão utilizadas na segunda unidade do PDSWeb (segundo orientações do gerente do projeto). -->

<!-- ## Diagrama de Interação (Sequência ou Comunicação) -->

<!-- > Substituir pela imagem correspondente... -->


<!-- ## Diagrama de Classes de Projeto -->

<!-- > Substituir pela imagem contendo as classes (modelo, visão e templates) que implementam o respectivo CDU... -->

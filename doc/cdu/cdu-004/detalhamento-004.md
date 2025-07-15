## CDU004.  Buscar Artista

- **Ator principal**: Ouvinte.
- **Atores secundários**: visitante, Músico.
- **Resumo**: Permite que qualquer usuário (visitante, ouvinte ou músico) busque artistas cadastrados na plataforma, utilizando filtros como nome, estilo musical ou popularidade.
- **Pré-condição**: O sistema deve estar disponível e conter artistas cadastrados.
- **Pós-condição**: O sistema exibe uma lista de artistas que correspondem ao critério de busca informado.

## Fluxo Principal – Busca realizada com sucesso
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: |
| 1 - Acessa a interface de busca de artista | |
|                                            | 2 - Exibe a barra/campo de pesquisa de artista |
| 3 - Digita o nome ou critério de busca	   | |
|                                            | 4 - Realiza a busca por músicos no banco de dados |
| 5 - Confirma a busca	                     | |
|                                            | 6 - Exibe os resultados da busca (lista de artista) |

## Fluxo Alternativo I – Nenhum artista encontrado
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: |
| 3.1 - Digita um termo sem correspondência	| |
|                                           | 3.2 - Exibe mensagem: “Nenhum artista encontrado” |

## Fluxo Alternativo II – Campo de busca vazio
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: |
| 3.1 - Tenta buscar sem preencher o campo	| |
|                                           | 3.2 - Exibe mensagem: “Digite um nome ou critério para buscar” |

> Obs. as seções a seguir apenas serão utilizadas na segunda unidade do PDSWeb (segundo orientações do gerente do projeto).

## Diagrama de Interação (Sequência ou Comunicação)

> Substituir pela imagem correspondente...

## Diagrama de Classes de Projeto

> Substituir pela imagem contendo as classes (modelo, visão e templates) que implementam o respectivo CDU...
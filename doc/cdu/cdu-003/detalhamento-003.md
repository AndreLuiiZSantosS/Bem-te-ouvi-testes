# CDU003. Buscar Música

- **Ator principal**: Ouvinte.
- **Atores secundários**: visitante, Músico.
- **Resumo**: Permite que qualquer usuário (visitante, ouvinte ou músico) busque músicas disponíveis no sistema através de filtros como nome da música, artista, gênero, ou palavra-chave.
- **Pré-condição**: O sistema deve estar disponível e conter músicas cadastradas.
- **Pós-condição**: As músicas que correspondem aos critérios de busca são exibidas para o usuário.

## Fluxo Principal – Busca realizada com sucesso
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: | 
| 1 - Acessa a interface de busca                          | |     
|                                                          | 2 - Exibe a barra/campo de pesquisa |
| 3 - Digita o termo da busca	                           | | 
|                                                          | 4 - Processa o termo e realiza a busca no banco de dados |
| 5 - Confirma a busca (pressiona Enter ou clica no botão) | |
|                                                          | 6 - Exibe os resultados da busca |

## Fluxo Alternativo I – Nenhuma música encontrada
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: | 
| 3.1 - Digita um termo que não retorna resultados	| |
|                                                   | 3.2 - Exibe mensagem: “Nenhuma música encontrada para sua busca” |

## Fluxo Alternativo II – Campo de busca vazio
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: | 
| 5.1 - Tenta buscar sem preencher o campo de busca | |	
|                                                   |5.2 - Exibe mensagem: “Digite algo para buscar” |

> Obs. as seções a seguir apenas serão utilizadas na segunda unidade do PDSWeb (segundo orientações do gerente do projeto).

## Diagrama de Interação (Sequência ou Comunicação)

> Substituir pela imagem correspondente...

## Diagrama de Classes de Projeto

> Substituir pela imagem contendo as classes (modelo, visão e templates) que implementam o respectivo CDU...

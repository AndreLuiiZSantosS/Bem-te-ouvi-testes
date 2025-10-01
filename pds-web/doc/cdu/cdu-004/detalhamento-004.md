## CDU004.  Buscar músico

- **Ator principal**: Visitante ou ouvinte ou músico.
- **Atores secundários**:
- **Resumo**: Permite que qualquer usuário (visitante, ouvinte ou músico) busque músicos cadastrados na plataforma, utilizando filtros como nome, estilo musical.
- **Pré-condição**: O sistema conter músicos cadastrados.
- **Pós-condição**: O sistema exibe uma lista de músicos que correspondem ao critério de busca informado.

## Fluxo Principal – Busca realizada com sucesso
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: | 
| 1 - Acessa a interface de busca                          | |     
| 2 - Digita o termo da busca	                           | | 
|                                                          | 3 - Processa o termo e realiza a busca no banco de dados |
| 4 - Confirma a busca ao clicar no botão de buscar        | |
|                                                          | 5 - Exibe os resultados da busca |


## Fluxo Alternativo I – Nenhum músico encontrado
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: |
| 3.1 - Digita um termo sem correspondência	| |
|                                           | 3.2 - Exibe mensagem: “Nenhum músico encontrado” |

## Fluxo Alternativo II – Campo de busca vazio
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: | 
| 4.1 - Tenta buscar sem preencher o campo de busca | |	
|                                                   | 4.2 - Exibe mensagem: “Digite um nome ou critério para buscar” |

> Obs. as seções a seguir apenas serão utilizadas na segunda unidade do PDSWeb (segundo orientações do gerente do projeto).

## Diagrama de Interação (Sequência ou Comunicação)

<!-- > Substituir pela imagem correspondente... -->
<img src="buscar-musico-sequencia.jpeg">

## Diagrama de Classes de Projeto

<!-- > Substituir pela imagem contendo as classes (modelo, visão e templates) que implementam o respectivo CDU... -->
<img src="buscar-musico-classe.jpeg">
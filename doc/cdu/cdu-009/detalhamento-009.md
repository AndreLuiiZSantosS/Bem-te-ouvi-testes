# CDU009. Nome: Ouvir Música

- **Ator principal**: Ouvinte.
- **Atores secundários**: Visitante e Músico.
- **Resumo**: Permite que o ouvinte ou visitante reproduza uma música disponível na plataforma.
- **Pré-condição**:Deve haver músicas disponíveis no sistema; O visitante ou ouvinte deve ter acesso à plataforma.
- **Pós-condição**: A música é reproduzida e o sistema registra a interação (play) para fins estatísticos.

## Fluxo Principal – Reprodução com sucesso
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: | 
| 1 - Busca ou acessa uma música disponível	            | | 
|                                                       | 2 - Exibe os detalhes da música selecionada |
| 3 - Clica em “Ouvir”	                                | | 
|                                                       | 4 - Inicia a reprodução e registra o play |
| 5 - Usa os controles (pausar, avançar, voltar, parar)	| | 
|                                                       | 6 - Executa a ação solicitada no player |

## Fluxo Alternativo I – Música indisponível
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: | 
| 1.1 - Seleciona uma música removida ou com erro	| |
|                                                 |1.2 - Exibe mensagem: “Música indisponível no momento” |

## Fluxo Alternativo II – Conexão instável ou falha na reprodução
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: | 
| 3.1 - Clica em ouvir e há falha de conexão	| | 
|                                             | 3.2 - Exibe mensagem: “Erro na reprodução. Verifique sua conexão e tente novamente” |

> Obs. as seções a seguir apenas serão utilizadas na segunda unidade do PDSWeb (segundo orientações do gerente do projeto).

## Diagrama de Interação (Sequência ou Comunicação)

> Substituir pela imagem correspondente...

## Diagrama de Classes de Projeto

> Substituir pela imagem contendo as classes (modelo, visão e templates) que implementam o respectivo CDU...
# CDU005 Nome: Criar Playlist

- **Ator principal**: Ouvinte.
- **Atores secundários**: Músico.
- **Resumo**: Permite que um ouvinte crie uma nova playlist personalizada, definindo um nome e adicionando músicas posteriormente.
- **Pré-condição**: O ouvinte deve estar autenticado no sistema.
- **Pós-condição**: Uma nova playlist é criada e associada à conta do ouvinte.

## Fluxo Principal – Criação de playlist com sucesso
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: | 
| 1 - Acessa a área de playlists     | |
|                                    | 2 - Exibe as playlists existentes e opção de criar nova |
| 3 - Clica em “Criar nova playlist” | |
|                                    | 4 - Exibe formulário com campo para nome da playlist |
| 5 - Digita o nome da nova playlist | |
|                                    | 6 - Valida o nome informado |
| 7 - Confirma a criação             | | 
|                                    | 8 - Cria a playlist e exibe mensagem de sucesso |

## Fluxo Alternativo I – Nome da playlist em branco
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: | 
| 7.1 - Deixa o campo de nome vazio e tenta confirmar | |	
|                                                     | 7.2 - Exibe mensagem: “Informe um nome para a playlist” | 

## Fluxo Alternativo II – Nome de playlist já existente
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: | 
| 5.1 - Digita um nome de playlist que já existe na conta do ouvinte | |
|                                                                    | 5.2 - Exibe mensagem: “Você já tem uma playlist com esse nome” |

> Obs. as seções a seguir apenas serão utilizadas na segunda unidade do PDSWeb (segundo orientações do gerente do projeto).

## Diagrama de Interação (Sequência ou Comunicação)

> Substituir pela imagem correspondente...

## Diagrama de Classes de Projeto

> Substituir pela imagem contendo as classes (modelo, visão e templates) que implementam o respectivo CDU...
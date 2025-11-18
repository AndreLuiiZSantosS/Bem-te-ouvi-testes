# CDU008. Ver Perfil

- **Ator principal**: Usuário logado.
- **Resumo**: Permite que qualquer usuário autenticado(ouvinte ou músico) da plataforma visualize o perfil público de um usuário cadastrado no sistema contendo informações como nome, álbuns, playlists, eventos, estatísticas e entre outros.
- **Pré-condição**: O sistema deve estar acessível e o perfil consultado deve estar visível.
- **Pós-condição**: As informações públicas do perfil são exibidas para o usuário.

## Fluxo Principal – Perfil visualizado com sucesso
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: | 
| 1 - Busca pelo campo de busca ou clica na imagem ou no nome do usuário cadastrado(músico ou ouvinte) no sistema | | 
|                                                                                                                 | 2 - Recupera as informações públicas do perfil solicitado |
|                                                                                                                 | 3 - Redireciona para a página de perfil | 
|                                                                                                                 | 4 - Exibe as informações públicas do usuário(ouvinte ou músico) acessado |

## Fluxo Alternativo I – Falha na recuperação de dados
| Ações do ator | Ações do sistema |
| :----------------- | :----------------- | 
| 3.1 - Acessa a página de perfil de um usuário cadastrado | | 
|                                                          | 3.2 - Exibe mensagem: “Não foi possível carregar os dados. Tente novamente mais tarde.” |

<!-- > Obs. as seções a seguir apenas serão utilizadas na segunda unidade do PDSWeb (segundo orientações do gerente do projeto). -->

<!-- ## Diagrama de Interação (Sequência ou Comunicação) -->

<!-- > Substituir pela imagem correspondente... -->

<!-- ## Diagrama de Classes de Projeto -->

<!-- > Substituir pela imagem contendo as classes (modelo, visão e templates) que implementam o respectivo CDU... -->

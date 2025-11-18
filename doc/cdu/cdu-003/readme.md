# CDU003. Ver Estatísticas

- **Ator principal**: Músico.
- **Resumo**: Permite que músico visualize suas próprias estatísticas.
- **Pré-condição**: O músico deve estar autenticado no sistema.
- **Pós-condição**: As estatísticas são exibidas na página de perfil do músico.

## Fluxo Principal – Estatísticas exibidas com sucesso
| Ações do ator | Ações do sistema |
| :----------------- | :----------------- | 
| 1 - Acessa a própria página de perfil | | 
|                                       | 2 - Exibe os gráficos, tabelas e dados atuais do próprio músico |

## Fluxo Alternativo I – Falha na recuperação de dados
| Ações do ator | Ações do sistema |
| :----------------- | :----------------- | 
| 1.1 - Acessa a própria página de perfil  | | 
|                                         | 1.2 - Exibe mensagem: “Não foi possível carregar os dados. Tente novamente mais tarde.” |

<!-- > Obs. as seções a seguir apenas serão utilizadas na segunda unidade do PDSWeb (segundo orientações do gerente do projeto). -->

<!-- ## Diagrama de Interação (Sequência ou Comunicação) -->

<!-- > Substituir pela imagem correspondente... -->


<!-- ## Diagrama de Classes de Projeto -->

<!-- > Substituir pela imagem contendo as classes (modelo, visão e templates) que implementam o respectivo CDU... -->

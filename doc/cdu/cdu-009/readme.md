# CDU009. Editar Perfil

- **Ator principal**: Usuário logado.
- **Resumo**: Permite que o usuário autenticado(ouvinte ou músico) edite as informações permitidas do seu perfil, como nome, foto e dados de contato.
- **Pré-condição**: O usuário deve estar autenticado(ouvinte ou músico) no sistema.
- **Pós-condição**: O perfil é atualizado com as novas informações fornecidas.

## Fluxo Principal – Perfil editado com sucesso
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: | 
| 1 - Clica no botão de editar perfil	| | 
|                                       | 2 - Exibe o formulário com os dados atuais do perfil |
| 3 - Modifica os dados desejados	    | | 
|                                       | 4 - Valida as informações inseridas |
| 5 - Confirma a edição	                | | 
|                                       | 6 - Atualiza os dados e exibe mensagem de sucesso |

## Fluxo Alternativo I – Dados inválidos
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: | 
| 3.1 - Insere dados inválidos (ex: e-mail mal formatado)	| | 
|                                                           | 3.2 - Exibe mensagem: “Corrija os campos destacados para continuar”  |

## Fluxo Alternativo II – Falha na atualização
Ações do ator	Ações do sistema
| 5.1 - Confirma edição e ocorre falha de conexão ou erro interno	| | 
|                                                                   | 5.2 - Exibe mensagem: “Erro ao salvar alterações. Tente novamente mais tarde” |





<!-- > Obs. as seções a seguir apenas serão utilizadas na segunda unidade do PDSWeb (segundo orientações do gerente do projeto). -->

<!-- ## Diagrama de Interação (Sequência ou Comunicação) -->

<!-- > Substituir pela imagem correspondente... -->
<!-- <img src="editar-perfil-sequencia1.jpeg"> -->
<!-- <img src="editar-perfil-sequencia2.jpeg"> -->

<!-- ## Diagrama de Classes de Projeto -->

<!-- > Substituir pela imagem contendo as classes (modelo, visão e templates) que implementam o respectivo CDU... -->
<!-- <img src="editar-perfil-classe.jpeg"> -->
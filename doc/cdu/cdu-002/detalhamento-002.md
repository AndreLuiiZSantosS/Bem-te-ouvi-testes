# CDU002. Login

- **Ator principal**: ouvinte 
- **Atores secundários**: musico
- **Resumo**: Permite que o usuário registrado acesse sua conta informando credenciais válidas (e-mail e senha).
- **Pré-condição**: O usuário já está registrado no sistema e acessa a interface de login.
- **Pós-condição**: O usuário é autenticado e tem acesso à sua conta ou ao ambiente principal do sistema.

## Fluxo Principal – Login com sucesso
| Ações do ator                      | Ações do sistema |
| :-----------------:                | :-----------------: | 
| 1 - Acessa a página de login	     |  |    
|                                    | 2 - Exibe o formulário de login |
| 3 - Informa e-mail e senha válidos |  | 
|                                    | 4 - Valida as credenciais | 
| 5 - Clica no botão "Entrar"	       |  | 
|                                    |6 - Autentica o usuário e redireciona para o sistema | 

## Fluxo Alternativo I – Credenciais inválidas
| Ações do ator | Ações do sistema |
| :-----------------: |:-----------------: | 
| 4.1 - Informa e-mail ou senha errados	| | 
|                                       | 4.2 - Exibe mensagem de erro: “E-mail ou senha inválidos” |


## Fluxo Alternativo II – Campos em branco
| Ações do ator                                           | Ações do sistema |
| :-----------------:                                     |:-----------------: | 
| 5.1 - Tenta enviar o formulário sem preencher os campos	| | 
|                                                         | 5.2 - Exibe mensagem: “Preencha todos os campos obrigatórios” |

> Obs. as seções a seguir apenas serão utilizadas na segunda unidade do PDSWeb (segundo orientações do gerente do projeto).

## Diagrama de Interação (Sequência ou Comunicação)

> Substituir pela imagem correspondente...

## Diagrama de Classes de Projeto

> Substituir pela imagem contendo as classes (modelo, visão e templates) que implementam o respectivo CDU...

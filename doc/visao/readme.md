# Documento de Visão 

## Histórico de Revisões

| Data                |  Versão             |          Descrição                                                            |  Autores                                                 |
| :-----------------: | :-----------------: | ----------------------------------------------------------------------------- | -------------------------------------------------------- |
| 29/04/2025          | 1.0                 | Versão inicial                                                                | Lucas Tales                                              |
| 31/07/2025          | 2.0                 | Alterações terminológicas de "artista" para "músico" e ajustes nos requisitos | Manoel Pinto Junior                                      |
| 19/09/2025          | 3.0                 | Alterações dos requisitos funcionais                                          | André Luiz, Gustavo Henrique, Lucas Tales e Manoel Pinto |
| 01/10/2025          | 4.0                 | Adição de novos requisitos funcionais                                         | Manoel Pinto Junior e Lucas Tales                        |      
| 01/10/2025          | 5.0                 | Criação de tabela de glossário e adição de termos e suas explicações          | Manoel Pinto e Lucas Tales                               |


## 1. Objetivo do projeto

O projeto tem como objetivo dar visibilidade a músicos independentes que ainda são pouco conhecidos. Possibilitando ao músico postar seus álbuns e divulgar eventos.

## 2. Descrição do problema

| Tópicos                 | Descrição    |
| ----------------------- | ------------ |
| **Problema**            | Falta de visibilidade para músicos independentes |
| **Afeta**               | Músicos emergentes que buscam reconhecimento |  
| **Impacta**             | Dificulta a carreira de novos músicos e limita a diversidade musical |
| **Solução**             | Criação do Bem-te-ouvi, uma plataforma de música que prioriza a divulgação de músicos independentes | 

## 3. Descrição dos usuários 

| Nome                |  Descrição          |   Responsabilidade  |
| ----------------- | ----------------- | ----------------- |
| Visitante | Quem entra no sistema pela primeira vez sem ter uma conta   | Se registrar e entrar no sistema                              | 
| Ouvinte   | Quem irá escutar as músicas e visitar o perfil de outros usuários | Escutar as músicas e eventos de músicos, e ver perfis de outros usuários        |
| Músico | Músico independente que buscar divulgar suas músicas e eventos | Publicar músicas, seus eventos e manter seu perfil atualizado |

## 4. Descrição do ambiente dos usuários

O ambiente do ouvinte é focado na descoberta musical. Ao acessar a plataforma eles podem: explorar músicas novas, ver perfis de outros usuários, criar playlists personalizadas e acompanhar eventos próximos. O ambiente valoriza a interação com o conteúdo;

O ambiento do músico é dedicado à divulgação e crescimento artístico. Nele, os músicos podem criar e gerenciar seus perfis, postar álbuns, divulgar eventos e acompanhar o engajamento do público. É um ambiente de incentivo à criatividade e visibilidade. 

## 5. Principais necessidades dos usuários

As necessidades dos ouvintes são descobrir novos músicos e músicas de forma fácil e intuitiva;<br>
As necessidades dos músicos são divulgar suas músicas e eventos de forma rápida e acessível. 

## 6. Alternativas concorrentes

Spotify, Deezer e Amazon music.

## 7. Visão geral do produto

O Bem-te-ouvi é uma plataforma de streaming musical focada em facilitar a divulgação de músicos independentes e suas músicas. Inspirado em aplicativos como Spotify, mas com o diferencial de priorizar talentos pouco conhecidos, o sistema conecta músicos emergentes ao público que busca novas experiências sonoras.
Músicos podem criar seu perfil, publicar seus álbuns e divulgar eventos, enquanto usuários exploram novos sons.

## 8. Requisitos funcionais

| Código              |  Nome               |          Descrição  |  Prioridade         |
| :-----------------: | :----------------- | :----------------- | ------------------- |
| F01 | Ouvir música | Permitir que os usuários escutem músicas | Alta |
| F02 | Criar álbum | Permitir que o músico crie seus álbuns | Alta |
| F03 | Ver estatísticas | Permitir que o músico veja suas estatísticas | Alta |
| F04 | Criar playlist | Permitir que os usuários criem suas playlists | Alta |
| F05 | Doar | Permitir que o usuário faça doações para músicos | Alta |
| F06 | Buscar | Permitir que o usuário busque outros usuários, eventos, playlists e etc | Alta |
| F07 | Anunciar evento | Permitir que o músico anuncie seus eventos como shows, lançamentos e lives | Média |
| F08 | Ver perfil | Permitir que o usuário veja o perfil de outros usuários | Média |
| F09 | Editar perfil | Permitir que o usuário edite seu perfil | Média |
| F10 | Leiloar | Permitir que o músico possa leiloar letras e melodias | Média |
| F11 | Dar um lance | Permitir que os usuários possam dar um lance em um leilão em aberto | Média |
| F12 | Arrematar | Permitir que o usuário que deu o maior lance do leilão possa arrematar o item leiloado | Média |
| F13 | Comentar | Permitir que os usuários possam comentar em músicas | Baixa |
| F14 | Curtir | Permitir que o usuário curta uma música, ajudando no engajamento | Baixa |
| F15 | Entrar | Permitir que o visitante entre no sistema com sua conta | Alta |
| F16 | Registrar | Permitir que o visitante crie uma conta no sistema | Alta |

## 9. Requisitos não-funcionais

| Código              |  Nome               |          Descrição  |  Categoria          |  Classificação      |
| :-----------------: | :----------------- | :----------------- | :----------------- | :----------------- |
| NF01 | Segurança | Os dados sensíveis dos usuários devem ser criptografados | Segurança | Alta |
| NF02 | Usabilidade | A interface deve ser intuitiva, simples de usar tanto para músicos quanto para ouvintes | Usabilidade | Média |
| NF03 | Desempenho | O sistema deve carregar páginas e resultados em até 5 segundos | Desempenho | Alta |  

## 10. Glossário 

|  Termo        |                          Explicação                                                              |
| ---------     | ---------------------------------------------------------------                                  |
| Visitante     | Usuário não cadastrado                                                                           |
| Usuário       | Pessoa que acessa o sistema estando logada como ouvinte ou como músico                           |
| Ouvinte       | Quem irá escutar as músicas, álbuns, visitar perfis de músicos e dar lance em leilões            |
| Músico        | Artista independente que buscar divulgar seus álbuns, suas músicas, seus eventos e leiloar itens |
| Álbum         | Conjunto de músicas atreladas a um(ns) músico(s)                                                 |
| Playlist      | Conjunto de músicas organizadas por um ouvinte ou músico                                         |
| Leiloar       | Ato de colocar algo à venda em um leilão                                                         |
| Item leiloado | Qualquer bem, produto ou mercadoria que foi colocado à venda em um leilão                        |
| Lance         | Oferta de preço feita por um usuário logado                                                      |
| Arrematar     | Comprar um bem ao dar o maior lance em uma disputa em um leilão                                  |
| Anunciar      | Tornar algo conhecido publicamente                                                               |


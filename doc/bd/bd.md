# Modelo de Dados

## Diagrama ER

<img src="diagrama_er.png" width="819" height="321" />

## Modelo Relacional

<img src="modelo_relacional.png" width="981" height="334" />

## Dicionário de Dados

--- 
**Tabela** : Ouvinte

*Descrição* : Usuário que pode reproduzir músicas e criar playlists

*Observações* : ...

| Colunas | Descrição | Tipo de Dado | Tamanho | Null | PK | FK | Unique | Identity | Default | Check | 
| ------- | --------- | ------------ | ------- | ---- | -- | -- | ------ | -------- | ------- | ----- |
| email | E-mail do ouvinte | VARCHAR | 150 | &#9744;  | &#9745; | &#9744; | &#9745; | &#9744; | - | - | 
| senha | Senha do ouvinte(armazenado com algum hash) | VARCHAR | 255 | &#9744;  | &#9744; | &#9744; | &#9744; | &#9744; | - | - | 
| nome | Nome do ouvinte | VARCHAR | 100 | &#9744;  | &#9744; | &#9744; | &#9744; | &#9744; | - | - | 
| foto_de_perfil | Foto de perfil do ouvinte | VARCHAR | 255 | &#9744;  | &#9744; | &#9744; | &#9744; | &#9744; | - | - | 

--- 
**Tabela** : Musico

*Descrição* : Usuário que além de ter as funções do ouvinte pode postar músicas e eventos

*Observações* : email é herdado de ouvinte

| Colunas | Descrição | Tipo de Dado | Tamanho | Null | PK | FK | Unique | Identity | Default | Check | 
| ------- | --------- | ------------ | ------- | ---- | -- | -- | ------ | -------- | ------- | ----- |
| email | Email do músico | VARCHAR | 150 | &#9744;  | &#9745; | &#9745; | &#9744; | &#9744; | - | - |
| cpf | CPF do músico | VARCHAR | 14 | &#9744;  | &#9744; | &#9744; | &#9745; | &#9744; | - | - |
| biografia | Biografia do músico | TEXT | - | &#9744;  | &#9744; | &#9744; | &#9744; | &#9744; | - | - |
| redes_sociais | Redes sociais do músico | VARCHAR | 255 | &#9744;  | &#9744; | &#9744; | &#9744; | &#9744; | - | - |
| chave_pix | Chave pix do músico | VARCHAR | 77 | &#9744;  | &#9744; | &#9744; | &#9744; | &#9744; | - | - |

--- 
**Tabela** : Musica

*Descrição* : Músicas criadas pelos músicos

*Observações* : ...

| Colunas | Descrição | Tipo de Dado | Tamanho | Null | PK | FK | Unique | Identity | Default | Check | 
| ------- | --------- | ------------ | ------- | ---- | -- | -- | ------ | -------- | ------- | ----- |
| titulo | Título da música | VARCHAR | 60 | &#9744; | &#9745; | &#9744; | &#9744; | &#9744; | - | - | 
| email_musico | Email do músico que publicou a música | VARCHAR | 150 | &#9744; | &#9745; | &#9745; | &#9744; | &#9744; | - | - | 
| genero |  Gênero da música| VARCHAR | 60 | &#9744; | &#9744; | &#9744; | &#9744; | &#9744; | - | - | 
| arquivo | Nome ou caminho do arquivo com a música | VARCHAR | 255 | &#9744; | &#9744; | &#9744; | &#9744; | &#9744; | - | - | 
| data_envio | Data de publicação da música | VARCHAR | 255 | &#9744; | &#9744; | &#9744; | &#9744; | &#9744; | - | - | 

--- 
**Tabela** : Evento

*Descrição* : Evento musical criado por músicos para divulgar suas apresentações

*Observações* : chave primária composta

| Colunas | Descrição | Tipo de Dado | Tamanho | Null | PK | FK | Unique | Identity | Default | Check | 
| ------- | --------- | ------------ | ------- | ---- | -- | -- | ------ | -------- | ------- | ----- |
| data_hora | Data do evento com dia, mês, ano e horário | DATETIME | - | &#9744;  | &#9745; | &#9744; | &#9744; | &#9744; | - | - | 
| email_musico | Email do músico que publicou o evento | VARCHAR | 150 | &#9744; | &#9745; | &#9745; | &#9744; | &#9744; | - | - | 
| nome | Nome do evento | VARCHAR | 60 | &#9744;  | &#9744; | &#9744; | &#9744; | &#9744; | - | - | 
| local | Local de realização do evento | VARCHAR | 100 | &#9744;  | &#9744; | &#9744; | &#9744; | &#9744; | - | - | 
| descricao | Descrição do evento | TEXT | - | &#9744;  | &#9744; | &#9744; | &#9744; | &#9744; | - | - | 

--- 
**Tabela** : Playlist

*Descrição* : Playlist com as músicas adicionas pelos ouvintes ou músicos

*Observações* : ...

| Colunas | Descrição | Tipo de Dado | Tamanho | Null | PK | FK | Unique | Identity | Default | Check | 
| ------- | --------- | ------------ | ------- | ---- | -- | -- | ------ | -------- | ------- | ----- |
| nome | Nome da playlist | VARCHAR | 60 | &#9744;  | &#9745; | &#9744; | &#9744; | &#9744; | - | - | 
| publica_ou_privada | Tipo da playlist | BOOLEAN | - | &#9744;  | &#9744; | &#9744; | &#9744; | &#9744; | - | - | 
| descricao | Descrição da playlist | TEXT | - | &#9744;  | &#9744; | &#9744; | &#9744; | &#9744; | - | - | 
| email_criador | Email de quem criou a playlist | VARCHAR | 150 | &#9744; | &#9745; | &#9745; | &#9744; | &#9744; | - | - | 

--- 
**Tabela** : Playlist_Musica

*Descrição* : Associação entre músicas e playlists, representando quais músicas fazem parte de quais playlists

*Observações* : Tabela de relacionamento muitos-para-muitos entre Musica e Playlist; A chave primária é composta

| Colunas | Descrição | Tipo de Dado | Tamanho | Null | PK | FK | Unique | Identity | Default | Check | 
| ------- | --------- | ------------ | ------- | ---- | -- | -- | ------ | -------- | ------- | ----- |
| playlist_nome | Nome da playlist | VARCHAR | 60 | &#9744;  | &#9745; | &#9745; | &#9744; | &#9744; | - | - |
| musica_titulo | Título da música | VARCHAR | 60 | &#9744;  | &#9745; | &#9745; | &#9744; | &#9744; | - | - |
| email_criador | Email do criador da playlist | VARCHAR | 150 | &#9744;  | &#9745; | &#9745; | &#9744; | &#9744; | - | - |
| email_musico | Email do músico | VARCHAR | 150 | &#9744;  | &#9745; | &#9745; | &#9744; | &#9744; | - | - |


--- 




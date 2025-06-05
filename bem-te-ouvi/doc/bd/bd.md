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
| id | Identificador do ouvinte | INT | - | &#9744;  | &#9745; | &#9744; | &#9744; | &#9745; | - | - | 
| nome | Nome do ouvinte | VARCHAR | 100 | &#9744;  | &#9744; | &#9744; | &#9744; | &#9744; | - | - | 
| email | E-mail do ouvinte | VARCHAR | 150 | &#9744;  | &#9744; | &#9744; | &#9745; | &#9744; | - | - | 
| senha | Senha do ouvinte(armazenado com algum hash) | VARCHAR | 255 | &#9744;  | &#9744; | &#9744; | &#9744; | &#9744; | - | - | 

--- 
**Tabela** : Musico

*Descrição* : Usuário que além de ter as funções do ouvinte pode postar músicas e eventos

*Observações* : ...

| Colunas | Descrição | Tipo de Dado | Tamanho | Null | PK | FK | Unique | Identity | Default | Check | 
| ------- | --------- | ------------ | ------- | ---- | -- | -- | ------ | -------- | ------- | ----- |
| id | Identificador do músico | INT | - | &#9744;  | &#9745; | &#9744; | &#9744; | &#9745; | - | - |
| biografia | Biografia do músico | TEXT | - | &#9744;  | &#9744; | &#9744; | &#9744; | &#9744; | - | - |
| redes_sociais | Redes sociais do músico | VARCHAR | 255 | &#9744;  | &#9744; | &#9744; | &#9744; | &#9744; | - | - |
| chave_pix | Chave pix do músico | VARCHAR | 77 | &#9744;  | &#9744; | &#9744; | &#9744; | &#9744; | - | - |

--- 
**Tabela** : Musica

*Descrição* : Músicas criadas pelos músicos

*Observações* : ...

| Colunas | Descrição | Tipo de Dado | Tamanho | Null | PK | FK | Unique | Identity | Default | Check | 
| ------- | --------- | ------------ | ------- | ---- | -- | -- | ------ | -------- | ------- | ----- |
| id | Identificador da música | INT | - | &#9744;  | &#9745; | &#9744; | &#9744; | &#9745; | - | - | 
| titulo | Título da música | VARCHAR | 60 | &#9744; | &#9744; | &#9744; | &#9744; | &#9744; | - | - | 
| genero |  Gênero da música| VARCHAR | 60 | &#9744; | &#9744; | &#9744; | &#9744; | &#9744; | - | - | 
| arquivo | Nome ou caminho do arquivo com a música | VARCHAR | 255 | &#9744; | &#9744; | &#9744; | &#9744; | &#9744; | - | - | 

--- 
**Tabela** : Evento

*Descrição* : Evento musical criado por músicos para divulgar suas apresentações

*Observações* : ...

| Colunas | Descrição | Tipo de Dado | Tamanho | Null | PK | FK | Unique | Identity | Default | Check | 
| ------- | --------- | ------------ | ------- | ---- | -- | -- | ------ | -------- | ------- | ----- |
| id | Identificador do evento | INT | - | &#9744;  | &#9745; | &#9744; | &#9744; | &#9745; | - | - | 
| nome | Nome do evento | VARCHAR | 60 | &#9744;  | &#9744; | &#9744; | &#9744; | &#9744; | - | - | 
| data | Data do evento com dia, mês, ano e horário | DATETIME | - | &#9744;  | &#9744; | &#9744; | &#9744; | &#9744; | - | - | 

--- 
**Tabela** : Playlist

*Descrição* : Playlist com as músicas adicionas pelos ouvintes ou músicos

*Observações* : ...

| Colunas | Descrição | Tipo de Dado | Tamanho | Null | PK | FK | Unique | Identity | Default | Check | 
| ------- | --------- | ------------ | ------- | ---- | -- | -- | ------ | -------- | ------- | ----- |
| id | Identificador da playlist | INT | - | &#9744;  | &#9745; | &#9744; | &#9744; | &#9745; | - | - | 
| nome | Nome da playlist | VARCHAR | 60 | &#9744;  | &#9744; | &#9744; | &#9744; | &#9744; | - | - | 

--- 
**Tabela** : Playlist_Musica

*Descrição* : Associação entre músicas e playlists, representando quais músicas fazem parte de quais playlists

*Observações* : Tabela de relacionamento muitos-para-muitos entre Musica e Playlist; A chave primária é composta

| Colunas | Descrição | Tipo de Dado | Tamanho | Null | PK | FK | Unique | Identity | Default | Check | 
| ------- | --------- | ------------ | ------- | ---- | -- | -- | ------ | -------- | ------- | ----- |
| playlist_id | Identificador da playlist | INT | - | &#9744;  | &#9745; | &#9745; | &#9744; | &#9744; | - | - |
| musica_id | Identificador da música | INT | - | &#9744;  | &#9745; | &#9745; | &#9744; | &#9744; | - | - |

--- 
**Tabela** : Musico_Evento

*Descrição* : Associação entre músicos e eventos dos quais eles participam

*Observações* : Tabela de relacionamento muitos-para-muitos entre Musico e Evento; A chave primária é composta

| Colunas | Descrição | Tipo de Dado | Tamanho | Null | PK | FK | Unique | Identity | Default | Check | 
| ------- | --------- | ------------ | ------- | ---- | -- | -- | ------ | -------- | ------- | ----- |
| musico_id | Identificador do músico | INT | - | &#9744;  | &#9745; | &#9745; | &#9744; | &#9744; | - | - | 
| evento_id | Identificador do evento | INT | - | &#9744; | &#9745; | &#9745; | &#9744; | &#9744; | - | - | 



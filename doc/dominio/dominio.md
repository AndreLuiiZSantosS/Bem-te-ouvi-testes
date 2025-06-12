# Modelo de Domínio

<img src="classDominio.png"/>

Cardinalidade:


Músico -> Música:
1:N (um músico pode ter várias músicas)

Músico -> Evento:
1:N (um músico pode criar vários eventos)

Ouvinte -> Playlist:
1:N (um ouvinte pode ter várias playlists)

Playlist -> Música:
N:M (uma playlist pode ter várias músicas, e uma música pode estar em várias playlists)


## Glossário (sugestão)

|  Termo    |                          Explicação                             |
| --------- | --------------------------------------------------------------- |
| Visitante | Usuário não cadastrado                                          |
| Ouvinte   | Quem irá escutar as músicas e visitar o perfil do artista       |
| Músico    | Artista independente que buscar divulgar suas músicas e eventos |

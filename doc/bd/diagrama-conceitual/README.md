```mermaid
erDiagram
	Musico||..o{Evento:"Cria"
    Musico||..o{Leilao:"Cria"
    Leilao||..o{Lances:"Tem"
	Musico}|..o{Album:"Cria"
	Album||..|{Musica:"Contêm"
	Musica||..o{Curtida:"Tem"
	Musica||..o{Comentario:"Tem"
	Musica||..||Estatistica:"Tem"
	Musico||..o{Playlist:"Cria"
	Ouvinte||..o{Playlist:"Cria"
	Playlist||..|{Musica:"Contêm"



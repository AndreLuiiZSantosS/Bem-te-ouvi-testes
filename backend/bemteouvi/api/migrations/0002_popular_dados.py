# seu_app/migrations/0002_popular_dados.py

from django.db import migrations, transaction
from django.utils import timezone
import datetime

# ----------------------------------------------------------------------------------
# IMPORTANTE: Troque 'seu_app' pelo nome real do seu aplicativo.
# ----------------------------------------------------------------------------------
APP_NAME = 'api' 

def populate_data(apps, schema_editor):
    """
    Preenche o banco de dados com dados de teste para todos os modelos.
    """
    
    # Obter os modelos da versão "histórica" do app
    User = apps.get_model(APP_NAME, 'User')
    Musico = apps.get_model(APP_NAME, 'Musico')
    Ouvinte = apps.get_model(APP_NAME, 'Ouvinte')
    Album = apps.get_model(APP_NAME, 'Album')
    Musica = apps.get_model(APP_NAME, 'Musica')
    Evento = apps.get_model(APP_NAME, 'Evento')
    Leilao = apps.get_model(APP_NAME, 'Leilao')
    Lance = apps.get_model(APP_NAME, 'Lance')
    Playlist = apps.get_model(APP_NAME, 'Playlist')
    Comentario = apps.get_model(APP_NAME, 'Comentario')
    Curtida = apps.get_model(APP_NAME, 'Curtida')
    Estatistica = apps.get_model(APP_NAME, 'Estatistica')

    # Usar transação atômica para garantir que tudo seja criado com sucesso
    with transaction.atomic():
        
        # --- 1. Criar Usuários e Perfis ---
        
        # Músico 1
        user_musico1 = User.objects.create_user(
            username='milesdavis', 
            password='123', 
            email='miles@jazz.com', 
            first_name='Miles', 
            last_name='Davis', 
            perfil='musico'
        )
        musico1 = Musico.objects.create(
            user=user_musico1,
            nome_artistico='Miles Davis',
            biografia='Lenda do Jazz e inovador.',
            generos_musicais='jazz'
        )
        
        # Músico 2
        user_musico2 = User.objects.create_user(
            username='jobim', 
            password='123', 
            email='tom@bossa.com', 
            first_name='Tom', 
            last_name='Jobim', 
            perfil='musico'
        )
        musico2 = Musico.objects.create(
            user=user_musico2,
            nome_artistico='Tom Jobim',
            biografia='Maestro da Bossa Nova.',
            generos_musicais='bossa_nova,mpb'
        )
        
        # Ouvinte 1
        user_ouvinte1 = User.objects.create_user(
            username='ana_ouvinte', 
            password='123', 
            email='ana@email.com', 
            first_name='Ana', 
            last_name='Silva', 
            perfil='ouvinte'
        )
        ouvinte1 = Ouvinte.objects.create(
            user=user_ouvinte1,
            nome_completo='Ana Silva',
            generos_favoritos='jazz,mpb'
        )
        
        # Ouvinte 2
        user_ouvinte2 = User.objects.create_user(
            username='bruno_fan', 
            password='123', 
            email='bruno@email.com', 
            first_name='Bruno', 
            last_name='Costa', 
            perfil='ouvinte'
        )
        ouvinte2 = Ouvinte.objects.create(
            user=user_ouvinte2,
            nome_completo='Bruno Costa',
            generos_favoritos='rock,blues'
        )

        # --- 2. Criar Álbuns (dependem de Músicos) ---
        
        album_jazz = Album.objects.create(
            titulo='Kind of Blue',
            capa_do_album='capas_de_album/placeholder_kindofblue.jpg', # Placeholder
            data_de_lancamento=datetime.date(1959, 8, 17),
            genero_musical='jazz',
            numero_de_musicas=5
        )
        album_jazz.musicos.add(musico1)
        
        album_bossa = Album.objects.create(
            titulo='Chega de Saudade',
            capa_do_album='capas_de_album/placeholder_chega.jpg', # Placeholder
            data_de_lancamento=datetime.date(1959, 3, 1),
            genero_musical='bossa_nova',
            numero_de_musicas=12
        )
        album_bossa.musicos.add(musico2)

        # --- 3. Criar Músicas (dependem de Álbuns) ---
        
        musica1 = Musica.objects.create(
            album=album_jazz,
            titulo='So What',
            autores='Miles Davis',
            autor_melodia='Miles Davis',
            letra='(Instrumental)',
            autor_letra='N/A',
            data_criacao=datetime.date(1959, 3, 2),
            arquivo_audio='musicas/so_what.mp3', # Placeholder
            genero='jazz',
            duracao=datetime.timedelta(minutes=9, seconds=22)
        )
        
        musica2 = Musica.objects.create(
            album=album_jazz,
            titulo='Blue in Green',
            autores='Miles Davis, Bill Evans',
            autor_melodia='Miles Davis, Bill Evans',
            letra='(Instrumental)',
            autor_letra='N/A',
            data_criacao=datetime.date(1959, 3, 2),
            arquivo_audio='musicas/blue_in_green.mp3', # Placeholder
            genero='jazz',
            duracao=datetime.timedelta(minutes=5, seconds=37)
        )
        
        musica3 = Musica.objects.create(
            album=album_bossa,
            titulo='Garota de Ipanema',
            autores='Tom Jobim, Vinicius de Moraes',
            autor_melodia='Tom Jobim',
            letra='Olha que coisa mais linda, mais cheia de graça...',
            autor_letra='Vinicius de Moraes',
            data_criacao=datetime.date(1962, 1, 1),
            arquivo_audio='musicas/ipanema.mp3', # Placeholder
            genero='bossa_nova',
            duracao=datetime.timedelta(minutes=3, seconds=1)
        )

        # --- 4. Criar Itens Relacionados (Eventos, Leilões, Playlists, etc.) ---
        
        # Eventos (dependem de Músico)
        Evento.objects.create(
            musico=musico2,
            nome='Show Bossa Nova no Rio',
            endereco='Rua das Laranjeiras, 123, Rio de Janeiro',
            imagem_do_evento='eventos/show_jobim.jpg', # Placeholder
            data_do_evento=timezone.now() + datetime.timedelta(days=30),
            descricao='Uma noite em homenagem ao maestro.'
        )
        
        # Leilão (depende de Músico)
        leilao1 = Leilao.objects.create(
            musico=musico1,
            titulo='Partitura Original de "So What"',
            descricao='Rascunho original da partitura.',
            data_inicio=timezone.now(),
            data_fim=timezone.now() + datetime.timedelta(days=10),
            lance_inicial=500.00
        )
        
        # Lances (dependem de Leilão e Usuário)
        Lance.objects.create(
            usuario=user_ouvinte1,
            leilao=leilao1,
            valor=550.00
        )
        Lance.objects.create(
            usuario=user_ouvinte2,
            leilao=leilao1,
            valor=600.00
        )
        leilao1.lance_atual = 600.00
        leilao1.save()

        # Playlist (depende de Usuário e Música)
        playlist_ana = Playlist.objects.create(
            usuario=user_ouvinte1,
            nome='Favoritas para Relaxar'
        )
        playlist_ana.musicas.add(musica2, musica3)

        # Comentários (dependem de Usuário e Música)
        Comentario.objects.create(
            usuario=user_ouvinte1,
            musica=musica3,
            texto='Amo essa música! Me lembra a praia.'
        )
        Comentario.objects.create(
            usuario=user_musico1, # O próprio músico comentando
            musica=musica3,
            texto='Parabéns, Tom. Um clássico.'
        )
        
        # Curtidas (dependem de Usuário e Música)
        Curtida.objects.create(usuario=user_ouvinte1, musica=musica3)
        Curtida.objects.create(usuario=user_ouvinte2, musica=musica3)
        Curtida.objects.create(usuario=user_ouvinte2, musica=musica1)
        
        # Estatísticas (dependem de Música e Músico)
        Estatistica.objects.create(
            musica=musica1,
            musico=musico1,
            play_count=1500,
            curtidas_count=350,
            comentarios_count=45
        )
        Estatistica.objects.create(
            musica=musica3,
            musico=musico2,
            play_count=5000,
            curtidas_count=1200,
            comentarios_count=90
        )


class Migration(migrations.Migration):

    dependencies = [
        # --------------------------------------------------------------------------
        # IMPORTANTE: Mude '0001_initial' para o nome da sua migração anterior
        # (aquela que criou todas as tabelas).
        # --------------------------------------------------------------------------
        (APP_NAME, '0001_initial'), 
    ]

    operations = [
        migrations.RunPython(populate_data),
    ]
document.addEventListener('DOMContentLoaded', () => {
    const playlist = [
        {
            title: "Lions",
            artist: "Skillet",
            albumCover: "./imagens/skillet.png",
            audioSrc: "./audio/lions.mp4",
            lyrics: [
                { text: "Today we live, today we breathe", time: 6000 },
                { text: "Today we know that we are strong and when we are weak", time: 8300 },
                { text: "Today we trust, we overcome", time: 11700 },
                { text: "Take every chain that kept us slaves and throw em' off", time: 14500 },
                { text: "We're not waiting for permission", time: 19000 },
                { text: "We defy our inhibition", time: 21000 },
                { text: "Like our middle name is fearless", time: 23500 },
                { text: "Unafraid", time: 25500 },
                { text: "If we're gonna fly, we fly like eagles", time: 27600 },
                { text: "Arms out wide", time: 30300 },
                { text: "If we're gonna fear, we fear no evil", time: 32800 },
                { text: "We will rise", time: 34800 },
                { text: "By your power, we will go", time: 36800 },
                { text: "By your spirit, we are bold", time: 39300 },
                { text: "If we're gonna stand, we stand as giants", time: 41800 },
                { text: "If we're gonna walk, we walk as lions", time: 44300 },
                { text: "We walk as lions", time: 46800 },
                { text: "Today is ours, it's always been", time: 50000 },
                { text: "Before we face the fight", time: 52000 },
                { text: "We know who's gonna win", time: 53900 },
                { text: "We live by faith and not by sight", time: 56400 },
                { text: "We don't want safe and quiet", time: 58800 },
                { text: "We don't wanna run and hide", time: 60800 },
                { text: "This is not an intermission", time: 62800 },
                { text: "It's our time, not gonna miss it", time: 65000 },
                { text: "You've already called us fearless", time: 67500 },
                { text: "Unafraid", time: 69500 },
                { text: "If we're gonna fly, we fly like eagles", time: 71500 },
                { text: "Arms out wide", time: 74200 },
                { text: "If we're gonna fear, we fear no evil", time: 76700 },
                { text: "We will rise", time: 78700 },
                { text: "By your power, we will go", time: 80700 },
                { text: "By your spirit, we are bold", time: 83200 },
                { text: "If we're gonna stand, we stand as giants", time: 85700 },
                { text: "If we're gonna walk, we walk as lions", time: 88200 },
                { text: "We walk as lions", time: 90700 },
                { text: "Oh, everywhere we go", time: 93500 },
                { text: "The battle has been won", time: 96000 },
                { text: "We know you've gone before us", time: 98500 },
                { text: "So, we're taking hold of faith", time: 101000 },
                { text: "With every step we take", time: 103000 },
                { text: "We know we'll rise victorious", time: 105500 },
                { text: "If we're gonna fly, we fly like eagles", time: 108500 },
                { text: "Arms out wide", time: 111200 },
                { text: "If we're gonna fear, we fear no evil", time: 113700 },
                { text: "We will rise", time: 115700 },
                { text: "By your power, we will go", time: 117700 },
                { text: "By your spirit, we are bold", time: 120200 },
                { text: "If we're gonna stand, we stand as giants", time: 122700 },
                { text: "If we're gonna walk, we walk as lions", time: 125200 },
                { text: "We walk as lions", time: 127700 },
                { text: "", time: 130000 },
                { text: "...", time: 200000 }
            ]
        },
         {
            title: "Hail to the King",
            artist: "Avenged Sevenfold",
            albumCover: "./imagens/avenged.png",
            audioSrc: "./audio/king.mp4",
            lyrics: [
                // O vocal começa em 1 minuto e 8 segundos (68000 ms)
                { text: "Watch your tongue or have it cut from your head", time: 68000 },
                { text: "Save your life by keeping whispers unsaid", time: 70500 }, // ~2.5s depois
                { text: "Children roam the streets, now orphans of war", time: 73500 }, // ~3s depois
                { text: "Bodies hanging in the streets to adore", time: 76000 }, // ~2.5s depois
                { text: "Royal flames will carve the path in chaos", time: 82000 }, // ~6s depois (início da estrofe)
                { text: "Bringing daylight to the night (night)", time: 85000 },
                { text: "Death is riding into town with armor", time: 88000 },
                { text: "They come to take all your rights", time: 90500 },
                { text: "Hail to the king", time: 93000 },
                { text: "Hail to the one", time: 95500 },
                { text: "Kneel to the crown", time: 97500 },
                { text: "Stand in the Sun", time: 100000 },
                { text: "Hail to the king (hail, hail, hail)", time: 103000 },
                { text: "The king", time: 106000 },
                { text: "Blood is spilled while holding keys to the throne", time: 112000 },
                { text: "Born again, but it's too late to atone", time: 114500 },
                { text: "No mercy from the edge of the blade", time: 117000 },
                { text: "Dare escape and learn the price to be paid", time: 120000 },
                { text: "Let the water flow with shades of red now", time: 126000 },
                { text: "Arrows black out all the light (light)", time: 128500 },
                { text: "Death is riding into town with armor", time: 131500 },
                { text: "They come to grant you your rights", time: 134000 },
                { text: "Hail to the king", time: 136500 },
                { text: "Hail to the one", time: 139000 },
                { text: "Kneel to the crown", time: 141000 },
                { text: "Stand in the Sun", time: 143500 },
                { text: "Hail to the king (hail, hail, hail)", time: 146500 },
                { text: "The king", time: 149500 },
                { text: "There's a taste of fear (hail, hail, hail)", time: 178000 }, // Corrigido a lacuna, ~2min58s
                { text: "When the henchmen call (hail, hail, hail)", time: 181000 },
                { text: "Iron fist to tame the land (hail, hail, hail)", time: 184000 },
                { text: "Iron fist to claim it all", time: 186500 },
                { text: "Hail to the king", time: 189500 },
                { text: "Hail to the one", time: 192000 },
                { text: "Kneel to the crown", time: 194000 },
                { text: "Stand in the Sun", time: 196500 },
                { text: "Hail to the king", time: 199500 },
                { text: "Hail to the one", time: 202000 },
                { text: "Kneel to the crown", time: 204000 },
                { text: "Stand in the Sun", time: 206500 },
                { text: "Hail to the king (hail, hail, hail)", time: 209500 },
                { text: "The king.", time: 212000 },
                { text: "...", time: 310000 } // Linha final próxima ao fim da música (314000ms = 5:14)
            ]
        },
        { // NOVO OBJETO DA MÚSICA "SÓ POR UMA NOITE"
            title: "Só por uma noite",
            artist: "Charlie Brown Jr.",
            albumCover: "./imagens/noite.png", 
            audioSrc: "./audio/noite.mp4",    
            lyrics: [
                // 
                // **Você precisará tocar a música e ajustar CADA um para a sincronização perfeita.**
                { text: "Eu procurei em outros corpos encontrar você", time: 8000 },
                { text: "Eu procurei um bom motivo pra não, pra não falar", time: 12000 },
                { text: "Procurei me manter afastado", time: 15500 },
                { text: "Mas você me conhece faço tudo errado, tudo errado", time: 19500 },
                { text: "Fim de semana, eu sei lá vou viajar", time: 24500 },
                { text: "Vou me embalar, vou dar uma festa", time: 27500 },
                { text: "Vou tocar um putero eu vou te esquecer, nem que for", time: 32000 },
                { text: "Só por uma noite, só por uma noite", time: 37000 },
                { text: "Só por uma noite, só por uma noite", time: 42000 },
                { text: "Mas só de ouvir a sua voz eu já me sinto bem", time: 47000 },
                { text: "Mas se é difícil pra você tudo bem", time: 51000 },
                { text: "Muita gente se diverte com o que tem", time: 55000 },
                { text: "Só de ouvir a sua voz eu já me sinto bem", time: 59000 },
                { text: "Mas se é difícil pra você tudo bem", time: 63000 },
                { text: "Quando a gente se diverte com o que tem", time: 67000 },
                { text: "Se diverte com o que tem", time: 69500 },
                { text: "Só por uma noite", time: 72000 },
                { text: "Eu procurei abrir meus olhos e enxergar você", time: 78000 },
                { text: "Eu procurei um bom motivo pra não, pra não estar lá", time: 82500 },
                { text: "Procurei me manter afastado", time: 86000 },
                { text: "Mas você me conhece faço tudo errado, tudo errado", time: 90000 },
                { text: "Fim de semana, eu sei lá vou viajar", time: 95000 },
                { text: "Vou me embalar, vou dar uma festa", time: 98000 },
                { text: "Vou tocar um putero eu vou te esquecer, nem que for", time: 102500 },
                { text: "Só por uma noite, só por uma noite", time: 107500 },
                { text: "Só por uma noite, só por uma noite", time: 112500 },
                { text: "Mas só de ouvir a sua voz eu já me sinto bem", time: 117500 },
                { text: "Mas se é difícil pra você tudo bem", time: 121500 },
                { text: "Muita gente se diverte com o que tem", time: 125500 },
                { text: "Só de ouvir a sua voz eu já me sinto bem", time: 129500 },
                { text: "Mas se é difícil pra você tudo bem", time: 133500 },
                { text: "Muita gente se diverte com o que tem", time: 137500 },
                { text: "Se diverte com o que tem", time: 140000 },
                { text: "Só por uma noite", time: 142500 },
                { text: "...", time: 201000 } // Linha final aproximada ao fim da música (203000ms = 3:23)
            ]
        },
        { 
            title: "Carry You Home",
            artist: "Alex Warren",
            albumCover: "./imagens/carry.png", 
            audioSrc: "./audio/home.mp4",     
            lyrics: [
                
                // **Você precisará tocar a música e ajustar CADA um para a sincronização perfeita.**
                { text: "Oh, I hope you know I will carry you home", time: 2000 }, // Estimativa: começa cedo
                { text: "Whether it's tonight or 55 years down the road", time: 5500 },
                { text: "Oh, I know there's so many ways that this could go", time: 10000 },
                { text: "Don't want you to wonder, darling, I need you to know", time: 13500 },
                { text: "We were talking to the sunset", time: 17500 },
                { text: "Throwing dreams against the wall (oh-oh)", time: 21000 },
                { text: "I know none of them have stuck yet", time: 24500 },
                { text: "But I bet it on you, honey, oh, I would risk it all", time: 28000 },
                { text: "These days, these nights are changing", time: 32000 },
                { text: "Mama, my mind is set on you", time: 35500 },
                { text: "I'm not afraid to say it, to say it's true", time: 39000 },
                { text: "Oh, I hope you know I will carry you home", time: 43000 },
                { text: "Whether it's tonight or 55 years down the road", time: 46500 },
                { text: "Oh, I know there's so many ways that this could go", time: 51000 },
                { text: "Don't want you to wonder, darling, I need you to know", time: 54500 },
                { text: "In this and every life", time: 59000 },
                { text: "I choose us every time (whoa)", time: 62500 },
                { text: "Oh-oh, oh, oh, oh", time: 65000 },
                { text: "Oh-oh, oh, oh, oh", time: 68000 },
                { text: "Oh, oh, oh", time: 70000 },
                { text: "We were California Dreamin'", time: 73000 },
                { text: "Our whole life fit in that car (oh-oh)", time: 76500 },
                { text: "Didn't have a bed to sleep in", time: 80000 },
                { text: "We kept each other warm under a ceiling full of stars", time: 83500 },
                { text: "These days, these nights are changing", time: 87500 },
                { text: "Mama, my mind is set on you", time: 91000 },
                { text: "I'm not afraid to say it, to say I do", time: 94500 },
                { text: "Oh, I hope you know I will carry you home", time: 98500 },
                { text: "Whether it's tonight or 55 years down the road", time: 102000 },
                { text: "Oh, I know there's so many ways that this could go", time: 106500 },
                { text: "Don't want you to wonder, darling, I need you to know", time: 110000 },
                { text: "In this and every life", time: 114500 },
                { text: "I choose us every time (whoa)", time: 118000 },
                { text: "Oh-oh, oh, oh, oh", time: 120500 },
                { text: "Oh-oh, oh, oh, oh", time: 123500 },
                { text: "Oh, oh, oh", time: 125500 },
                { text: "Oh, I hope you know I will carry you home", time: 128500 },
                { text: "Whether it's tonight or 55 years down the road", time: 132000 },
                { text: "...", time: 172000 } // Ajustado para terminar perto dos 2min54s (174000ms)
            ]
        },
        { 
            title: "One Number Away",
            artist: "Luke Combs",
            albumCover: "./imagens/number.png", 
            audioSrc: "./audio/number.mp4",     
            lyrics: [
                // 
                // **Você precisará tocar a música e ajustar CADA um para a sincronização perfeita.**
                { text: "Are you sitting at home all alone", time: 16000 },
                { text: "Trying to fall asleep?", time: 18500 },
                { text: "Are you staring a hole through your phone", time: 21500 },
                { text: "Praying that it rings?", time: 24000 },
                { text: "Are you watching a movie that you've seen", time: 27000 },
                { text: "A thousand times?", time: 29500 },
                { text: "Or maybe playing some Mayer", time: 32000 },
                { text: "Getting lost in your favorite lines?", time: 34500 },
                { text: "Well, if you're anything like me", time: 37500 },
                { text: "You just might be doing whatever it takes to drown out the noise", time: 42000 },
                { text: "But I just wanna hear your voice", time: 45000 },
                { text: "I'm one number away from calling you", time: 49000 },
                { text: "I said I was through, but I'm dying, inside", time: 53500 },
                { text: "Got my head in a mess, girl, I confess", time: 57500 },
                { text: "I lied when I said, \"I'm leaving and not coming back\"", time: 62000 },
                { text: "Might be the whiskey or the midnight rain", time: 66000 },
                { text: "But everywhere I go I see your face", time: 69500 },
                { text: "In my brain, dial it up, everything I want to say", time: 74000 },
                { text: "But I'm still one number away", time: 78000 },
                { text: "Are you stuck at a red light with a", time: 83000 },
                { text: "Marlboro Light on your lips?", time: 86000 },
                { text: "Does the smoke in your mirror", time: 89000 },
                { text: "Get clearer without my kiss?", time: 92000 },
                { text: "Are you changing the station", time: 94500 },
                { text: "Replacing our favorite song?", time: 97500 },
                { text: "Well, maybe it's a mistake, hit the brakes on the moving on", time: 102000 },
                { text: "Well, if you're anything like me", time: 105500 },
                { text: "You just might be doing whatever it takes to outrun the storm", time: 110000 },
                { text: "But I'm almost out that door", time: 113000 },
                { text: "And I'm one number away from calling you", time: 117000 },
                { text: "I said I was through, but I'm dying, inside", time: 121500 },
                { text: "Got my head in a mess, girl, I confess", time: 125500 },
                { text: "I lied when I said, \"I'm leaving and not coming back\"", time: 130000 },
                { text: "Might be the whiskey or the midnight rain", time: 134000 },
                { text: "But everywhere I go I see your face", time: 137500 },
                { text: "In my brain, dial it up, everything I want to say", time: 142000 },
                { text: "But I'm still one number away", time: 146000 },
                { text: "Will you pick up when I call?", time: 151000 },
                { text: "Or just forget we loved at all?", time: 154500 },
                { text: "We don't have to talk, I just wanna hear your voice", time: 159000 },
                { text: "And I'm one number away from calling you", time: 163000 },
                { text: "I said I was through, but I'm dying, inside", time: 167500 },
                { text: "Got my head in a mess, girl, I confess", time: 171500 },
                { text: "I lied when I said, \"I'm leaving and not coming back\"", time: 176000 },
                { text: "Might be the whiskey or the midnight rain", time: 180000 },
                { text: "But everywhere I go I see your face", time: 183500 },
                { text: "In my brain, dial it up, anything I want to say", time: 188000 },
                { text: "But I'm still one number away", time: 192000 },
                { text: "Away", time: 196000 },
                { text: "Away", time: 198000 },
                { text: "Yeah, I'm still one number away", time: 201000 },
                { text: "...", time: 266000 } // Linha final aproximada ao fim da música (268000ms = 4:28)
            ]
        },
        { 
            title: "Learn to Fly",
            artist: "Foo Fighters",
            albumCover: "./imagens/learn.png", 
            audioSrc: "./audio/learn.mp4",     
            lyrics: [
                
                // **Você precisará tocar a música e ajustar CADA um para a sincronização perfeita.**
                { text: "Run and tell all of the angels", time: 2000 },
                { text: "This could take all night", time: 4500 },
                { text: "Think I need a devil to help me get things right", time: 8000 },
                { text: "Hook me up a new revolution", time: 12000 },
                { text: "'Cause this one is a lie", time: 14500 },
                { text: "We sat around laughin' and watched the last one die", time: 18000 },
                { text: "Now, I'm looking to the sky to save me", time: 24000 },
                { text: "Looking for a sign of life", time: 27500 },
                { text: "Looking for something to help me burn out bright", time: 31000 },
                { text: "And I'm looking for a complication", time: 35000 },
                { text: "Looking 'cause I'm tired of lyin'", time: 38500 },
                { text: "Make my way back home when I learn to fly high", time: 42500 },
                { text: "I think I'm done nursing patients", time: 47000 },
                { text: "It can wait one night", time: 49500 },
                { text: "I'd give it all away if you give me one last try", time: 53500 },
                { text: "We'll live happily ever trapped if you just save my life", time: 57500 },
                { text: "Run and tell the angels that everything's alright", time: 61500 },
                { text: "I'm looking to the sky to save me", time: 67000 },
                { text: "Looking for a sign of life", time: 70500 },
                { text: "Looking for something to help me burn out bright", time: 74000 },
                { text: "I'm looking for a complication", time: 78000 },
                { text: "Looking 'cause I'm tired of tryin'", time: 81500 },
                { text: "Make my way back home when I learn to fly high", time: 85500 },
                { text: "Make my way back home when I learn to", time: 90000 },
                { text: "Fly along with me, I can't quite make it alone", time: 99000 },
                { text: "Try to make this life my own", time: 102500 },
                { text: "Fly along with me, I can't quite make it alone", time: 106000 },
                { text: "Try to make this life my own", time: 109500 },
                { text: "I'm looking to the sky to save me", time: 115000 },
                { text: "Looking for a sign of life", time: 118500 },
                { text: "Looking for something to help me burn out bright", time: 122000 },
                { text: "And I'm looking for a complication", time: 126000 },
                { text: "Looking 'cause I'm tired of tryin'", time: 129500 },
                { text: "Make my way back home when I learn to", time: 133500 },
                { text: "I'm looking to the sky to save me", time: 141000 },
                { text: "Looking for a sign of life", time: 144500 },
                { text: "Looking for something to help me burn out bright", time: 148000 },
                { text: "And I'm looking for a complication", time: 152000 },
                { text: "Looking 'cause I'm tired of tryin'", time: 155500 },
                { text: "Make my way back home when I learn to fly high", time: 159500 },
                { text: "Make my way back home when I learn to fly", time: 163000 },
                { text: "Make my way back home when I learn to", time: 167000 },
                { text: "...", time: 233000 } // Linha final aproximada ao fim da música (235000ms = 3:55)
            ]
        },
        { // NOVO OBJETO DA MÚSICA "A PLACE FOR MY HEAD"
            title: "A Place for My Head",
            artist: "Linkin Park",
            albumCover: "./imagens/linkin.png", // Crie esta imagem!
            audioSrc: "./audio/linkin.mp4",     // Crie este arquivo de áudio!
            lyrics: [
                // **ATENÇÃO: Estes timestamps são ESTIMATIVAS, começando em 28 segundos (28000 ms)!**
                // **Você precisará tocar a música e ajustar CADA um para a sincronização perfeita.**
                { text: "I watch how the Moon", time: 28000 },
                { text: "Sits in the sky on a dark night", time: 30500 },
                { text: "Shining with the light from the Sun", time: 33500 },
                { text: "And the Sun doesn't give light to the Moon, assuming", time: 37500 },
                { text: "The Moon is gonna owe it one", time: 40500 },
                { text: "And makes me think of how you act to me, you do", time: 43500 },
                { text: "Favors then rapidly", time: 46000 },
                { text: "Just turn around and start asking me about", time: 49000 },
                { text: "Things that you want back from me", time: 52000 },
                { text: "I'm sick of the tension, sick of the hunger", time: 55000 },
                { text: "Sick of you acting like I owe you this", time: 58500 },
                { text: "Find another place to feed your greed", time: 62000 },
                { text: "While I find a place to rest", time: 65000 },
                { text: "I wanna be in another place", time: 70000 },
                { text: "I hate when you say you don't understand", time: 74000 },
                { text: "(You'll see it's not meant to be)", time: 76500 },
                { text: "I wanna be in the energy", time: 79000 },
                { text: "Not with the enemy, a place for my head", time: 82500 },
                { text: "Maybe someday I'll be just like you and", time: 87000 },
                { text: "Step on people like you do", time: 90000 },
                { text: "Run away, all the people I thought I knew", time: 93500 },
                { text: "I remember back then who you were", time: 97000 },
                { text: "You used to be calm", time: 99500 },
                { text: "Used to be strong, used to be generous", time: 103000 },
                { text: "You should've known", time: 106000 },
                { text: "That you wear out your welcome and now you see", time: 109500 },
                { text: "How quiet it is all alone", time: 112500 },
                { text: "I'm so sick of the tension", time: 116000 },
                { text: "Sick of the hunger", time: 118500 },
                { text: "Sick of you acting like I owe you this", time: 122000 },
                { text: "Find another place to feed your greed", time: 125500 },
                { text: "While I find a place to rest", time: 128500 },
                { text: "I'm so sick of the tension", time: 131500 },
                { text: "Sick of the hunger", time: 134000 },
                { text: "Sick of you acting like I owe you this", time: 137500 },
                { text: "Find another place to feed your greed", time: 141000 },
                { text: "While I find a place to rest", time: 144000 },
                { text: "I wanna be in another place", time: 149000 },
                { text: "I hate when you say you don't understand", time: 153000 },
                { text: "(You'll see it's not meant to be)", time: 155500 },
                { text: "I wanna be in the energy", time: 158000 },
                { text: "Not with the enemy, a place for my head", time: 161500 },
                { text: "You, try to take the best of me, go away", time: 164000 },
                { text: "You, try to take the best of me, go away!", time: 167000 },
                { text: "You, try to take the best of me, go away!", time: 169500 },
                { text: "You, try to take the best of me, go away!", time: 172000 },
                { text: "You, try to take the best of me, go away", time: 174000 },
                { text: "You, try to take the best of me, go away!", time: 176500 },
                { text: "You, try to take the best of me, go away!", time: 179000 },
                { text: "You, try to take the best of me, go away!", time: 181500 },
                { text: "I wanna be in another place", time: 184500 },
                { text: "I hate when you say you don't understand", time: 188500 },
                { text: "(You'll see it's not meant to be)", time: 191000 },
                { text: "I wanna be in the energy", time: 193500 },
                { text: "Not with the enemy, a place for my head", time: 197000 },
                { text: "Stay", time: 200000 },
                { text: "A", time: 202000 },
                { text: "Way", time: 204000 },
                { text: "I am so sick of the tension", time: 209000 },
                { text: "Sick of the hunger", time: 211500 },
                { text: "Sick of you acting like I owe you this", time: 215000 },
                { text: "Find another place to feed your greed", time: 218500 },
                { text: "While I find a place to rest", time: 221500 },
                { text: "I'm so sick of the tension", time: 224500 },
                { text: "Sick of the hunger", time: 227000 },
                { text: "Sick of you acting like I owe you this", time: 230500 },
                { text: "(Stay away from me!)", time: 232500 },
                { text: "Find another place to feed your greed", time: 235500 },
                { text: "While I find", time: 238000 },
                { text: "A place to rest", time: 240000 },
                { text: "...", time: 242000 } // Linha final aproximada ao fim da música (184000ms = 3:04)
            ]
        }
    ];

    // --- VARIÁVEIS DE ESTADO DO PLAYER ---
    let currentMusicIndex = 0; // Começa com a primeira música da playlist
    let currentLyricIndex = 0;
    let lyricsLines; // Variável para armazenar as linhas de letra do DOM

    // --- REFERÊNCIAS AOS ELEMENTOS DO DOM ---
    const mainMusicContainer = document.getElementById('main-music-container');
    const albumCoverImg = document.getElementById('album-cover');
    const musicTitleElement = document.querySelector('.music-title');
    const artistNameElement = document.querySelector('.artist-name');
    const lyricsContainer = document.querySelector('.lyrics-container');
    const playPauseButton = document.getElementById('play-pause-button');
    const playPauseIcon = playPauseButton.querySelector('i');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const progressBarContainer = document.querySelector('.progress-bar-container');
    const progressBarMusic = document.querySelector('.progress-bar-music');
    const currentTimeSpan = document.getElementById('current-time');
    const totalTimeSpan = document.getElementById('total-time');
    const lyricsSection = document.querySelector('.lyrics-section');
    const fullscreenButton = document.getElementById('fullscreen-button');
    const openLyricsButton = document.getElementById('open-lyrics-button');
    const closeLyricsButton = document.getElementById('close-lyrics-button');
    const musicAudio = document.getElementById('music-audio'); // Referência ao elemento de áudio
    const playerControlsBottom = document.querySelector('.player-controls-bottom'); // Referência para controle de visibilidade


    // --- FUNÇÕES AUXILIARES ---

    // Formata o tempo de segundos para MM:SS
    const formatTime = (totalSeconds) => {
        if (isNaN(totalSeconds) || totalSeconds < 0) return "0:00";
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = Math.floor(totalSeconds % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    // Carrega os dados da música na UI (atualizada para usar a playlist)
    const loadMusic = (index) => {
        if (index < 0 || index >= playlist.length) {
            console.error("Índice de música inválido.");
            return;
        }

        currentMusicIndex = index;
        const currentMusic = playlist[currentMusicIndex];

        albumCoverImg.src = currentMusic.albumCover;
        mainMusicContainer.style.backgroundImage = `url(${currentMusic.albumCover})`;
        musicTitleElement.textContent = currentMusic.title;
        artistNameElement.textContent = currentMusic.artist;
        musicAudio.src = currentMusic.audioSrc; // Define o caminho do áudio

        // Popula o container de letras
        lyricsContainer.innerHTML = '';
        currentMusic.lyrics.forEach((line) => {
            const p = document.createElement('p');
            p.classList.add('lyrics-line');
            p.textContent = line.text;
            p.dataset.time = line.time; // Tempo em milissegundos
            lyricsContainer.appendChild(p);
        });
        lyricsLines = document.querySelectorAll('.lyrics-line'); // Re-seleciona as linhas de letra

        resetPlayer(); // Reinicia o player para a nova música
    };

    // Destaque da linha atual da letra e rolagem automática
    const highlightAndScrollLyric = () => {
        document.querySelectorAll('.lyrics-line.active-lyric').forEach(line => {
            line.classList.remove('active-lyric');
        });

        if (currentLyricIndex >= 0 && currentLyricIndex < lyricsLines.length) {
            const currentLine = lyricsLines[currentLyricIndex];
            currentLine.classList.add('active-lyric');

            const containerScrollTop = lyricsContainer.scrollTop;
            const containerHeight = lyricsContainer.clientHeight;
            const lineHeight = currentLine.offsetHeight;
            const lineOffsetTop = currentLine.offsetTop;

            const targetScrollTop = lineOffsetTop - (containerHeight / 2) + (lineHeight / 2);

            // Apenas scrolla se a linha não estiver visível ou estiver muito na borda
            // Adicionado um pequeno buffer (e.g., 20px) para melhorar o comportamento de rolagem
            if (lineOffsetTop < containerScrollTop + 20 || lineOffsetTop + lineHeight > containerScrollTop + containerHeight - 20) {
                lyricsContainer.scrollTo({
                    top: targetScrollTop,
                    behavior: 'smooth'
                });
            }
        }
    };

    // Atualiza a barra de progresso e o tempo decorrido
    const updateProgress = () => {
        const duration = musicAudio.duration || 1;
        const progressPercentage = (musicAudio.currentTime / duration) * 100;
        progressBarMusic.style.setProperty('--progress-width', `${progressPercentage}%`);
        currentTimeSpan.textContent = formatTime(musicAudio.currentTime);
    };

    // --- CONTROLES DO PLAYER ---

    const playMusic = () => {
        musicAudio.play().catch(error => {
            console.error("Erro ao tentar reproduzir o áudio:", error);
            // Poderíamos adicionar um alerta ao usuário ou fallback para um clique manual
        });
        playPauseIcon.classList.remove('fa-play');
        playPauseIcon.classList.add('fa-pause');
        playerControlsBottom.classList.add('visible-on-play'); // Adiciona classe para visibilidade em mobile/touch
    };

    const pauseMusic = () => {
        musicAudio.pause();
        playPauseIcon.classList.remove('fa-pause');
        playPauseIcon.classList.add('fa-play');
    };

    const togglePlayPause = () => {
        if (musicAudio.paused) {
            playMusic();
        } else {
            pauseMusic();
        }
    };

    // Função para avançar para a próxima música na playlist
    const nextMusic = () => {
        // Se já for a última música, volta para a primeira
        const nextIndex = (currentMusicIndex + 1) % playlist.length;
        loadMusic(nextIndex);
        playMusic(); // Inicia a reprodução da nova música
    };

    // Função para voltar para a música anterior na playlist
    const prevMusic = () => {
        // Se já for a primeira música, vai para a última
        const prevIndex = (currentMusicIndex - 1 + playlist.length) % playlist.length;
        loadMusic(prevIndex);
        playMusic(); // Inicia a reprodução da nova música
    };

    // Reinicia o estado do player para a música atual
    const resetPlayer = () => {
        pauseMusic();
        musicAudio.currentTime = 0;
        currentLyricIndex = 0; // Reinicia o índice da letra
        updateProgress();
        highlightAndScrollLyric();
        // Garante que o total time seja atualizado assim que os metadados da NOVA música forem carregados
        musicAudio.addEventListener('loadedmetadata', () => {
            totalTimeSpan.textContent = formatTime(musicAudio.duration);
        }, { once: true }); // Executa apenas uma vez por carregamento
    };

    // Navegação na barra de progresso
    progressBarContainer.addEventListener('click', (e) => {
        const progressBarWidth = progressBarContainer.clientWidth;
        const clickX = e.offsetX;
        const percentage = (clickX / progressBarWidth);

        musicAudio.currentTime = musicAudio.duration * percentage;

        // Encontra a linha de letra mais próxima ao tempo clicado
        let closestLyricIndex = 0;
        const clickedTimeMs = musicAudio.currentTime * 1000;
        for (let i = 0; i < playlist[currentMusicIndex].lyrics.length; i++) {
            if (playlist[currentMusicIndex].lyrics[i].time <= clickedTimeMs) {
                closestLyricIndex = i;
            } else {
                break;
            }
        }
        currentLyricIndex = closestLyricIndex;
        highlightAndScrollLyric();
        updateProgress();
    });


    // --- EVENTOS DO ELEMENTO DE ÁUDIO ---
    musicAudio.addEventListener('timeupdate', () => {
        updateProgress();

        const currentTimeMs = musicAudio.currentTime * 1000;
        const currentLyrics = playlist[currentMusicIndex].lyrics;
        let newLyricIndex = currentLyricIndex;

        // Avança o índice da letra se o tempo atual já passou do tempo da próxima linha
        while (newLyricIndex < currentLyrics.length - 1 &&
               currentTimeMs >= currentLyrics[newLyricIndex + 1].time) {
            newLyricIndex++;
        }

        // Retrocede o índice da letra (caso o usuário arraste a barra para trás)
        while (newLyricIndex > 0 &&
               currentTimeMs < currentLyrics[newLyricIndex].time) {
            newLyricIndex--;
        }

        if (newLyricIndex !== currentLyricIndex) {
            currentLyricIndex = newLyricIndex;
            highlightAndScrollLyric();
        }
    });

    musicAudio.addEventListener('loadedmetadata', () => {
        // Quando os metadados do áudio são carregados, define a duração total
        totalTimeSpan.textContent = formatTime(musicAudio.duration);
        updateProgress(); // Atualiza a barra de progresso inicial
        highlightAndScrollLyric(); // Destaca a primeira linha após carregar
    });

    musicAudio.addEventListener('ended', () => {
        // Quando a música termina, avança para a próxima automaticamente
        nextMusic();
    });


    // --- INTERAÇÃO COM A SEÇÃO DA LETRA ---
    openLyricsButton.addEventListener('click', () => {
        lyricsSection.classList.add('show');
        highlightAndScrollLyric();
    });

    closeLyricsButton.addEventListener('click', () => {
        lyricsSection.classList.remove('show');
    });

    // Toggle para tela cheia
    fullscreenButton.addEventListener('click', () => {
        lyricsSection.classList.toggle('fullscreen');
        const icon = fullscreenButton.querySelector('i');
        if (lyricsSection.classList.contains('fullscreen')) {
            icon.classList.remove('fa-expand');
            icon.classList.add('fa-compress');
        } else {
            icon.classList.remove('fa-compress');
            icon.classList.add('fa-expand');
        }
        highlightAndScrollLyric();
    });

    // --- EVENT LISTENERS DOS BOTÕES DE CONTROLE ---
    playPauseButton.addEventListener('click', togglePlayPause);
    prevButton.addEventListener('click', prevMusic);
    nextButton.addEventListener('click', nextMusic);
    // Para os botões de shuffle e repeat, adicione sua lógica aqui:
    // document.getElementById('shuffle-button').addEventListener('click', () => { /* Lógica de shuffle */ });
    // document.getElementById('repeat-button').addEventListener('click', () => { /* Lógica de repeat */ });


    // --- INICIALIZAÇÃO ---
    // Carrega a primeira música da playlist ao carregar a página
    loadMusic(currentMusicIndex);
});


# Tutorial Completo: Como Acessar e Visualizar o Projeto

Este tutorial foi criado para ensinar, de forma simples e didática, duas formas diferentes de acessar e visualizar o projeto, mesmo para quem não tem experiência com GitHub.

## ALTERNATIVA 1: Acessar o Projeto pelo Vercel

1.1 Acesse o link abaixo:
   - [Link para o projeto na Vercel](#) *(temporariamente indisponível)*

1.2 O site será aberto no seu navegador (Google Chrome, Edge, etc).

## ALTERNATIVA 2: Rodar o Projeto Localmente no Seu Computador

### Requisitos

- Ter o Python 3 instalado: [https://www.python.org/downloads/](https://www.python.org/downloads/)
- Ter uma IDE compatível com Python instalada (por exemplo, Visual Studio Code: [https://code.visualstudio.com/](https://code.visualstudio.com/))

### Passo a Passo

1. Abra o terminal ou prompt de comando no seu computador.

2. Clone o repositório com o comando:

   ```bash
   git clone https://github.com/tads-cnat/Bem-te-Ouvi.git
   ```

3. Acesse a pasta do projeto:

   **Windows:**
   ```powershell
   cd Bem-te-Ouvi
   cd mysite
   ```

   **Linux:**
   ```bash
   cd ~/Documents/Bem-te-Ouvi/mysite
   ```

4. Instale o Django (caso não tenha instalado):

   ```bash
   pip install django
   ```

5. Rode o servidor localmente:

   **Windows:**
   ```powershell
   python manage.py runserver
   ```

   **Linux:**
   ```bash
   python manage.py runserver
   ```

6. Acesse no navegador:

   ```
   http://127.0.0.1:8000/

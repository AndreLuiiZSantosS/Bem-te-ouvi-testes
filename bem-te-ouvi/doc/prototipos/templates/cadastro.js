document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".form1");
  const passwordInput = document.getElementById("password");
  const submitButton = document.querySelector(".submit-button");
  const submitButton2 = document.querySelector(".submit-button2");
  const submitButton3 = document.querySelector(".submit-button3");
  const publicar = document.querySelector(".publish");
  const ouvir = document.querySelector(".hear");
  const cpf = document.getElementById("cpf");
  const pix = document.getElementById("pix");
  const email = document.getElementById("email");
  const ancora1 = document.querySelector(".container1");
  const ancora2 = document.querySelector(".container2");
  const ancora3 = document.querySelector(".container3");
  const formulario1 = document.querySelector(".container-form1");
  const formulario2 = document.querySelector(".container-form2");
  const formulario3 = document.querySelector(".container-form3");
  const nomeEntrar = document.querySelector(".enter-name");
  const migalha = document.querySelector(".progress-bar");
  const nome = document.getElementById("name");
  const niver = document.getElementById("birth");

  // Critérios de validação
    const criteria = {
      letter: {
        test: value => /[a-zA-Z]/.test(value)
      },
      characters: {
        test: value => value.length >= 10
      },
      special: {
        test: value => /[\d\W_]/.test(value)
      }
    };
  
    // Verifica se a senha é válida
    function isPasswordValid(value) {
      return Object.values(criteria).every(({ test }) => test(value));
    }
  
    // Atualiza visuais e botão
    function validatePassword(value) {
      // Atualiza visual dos critérios
      Object.entries(criteria).forEach(([id, { test }]) => {
        const li = document.getElementById(id);
        const ball = li.querySelector(".ball");
        const text = li.querySelector(".color-text");
  
        if (test(value)) {
          ball.classList.add("ok");
          text.classList.add("ok");
        } else {
          ball.classList.remove("ok");
          text.classList.remove("ok");
        }
      });
  
      // Fora do forEach: ativa/desativa botão
      if (isPasswordValid(value) && email.checkValidity()) {
        submitButton.disabled = false;
        submitButton.classList.remove("disabled");
      } else {
        submitButton.disabled = true;
        submitButton.classList.add("disabled");
      }
    }

    publicar.addEventListener("click", function () {
      document.getElementById("input-container-publish").style.display = "block";
      cpf.required = true;
      pix.required = true;
    });

    ouvir.addEventListener("click", function(){
      document.getElementById("input-container-publish").style.display = "none";
      pix.required = false;
      cpf.required = false;
    });

    // Escuta digitação no input de senha
    passwordInput.addEventListener("input", function () {
      validatePassword(passwordInput.value);
    });

    email.addEventListener("input", function () {
      validatePassword(passwordInput.value);
    });

    form.addEventListener("submit", function (event) {
        if (!isPasswordValid(passwordInput.value)) {
            event.preventDefault(); //impede o envio do formulário
        }
    });



    function verifica(){
      if(nome.checkValidity() && niver.checkValidity()){
        submitButton2.disabled = false;
        submitButton2.classList.remove("disabled");
      } else{
        submitButton2.disabled = true;
        submitButton2.classList.add("disabled");
      }
    };



    document.getElementById("back-step2").addEventListener("click", function(event) {
      event.preventDefault(); // evita navegação padrão

      ancora2.classList.remove("disable");
      ancora2.classList.add("active");

      formulario2.classList.remove("disable");
      formulario2.classList.add("active");

      // Remove "disable" e adiciona "active" no segundo container e formulário
      ancora3.classList.remove("active");
      ancora3.classList.add("disable");

      formulario3.classList.remove("active");
      formulario3.classList.add("disable");

      nomeEntrar.style.visibility = "hidden";

      migalha.style.width = "66.66%";
    });

    document.getElementById("back-step1").addEventListener("click", function(event) {
      event.preventDefault(); // evita navegação padrão

      ancora1.classList.remove("disable");
      ancora1.classList.add("active");

      formulario1.classList.remove("disable");
      formulario1.classList.add("active");

      // Remove "disable" e adiciona "active" no segundo container e formulário
      ancora2.classList.remove("active");
      ancora2.classList.add("disable");

      formulario2.classList.remove("active");
      formulario2.classList.add("disable");

      nomeEntrar.style.visibility = "Visible";

      migalha.style.width = "33.33%";
    });







    // ETAPA 3
    submitButton2.addEventListener("click", function (event) {
      event.preventDefault();

      // Remove "active" e adiciona "disable" no segundo container e formulário
      ancora2.classList.remove("active");
      ancora2.classList.add("disable");

      formulario2.classList.remove("active");
      formulario2.classList.add("disable");

      // Remove "disable" e adiciona "active" no terceiro container e formulário
      ancora3.classList.remove("disable");
      ancora3.classList.add("active");

      formulario3.classList.remove("disable");
      formulario3.classList.add("active");

      nomeEntrar.style.visibility = "hidden";

      migalha.style.width = "100%";
    });



    nome.addEventListener("input", verifica);
    niver.addEventListener("input", verifica);



    // ETAPA 1
    submitButton.addEventListener("click", function (event) {
      event.preventDefault();

      // Remove "active" e adiciona "disable" no primeiro container e formulário
      ancora1.classList.remove("active");
      ancora1.classList.add("disable");

      formulario1.classList.remove("active");
      formulario1.classList.add("disable");

      // Remove "disable" e adiciona "active" no segundo container e formulário
      ancora2.classList.remove("disable");
      ancora2.classList.add("active");

      formulario2.classList.remove("disable");
      formulario2.classList.add("active");

      nomeEntrar.style.visibility = "hidden";

      migalha.style.width = "66.66%";
    });
  


    submitButton3.addEventListener("click", function (event) {
      event.preventDefault(); // Impede o envio padrão do formulário
      setTimeout(function() {
          window.location.href = 'principal.html'; // Substitua pela URL de perfil desejada
      }, 1000);
    });





    // Estado inicial do botão
    submitButton.disabled = true;
    submitButton.classList.add("disabled");
    submitButton2.disabled = true;
    submitButton2.classList.add("disabled");
  });
  

from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from django.core.exceptions import ValidationError
from .models import Ouvinte, Musico, Musica, Playlist
from .services import validar_cpf

class OuvinteForm(UserCreationForm):
    email = forms.EmailField(required=True)
    foto_perfil = forms.ImageField(required=False)

    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']

    def save(self, commit=True):
        user = super().save(commit=commit)
        if commit:
            Ouvinte.objects.create(user=user, foto_perfil=self.cleaned_data.get('foto_perfil'))
        return user

class MusicoForm(UserCreationForm):
    email = forms.EmailField(required=True)
    cpf = forms.CharField(max_length=14)
    chave_pix = forms.CharField(max_length=100, required=False)

    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']

    def save(self, commit=True):
        user = super().save(commit=commit)
        if commit:
            Musico.objects.create(
                user=user,
                cpf=self.cleaned_data.get('cpf'),
                chave_pix=self.cleaned_data.get('chave_pix')
            )
        return user
    

    def clean_cpf(self):
        cpf = self.cleaned_data.get('cpf')
        cpf = validar_cpf(cpf)  # já retorna limpo
        if Musico.objects.filter(cpf=cpf).exists():
            raise ValidationError("Este CPF já está cadastrado.")
        return cpf

class EditarPerfilOuvinteForm(forms.ModelForm):
    nome = forms.CharField(max_length=150, required=False) 
    email = forms.EmailField(required=False)      

    class Meta:
        model = Ouvinte
        fields = ['foto_perfil']

    def __init__(self, *args, **kwargs):
        self.user = kwargs.pop('user')  # Recebe o user aqui
        super().__init__(*args, **kwargs)
        self.fields['nome'].initial = self.user.first_name
        self.fields['email'].initial = self.user.email

    def save(self, commit=True):
        ouvinte = super().save(commit=False)
        nome = self.cleaned_data['nome']
        email = self.cleaned_data['email']

        # Atualiza username e email do user
        if self.user.username != nome:
            # Valida se o nome de usuário já existe
            if User.objects.filter(username=nome).exclude(pk=self.user.pk).exists():
                raise forms.ValidationError("Este nome de usuário já está em uso.")
            self.user.username = nome

        self.user.email = email

        if commit:
            self.user.save()
            ouvinte.save()

        return ouvinte


class EditarPerfilMusicoForm(forms.ModelForm):
    email = forms.EmailField(required=False)
    nome = forms.CharField(max_length=100, required=False)

    class Meta:
        model = Musico
        fields = ['foto_perfil', 'chave_pix']

    def __init__(self, *args, **kwargs):
        self.user = kwargs.pop('user', None)
        super().__init__(*args, **kwargs)
        if self.user:
            self.fields['email'].initial = self.user.email
            self.fields['nome'].initial = self.user.first_name

    def save(self, commit=True):
        musico = super().save(commit=False)
        nome = self.cleaned_data.get('nome')
        email = self.cleaned_data.get('email')

        if self.user:
            # Atualiza username e email
            if self.user.username != nome:
                from django.contrib.auth.models import User
                # Valida se o nome de usuário já existe
                if User.objects.filter(username=nome).exclude(pk=self.user.pk).exists():
                    raise forms.ValidationError("Este nome de usuário já está em uso.")
                self.user.username = nome

            self.user.first_name = nome
            self.user.email = email

            if commit:
                self.user.save()
                musico.user = self.user

        if commit:
            musico.save()

        return musico

class PlaylistForm(forms.ModelForm):
    musicas = forms.ModelMultipleChoiceField(
        queryset=Musica.objects.all(),
        widget=forms.CheckboxSelectMultiple
    )

    class Meta:
        model = Playlist
        fields = ['nome', 'musicas', 'capa']


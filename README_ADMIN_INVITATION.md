# Documentação da página administrativa de convites

## Objetivo

Criar uma página administrativa para gerar links dinâmicos de confirmação de presença, usando o mesmo formulário da página de confirmação do convidado para facilitar o envio dos convites.

## Como deve funcionar

### 1. Página administrativa
A página administrativa deve permitir que o usuário:
- informe o nome do convidado (opcional);
- informe o telefone;
- defina a quantidade de adultos;
- defina a quantidade de crianças;
- gere um link de confirmação com os parâmetros necessários.

### 2. Link dinâmico
O link gerado deve incluir parâmetros na URL, por exemplo:

/confirmation?event_id=casamento&adult=2&children=1

Esses parâmetros servem para controlar o comportamento da página de confirmação, já que a quantidade de pessoas deve ser definida pelo administrador e não escolhida pelo convidado.

### 3. Reaproveitamento do formulário
A página administrativa deve usar o mesmo formulário da página GuestConfirmation para manter a experiência consistente.

Ou seja:
- o formulário de confirmação já existe;
- a página administrativa pode reutilizar a mesma estrutura visual e os mesmos campos;
- o usuário preenche os dados uma vez e gera o convite com o mesmo fluxo.

### 4. Bloqueio da seleção de quantidade
Na página de confirmação, quando o link vier com parâmetros como:
- adult=1
- children=0

os selects de quantidade devem ficar desabilitados para impedir que o convidado altere esses valores manualmente.

### 5. Envio para o WhatsApp
Ao clicar em "Enviar pro WhatsApp", o sistema deve abrir o aplicativo com uma mensagem pré-definida, como:

Olá [nome]! Você foi convidado para o nosso casamento. Confirme sua presença no link: [link]

### 6. Login controlado
Para evitar uso indevido, a página administrativa deve ter uma tela de login simples, com:
- e-mail;
- senha;
- validação básica.

## Passo a passo da implementação

1. Criar uma nova rota para a página administrativa.
2. Criar a tela de login.
3. Reaproveitar o formulário da página GuestConfirmation.
4. Adicionar um botão para gerar o link dinâmico.
5. Adicionar um botão para enviar o convite pelo WhatsApp.
6. Montar a URL com os parâmetros adult e children.
7. Fazer a página de confirmação ler esses parâmetros e bloquear a alteração manual.

## Estrutura sugerida

- Página administrativa: /admin-invitation
- Página de confirmação: /confirmation
- Fluxo:
  1. login
  2. preencher formulário
  3. gerar link
  4. abrir WhatsApp com a mensagem pré-definida

## Observações importantes

- A página administrativa deve ser simples e rápida de usar.
- O formulário deve parecer igual ao da confirmação para facilitar o uso.
- O controle das quantidades deve acontecer via URL, não via escolha do usuário.
- O texto do WhatsApp pode ser ajustado depois, mas a estrutura já deve estar pronta.

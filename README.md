<div align="center">

<img src="https://fiap-achievements.vercel.app/api/badge?badge=294870&theme=dark" width="110"/>
<br/>
<br/>
<img src="./public/assets/svg/logo.svg" />
<br/>

---

<p>Um serviço de emblemas rápido e personalizável para conquistas em cursos da FIAP.<br/> Incorpore em qualquer lugar, gratuitamente.</p>

<p>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/licença-MIT-000000?style=flat-square" alt="MIT License" /></a>
  <a href="https://vercel.com"><img src="https://img.shields.io/badge/deploy-Vercel-000000?style=flat-square&logo=vercel" alt="Vercel" /></a>
  <a><img src="https://img.shields.io/badge/VERSÃO-1.0.9-000000?style=flat-square" alt="Versão" /></a>
  <img src="https://img.shields.io/badge/SVG-CDN--cached-000000?style=flat-square" alt="SVG cached" />
</p>

<p>
  <a href="#-catálogo-de-badges"><strong>Ver Badges</strong></a>
  &nbsp;·&nbsp;
  <a href="https://github.com/leoosilvp/fiap-achievements/issues"><strong>Reportar Bug</strong></a>
  &nbsp;·&nbsp;
  <a href="https://github.com/leoosilvp/fiap-achievements/issues"><strong>Solicitar Badge</strong></a>
</p>

</div>

---

## 📖 Sobre o Projeto

O **FIAP Achievements** é um serviço open-source que permite que estudantes exibam suas conquistas de cursos FIAP diretamente no GitHub, portfólios e qualquer lugar que renderize imagens HTML.

Cada badge é um **SVG nítido**, servido por API com cache CDN de 1 ano, disponível em três temas de cor. Nenhuma chave de API. Nenhum cadastro. Apenas uma `<img>`.

```
https://fiap-achievements.vercel.app/api/badge?badge=294870&theme=dark
```

<br/>

---

## 🚀 Início Rápido

Cole o trecho abaixo no seu README ou portfólio e substitua `SEU_BADGE_ID` pelo ID desejado:

```html
<img src="https://fiap-achievements.vercel.app/api/badge?badge=SEU_BADGE_ID&theme=light" width="100" />
```

> **Onde encontrar o ID?** Consulte o [Catálogo de Badges](#-catálogo-de-badges) abaixo.

**Página de pré-visualização:**

```
https://fiap-achievements.vercel.app/badge?badge=SEU_BADGE_ID&theme=dark&size=100
```

<br/>

---

## 📡 Referência da API

### `GET /api/badge`

Retorna a imagem SVG da badge.

| Parâmetro | Tipo     | Padrão  | Descrição                                          |
|-----------|----------|---------|----------------------------------------------------|
| `badge`   | `string` | `404`   | ID da badge (numérico, ex.: `294870`)              |
| `theme`   | `string` | `light` | Tema visual: `light`, `dark` ou `black`            |

**Cabeçalhos da resposta:**

```
Content-Type: image/svg+xml
Cache-Control: public, immutable, max-age=31536000
```

Badges ficam em cache por **1 ano** na CDN — carregam instantaneamente em qualquer lugar.

**Comportamento de fallback:**

Se o `badge` solicitado não existir, a API retorna a badge `404` em vez de um erro. Sua página nunca quebra.

---

### `GET /badge`

Página de pré-visualização renderizável no navegador. Aceita os mesmos parâmetros da API, com um adicional:

| Parâmetro | Tipo     | Padrão  | Descrição                                     |
|-----------|----------|---------|-----------------------------------------------|
| `size`    | `number` | `150`   | Tamanho renderizado em pixels (mínimo: `32`)  |

<br/>

---

## 🎨 Temas

Três temas disponíveis. Escolha o que melhor combina com o fundo do seu perfil.

| Tema    | Valor do parâmetro | Ideal para                              |
|---------|--------------------|-----------------------------------------|
| Light   | `light`            | READMEs e portfólios com fundo claro    |
| Dark    | `dark`             | READMEs e perfis com fundo escuro       |
| Black   | `black`            | Fundos OLED / preto total               |

**Exemplo — mesma badge nos três temas:**

```html
<!-- Light -->
<img src="https://fiap-achievements.vercel.app/api/badge?badge=294870&theme=light" width="150" />

<!-- Dark -->
<img src="https://fiap-achievements.vercel.app/api/badge?badge=294870&theme=dark" width="150" />

<!-- Black -->
<img src="https://fiap-achievements.vercel.app/api/badge?badge=294870&theme=black" width="150" />
```

<br/>

---

## 🏅 Catálogo de Badges

Todas as badges estão disponíveis nos três temas. A coluna de pré-visualização exibe a variante `light`.

> **Dica:** clique com o botão direito em qualquer badge → _Copiar endereço da imagem_ para obter a URL diretamente.

| Pré-visualização | ID da Badge | Temas disponíveis |
|:---:|:---:|:---:|
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=108275&theme=light" width="150" /> | `108275` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=128573&theme=light" width="150" /> | `128573` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=140892&theme=light" width="150" /> | `140892` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=145807&theme=light" width="150" /> | `145807` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=146952&theme=light" width="150" /> | `146952` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=149382&theme=light" width="150" /> | `149382` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=150738&theme=light" width="150" /> | `150738` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=158904&theme=light" width="150" /> | `158904` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=162483&theme=light" width="150" /> | `162483` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=179458&theme=light" width="150" /> | `179458` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=193674&theme=light" width="150" /> | `193674` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=193820&theme=light" width="150" /> | `193820` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=195438&theme=light" width="150" /> | `195438` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=214690&theme=light" width="150" /> | `214690` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=218574&theme=light" width="150" /> | `218574` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=248960&theme=light" width="150" /> | `248960` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=249537&theme=light" width="150" /> | `249537` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=251907&theme=light" width="150" /> | `251907` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=257108&theme=light" width="150" /> | `257108` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=261840&theme=light" width="150" /> | `261840` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=276841&theme=light" width="150" /> | `276841` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=281496&theme=light" width="150" /> | `281496` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=284169&theme=light" width="150" /> | `284169` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=284705&theme=light" width="150" /> | `284705` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=294870&theme=light" width="150" /> | `294870` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=314785&theme=light" width="150" /> | `314785` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=320654&theme=light" width="150" /> | `320654` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=325740&theme=light" width="150" /> | `325740` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=348275&theme=light" width="150" /> | `348275` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=367981&theme=light" width="150" /> | `367981` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=370618&theme=light" width="150" /> | `370618` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=374692&theme=light" width="150" /> | `374692` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=386429&theme=light" width="150" /> | `386429` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=390715&theme=light" width="150" /> | `390715` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=410593&theme=light" width="150" /> | `410593` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=431597&theme=light" width="150" /> | `431597` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=432981&theme=light" width="150" /> | `432981` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=458721&theme=light" width="150" /> | `458721` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=468250&theme=light" width="150" /> | `468250` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=469128&theme=light" width="150" /> | `469128` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=470315&theme=light" width="150" /> | `470315` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=482731&theme=light" width="150" /> | `482731` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=492673&theme=light" width="150" /> | `492673` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=495183&theme=light" width="150" /> | `495183` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=503194&theme=light" width="150" /> | `503194` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=507934&theme=light" width="150" /> | `507934` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=517862&theme=light" width="150" /> | `517862` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=537186&theme=light" width="150" /> | `537186` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=540126&theme=light" width="150" /> | `540126` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=561239&theme=light" width="150" /> | `561239` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=573846&theme=light" width="150" /> | `573846` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=605219&theme=light" width="150" /> | `605219` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=627840&theme=light" width="150" /> | `627840` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=631728&theme=light" width="150" /> | `631728` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=640281&theme=light" width="150" /> | `640281` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=645372&theme=light" width="150" /> | `645372` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=670821&theme=light" width="150" /> | `670821` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=675431&theme=light" width="150" /> | `675431` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=682491&theme=light" width="150" /> | `682491` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=684325&theme=light" width="150" /> | `684325` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=692314&theme=light" width="150" /> | `692314` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=697314&theme=light" width="150" /> | `697314` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=703951&theme=light" width="150" /> | `703951` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=714608&theme=light" width="150" /> | `714608` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=721963&theme=light" width="150" /> | `721963` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=735018&theme=light" width="150" /> | `735018` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=736418&theme=light" width="150" /> | `736418` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=748350&theme=light" width="150" /> | `748350` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=752906&theme=light" width="150" /> | `752906` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=758230&theme=light" width="150" /> | `758230` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=761905&theme=light" width="150" /> | `761905` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=781293&theme=light" width="150" /> | `781293` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=785063&theme=light" width="150" /> | `785063` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=793412&theme=light" width="150" /> | `793412` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=798451&theme=light" width="150" /> | `798451` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=810254&theme=light" width="150" /> | `810254` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=812064&theme=light" width="150" /> | `812064` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=820547&theme=light" width="150" /> | `820547` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=829145&theme=light" width="150" /> | `829145` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=830617&theme=light" width="150" /> | `830617` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=849216&theme=light" width="150" /> | `849216` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=856024&theme=light" width="150" /> | `856024` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=860192&theme=light" width="150" /> | `860192` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=860741&theme=light" width="150" /> | `860741` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=861429&theme=light" width="150" /> | `861429` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=862174&theme=light" width="150" /> | `862174` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=864195&theme=light" width="150" /> | `864195` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=903715&theme=light" width="150" /> | `903715` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=907158&theme=light" width="150" /> | `907158` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=907326&theme=light" width="150" /> | `907326` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=913674&theme=light" width="150" /> | `913674` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=914502&theme=light" width="150" /> | `914502` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=915204&theme=light" width="150" /> | `915204` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=918357&theme=light" width="150" /> | `918357` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=924560&theme=light" width="150" /> | `924560` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=925781&theme=light" width="150" /> | `925781` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=928143&theme=light" width="150" /> | `928143` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=934705&theme=light" width="150" /> | `934705` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=986241&theme=light" width="150" /> | `986241` | `light` · `dark` · `black` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=294870&theme=light" width="150" /> | `294870` | `light` · `dark` · `black` |

<br/>

---

## 💡 Exemplos de Uso

### Exibir uma fileira de badges no README

```html
<div align="center">
  <img src="https://fiap-achievements.vercel.app/api/badge?badge=294870&theme=dark" width="100" />
  <img src="https://fiap-achievements.vercel.app/api/badge?badge=864195&theme=dark" width="100" />
  <img src="https://fiap-achievements.vercel.app/api/badge?badge=928143&theme=dark" width="100" />
</div>
```

<div align="center">
  <img src="https://fiap-achievements.vercel.app/api/badge?badge=294870&theme=dark" width="100" />
  <img src="https://fiap-achievements.vercel.app/api/badge?badge=864195&theme=dark" width="100" />
  <img src="https://fiap-achievements.vercel.app/api/badge?badge=928143&theme=dark" width="100" />
</div>


### Exibir com espaçamento preciso em portfólio

```html
<div style="display: flex; gap: 16px; flex-wrap: wrap; justify-content: center;">
  <img src="https://fiap-achievements.vercel.app/api/badge?badge=294870&theme=light" width="100" />
  <img src="https://fiap-achievements.vercel.app/api/badge?badge=864195&theme=light" width="100" />
  <img src="https://fiap-achievements.vercel.app/api/badge?badge=928143&theme=light" width="100" />
</div>
```

### Adicionar uma badge em site pessoal

```html
<img
  src="https://fiap-achievements.vercel.app/api/badge?badge=294870&theme=black"
  alt="FIAP Achievement 294870"
  width="100"
  loading="lazy"
/>
```

<br/>

---

## 🏗️ Arquitetura

```
fiap-achievements/
├── api/
│   └── badge.js          # Serverless function (Vercel) — serve os SVGs
├── public/
│   └── assets/
│       └── svg/
│           ├── light/    # Badges no tema claro
│           ├── dark/     # Badges no tema escuro
│           └── black/    # Badges no tema preto
├── src/
│   ├── routes/
│   │   ├── Home.jsx      # Página inicial
│   │   └── Badge.jsx     # Renderizador de pré-visualização
│   ├── css/
│   │   ├── index.css
│   │   └── badge.css
│   ├── App.jsx
│   └── main.jsx
├── vercel.json           # Roteamento, cache e clean URLs
└── vite.config.js
```

**Fluxo da API:**

1. Requisição chega em `GET /api/badge?badge=294870&theme=dark`
2. A função sanitiza os parâmetros — remove tudo fora de `[a-z0-9\-_]`
3. Resolve o caminho `public/assets/svg/{theme}/{badge}.svg`
4. Se o arquivo existe, retorna o SVG com cache de 1 ano
5. Se não existe, faz fallback silencioso para `public/assets/svg/light/404.svg`

**Fluxo da página de pré-visualização:**

O componente React lê `badge`, `theme` e `size` dos query params, monta a URL da API e renderiza uma `<img>`. A rota `/badge` é reescrita para `/` pelo Vercel, e o React Router assume.

<br/>

---

## ⚙️ Rodando Localmente

**Pré-requisitos:** Node.js ≥ 18, npm

```bash
# 1. Clone o repositório
git clone https://github.com/leoosilvp/fiap-achievements.git
cd fiap-achievements

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

Acesse em `http://localhost:5173`.

> **Atenção:** o endpoint `/api/badge` requer o runtime da Vercel para funcionar localmente. Use a [Vercel CLI](https://vercel.com/docs/cli) para suporte completo à serverless function.

```bash
# Instale a Vercel CLI globalmente (uma única vez)
npm i -g vercel

# Execute com suporte à API serverless
vercel dev
```

<br/>

---

## 🤝 Contribuindo

Contribuições são bem-vindas e ajudam a expandir o catálogo da comunidade FIAP Achievements.

### Adicionando novas badges

Para manter a organização e compatibilidade do projeto:

1. Adicione os arquivos SVG nas pastas correspondentes:
   ```txt
   public/assets/svg/light/
   public/assets/svg/dark/
   public/assets/svg/black/
   ```

2. Utilize o mesmo ID para todos os temas:
   ```txt
   123456.svg
   ```

3. Certifique-se de que:
   - os arquivos estejam otimizados
   - o SVG esteja funcionando corretamente
   - o ID não esteja duplicado dentro do mesmo tema
   - os três temas estejam presentes (`light`, `dark` e `black`)

4. Atualize o catálogo de badges no README, quando necessário.

5. Abra um Pull Request seguindo o template do projeto.

---

### Issues e sugestões

Encontrou um problema ou deseja sugerir melhorias?

Abra uma issue com:
- descrição clara
- contexto do problema
- imagens ou exemplos (quando aplicável)
- passos para reprodução

Issues bem documentadas aceleram a análise e revisão.

---

### Ambiente de desenvolvimento

```bash
# Instalar dependências
npm install

# Ambiente local
npm run dev

# Lint
npm run lint

# Build de produção
npm run build

# Preview local do build
npm run preview
```

---

### Padrões do projeto

- Estrutura baseada em IDs únicos
- SVGs organizados por tema
- Compatibilidade com GitHub README
- Assets otimizados para performance
- Pull Requests obrigatórios para alterações na branch principal


<br/>

---

## 🔒 Segurança

Todos os parâmetros fornecidos pelo usuário são sanitizados antes de serem usados na resolução de caminhos de arquivo — qualquer caractere fora de `[a-z0-9\-_]` é removido. A API nunca realiza traversal de diretório, executa input do usuário ou retorna dados de fora do diretório `public/assets/svg/`.

<br/>

---

## 📄 Licença

Distribuído sob a [Licença MIT](./LICENSE). Você tem liberdade para usar, copiar, modificar, mesclar, publicar e distribuir este software. Consulte o arquivo `LICENSE` para o texto completo.

<br/>

---

<div align="center">

Lets Rock The Future

</div>
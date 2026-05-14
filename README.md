<p align="center">
  <img src="./public/assets/svg/logo.svg"/>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <img src="https://fiap-achievements.vercel.app/api/badge?badge=294870&theme=dark" width="100"/>
</p>

<br/>

<div align='center'>

<p>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/licença-MIT-000000?style=flat-square" alt="MIT License" /></a>
  <a href="https://vercel.com"><img src="https://img.shields.io/badge/deploy-Vercel-000000?style=flat-square&logo=vercel" alt="Vercel" /></a>
  <a><img src="https://img.shields.io/badge/VERSÃO-2.0.1-000000?style=flat-square" alt="Versão" /></a>
  <img src="https://img.shields.io/badge/SVG-CDN--cached-000000?style=flat-square" alt="SVG cached" />
</p>

<p>
  <a href="https://fiap-achievements.vercel.app/home"><strong>Site</strong></a>
  &nbsp;·&nbsp;
  <a href="https://fiap-achievements.vercel.app/catalog"><strong>Catálogo</strong></a>
  &nbsp;·&nbsp;
  <a href="#-início-rápido"><strong>Início Rápido</strong></a>
  &nbsp;·&nbsp;
  <a href="#-referência-da-api"><strong>API</strong></a>
  &nbsp;·&nbsp;
  <a href="https://github.com/leoosilvp/fiap-achievements/issues"><strong>Reportar Bug</strong></a>
  &nbsp;·&nbsp;
  <a href="https://github.com/leoosilvp/fiap-achievements/issues"><strong>Solicitar Badge</strong></a>
</p>

</div>

---

**FIAP Achievements** é um serviço open-source que permite que estudantes exibam suas conquistas da FIAP — Nano Courses, Challenges e Global Solutions — diretamente no GitHub, portfólios e qualquer lugar que renderize imagens HTML.

Cada badge é um **SVG nítido**, servido por API com cache CDN de 1 ano, disponível em três temas de cor. Nenhuma chave de API. Nenhum cadastro. Apenas uma `<img>`.

---

## Índice

- [🌐 Site e Catálogo](#-site-e-catálogo)
- [🚀 Início Rápido](#-início-rápido)
- [📡 Referência da API](#-referência-da-api)
  - [Parâmetros](#parâmetros)
  - [Tipos de Badge](#tipos-de-badge)
  - [Temas](#-temas)
  - [Cabeçalhos de Resposta](#cabeçalhos-de-resposta)
- [🏅 Catálogo de Badges](#-catálogo-de-badges)
  - [Nano Courses](#-nano-courses)
  - [Challenge](#-challenge)
  - [Global Solution](#-global-solution)
- [💡 Exemplos de Uso](#-exemplos-de-uso)
- [🏗️ Arquitetura](#️-arquitetura)
- [⚙️ Rodando Localmente](#️-rodando-localmente)
- [🤝 Contribuindo](#-contribuindo)
- [🔒 Segurança](#-segurança)
- [📄 Licença](#-licença)

---

## 🌐 Site e Catálogo

A forma mais fácil de encontrar suas badges é pelo site — sem precisar decorar IDs ou slugs.

| Página | URL | O que você encontra |
|--------|-----|---------------------|
| **Home** | [fiap-achievements.vercel.app/home](https://fiap-achievements.vercel.app/home) | Visão geral do projeto e como usar |
| **Catálogo** | [fiap-achievements.vercel.app/catalog](https://fiap-achievements.vercel.app/catalog) | Todas as badges com busca e filtros por categoria |


> No catálogo você encontra os IDs dos Nano Courses e os slugs de Challenge e Global Solution que precisa para montar sua URL.

---

## 🚀 Início Rápido

### Nano Course (padrão)

Cole o ID diretamente no parâmetro `badge`:

```html
<img src="https://fiap-achievements.vercel.app/api/badge?badge=SEU_ID&theme=dark" width="100" />
```

### Challenge

```html
<img src="https://fiap-achievements.vercel.app/api/badge?badge=challenge&year=2025&company=EMPRESA&ranking=1&theme=dark" width="100" />
```

### Global Solution

```html
<img src="https://fiap-achievements.vercel.app/api/badge?badge=gs&year=2025&topic=TOPICO&theme=dark" width="100" />
```

> **Onde encontrar os valores?** Acesse o [Catálogo](https://fiap-achievements.vercel.app/catalog) ou consulte o [Catálogo de Badges](#-catálogo-de-badges) abaixo.

**Pré-visualização de qualquer badge:**

```
https://fiap-achievements.vercel.app/badge?badge=SEU_ID&theme=dark
```

---

## 📡 Referência da API

### `GET /api/badge`

Retorna a imagem SVG da badge solicitada. **Sempre retorna `HTTP 200` com `Content-Type: image/svg+xml`** — em caso de erro, serve um SVG de erro temático. A tag `<img>` nunca quebra.

---

### Parâmetros

| Parâmetro | Tipo | Obrigatório | Padrão | Descrição |
|-----------|------|:-----------:|--------|-----------|
| `badge` | `string` | ✅ | — | ID numérico do Nano Course **ou** tipo: `challenge`, `gs` |
| `theme` | `string` | ❌ | `dark` | Tema visual: `light`, `dark` ou `black` |
| `year` | `number` | ✅ challenge / gs | — | Ano da edição (ex: `2025`) |
| `company` | `string` | ✅ challenge | — | Slug da empresa parceira (ex: `jovi`) |
| `topic` | `string` | ✅ gs | — | Slug do tema da G.S (ex: `future-of-work`) |
| `ranking` | `number` | ❌ challenge | `1` | Posição: `1`, `2` ou `3` |

---

### Tipos de Badge

| Tipo | `badge=` | Parâmetros obrigatórios | Exemplo |
|------|----------|------------------------|---------|
| Nano Course | ID numérico | — | `https://fiap-achievements.vercel.app/api/badge?badge=294870&theme=dark` |
| Challenge | `challenge` | `year`, `company` | `https://fiap-achievements.vercel.app/api/badge?badge=challenge&year=2025&company=jovi&ranking=1` |
| Global Solution | `gs` | `year`, `topic` | `https://fiap-achievements.vercel.app/api/badge?badge=gs&year=2025&topic=future-of-work` |

---

### 🎨 Temas

Três temas disponíveis. Escolha o que melhor combina com o fundo do seu perfil.

| Tema | Parâmetro | Ideal para |
|------|-----------|------------|
| Light | `light` | READMEs e portfólios com fundo claro |
| Dark | `dark` | READMEs e perfis com fundo escuro |
| Black | `black` | Fundos OLED / preto total |

<img src="https://fiap-achievements.vercel.app/api/badge?badge=294870&theme=light" width="100" />&nbsp;&nbsp;<img src="https://fiap-achievements.vercel.app/api/badge?badge=294870&theme=dark" width="100" />&nbsp;&nbsp;<img src="https://fiap-achievements.vercel.app/api/badge?badge=294870&theme=black" width="100" />

---

### Cabeçalhos de Resposta

| Cabeçalho | Badge encontrada | Fallback / Erro |
|-----------|-----------------|-----------------|
| `Content-Type` | `image/svg+xml` | `image/svg+xml` |
| `Cache-Control` | `public, immutable, max-age=31536000` | `public, max-age=60` |
| `X-Badge-Status` | `ok` | `not-found` · `bad-request` · `internal-error` |

Badges ficam em cache por **1 ano** na CDN — carregam instantaneamente em qualquer lugar.

---

## 🏅 Catálogo de Badges

> 💡 **Dica:** prefira navegar pelo [catálogo interativo](https://fiap-achievements.vercel.app/catalog) — ele tem busca, filtros e preview em tempo real.

Todas as badges estão disponíveis nos três temas. As pré-visualizações abaixo exibem a variante `light`.

---

<details>
<summary><h3>📘 Nano Courses</h3></summary>

Busque pelo ID numérico do curso diretamente no parâmetro `badge`:

```
https://fiap-achievements.vercel.app/api/badge?badge=SEU_ID&theme=dark
```

| Pré-visualização | ID | Copiar URL |
|:---:|:---:|:---|
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=108275&theme=light" width="120" /> | `108275` | `https://fiap-achievements.vercel.app/api/badge?badge=108275&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=128573&theme=light" width="120" /> | `128573` | `https://fiap-achievements.vercel.app/api/badge?badge=128573&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=140892&theme=light" width="120" /> | `140892` | `https://fiap-achievements.vercel.app/api/badge?badge=140892&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=145807&theme=light" width="120" /> | `145807` | `https://fiap-achievements.vercel.app/api/badge?badge=145807&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=146952&theme=light" width="120" /> | `146952` | `https://fiap-achievements.vercel.app/api/badge?badge=146952&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=149382&theme=light" width="120" /> | `149382` | `https://fiap-achievements.vercel.app/api/badge?badge=149382&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=150738&theme=light" width="120" /> | `150738` | `https://fiap-achievements.vercel.app/api/badge?badge=150738&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=158904&theme=light" width="120" /> | `158904` | `https://fiap-achievements.vercel.app/api/badge?badge=158904&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=162483&theme=light" width="120" /> | `162483` | `https://fiap-achievements.vercel.app/api/badge?badge=162483&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=179458&theme=light" width="120" /> | `179458` | `https://fiap-achievements.vercel.app/api/badge?badge=179458&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=193674&theme=light" width="120" /> | `193674` | `https://fiap-achievements.vercel.app/api/badge?badge=193674&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=193820&theme=light" width="120" /> | `193820` | `https://fiap-achievements.vercel.app/api/badge?badge=193820&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=195438&theme=light" width="120" /> | `195438` | `https://fiap-achievements.vercel.app/api/badge?badge=195438&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=214690&theme=light" width="120" /> | `214690` | `https://fiap-achievements.vercel.app/api/badge?badge=214690&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=218574&theme=light" width="120" /> | `218574` | `https://fiap-achievements.vercel.app/api/badge?badge=218574&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=248960&theme=light" width="120" /> | `248960` | `https://fiap-achievements.vercel.app/api/badge?badge=248960&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=249537&theme=light" width="120" /> | `249537` | `https://fiap-achievements.vercel.app/api/badge?badge=249537&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=251907&theme=light" width="120" /> | `251907` | `https://fiap-achievements.vercel.app/api/badge?badge=251907&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=257108&theme=light" width="120" /> | `257108` | `https://fiap-achievements.vercel.app/api/badge?badge=257108&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=261840&theme=light" width="120" /> | `261840` | `https://fiap-achievements.vercel.app/api/badge?badge=261840&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=276841&theme=light" width="120" /> | `276841` | `https://fiap-achievements.vercel.app/api/badge?badge=276841&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=281496&theme=light" width="120" /> | `281496` | `https://fiap-achievements.vercel.app/api/badge?badge=281496&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=284169&theme=light" width="120" /> | `284169` | `https://fiap-achievements.vercel.app/api/badge?badge=284169&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=284705&theme=light" width="120" /> | `284705` | `https://fiap-achievements.vercel.app/api/badge?badge=284705&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=294870&theme=light" width="120" /> | `294870` | `https://fiap-achievements.vercel.app/api/badge?badge=294870&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=314785&theme=light" width="120" /> | `314785` | `https://fiap-achievements.vercel.app/api/badge?badge=314785&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=320654&theme=light" width="120" /> | `320654` | `https://fiap-achievements.vercel.app/api/badge?badge=320654&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=325740&theme=light" width="120" /> | `325740` | `https://fiap-achievements.vercel.app/api/badge?badge=325740&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=348275&theme=light" width="120" /> | `348275` | `https://fiap-achievements.vercel.app/api/badge?badge=348275&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=367981&theme=light" width="120" /> | `367981` | `https://fiap-achievements.vercel.app/api/badge?badge=367981&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=370618&theme=light" width="120" /> | `370618` | `https://fiap-achievements.vercel.app/api/badge?badge=370618&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=374692&theme=light" width="120" /> | `374692` | `https://fiap-achievements.vercel.app/api/badge?badge=374692&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=386429&theme=light" width="120" /> | `386429` | `https://fiap-achievements.vercel.app/api/badge?badge=386429&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=390715&theme=light" width="120" /> | `390715` | `https://fiap-achievements.vercel.app/api/badge?badge=390715&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=410593&theme=light" width="120" /> | `410593` | `https://fiap-achievements.vercel.app/api/badge?badge=410593&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=431597&theme=light" width="120" /> | `431597` | `https://fiap-achievements.vercel.app/api/badge?badge=431597&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=432981&theme=light" width="120" /> | `432981` | `https://fiap-achievements.vercel.app/api/badge?badge=432981&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=458721&theme=light" width="120" /> | `458721` | `https://fiap-achievements.vercel.app/api/badge?badge=458721&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=468250&theme=light" width="120" /> | `468250` | `https://fiap-achievements.vercel.app/api/badge?badge=468250&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=469128&theme=light" width="120" /> | `469128` | `https://fiap-achievements.vercel.app/api/badge?badge=469128&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=470315&theme=light" width="120" /> | `470315` | `https://fiap-achievements.vercel.app/api/badge?badge=470315&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=482731&theme=light" width="120" /> | `482731` | `https://fiap-achievements.vercel.app/api/badge?badge=482731&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=492673&theme=light" width="120" /> | `492673` | `https://fiap-achievements.vercel.app/api/badge?badge=492673&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=495183&theme=light" width="120" /> | `495183` | `https://fiap-achievements.vercel.app/api/badge?badge=495183&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=503194&theme=light" width="120" /> | `503194` | `https://fiap-achievements.vercel.app/api/badge?badge=503194&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=507934&theme=light" width="120" /> | `507934` | `https://fiap-achievements.vercel.app/api/badge?badge=507934&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=517862&theme=light" width="120" /> | `517862` | `https://fiap-achievements.vercel.app/api/badge?badge=517862&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=537186&theme=light" width="120" /> | `537186` | `https://fiap-achievements.vercel.app/api/badge?badge=537186&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=540126&theme=light" width="120" /> | `540126` | `https://fiap-achievements.vercel.app/api/badge?badge=540126&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=561239&theme=light" width="120" /> | `561239` | `https://fiap-achievements.vercel.app/api/badge?badge=561239&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=573846&theme=light" width="120" /> | `573846` | `https://fiap-achievements.vercel.app/api/badge?badge=573846&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=605219&theme=light" width="120" /> | `605219` | `https://fiap-achievements.vercel.app/api/badge?badge=605219&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=627840&theme=light" width="120" /> | `627840` | `https://fiap-achievements.vercel.app/api/badge?badge=627840&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=631728&theme=light" width="120" /> | `631728` | `https://fiap-achievements.vercel.app/api/badge?badge=631728&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=640281&theme=light" width="120" /> | `640281` | `https://fiap-achievements.vercel.app/api/badge?badge=640281&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=645372&theme=light" width="120" /> | `645372` | `https://fiap-achievements.vercel.app/api/badge?badge=645372&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=670821&theme=light" width="120" /> | `670821` | `https://fiap-achievements.vercel.app/api/badge?badge=670821&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=675431&theme=light" width="120" /> | `675431` | `https://fiap-achievements.vercel.app/api/badge?badge=675431&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=682491&theme=light" width="120" /> | `682491` | `https://fiap-achievements.vercel.app/api/badge?badge=682491&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=684325&theme=light" width="120" /> | `684325` | `https://fiap-achievements.vercel.app/api/badge?badge=684325&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=692314&theme=light" width="120" /> | `692314` | `https://fiap-achievements.vercel.app/api/badge?badge=692314&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=697314&theme=light" width="120" /> | `697314` | `https://fiap-achievements.vercel.app/api/badge?badge=697314&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=703951&theme=light" width="120" /> | `703951` | `https://fiap-achievements.vercel.app/api/badge?badge=703951&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=714608&theme=light" width="120" /> | `714608` | `https://fiap-achievements.vercel.app/api/badge?badge=714608&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=721963&theme=light" width="120" /> | `721963` | `https://fiap-achievements.vercel.app/api/badge?badge=721963&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=735018&theme=light" width="120" /> | `735018` | `https://fiap-achievements.vercel.app/api/badge?badge=735018&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=736418&theme=light" width="120" /> | `736418` | `https://fiap-achievements.vercel.app/api/badge?badge=736418&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=748350&theme=light" width="120" /> | `748350` | `https://fiap-achievements.vercel.app/api/badge?badge=748350&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=752906&theme=light" width="120" /> | `752906` | `https://fiap-achievements.vercel.app/api/badge?badge=752906&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=758230&theme=light" width="120" /> | `758230` | `https://fiap-achievements.vercel.app/api/badge?badge=758230&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=761905&theme=light" width="120" /> | `761905` | `https://fiap-achievements.vercel.app/api/badge?badge=761905&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=781293&theme=light" width="120" /> | `781293` | `https://fiap-achievements.vercel.app/api/badge?badge=781293&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=785063&theme=light" width="120" /> | `785063` | `https://fiap-achievements.vercel.app/api/badge?badge=785063&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=793412&theme=light" width="120" /> | `793412` | `https://fiap-achievements.vercel.app/api/badge?badge=793412&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=798451&theme=light" width="120" /> | `798451` | `https://fiap-achievements.vercel.app/api/badge?badge=798451&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=810254&theme=light" width="120" /> | `810254` | `https://fiap-achievements.vercel.app/api/badge?badge=810254&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=812064&theme=light" width="120" /> | `812064` | `https://fiap-achievements.vercel.app/api/badge?badge=812064&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=820547&theme=light" width="120" /> | `820547` | `https://fiap-achievements.vercel.app/api/badge?badge=820547&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=829145&theme=light" width="120" /> | `829145` | `https://fiap-achievements.vercel.app/api/badge?badge=829145&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=830617&theme=light" width="120" /> | `830617` | `https://fiap-achievements.vercel.app/api/badge?badge=830617&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=835758&theme=light" width="120" /> | `835758` | `https://fiap-achievements.vercel.app/api/badge?badge=835758&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=849216&theme=light" width="120" /> | `849216` | `https://fiap-achievements.vercel.app/api/badge?badge=849216&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=856024&theme=light" width="120" /> | `856024` | `https://fiap-achievements.vercel.app/api/badge?badge=856024&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=860192&theme=light" width="120" /> | `860192` | `https://fiap-achievements.vercel.app/api/badge?badge=860192&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=860741&theme=light" width="120" /> | `860741` | `https://fiap-achievements.vercel.app/api/badge?badge=860741&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=861429&theme=light" width="120" /> | `861429` | `https://fiap-achievements.vercel.app/api/badge?badge=861429&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=862174&theme=light" width="120" /> | `862174` | `https://fiap-achievements.vercel.app/api/badge?badge=862174&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=864195&theme=light" width="120" /> | `864195` | `https://fiap-achievements.vercel.app/api/badge?badge=864195&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=903715&theme=light" width="120" /> | `903715` | `https://fiap-achievements.vercel.app/api/badge?badge=903715&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=907158&theme=light" width="120" /> | `907158` | `https://fiap-achievements.vercel.app/api/badge?badge=907158&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=907326&theme=light" width="120" /> | `907326` | `https://fiap-achievements.vercel.app/api/badge?badge=907326&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=913674&theme=light" width="120" /> | `913674` | `https://fiap-achievements.vercel.app/api/badge?badge=913674&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=914502&theme=light" width="120" /> | `914502` | `https://fiap-achievements.vercel.app/api/badge?badge=914502&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=915204&theme=light" width="120" /> | `915204` | `https://fiap-achievements.vercel.app/api/badge?badge=915204&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=918357&theme=light" width="120" /> | `918357` | `https://fiap-achievements.vercel.app/api/badge?badge=918357&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=924560&theme=light" width="120" /> | `924560` | `https://fiap-achievements.vercel.app/api/badge?badge=924560&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=925781&theme=light" width="120" /> | `925781` | `https://fiap-achievements.vercel.app/api/badge?badge=925781&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=928143&theme=light" width="120" /> | `928143` | `https://fiap-achievements.vercel.app/api/badge?badge=928143&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=934705&theme=light" width="120" /> | `934705` | `https://fiap-achievements.vercel.app/api/badge?badge=934705&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=986241&theme=light" width="120" /> | `986241` | `https://fiap-achievements.vercel.app/api/badge?badge=986241&theme=light` |
| <img src="https://fiap-achievements.vercel.app/api/badge?badge=991000&theme=light" width="120" /> | `991000` | `https://fiap-achievements.vercel.app/api/badge?badge=991000&theme=light` |

</details>

---

<details>
<summary><h3>🏆 Challenge</h3></summary>

Passe `badge=challenge` e informe `year`, `company` e opcionalmente `ranking` (padrão: `1`):

```
https://fiap-achievements.vercel.app/api/badge?badge=challenge&year=ANO&company=EMPRESA&ranking=1&theme=light
```

#### 2026

| Empresa | 🥇 1º lugar | 🥈 2º lugar | 🥉 3º lugar |
|---------|:-----------:|:-----------:|:-----------:|
| **Jovi** (`jovi`) | <img src="https://fiap-achievements.vercel.app/api/badge?badge=challenge&year=2026&company=jovi&ranking=1&theme=light" width="120" /> | <img src="https://fiap-achievements.vercel.app/api/badge?badge=challenge&year=2026&company=jovi&ranking=2&theme=light" width="120" /> | <img src="https://fiap-achievements.vercel.app/api/badge?badge=challenge&year=2026&company=jovi&ranking=3&theme=light" width="120" /> |
| **Soul Up** (`soul-up`) | <img src="https://fiap-achievements.vercel.app/api/badge?badge=challenge&year=2026&company=soul-up&ranking=1&theme=light" width="120" /> | <img src="https://fiap-achievements.vercel.app/api/badge?badge=challenge&year=2026&company=soul-up&ranking=2&theme=light" width="120" /> | <img src="https://fiap-achievements.vercel.app/api/badge?badge=challenge&year=2026&company=soul-up&ranking=3&theme=light" width="120" /> |
| **TOTVS** (`totvs`) | <img src="https://fiap-achievements.vercel.app/api/badge?badge=challenge&year=2026&company=totvs&ranking=1&theme=light" width="120" /> | <img src="https://fiap-achievements.vercel.app/api/badge?badge=challenge&year=2026&company=totvs&ranking=2&theme=light" width="120" /> | <img src="https://fiap-achievements.vercel.app/api/badge?badge=challenge&year=2026&company=totvs&ranking=3&theme=light" width="120" /> |

#### 2025

| Empresa | 🥇 1º lugar | 🥈 2º lugar | 🥉 3º lugar |
|---------|:-----------:|:-----------:|:-----------:|
| **B3** (`b3`) | <img src="https://fiap-achievements.vercel.app/api/badge?badge=challenge&year=2025&company=b3&ranking=1&theme=light" width="120" /> | <img src="https://fiap-achievements.vercel.app/api/badge?badge=challenge&year=2025&company=b3&ranking=2&theme=light" width="120" /> | <img src="https://fiap-achievements.vercel.app/api/badge?badge=challenge&year=2025&company=b3&ranking=3&theme=light" width="120" /> |
| **CCR** (`ccr`) | <img src="https://fiap-achievements.vercel.app/api/badge?badge=challenge&year=2025&company=ccr&ranking=1&theme=light" width="120" /> | <img src="https://fiap-achievements.vercel.app/api/badge?badge=challenge&year=2025&company=ccr&ranking=2&theme=light" width="120" /> | <img src="https://fiap-achievements.vercel.app/api/badge?badge=challenge&year=2025&company=ccr&ranking=3&theme=light" width="120" /> |
| **Click Go** (`click-go`) | <img src="https://fiap-achievements.vercel.app/api/badge?badge=challenge&year=2025&company=click-go&ranking=1&theme=light" width="120" /> | <img src="https://fiap-achievements.vercel.app/api/badge?badge=challenge&year=2025&company=click-go&ranking=2&theme=light" width="120" /> | <img src="https://fiap-achievements.vercel.app/api/badge?badge=challenge&year=2025&company=click-go&ranking=3&theme=light" width="120" /> |
| **Fortinet** (`fortinet`) | <img src="https://fiap-achievements.vercel.app/api/badge?badge=challenge&year=2025&company=fortinet&ranking=1&theme=light" width="120" /> | <img src="https://fiap-achievements.vercel.app/api/badge?badge=challenge&year=2025&company=fortinet&ranking=2&theme=light" width="120" /> | <img src="https://fiap-achievements.vercel.app/api/badge?badge=challenge&year=2025&company=fortinet&ranking=3&theme=light" width="120" /> |
| **HC IBM** (`hc-ibm`) | <img src="https://fiap-achievements.vercel.app/api/badge?badge=challenge&year=2025&company=hc-ibm&ranking=1&theme=light" width="120" /> | <img src="https://fiap-achievements.vercel.app/api/badge?badge=challenge&year=2025&company=hc-ibm&ranking=2&theme=light" width="120" /> | <img src="https://fiap-achievements.vercel.app/api/badge?badge=challenge&year=2025&company=hc-ibm&ranking=3&theme=light" width="120" /> |
| **Odontoprev** (`odontoprev`) | <img src="https://fiap-achievements.vercel.app/api/badge?badge=challenge&year=2025&company=odontoprev&ranking=1&theme=light" width="120" /> | <img src="https://fiap-achievements.vercel.app/api/badge?badge=challenge&year=2025&company=odontoprev&ranking=2&theme=light" width="120" /> | <img src="https://fiap-achievements.vercel.app/api/badge?badge=challenge&year=2025&company=odontoprev&ranking=3&theme=light" width="120" /> |
| **Oracle** (`oracle`) | <img src="https://fiap-achievements.vercel.app/api/badge?badge=challenge&year=2025&company=oracle&ranking=1&theme=light" width="120" /> | <img src="https://fiap-achievements.vercel.app/api/badge?badge=challenge&year=2025&company=oracle&ranking=2&theme=light" width="120" /> | <img src="https://fiap-achievements.vercel.app/api/badge?badge=challenge&year=2025&company=oracle&ranking=3&theme=light" width="120" /> |
| **Passa a Bola** (`passaabola`) | <img src="https://fiap-achievements.vercel.app/api/badge?badge=challenge&year=2025&company=passaabola&ranking=1&theme=light" width="120" /> | <img src="https://fiap-achievements.vercel.app/api/badge?badge=challenge&year=2025&company=passaabola&ranking=2&theme=light" width="120" /> | <img src="https://fiap-achievements.vercel.app/api/badge?badge=challenge&year=2025&company=passaabola&ranking=3&theme=light" width="120" /> |
| **Santander** (`santander`) | <img src="https://fiap-achievements.vercel.app/api/badge?badge=challenge&year=2025&company=santander&ranking=1&theme=light" width="120" /> | <img src="https://fiap-achievements.vercel.app/api/badge?badge=challenge&year=2025&company=santander&ranking=2&theme=light" width="120" /> | <img src="https://fiap-achievements.vercel.app/api/badge?badge=challenge&year=2025&company=santander&ranking=3&theme=light" width="120" /> |
| **Smartlabs** (`smartlabs`) | <img src="https://fiap-achievements.vercel.app/api/badge?badge=challenge&year=2025&company=smartlabs&ranking=1&theme=light" width="120" /> | <img src="https://fiap-achievements.vercel.app/api/badge?badge=challenge&year=2025&company=smartlabs&ranking=2&theme=light" width="120" /> | <img src="https://fiap-achievements.vercel.app/api/badge?badge=challenge&year=2025&company=smartlabs&ranking=3&theme=light" width="120" /> |
| **Vivo** (`vivo`) | <img src="https://fiap-achievements.vercel.app/api/badge?badge=challenge&year=2025&company=vivo&ranking=1&theme=light" width="120" /> | <img src="https://fiap-achievements.vercel.app/api/badge?badge=challenge&year=2025&company=vivo&ranking=2&theme=light" width="120" /> | <img src="https://fiap-achievements.vercel.app/api/badge?badge=challenge&year=2025&company=vivo&ranking=3&theme=light" width="120" /> |

</details>

---

<details>
<summary><h3>🌍 Global Solution</h3></summary>

Passe `badge=gs` e informe `year` e `topic`:

```
https://fiap-achievements.vercel.app/api/badge?badge=gs&year=ANO&topic=TOPICO&theme=light
```

#### 2025

| Tema | Light | Dark | Black |
|------|:-----:|:----:|:-----:|
| **Future of Work** (`future-of-work`) | <img src="https://fiap-achievements.vercel.app/api/badge?badge=gs&year=2025&topic=future-of-work&theme=light" width="120" /> | <img src="https://fiap-achievements.vercel.app/api/badge?badge=gs&year=2025&topic=future-of-work&theme=dark" width="120" /> | <img src="https://fiap-achievements.vercel.app/api/badge?badge=gs&year=2025&topic=future-of-work&theme=black" width="120" /> |

</details>

---

## 💡 Exemplos de Uso

### Fileira de Nano Courses no README

```html
<div align="center">
  <img src="https://fiap-achievements.vercel.app/api/badge?badge=294870&theme=dark" width="100" />
  <img src="https://fiap-achievements.vercel.app/api/badge?badge=864195&theme=dark" width="100" />
  <img src="https://fiap-achievements.vercel.app/api/badge?badge=928143&theme=dark" width="100" />
</div>
```

### Badge de Challenge no README

```html
<img src="https://fiap-achievements.vercel.app/api/badge?badge=challenge&year=2025&company=oracle&ranking=1&theme=dark" width="100" />
```

### Badge de Global Solution no README

```html
<img src="https://fiap-achievements.vercel.app/api/badge?badge=gs&year=2025&topic=future-of-work&theme=dark" width="100" />
```

### Portfólio com espaçamento

```html
<div style="display: flex; gap: 16px; flex-wrap: wrap; justify-content: center;">
  <img src="https://fiap-achievements.vercel.app/api/badge?badge=294870&theme=light" width="100" />
  <img src="https://fiap-achievements.vercel.app/api/badge?badge=challenge&year=2025&company=oracle&ranking=1&theme=light" width="100" />
  <img src="https://fiap-achievements.vercel.app/api/badge?badge=gs&year=2025&topic=future-of-work&theme=light" width="100" />
</div>
```

---

## 🏗️ Arquitetura

```
fiap-achievements/
├── api/
│   └── badge.js                   # Serverless function (Vercel)
├── public/
│   └── assets/
│       └── certificates/
│           ├── nano/
│           │   ├── light/  {id}.svg
│           │   ├── dark/   {id}.svg
│           │   └── black/  {id}.svg
│           ├── challenge/
│           │   └── {year}/{company}/
│           │       ├── light/  {ranking}.svg
│           │       ├── dark/   {ranking}.svg
│           │       └── black/  {ranking}.svg
│           ├── gs/
│           │   └── {year}/{topic}/
│           │       ├── light/  1.svg
│           │       ├── dark/   1.svg
│           │       └── black/  1.svg
│           ├── error-light.svg
│           ├── error-dark.svg
│           └── error-black.svg
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   ├── routes/
│   │   ├── Home.jsx               # Página inicial (/home)
│   │   ├── Catalog.jsx            # Catálogo interativo (/catalog)
│   │   └── Badges.jsx             # Pré-visualização (/badge)
│   ├── hooks/
│   │   └── useCatalog.js
│   ├── css/
│   ├── App.jsx
│   └── main.jsx
├── .github/
│   ├── workflows/
│   │   ├── ci.yml                 # Lint e build em todo PR/push para main
│   │   └── validate-badges.yml    # Validação de SVGs em PRs com badges
│   └── pull_request_template.md
├── vercel.json
└── vite.config.js
```

**Rotas da aplicação:**

| Rota | Descrição |
|------|-----------|
| `/home` | Página inicial com visão geral do projeto |
| `/catalog` | Catálogo interativo com busca e filtros |
| `/badge` | Pré-visualização de qualquer badge por parâmetros de URL |
| `/api/badge` | Endpoint da serverless function — retorna o SVG |

**Fluxo da API:**

```
GET /api/badge?badge=...&theme=...
  │
  ├─ badge numérico  →  nano/{theme}/{id}.svg
  ├─ badge=challenge →  challenge/{year}/{company}/{theme}/{ranking}.svg
  └─ badge=gs        →  gs/{year}/{topic}/{theme}/1.svg
       │
       ├─ arquivo encontrado  →  SVG + cache 1 ano
       └─ não encontrado      →  error-{theme}.svg + cache 60s
```

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

> **Atenção:** o endpoint `/api/badge` requer o runtime da Vercel. Use a [Vercel CLI](https://vercel.com/docs/cli) para suporte completo ao backend local.

```bash
npm i -g vercel
vercel dev
```

---

## 🤝 Contribuindo

Contribuições são bem-vindas e ajudam a expandir o catálogo da comunidade.

### Adicionando Nano Courses

Adicione os SVGs nos três temas:

```
public/assets/certificates/nano/light/{id}.svg
public/assets/certificates/nano/dark/{id}.svg
public/assets/certificates/nano/black/{id}.svg
```

### Adicionando Challenges

Crie a estrutura de diretórios com os três rankings para cada tema:

```
public/assets/certificates/challenge/{year}/{company}/light/{ranking}.svg
public/assets/certificates/challenge/{year}/{company}/dark/{ranking}.svg
public/assets/certificates/challenge/{year}/{company}/black/{ranking}.svg
```

> Rankings `1`, `2` e `3` são obrigatórios para cada empresa e tema.

### Adicionando Global Solutions

```
public/assets/certificates/gs/{year}/{topic}/light/1.svg
public/assets/certificates/gs/{year}/{topic}/dark/1.svg
public/assets/certificates/gs/{year}/{topic}/black/1.svg
```

### Regras Gerais

- SVGs devem estar otimizados e abaixo de 300 KB
- Os três temas (`light`, `dark`, `black`) são obrigatórios
- Nenhum ID duplicado dentro do mesmo tipo
- Abra um Pull Request com descrição clara — o template guia o preenchimento

### Ambiente de Desenvolvimento

```bash
npm install     # instalar dependências
npm run dev     # servidor local (frontend)
npm run lint    # lint
npm run build   # build de produção
vercel dev      # servidor local com suporte ao endpoint /api/badge
```

---

## 🔒 Segurança

Todos os parâmetros fornecidos pelo usuário são sanitizados antes de qualquer uso — apenas `[a-z0-9\-_]` é permitido em slugs e apenas dígitos em valores numéricos. A API nunca executa path traversal, nunca expõe o sistema de arquivos além de `public/assets/certificates/` e nunca retorna uma página de erro HTTP.

---

## 📄 Licença

Distribuído sob a [Licença MIT](./LICENSE).

---

<div align="center">

Lets Rock The Future

</div>
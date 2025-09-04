# 🦊🐇 HAREFOX — Simulador Lebres e Raposas

📌 **Desafio original (SPOJ)**: [HAREFOX](https://www.spoj.com/problems/HAREFOX)

**💻 Stacks utilizadas:** ``HTML``, ``CSS``, ``JavaScript``

## 📖 Visão Geral

Este projeto implementa um **simulador do sistema ecológico binário lebres-raposas (SHF)** com base no modelo padrão de equações de diferenças.

👉 O objetivo é determinar a evolução a longo prazo das variáveis:

**hy** → diferença do número de lebres

**fy** → diferença do número de raposas

O comportamento final é classificado em 6 possíveis saídas:

🟢 O equilíbrio ecológico se desenvolverá.

🦊 As lebres desaparecerão enquanto as raposas crescerão em excesso.

🐇 As lebres crescerão em excesso enquanto as raposas desaparecerão.

🚫 Tanto as lebres quanto as raposas desaparecerão.

📈 Tanto as lebres quanto as raposas crescerão em excesso.

🚨 O caos se desenvolverá.

## 📐 Equações do Modelo

O SHF é descrito pelas equações de diferenças:

<div align="left">

$$
\begin{cases}
h_{y+1} = a \cdot h_y - b \cdot f_y \\
f_{y+1} = c \cdot f_y + d \cdot h_y
\end{cases}
$$

</div>

<br>

As variáveis **hy** e **fy** são números reais. O desafio é analisar se, no limite, as sequências tendem a equilíbrio, divergência ou caos.

## 📥 Entrada Esperada

Múltiplos casos de teste.

Cada caso contém 6 números reais: a, b, c, d, h1998, f1998.

**Formato SPOJ:**

Um inteiro N (número de casos).

Seguido de N conjuntos de três linhas (dois números cada).

Separados por linhas em branco.

## 📤 Saída Esperada

Para cada caso, o simulador imprime uma das frases acima (em inglês, conforme o SPOJ).


## 🎨 Recursos da Interface

✅ Página web responsiva com painel lateral para entrada e exibição dos resultados.
✅ Background em vídeo (background.mp4) em autoplay, loop e mute.
✅ Entrada facilitada com tecla Enter e tabulação.
✅ Resultado destacado de forma clara e visual.

## 📂 Estrutura do Projeto
```
desafio_harefox/
│── assets/
│   └── background.mp4   🎥 vídeo de fundo (opcional)
│
│── index.html           🌐 interface principal
│── styles.css           🎨 estilos da aplicação
│── script.js            ⚙️ lógica do simulador
```

## 🛠️ Como Usar Localmente

Coloque o arquivo background.mp4 dentro da pasta assets/

Abra o index.html em um navegador moderno.

Insira os valores de a, b, c, d, h1998, f1998.

Clique em CALCULAR e veja o resultado!

## 📌 Observações de Implementação

✔️ Iterações discretas das equações para detectar comportamento limite.

✔️ Tratamento de overflow e valores inválidos.

✔️ Interface ajustada com contraste + transparência para melhor visibilidade.

✔️ Para submissão no SPOJ, utilize a versão CLI (entrada/saída estrita).

## 🧪 Exemplos Orientativos

Equilíbrio: valores pequenos de acoplamento → hy e fy → 0.

Divergência mista: uma variável cresce exponencialmente, a outra diverge para −∞.

Caos: oscilações persistentes sem convergência.

## 🤝 Contribuição

Contribuições são bem-vindas!
👉 Abra uma issue ou envie um Pull Request com melhorias:

## 🔧 Otimização da lógica

✅ Testes automatizados

🎨 Acessibilidade e UI

📹 Otimização do vídeo

## 📜 Licença

📌 Defina a licença desejada no repositório (ex: MIT).

## 👤 Contato

👨‍💻 Autor: Luiz Felipe de Oliveira (@luizfx.dev)
🔗 GitHub: github.com/luizfxdev

// script.js - HAREFOX Simulator Logic (CORRIGIDO)
// Simulador do Sistema Ecológico Lebres-Raposas
// Elementos DOM - captura dos elementos da interface
const inputA = document.getElementById('input-a');
const inputB = document.getElementById('input-b');
const inputC = document.getElementById('input-c');
const inputD = document.getElementById('input-d');
const inputH1998 = document.getElementById('input-h1998');
const inputF1998 = document.getElementById('input-f1998');
const btnCalcular = document.getElementById('btn-calcular');
const btnRetornar = document.getElementById('btn-retornar');
const secaoResultado = document.getElementById('secao-resultado');
const resultadoDetalhado = document.getElementById('resultado-detalhado');
const resultadoFinal = document.getElementById('resultado-final');

// Event listeners para os botões
btnCalcular.addEventListener('click', calcularSimulacao);
btnRetornar.addEventListener('click', limparFormulario);

// Função principal de cálculo da simulação
function calcularSimulacao() {
  try {
    // Ler valores dos inputs - conversão para números reais
    const a = parseFloat(inputA.value) || 0;
    const b = parseFloat(inputB.value) || 0;
    const c = parseFloat(inputC.value) || 0;
    const d = parseFloat(inputD.value) || 0;
    const h1998 = parseFloat(inputH1998.value) || 0;
    const f1998 = parseFloat(inputF1998.value) || 0;

    // Executar simulação iterativa
    const resultado = executarSimulacao(a, b, c, d, h1998, f1998);

    // Mostrar resultado na interface
    exibirResultado(resultado, a, b, c, d, h1998, f1998);
  } catch (error) {
    console.error('Erro na simulação:', error);
    resultadoFinal.innerHTML = '<p style="color: #ff4444;">Erro no cálculo. Verifique os valores inseridos.</p>';
  }
}

// Função que executa a simulação do modelo SHF (Sistema Harefox)
function executarSimulacao(a, b, c, d, h_inicial, f_inicial) {
  const passos_max = 10000; // Número máximo de iterações
  let h = h_inicial; // População inicial de lebres
  let f = f_inicial; // População inicial de raposas

  // Arrays para análise de comportamento
  const historico_h = [];
  const historico_f = [];

  let passos_executados = 0;

  // Executar iterações do modelo matemático
  for (let i = 0; i < passos_max; i++) {
    const h_novo = a * h - b * f; // Nova população de lebres
    const f_novo = c * f + d * h; // Nova população de raposas

    h = h_novo;
    f = f_novo;
    passos_executados = i + 1;

    // Armazenar valores para análise (últimos 100 valores)
    if (i >= passos_max - 100) {
      historico_h.push(h);
      historico_f.push(f);
    }

    // Verificar se os valores são válidos
    if (!isFinite(h) || !isFinite(f)) {
      break;
    }

    // Proteção contra overflow - valores muito grandes
    if (Math.abs(h) > 1e15 || Math.abs(f) > 1e15) {
      break;
    }
  }

  // Analisar comportamento final
  const comportamento = analisarComportamento(historico_h, historico_f, h, f);

  return {
    h_final: h,
    f_final: f,
    historico_h: historico_h,
    historico_f: historico_f,
    comportamento: comportamento,
    passos_executados: passos_executados
  };
}

// Função para analisar o comportamento a longo prazo do sistema
function analisarComportamento(hist_h, hist_f, h_final, f_final) {
  const tolerancia_zero = 1e-10; // Precisão para considerar convergência a zero
  const limiar_infinito = 1e12; // Limiar para considerar crescimento infinito

  // Verificar se os valores são válidos
  if (!isFinite(h_final) || !isFinite(f_final)) {
    return 'chaos';
  }

  // Verificar convergência para zero (equilíbrio)
  if (Math.abs(h_final) < tolerancia_zero && Math.abs(f_final) < tolerancia_zero) {
    return 'balance'; // lim h = 0 e lim f = 0
  }

  // Verificar tendência ao infinito
  const h_infinito_pos = h_final > limiar_infinito;
  const h_infinito_neg = h_final < -limiar_infinito;
  const f_infinito_pos = f_final > limiar_infinito;
  const f_infinito_neg = f_final < -limiar_infinito;

  // Classificar baseado nos limites
  if (h_infinito_neg && f_infinito_pos) {
    return 'hares_die_foxes_grow'; // lim h = -∞ e lim f = +∞
  } else if (h_infinito_pos && f_infinito_neg) {
    return 'hares_grow_foxes_die'; // lim h = +∞ e lim f = -∞
  } else if (h_infinito_neg && f_infinito_neg) {
    return 'both_die'; // lim h = -∞ e lim f = -∞
  } else if (h_infinito_pos && f_infinito_pos) {
    return 'both_grow'; // lim h = +∞ e lim f = +∞
  }

  // Verificar se está crescendo ou decrescendo consistentemente
  if (hist_h.length >= 50) {
    const ultimos_h = hist_h.slice(-50);
    const ultimos_f = hist_f.slice(-50);

    // Calcular tendência média dos últimos valores
    const crescimento_h = (ultimos_h[ultimos_h.length - 1] - ultimos_h[0]) / ultimos_h.length;
    const crescimento_f = (ultimos_f[ultimos_f.length - 1] - ultimos_f[0]) / ultimos_f.length;

    // Verificar tendências consistentes
    const limiar_tendencia = 1e-6;

    if (Math.abs(crescimento_h) < limiar_tendencia && Math.abs(crescimento_f) < limiar_tendencia) {
      // Valores estáveis - pode ser equilíbrio
      if (Math.abs(h_final) < 1e-3 && Math.abs(f_final) < 1e-3) {
        return 'balance';
      }
    }

    // Verificar padrões de crescimento exponencial
    if (crescimento_h < -limiar_tendencia * 1000 && crescimento_f > limiar_tendencia * 1000) {
      return 'hares_die_foxes_grow';
    } else if (crescimento_h > limiar_tendencia * 1000 && crescimento_f < -limiar_tendencia * 1000) {
      return 'hares_grow_foxes_die';
    } else if (crescimento_h < -limiar_tendencia * 1000 && crescimento_f < -limiar_tendencia * 1000) {
      return 'both_die';
    } else if (crescimento_h > limiar_tendencia * 1000 && crescimento_f > limiar_tendencia * 1000) {
      return 'both_grow';
    }
  }

  return 'chaos'; // Comportamento que não se encaixa nas categorias anteriores
}

// Função para exibir resultado detalhado na interface do usuário
function exibirResultado(resultado, a, b, c, d, h1998, f1998) {
  // Mostrar seção de resultado
  secaoResultado.style.display = 'block';

  // Gerar detalhamento completo do cálculo
  const detalhamento = `
        <h3>Parâmetros do Sistema:</h3>
        <p><strong>a = ${a}</strong>, <strong>b = ${b}</strong>, <strong>c = ${c}</strong>, <strong>d = ${d}</strong></p>
        <p><strong>Condições iniciais:</strong> h₁₉₉₈ = ${h1998}, f₁₉₉₈ = ${f1998}</p>
        
        <h3>Modelo Matemático Aplicado:</h3>
        <p>h<sub>y+1</sub> = a · h<sub>y</sub> - b · f<sub>y</sub></p>
        <p>f<sub>y+1</sub> = c · f<sub>y</sub> + d · h<sub>y</sub></p>
        
        <h3>Resultado da Simulação (${resultado.passos_executados} passos):</h3>
        <p><strong>População final de lebres:</strong> ${formatarNumero(resultado.h_final)}</p>
        <p><strong>População final de raposas:</strong> ${formatarNumero(resultado.f_final)}</p>
    `;

  resultadoDetalhado.innerHTML = detalhamento;

  // Definir mensagens de saída em português conforme especificado
  const mensagens = {
    balance: 'O equilíbrio ecológico se desenvolverá.',
    hares_die_foxes_grow: 'Lebres desaparecerão enquanto as raposas aumentarão.',
    hares_grow_foxes_die: 'Lebres aumentarão enquanto as raposas desaparecerão.',
    both_die: 'Tanto lebres quanto raposas desaparecerão.',
    both_grow: 'Tanto lebres quanto raposas aumentarão.',
    chaos: 'O caos se desenvolverá.'
  };

  // Mostrar conclusão final destacada
  const mensagemFinal = mensagens[resultado.comportamento] || 'Resultado indeterminado.';
  resultadoFinal.innerHTML = `<h3>Conclusão:</h3><p class="conclusao-destaque">${mensagemFinal}</p>`;
}

// Função auxiliar para formatar números grandes/pequenos
function formatarNumero(num) {
  if (!isFinite(num)) {
    return 'Infinito';
  }
  if (Math.abs(num) > 1e6 || (Math.abs(num) < 1e-6 && num !== 0)) {
    return num.toExponential(6);
  }
  return num.toFixed(6);
}

// Função para limpar formulário e resultado (botão RETORNAR)
function limparFormulario() {
  // Limpar todos os inputs de entrada
  inputA.value = '';
  inputB.value = '';
  inputC.value = '';
  inputD.value = '';
  inputH1998.value = '';
  inputF1998.value = '';

  // Ocultar seção de resultado
  secaoResultado.style.display = 'none';
  resultadoDetalhado.innerHTML = '';
  resultadoFinal.innerHTML = '';

  // Focar no primeiro input para facilitar nova entrada
  inputA.focus();
}

// Adicionar suporte para tecla Enter nos inputs
[inputA, inputB, inputC, inputD, inputH1998, inputF1998].forEach(input => {
  input.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      calcularSimulacao();
    }
  });
});

// Adicionar suporte para navegação via teclado nos botões
btnCalcular.addEventListener('keypress', function (e) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    calcularSimulacao();
  }
});

btnRetornar.addEventListener('keypress', function (e) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    limparFormulario();
  }
});

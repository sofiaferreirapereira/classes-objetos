const prompt = require('prompt-sync')();

class Cliente {
    constructor( nome, email, cpf, telefone) {
        this.nome = nome
        this.email = email
        this.cpf = cpf
        this.telefone = telefone
    }
    abrirConta() {
        console.log(`Conta da cliente ${this.nome} aberta!`);
    }
    fecharConta() {
        console.log(`Conta do cliente ${this.nome} fechada!`);
    }
}
/* Criando um cliente */
// let cliente_importante = new Cliente('Sofia', 'sofia@gmail.com', '090-786-659-21', '(48) 98765-1257')
// cliente_importante.abrirConta()

class Conta {
    constructor(cliente, saldo = 0) {
        this.cliente = cliente
        this.saldo = saldo
    }
    depositar(valor) {
        if(valor > 0) {
            this.saldo += valor
            console.log(`Saldo após a depósito R$:${this.saldo}`);
        } else {
            console.log('Valor inválido para o depósito!');
        }
    }
    sacar(valor) {
        if(valor > 0 && valor <= this.saldo) {
            this.saldo -= valor
            console.log(`Saldo após saque R$: ${this.saldo}`);
        } else {
            console.log('Valor de saque inválido ou superior ao saldo atual da conta!');
        }
    }
}

class ContaCorrente extends Conta {
    constructor(cliente, saldo = 0, limiteCredito = 300) {
        super(cliente, saldo)
        this.limiteCredito = limiteCredito
        this.saldoCredito = limiteCredito
    }
    compraCredito(valor) {
        if(valor > 0 && valor <= this.saldo) {
            this.saldoCredito -= valor
            console.log(`Seu saldo atual de crédito é de R$: ${this.saldoCredito}`);
        } else {
            console.log('Valor de saldo insuficiente para a compra');
        }
    }
    pagarFatura(valor) {
        this.saldoCredito = this.limiteCredito
        console.log('Fatura paga com sucesso!');
    }
}

class ContaPoupanca extends Conta {
    constructor(cliente, saldo = 0, juros = 0.005) {
        super(cliente, saldo)
        this.juros = juros
    }
    montante(meses) {
        let montanteFinal = this.saldo * Math.pow(1 + this.juros, meses)
        console.log(`Valor dos rendimentos depois de ${meses} meses: R${montanteFinal}`);
    }
}

const cliente1 = new Cliente("Leonardo", "leo@gmail.com", "123.456.789-00", "9999-9999");
const contaCorrente = new ContaCorrente( cliente1, 500, 1000);
const contaPoupanca = new ContaPoupanca( cliente1, 1000, 0.01);

let opcao;
while (true) {
    console.log("\n===== Menu de Opções =====");
    console.log("1. Abrir Conta");
    console.log("2. Fechar Conta");
    console.log("3. Depósito na Conta Corrente");
    console.log("4. Saque na Conta Corrente");
    console.log("5. Realizar Compra com Crédito");
    console.log("6. Pagar Fatura do Crédito");
    console.log("7. Ver Montante da Poupança");
    console.log("8. Sair");
    opcao = prompt("Escolha uma opção: ");

    switch (opcao) {
        case "1":
            cliente1.abrirConta();
            break;
        case "2":
            cliente1.fecharConta();
            break;
        case "3":
            const valorDeposito = parseFloat(prompt("Digite o valor para depósito: "));
            contaCorrente.depositar(valorDeposito);
            break;
        case "4":
            const valorSaque = parseFloat(prompt("Digite o valor para saque: "));
            contaCorrente.sacar(valorSaque);
            break;
        case "5":
            const valorCompra = parseFloat(prompt("Digite o valor para compra com crédito: "));
            contaCorrente.compraCredito(valorCompra);
            break;
        case "6":
            contaCorrente.pagarFatura();
            break;
        case "7":
            const meses = parseInt(prompt("Digite o número de meses para calcular o montante: "));
            contaPoupanca.montante(meses);
            break;
        case "8":
            console.log("Saindo do sistema...");
            process.exit();
        default:
            console.log("Opção inválida! Tente novamente.");
    }
}
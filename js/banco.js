class ContaBancaria {
  constructor(agencia, numero, tipo, saldo) {
    this.agencia = agencia;
    this.numero = numero;
    this.tipo = tipo;
    this.saldo = saldo;
  }

  getSaldo() {
    return this.saldo;
  }

  setSaldo(saldo) {
    this.saldo = saldo;
  }

  sacar(valor) {
    if (valor <= this.saldo) {
      this.saldo -= valor;
      return true;
    }
    return false;
  }

  depositar(valor) {
    this.saldo += valor;
  }
}

class ContaCorrente extends ContaBancaria {
  constructor(agencia, numero, saldo, cartaoCredito = false) {
    super(agencia, numero, 'Conta Corrente', saldo);
    this.cartaoCredito = cartaoCredito;
  }

  getCartaoCredito() {
    return this.cartaoCredito;
  }

  setCartaoCredito(cartaoCredito) {
    this.cartaoCredito = cartaoCredito;
  }
}

class ContaPoupanca extends ContaBancaria {
  constructor(agencia, numero, saldo) {
    super(agencia, numero, 'Conta Poupança', saldo);
  }
}

class ContaUniversitaria extends ContaBancaria {
  constructor(agencia, numero, saldo) {
    super(agencia, numero, 'Conta Universitária', saldo);
  }

  sacar(valor) {
    if (valor <= 500 && valor <= this.saldo) {
      this.saldo -= valor;
      return true;
    }
    return false;
  }
}
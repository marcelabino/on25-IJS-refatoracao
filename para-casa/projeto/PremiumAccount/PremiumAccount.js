const { Account } = require("../Account/Account");

class PremiumAccount extends Account {
  transactionLimit;
  income;
  
  constructor(accountNumber, agency, balance, income) {
    super(accountNumber, agency, balance);
    this.income = income;
  }

  createAccount() {
    if (this.income < 18000) {
      throw new Error("Renda incompatível com o tipo de conta")
    }
    if (this.accountNumber.length === 5 && this.agency.length === 4 && this.balance > 0) {      
      return "Conta criada com sucesso";
    } else {
      throw new Error("Dados inválidos para cadastro");
    }
  }

  transfer(value, accountNumber, agency) {
    const validAccount = Account.all.find(account => {
      let accNumber = account.getAccountNumber();
      let accAgency = account.getAgency();
      return accNumber === accountNumber && accAgency === agency; 
    })

    if (!validAccount) {
      throw new Error ("Conta não encontrada")
    }

    if (value < 0) {
      throw new Error("Valor inválido de transferência");
    }

    if (this.balance - value > 0) {
      validAccount.setBalance(value);
      this.balance -= value;
      return "Transferência feita com sucesso";
    } else {
      throw new Error("Você não possui saldo suficiente");
    }
  }

  pix(value, pixKey, keyType) {
    const validAccount = Account.all.find(account => {
      return account.pixKeys[keyType] === pixKey;
    })
  
    if (!validAccount) {
      throw new Error ("Chave pix não encontrada")
    }

    if (value < 0) {
      throw new Error("Valor inválido de pix");
    }

    if (this.balance - value > 0) {
      this.balance -= value;
      validAccount.setBalance(value);
      return "Pix feito com sucesso";
    } else {
      throw new Error("Você não possui saldo suficiente");
    }
  }
}

module.exports = { PremiumAccount };
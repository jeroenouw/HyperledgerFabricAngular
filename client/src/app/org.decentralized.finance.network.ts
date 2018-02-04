import { Asset, Participant, Transaction, Event } from './org.hyperledger.composer.system';

// export namespace org.decentralized.finance.network {
  export class Coins extends Asset {
    coinsID: string;
    value: number;
    ownerID: string;
    ownerEntity: OwnerEntity;
  }

  export class Service extends Asset {
    serviceID: string;
    hours: number;
    value: number;
    ownerID: string;
    ownerEntity: OwnerEntity;
  }

  export class Cash extends Asset {
    cashID: string;
    currency: string;
    value: number;
    ownerID: string;
    ownerEntity: OwnerEntity;
  }

  export class Freelancer extends Participant {
    freelancerID: string;
    firstName: string;
    lastName: string;
    coins: Coins;
    cash: Cash;
    service: Service;
  }

  export class Bank extends Participant {
    bankID: string;
    name: string;
    coins: Coins;
    cash: Cash;
  }

  export class Client extends Participant {
    clientID: string;
    name: string;
    coins: Coins;
    service: Service;
  }

  export enum OwnerEntity {
    Resident,
    Bank,
    UtilityCompany
  }

  export class ServiceToCoins extends Transaction {
    serviceRate: number;
    serviceValue: number;
    coinsInc: Coins;
    coinsDec: Coins;
    serviceInc: Service;
    serviceDec: Service;
  }

  export class CashToCoins extends Transaction {
    cashRate: number;
    cashValue: number;
    coinsInc: Coins;
    coinsDec: Coins;
    cashInc: Cash;
    cashDec: Cash;
  }
// }

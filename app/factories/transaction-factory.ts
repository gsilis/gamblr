import type { TransactionType } from "~/types/transaction-type";
import { BET, WIN, BANK_ASSET, PAWN_ASSET } from "~/constants/transaction";

export default class TransactionFactroy {
  createBet(amount: number, description: string): TransactionType {
    return {
      category: BET,
      amount,
      description,
      created: new Date(),
    };
  }

  createWin(amount: number): TransactionType {
    return {
      category: WIN,
      amount,
      description: 'Winnings',
      created: new Date(),
    };
  }

  createBank(amount: number, description: string): TransactionType {
    return {
      category: BANK_ASSET,
      amount,
      description,
      created: new Date(),
    };
  }

  createPawn(amount: number, description: string): TransactionType {
    return {
      category: PAWN_ASSET,
      amount,
      description,
      created: new Date()
    };
  }
}
import { Injectable, NotFoundException } from '@nestjs/common';
import { Transaction } from './transaction.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel('Transaction')
    private readonly transactionModel: Model<Transaction>,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async insertTransaction(createTransactionDto: CreateTransactionDto) {
    const transaction = new this.transactionModel({ ...createTransactionDto });
    const result = await transaction.save();
    this.eventEmitter.emit('transaction.created', result);
    return result.id as string;
  }

  async getTransactions(page: number, limit: number) {
    const result = await this.transactionModel
      .find()
      .sort({ _id: -1 })
      .limit(limit)
      .skip((page - 1) * limit);
    const count = await this.transactionModel.count();
    return {
      totalTransactions: count,
      totalPages: Math.round(count / limit),
      transactions: result,
    };
  }

  async findTransaction(currencyFrom: string, type: string) {
    let transaction;
    try {
      transaction = await this.transactionModel
        .findOne({ currencyFrom, type })
        .sort({ _id: -1 });
    } catch (e) {
      throw new NotFoundException('Could not find transaction.');
    }

    if (!transaction) throw new NotFoundException('Could not find transaction');

    return transaction;
  }

  async findTransactionById(id: string) {
    return this.transactionModel.findById(id);
  }
  @Cron(CronExpression.EVERY_30_MINUTES, { name: 'fetch_live_transactions' })
  async fetchLiveTransactions() {
    const response = await fetch(
      `${process.env.BACKEND_URL}/live?access_key=${process.env.BACKEND_URL_ACCESS_KEY}&symbols=BTC,ETH,XRP`,
    );
    const data = await response.json();
    const result = [];
    for (const [key, value] of Object.entries(data.rates)) {
      const payload = {
        transactionDate: data.timestamp,
        currencyFrom: key,
        amount1: 1,
        currencyTo: data.target,
        amount2: value,
        type: 'LIVE_PRICE',
      };
      result.push(payload);
    }
    result?.forEach((transaction) => {
      this.insertTransaction(transaction);
    });
  }
}

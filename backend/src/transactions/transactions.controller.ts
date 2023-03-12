import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}
  @ApiCreatedResponse()
  @Post()
  async addTransaction(@Body() body: CreateTransactionDto) {
    const id = await this.transactionsService.insertTransaction(body);
    return { id };
  }

  @Get(':id')
  getTransactionById(@Param('id') id: string) {
    return this.transactionsService.findTransactionById(id);
  }
  @Get()
  async getAllTransactions(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return await this.transactionsService.getTransactions(page, limit);
  }

  @Get('rate')
  async getTransaction(
    @Query('currencyFrom') currencyFrom: string,
    @Query('type') type: string,
  ) {
    return await this.transactionsService.findTransaction(currencyFrom, type);
  }
}

import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
  @ApiProperty()
  transactionDate: string;
  @ApiProperty()
  currencyFrom: string;
  @ApiProperty()
  amount1: number;
  @ApiProperty()
  currencyTo: string;
  @ApiProperty()
  amount2: number;
  @ApiProperty()
  type: string;
}

import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class FindAllQuery {
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  skip: number;
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  take: number;
  //fix
  @IsOptional()
  cursor: Prisma.UserWhereUniqueInput;
  @IsOptional()
  where: Prisma.UserWhereInput;
  @IsOptional()
  orderBy: Prisma.UserOrderByWithRelationInput;
}

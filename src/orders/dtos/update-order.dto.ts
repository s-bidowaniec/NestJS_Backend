import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
export class UpdateOrderDTO {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  clientId: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  productId: string;
}

import { PartialType } from '@nestjs/mapped-types';
import { ProdutoDto } from './produto.dto';

export class UpdateProdutoDto extends PartialType(ProdutoDto) {}

import { Controller, Get, Post, Body, Patch, Param, Delete,Put } from '@nestjs/common';
import { ProdutosService } from './produtos.service';

import { UpdateProdutoDto } from './dto/update-produto.dto';
import { ProdutoDto } from './dto/produto.dto';

@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Post()
  async create(@Body() data: ProdutoDto) {
    return this.produtosService.create(data);
  }

  @Get()
  async findAll() {
    return this.produtosService.findAll();
  }

  @Put(":nome")
  async update(@Param("nome") nome:string, @Body() data:ProdutoDto) {
    return this.produtosService.update(nome, data);
  }

  @Get(':nome')
  async findOne(@Param('nome') nome: string) {
    return this.produtosService.findOne(nome);
  }

  @Delete(':nome')
  async remove(@Param('nome') nome: string) {
    return this.produtosService.remove(nome);
  }

  @Delete()
  async compra(@Body('data') nomes: string[]) {
    return this.produtosService.compra(nomes);
  }
}

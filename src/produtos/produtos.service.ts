import { Injectable } from '@nestjs/common';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { PrismaService } from 'src/database/PrismaService';
import { ProdutoDto } from './dto/produto.dto';

@Injectable()
export class ProdutosService {

  constructor(private prisma: PrismaService) {}
  
  existe (nome: string){
    return this.prisma.produto.findFirst({
      where: {
        nome: nome
      }
    })
  }

  async create(data: ProdutoDto) {

    //verificando se produto já existe
   
    const produtoExiste = await this.existe(data.nome);

    if (produtoExiste) {
      throw new Error('Não é possível criar produto com um nome já existente.')
    }
    
    data.preco=data.preco*100;

    const produto = await this.prisma.produto.create({
      data
    })

    return produto;
  }

  async findAll() {
    return this.prisma.produto.findMany();
  }

  async update(nome: string, data: ProdutoDto) {
    const produtoExiste = await this.existe(data.nome);

    if (!produtoExiste) {
      throw new Error('Não é possível atualizar um produto que NÃO EXISTE.')
    }

    data.preco=data.preco*100;

    return await this.prisma.produto.update({
      data,
      where: { 
        nome,
       },
    })

    
  }

  async findOne(nome: string) {
    const produtoExiste = await this.existe(nome);

    if (!produtoExiste) {
      throw new Error('Não é possível encontrar um produto que NÃO EXISTE.')
    }

    return produtoExiste;
  }

  async remove(nome: string) {
    const produtoExiste = await this.existe(nome);

    if (!produtoExiste) {
      throw new Error('Não é possível remover um produto que NÃO EXISTE.')
    }

    return await this.prisma.produto.delete({
      where: {
        nome,
      }
    })

  }

  async compra(nomes: string[]) {
    //Nesta atividade, por simplicidade, cada item possuirá apenas uma unidade
    //Assim não será necessário ter o campo quantidade, nem repetir produtos na base

    for (const nome of nomes) {
      const produtoExiste = await this.existe(nome);

      if (!produtoExiste) {
        throw new Error('Não é possível cocluir a compra pois o produto '+nome+' NÃO EXISTE.')
      }
      await this.remove(nome);
    }

    return nomes;
  }

}

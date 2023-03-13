declare namespace Express {//toda vez que o express garantir um request, ele vai adicionar essas propriedades amais
     interface Request {
      user: {
        id: Number;
        permissions?:number[];
        roles?:number[]
      };
      
    }
}
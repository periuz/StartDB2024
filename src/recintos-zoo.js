class RecintosZoo {
    constructor() {
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanho: 10, animais: [{ especie: 'MACACO', quantidade: 3 }] },
            { numero: 2, bioma: 'floresta', tamanho: 5, animais: [] },
            { numero: 3, bioma: 'savana e rio', tamanho: 7, animais: [{ especie: 'GAZELA', quantidade: 1 }] },
            { numero: 4, bioma: 'rio', tamanho: 8, animais: [] },
            { numero: 5, bioma: 'savana', tamanho: 9, animais: [{ especie: 'LEAO', quantidade: 1 }] }
        ];
    
        this.animais = {
            'GAZELA': { tamanho: 2, biomas: ['savana'], carnivoro: false },
            'HIPOPOTAMO': { tamanho: 4, biomas: ['savana', 'rio'], carnivoro: false },
            'CROCODILO': { tamanho: 3, biomas: ['rio'], carnivoro: true },
            'LEAO': { tamanho: 3, biomas: ['savana'], carnivoro: true },
            'LEOPARDO': { tamanho: 2, biomas: ['savana'], carnivoro: true },
            'MACACO': { tamanho: 1, biomas: ['savana', 'floresta'], carnivoro: false }
        };
      }
    
      analisaRecintos(animal, quantidade) {
        if (!this.animais[animal]) {
            return { erro: 'Animal inválido' };
        }
    
        if (quantidade <= 0 || !Number.isInteger(quantidade)) {
            return { erro: 'Quantidade inválida' };
        }
    
        const especie = this.animais[animal];
        const tamanhoNecessario = especie.tamanho * quantidade;
        let recintosViaveis = [];
    
        this.recintos.forEach((recinto) => {
          const { bioma, tamanho, animais } = recinto;
          const biomaAdequado = especie.biomas.includes(bioma);
    
          if (!biomaAdequado) return;
    
          const espacoOcupado = animais.reduce((acc, a) => {
            const espacoExtra = (animais.length > 0 && a.especie !== animal) ? 1 : 0;
            return acc + a.quantidade * this.animais[a.especie].tamanho + espacoExtra;
          }, 0);
    
          const espacoLivre = tamanho - espacoOcupado;

          console.log(`Recinto ${recinto.numero} tem ${espacoLivre} de espaço livre, e o espaço necessário é ${tamanhoNecessario}`);
    
          if (espacoLivre < tamanhoNecessario) return;
    
          const temCarnivoro = animais.some(a => this.animais[a.especie].carnivoro);
          const eCarnivoro = especie.carnivoro;
    
          if (eCarnivoro && animais.length > 0 && temCarnivoro) {
            const especieDiferente = animais.some(a => a.especie !== animal);
            if (especieDiferente) return; // carnívoros só podem ficar com a mesma espécie
          }
    
          if (animal === 'MACACO') {
            const temMacaco = animais.some(a => a.especie === 'MACACO');
            if (quantidade === 1 && !temMacaco) {
                return { erro: 'Macacos devem ser adicionados em grupos ou a recintos com outros macacos.' };
            }
            if (recinto.numero === 5) {
              return; // não incluir o recinto 5 se já houver macacos 
            }
          }
    
          if (animal === 'HIPOPOTAMO' && bioma !== 'savana e rio' && animais.length > 0) {
            return; // hipopótamos só toleram outras espécies no bioma savana e rio
          }
    
          recintosViaveis.push({
            numero: recinto.numero,
            espacoLivre: espacoLivre - tamanhoNecessario,
            tamanho: tamanho
          });
        });
    
        if (recintosViaveis.length === 0) {
          return { erro: 'Não há recinto viável' };
        }
    
        recintosViaveis.sort((a, b) => a.numero - b.numero);
    
        return {
          recintosViaveis: recintosViaveis.map(r => `Recinto ${r.numero} (espaço livre: ${r.espacoLivre} total: ${r.tamanho})`)
        };
      }
}

export { RecintosZoo as RecintosZoo };

# cli-debugger

Ferramenta cli com a finalidade de interpretar e configurar projetos em nodejs

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](https://choosealicense.com/licenses/mit/)

## Indice

- [Em desenvolvimento](#em-desenvolvimento)
- [Instalação](#instalação)
  - [Produção](#produção)
  - [Desenvolvimento](#desenvolvimento)
- [Estruntura do projeto](#estruntura-do-projeto)
  - [Diretorios importantes](#diretorios-inportantes)
- [Data](#data)

## Tecnologias ultilizadas

- [Node LTS](https://nodejs.org/en): runtime javasript,
- [Parcel](https://parceljs.org): empacotador de arquivos,
- [Ink](https://github.com/vadimdemedes/ink#readme): React para interface em terminal,

## Em desenvolvimento

- [ ] Input
  - [x] historico
  - [ ] autocompletar
- [ ] Menu de configurações
- [ ] Visualização do resultado da operação
  - [x] Strings /Number /Boolean
  - [x] Object
  - [ ] Array
  - [ ] Function

## Instalação

### Produção

```bash
    npm run build
    npm start
```

### Desenvolvimento

Abra um terminal para ler as modificaçãoes e refazer o buider de modo atomatico.

Execute:

```bash
    npm run watch
```

Depois abra outro terminal e execute o progama:

```bash
    npm start
```

>Caso queira fazer testes sem interferir o fluxo principal
>
>Crie um arquivo `/src/App.test.js` exportando um componente
>
>Este não é commitado e pode substituir o component `App.js` durante os testes
>
>Tambem, ao inves de executar o progama normalmente, execute:
>
>```bash
> npm run experiment
>```

## Estruntura do projeto

O projeto todo é estrunturado na pasta `/src`.

### Arquivos importantes

- `/src/cli.js`

    Primeiro arquivo interpretado ao rodar o projeto.

    Este faz as primeiras configurações e roda o render do `React`.

- `/src/App.js`

    Pincipal componente do projeto e o primeiro a ser renderizado.

    Este aclopa outros componentes e rege o fluxo do progama.

- `/src/cli.conf.js`

    Arquivo de configurações padrões.

- `/src/data.js`

    Amarzena dados do progama, [veja aqui](#data)

- `/src/serve.js`

    Ultilizado como instancia de um servidor que ira interpretar codigos nodejs

### Diretorios inportantes

Dentro de `/src` temos alguns diretorios importantes que seguem a seguinte estruntura:

- `/src/$DIRETORIO/`: diretorio principal à alguma funcionalidade do projeto,
  - `./src/*`: arquivos da funcinalidade,
  - `./index.js`: arquivo de indexação dos arquivos em `./src/*` ultilizado pelo projeto.

São os diretorios:

- `/src/components/`

    Componentes ultilizados pelo sistema.

- `/src/events/`

    Eventos que são emitidos durante o fluxo do progama
    Geralmente com a finalidade de integrar partes opostas

- `/src/hooks/`

    Hooks personalizados que podem ser reaproveitados entre componentes

- `/src/utils/`

    Funcoes personalizadas e independentes para abstrair melhor codigo

Caso queira saber mais sobre cada diretorio [veja aqui](#formato-dos-diretorios)

## Formato dos diretorios

### nomenclatura dos arquivos

| Arquivos       | Nomenclatura    |
|----------------|-----------------|
| **components** | UpperCamelCase  |
| **events**     | underscore_case |
| **hooks**      | camelCase       |
| **utils**      | camelCase       |

### exportando

Como o index para os arquivos é gerado, o uso da exportação `default` torna-se instavel.

Portanto, substitui-se `default` pela variavel `_`.

```javascript
    export const _ = /* funcionalidade */
```

Caso nescessario, de forma alternativa, podemos exportar mais de uma variavel.

```javascript
    export const aaa = /* funcionalidade 1*/
    export const bbb = /* funcionalidade 2*/
```

### importando

```javascript
    import { exemplo } from '/$DIRETORIO'; // exemplo._
```

> Os eventos, diferente dos demais, são expostos em uma instancia do `EventEmitter`.
>
> ```javascript
>   import { event } from '/events';
>
>   //...
>
>   event.emit('exemple');
> ```

## Data

Responsavel por armazenar dados e configurações durante o fluxo do progama

Expoem um objeto do qual cada campo referece a uma informação diferente

Por exemplo, suponhamos que exportamos um objeto `Exemplo` que armazena algumas configurações

```javascript
    //...

    export const exemplo = {

        // configurações...

    };

    //...
```

Podemos, então, utiliza-lo em qualquer outra parte do codigo somente importando o arquivo `/src/data`

```javascript
    import { exemplo } from '/data';

    //...
```

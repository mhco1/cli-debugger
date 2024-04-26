# cli-debugger

Ferramenta cli com a finalidade de interpretar e configurar projetos em nodejs

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](https://choosealicense.com/licenses/mit/)

## Indice

- [Tecnologias ultilizadas](#tecnologias-ultilizadas)
- [Em desenvolvimento](#em-desenvolvimento)
- [Instalação](#instalação)
  - [Produção](#produção)
  - [Desenvolvimento](#desenvolvimento)
- [Estruntura do projeto](#estruntura-do-projeto)
  - [Arquivos importantes](#arquivos-importantes)
  - [Diretorios importantes](#diretorios-inportantes)
- [Plugins](#plugins)
  - [resolvers/sourceTree](#resolverssourcetree)
- [Data](#data)

## Tecnologias ultilizadas

- [Node LTS](https://nodejs.org/en): runtime javasript,
- [Parcel](https://parceljs.org): empacotador de arquivos,
- [Ink](https://github.com/vadimdemedes/ink#readme): React para interface em terminal,

## Em desenvolvimento

- [ ] Input
  - [x] historico
  - [ ] autoexecutar
  - [ ] autocompletar
- [ ] Menu de configurações
- [ ] Visualização do resultado da operação
  - [x] Strings /Number /Boolean
  - [x] Object
  - [x] Array
  - [x] Function

## Instalação

### Produção

```bash
    npm run build
    npm start
```

### Desenvolvimento

Abra um terminal para ler as modificaçãoes e refazer o builder de modo atomatico.

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
>Então, ao inves de executar o progama normalmente, execute:
>
>```bash
> npm run experiment
>```

## Estruntura do projeto

O projeto é esrunturado apartir de `/app`;

Todos as partes que compoem o codigo do projeto estão estrunturadas em `/app/src`

### Arquivos importantes

- `/app/cli.js`

    Primeiro arquivo interpretado ao rodar o projeto.

    Este faz as primeiras configurações e roda o render do `React`.

- `/app/App.js`

    Pincipal componente do projeto e o primeiro a ser renderizado.

    Este aclopa outros componentes e rege o fluxo do progama.

- `/app/data.js`

    Amarzena dados do progama, [veja aqui](#data)

- `/app/serve.js`

    Ultilizado como instancia do servidor que ira interpretar codigos nodejs

### Diretorios inportantes

Dentro de `/src` temos alguns diretorios importantes

Os arquivos contidos em `/scr` são convertidos em objecto durante o `building` do projeto pelo plugin `resolvers/sourceTree`, para saber mais [veja aqui](#resolverssourcetree)

São os diretorios:

- `/app/src/components/`

    Componentes ultilizados pelo sistema.

- `/app/src/events/`

    Eventos que são emitidos durante o fluxo do progama
    Geralmente com a finalidade de integrar partes opostas

- `/app/src/hooks/`

    Hooks personalizados que podem ser reaproveitados entre componentes

- `/app/src/utils/`

    Funcoes personalizadas e independentes para abstrair melhor codigo

Para cada diretorio temos uma nomenclatura certa:

| Arquivos       | Nomenclatura    |
|----------------|-----------------|
| **components** | UpperCamelCase  |
| **events**     | underscore_case |
| **hooks**      | camelCase       |
| **utils**      | camelCase       |

## Plugins

### resolvers/sourceTree

Plugin com o objetivo de transpor a cadeia de arquivos e diretorios em `/app/src/` para uma arvore de objetos

O plugin interpreta arquivos e diretorios da seguinte forma:

- `diretorios`

    Objetos do qual cada arquivo contido é ulilizado como propriedade

- `arquivos`

    Objetos do qual cada export é uma propriedade caso não contenha um valor padrão exportado

```javascript
    import { File } from '~path/to/directory';
    // or
    import * as Diectory from '~path/to/directory';
```

#### Exemplo

Sistema de pastas:

- `/app/src`
  - `folder`
    - `folder2`
      - `ddd.js`
    - `bbb.js`
    - `ccc.js`
  - `aaa.js`

Codigo:

``` javascript
    import * as folder from '~folder'; // { folder2: {...}, bbb: ..., ccc: ...,  }
    import { bbb } from '~folder'; // import file /app/src/folder/bbb.js
    import { folder2 } from '~folder'; // { ddd: ... }
    import { ddd } from '~folder/folder2'; // import file /app/src/folder/folder2/ddd.js
    import aaa from '~aaa.js' // import file /app/src/aaa.js
```

#### Diretorio events

O diretorio `/app/src/events` é uma exeção;

Todos os arquivos contidos em `events` são interpretados como eventos e portanto devem retornar somente uma função como padrão

Ao importar `events`, estará importando, então, uma instancia de `EventEmitter` que roda por todo o aplicativo

> `events` não suporta importar diretorios e subdiretorios

```javascript
    import { event } from "~events";

    event.emit('File', /* args... */);
```

## Data

Responsavel por armazenar dados e configurações durante o fluxo do progama

Expoem um objeto do qual cada campo referece a uma informação diferente

Por exemplo, suponhamos que exportamos um objeto `Exemplo` que armazena algumas configurações

```javascript
    export const exemplo = {

        // configurações...

    };
```

Podemos, então, utiliza-lo em qualquer outra parte do codigo somente importando o arquivo `/app/src/data`

```javascript
    import { exemplo } from '~data.js';
```

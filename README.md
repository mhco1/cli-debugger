
# cli-debugger

Ferramenta cli com a finalidade de interpretar e configurar projetos em nodejs

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](https://choosealicense.com/licenses/mit/)

## Estruntura do projeto

Todos os arquivos que são utilizados pelo projeto estam localizados em `src` com a respectiva estruntura:

- `/src/cli.js`

    Primeiro arquivo interpretado pela ferramenta.
    Este faz as primeiras configurações e roda o render do `React`.

- `/src/App.js`

    Primeiro componente renderizado pelo arquivo cli.
    Pincipal componente da ferramenta.
    Este que aclopa outros componentes e rege o fluxo da ferramenta.

- `/src/cli.conf.js`

    Arquivo de configurações padrões interpretado por `/src/cli.js`.

### Diretorios com funcinalidades

Dentro de `/src` temos alguns diretorios importantes que seguem o determinado template:

- `/src/$NAME/*`: diretorio principal correspondente à alguma ultilidade do projeto,
  - `./src/*`: arquivos correspondente a tal utilidade,
  - `./index.js`: arquivo index ultilizado pelo projeto para importação dos arquivos.

São os diretorios (substitu-se `$NAME` pelo diretorio):

#### components

Comporta os componentes ultilizados pelo sistema.
Os componentes devem ser nomeados com PascalCase de acordo com a nomenclatura de componentes React.

O componente criado deve comportar a seguinte estruntura:

```javascript
    import React, {  } from 'react';
    // import {  } from 'ink';
    // import {  } from '@inkjs/ui';
    // ...

    export const _ = ({/* Props */}) => {
        
        // Codigo que roda durante a renderização...

        return <>
            {/* Componente */}
        </>
    }
```

E utilizado como o exemplo abaixo:

```javascript
import React, { } from 'react';
// import { } from 'ink';
// import { } from '@inkjs/ui';
import { Exemple } from '/components';
//...


export default ({/* Props */}) => {

    // Codigo que roda durante a renderização...

    return <>
        <Exemple />
    </>
}

```

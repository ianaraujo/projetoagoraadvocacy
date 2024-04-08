# <p align = "center"> Monitor de Proposições Legislativas </p>

<p align="center">
   <img src="https://www.butia.rs.leg.br/balanca.png/image_preview" width= 250/>
</p>

## Drescrição

Uma parte importante do trabalho em Relações Governamentais é o monitoramento de proposições legislativas, devido ao seu alto potencial de impacto sobre os segmentos econômicos, gerando riscos ou, talvez, oportunidades para os negócios. Este projeto visa ser uma ferramenta eficiente e intuitiva para que os usuários se mantenham informados sobre as mudanças e desenvolvimentos nas proposições legislativas que impactam suas áreas de interesse. 

#### Sendo possivel:

- Registrar proposições específicas que desejam monitorar.
- Realizar alterações em proposisções já cadastradas.
- Remover proposições do sistema quando necessário.

***

## Tecnologias
- ReactJS
- Django

***

## Pré-requisitos
Antes de rodar a aplicação, certifique-se de ter o seguinte instalado em sua máquina:

- [Node.js](https://nodejs.org/en/download/) e [npm](https://www.npmjs.com/):
Certique-se de ter o  Node.js e o npm (gerenciador de pacotes do Node.js) instalados.
- [Python](https://www.python.org/downloads/) e pip: Certifique-se de ter o Python 3.x e o pip (gerenciador de pacotes do Python) instalados.
- [Git](https://git-scm.com/downloads): Certifique-se de ter o Git instalado para clonar o repositório do projeto.


## 🏁 Rodando a aplicação

### Clone o Repositório:
Abra o terminal e execute o seguinte comando para clonar o repositório:

```
git clone https://github.com/V1T0R-CM/projetoagoraadvocacy.git
```

### Back-end (Django):
Navegue até a pasta do back-end:
```
cd projetoagoraadvocacy/back-end
```
Crie um ambiente virtual (opcional, mas recomendado):
```
python -m venv venv
venv\Scripts\activate
```
Instale as dependências:
```
pip install -r requirements.txt
```
Execute as migrações do banco de dados:
```
python manage.py migrate
```
Inicie o servidor Django:
```
python manage.py runserver
```
#### Desta forma o back-end estará disponível na porta http://localhost:8000
### Front-end (ReactJS):
Navegue até a pasta do front-end:
```
cd projetoagoraadvocacy/front-end
```
Instale as dependências:
```
npm install
```
Inicie o servidor de desenvolvimento:
```
npm start
```
#### Desta forma o back-end estará disponível na porta http://localhost:3000

***

## Rotas
### API

```json
POST /propositions/
    - Rota para cadastrar uma proposição legislativa.
    - body:
    {
        "name": "TP 0000/0000",
        "url": "https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=0",
        "KeyWords": ["palavra-chave 1","palavra-chave 2","palavra-chave 3"]
    }

    - Retorna:
    {
        "id": 1,
        "name": "TP 0000/0000",
        "url": "https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=0",
        "KeyWords": "[\"palavra-chave 1\", \"palavra-chave 2\", \"palavra-chave 3\"]"
    }
```

```json
GET /propositions/
    - Lista as proposições do banco. Não espera nada no corpo.
    - Retorna:
    [
        {
        "id": 1,
        "name": "TP 0000/0000",
        "url": "https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=0",
        "keyWords": "[\"palavra-chave 1\", \"palavra-chave 2\", \"palavra-chave 3\"]"

        },
        {
        "id": 2,
        "name": "TP 0001/0001",
        "url": "https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=01",
        "keyWords": "[\"palavra-chave 1\", \"palavra-chave 2\", \"palavra-chave 3\"]"

        },
        {
        "id": 3,
        "name": "TP 0002/0002",
        "url": "https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=02",
        "keyWords": "[\"palavra-chave 1\", \"palavra-chave 2\", \"palavra-chave 3\"]"
        }
    ]
```
```json
GET /propositions/:id
    - Rota para pegar dados de uma proposição legislativa pelo id. Não espera nada no corpo.
    - Retorna: 
    {
        "id": 2,
        "name": "TP 0001/0001",
        "url": "https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=01",
        "keyWords": "[\"palavra-chave 1\", \"palavra-chave 2\", \"palavra-chave 3\"]"
    }
``` 
```json
PUT /propositions/:id
    - Rota para editar dados de uma proposição legislativa pelo id.
    - body: 
    {
        "name": "TP 0002/0002",
        "url": "https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=01",
        "keyWords": ["palavra-chave 1","palavra-chave 2","palavra-chave 3"]
    }
    - Retorna:
    {
        "id": 2,
        "name": "TP 0002/0002",
        "url": "https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=01",
        "keyWords": "[\"palavra-chave 1\", \"palavra-chave 2\", \"palavra-chave 3\"]"
    }
``` 
```json
DELETE /propositions/:id
    - Rota para apagar dados de uma proposição legislativa pelo id. Não espera nada no corpo.
``` 

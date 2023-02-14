# MINI_BLOG
 Mini blog using react and firebase

# Anotações sobre hooks do react

## useState

- Permite gerenciar valores, podendo fazer consulta ou alterações de valor;
- Ele permite re-rendenrizar um componente, diferente de manipulação com variáveis;

**Declarando um useState**

```const [name, setName] = useState("");```

### Atrelando useState e inputs

- Ajuda na criação de formulários passando os valores do input para o useState através do evento onChange;
- Nesse caso a cada mudança no input o evento onChange altera o valor do useState re-renderizando em tempo real;

**Controlando useState dentro do input**

```<input type="text" value={name} onChange={(e) => setNome(e.target.value)} />```

## useReducer

- Tem a mesma função que o useState de gerenciar valores, porém podemos **executar uma função** na hora de alterar o valor;
- O useReducer recebe um **valor** para gerenciar e uma **função** para alterar este valor;

**Declarando um useReducer**

```
const [number, dispatch] = useReducer((state, action) => {
        // - number é o nome do state
        // - dispatch é o nome de onde executaremos a função para alterar o valor de number
        // - useReducer espera os argumentos state e action
        // - state é a referencia para o valor de number
        // - action é uma ação que pode ser usada ou não
})
```
- Para executar esse useReducer devemos usar a função **dispatch**

```<button onClick={dispatch}>Chamar função</button>```

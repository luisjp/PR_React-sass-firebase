import React, {Component} from 'react';

class MyComponent extends Component {
    render() {
        let recetas = {
            name: "Pizza",
            ingredientes: ['Tomate', 'Queso', 'Jamon'],
            calorias: 400,
        }
        return (
            <div className='myComponent'>
                <h1>{'Receta: ' +  recetas.name}</h1>
                <h1>{'Calorias: ' +  recetas.calorias}</h1>
                <ol>
                    {
                        recetas.ingredientes.map((ingrediente, i) => {
                            console.log(ingrediente);
                            return (
                                <li key={i}>{ingrediente}</li>
                            );
                        })
                    }
                </ol>
            </div>
        );
    }
}

export default MyComponent;
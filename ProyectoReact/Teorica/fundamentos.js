/*
-- La Programación Orientada a Objetos(POO)
    es un paradigma de programación que organiza el código en torno a "objetos",
    los cuales representan entidades o conceptos que agrupan tanto datos como comportamientos. 
    En POO, se utilizan clases para definir la estructura y el comportamiento de estos objetos, 
    y los objetos son instancias de esas clases.

Principios Fundamentales de la POO
    Encapsulamiento: 

*/

//---------------------------------------------------------------------------------------------
//-------------------------------------- Encapsulamiento --------------------------------------
//--------------------------------------------------------------------------------------------- 
// Se puede lograr utilizando varias técnicas, especialmente con la introducción de las clases en ES6 
// y el uso de closure para ocultar datos. Aquí te muestro un ejemplo utilizando clases, 
// donde se define atributos privados usando el símbolo #, que es una característica más reciente de JavaScript.

// ejemplo JS
class CuentaBancaria {
    // Atributo privado
    #saldo;

    constructor(titular, saldoInicial) {
        this.titular = titular; // Atributo público
        this.#saldo = saldoInicial; // Inicializamos el saldo
    }

    // Método público para consultar el saldo
    consultarSaldo() {
        return `Saldo disponible: $${this.#saldo}`;
    }

    // Método público para realizar un depósito
    depositar(cantidad) {
        if (cantidad > 0) {
            this.#saldo += cantidad;
            console.log(`Depósito realizado: $${cantidad}`);
        } else {
            console.log("La cantidad debe ser mayor que cero.");
        }
    }

    // Método público para realizar un retiro
    retirar(cantidad) {
        if (cantidad > 0 && cantidad <= this.#saldo) {
            this.#saldo -= cantidad;
            console.log(`Retiro realizado: $${cantidad}`);
        } else {
            console.log("Fondos insuficientes o cantidad no válida.");
        }
    }
}

// Ejemplo de uso
const cuenta = new CuentaBancaria("Juan Pérez", 1000);

// Consultar saldo
console.log(cuenta.consultarSaldo());

// Realizar un depósito
cuenta.depositar(500);
console.log(cuenta.consultarSaldo());

// Intentar hacer un retiro
cuenta.retirar(300);
console.log(cuenta.consultarSaldo());

// Intentar retirar más de lo disponible
cuenta.retirar(1500);

/*

--  Explicación
    Atributos Privados (#saldo): 
        El atributo #saldo es privado y solo puede ser accedido desde dentro de la clase CuentaBancaria.
    
    Métodos Públicos: 
        Los métodos consultarSaldo(), depositar() y retirar() son públicos y permiten interactuar con el saldo 
        de la cuenta de forma controlada.
    
        Control de Acceso: 
        Al hacer el saldo privado, evitamos que pueda ser modificado directamente desde fuera de la clase, 
        asegurando que solo se pueda cambiar a través de los métodos definidos.
*/

//---------------------------------------------------------------------------------------------
//--------------------------------------   Abstracción   --------------------------------------
//---------------------------------------------------------------------------------------------
//  La abstracción en JavaScript se puede implementar utilizando clases y funciones, 
//  similar a otros lenguajes de programación orientada a objetos. Con la llegada de las clases en ES6, 
//  se ha facilitado la creación de estructuras que representan conceptos abstractos.

//  ejemplo JS
// Clase base (abstracta)
class Vehiculo {
    constructor(marca, modelo) {
        this.marca = marca; // Atributo público
        this.modelo = modelo; // Atributo público
    }

    // Método abstracto (se lanzará un error si se llama directamente)
    encender() {
        throw new Error("Método 'encender()' debe ser implementado en la clase hija.");
    }

    // Método concreto
    mostrarInfo() {
        return `Marca: ${this.marca}, Modelo: ${this.modelo}`;
    }
}

// Clase derivada: Coche
class Coche extends Vehiculo {
    constructor(marca, modelo) {
        super(marca, modelo); // Llama al constructor de la clase base
    }

    // Implementación del método abstracto
    encender() {
        console.log("El coche está encendido.");
    }
}

// Clase derivada: Motocicleta
class Motocicleta extends Vehiculo {
    constructor(marca, modelo) {
        super(marca, modelo);
    }

    // Implementación del método abstracto
    encender() {
        console.log("La motocicleta está encendida.");
    }
}

// Ejemplo de uso
const coche = new Coche("Toyota", "Corolla");
const moto = new Motocicleta("Honda", "CBR");

console.log(coche.mostrarInfo()); // Salida: Marca: Toyota, Modelo: Corolla
coche.encender();                 // Salida: El coche está encendido.

console.log(moto.mostrarInfo());  // Salida: Marca: Honda, Modelo: CBR
moto.encender();                  // Salida: La motocicleta está encendida.

/*
Explicación:
    Clase Base (Vehiculo):
        La clase Vehiculo actúa como una clase abstracta que define los atributos marca y modelo, y proporciona un método concreto mostrarInfo().
        El método encender() es un método abstracto, lo que significa que se espera que las subclases lo implementen. Si se llama directamente desde la clase base, lanzará un error.

    Clases Derivadas (Coche y Motocicleta):
        Coche y Motocicleta son clases que heredan de Vehiculo.
        Cada clase proporciona su propia implementación del método encender().

    Ejemplo de Uso:
        Se crean instancias de Coche y Motocicleta, y se utilizan los métodos mostrarInfo() y encender() para interactuar con ellos.

    Beneficios de la Abstracción en JavaScript
        Simplicidad: Oculta los detalles complejos de la implementación y permite que el usuario interactúe con los objetos de manera sencilla.
        Reusabilidad: Las clases base abstractas pueden ser reutilizadas para crear diferentes implementaciones de las subclases.
        Flexibilidad: Cambiar la implementación en las subclases no afecta a otras partes del código que dependen de la clase base, siempre que se mantenga la misma interfaz.

    Este enfoque permite a los desarrolladores modelar el comportamiento de sus aplicaciones de una manera más estructurada y manejable.
*/

//--------------------------------------------------------------------------------------------
//--------------------------------------    Herencia    --------------------------------------
//--------------------------------------------------------------------------------------------
//  La herencia en JavaScript permite que una clase herede propiedades y métodos de otra clase. 
//  Esto promueve la reutilización del código y la creación de jerarquías de clases. En JavaScript, 
//  la herencia se puede implementar usando la palabra clave extends en clases, 
//  lo que es parte de la sintaxis de clases introducida en ECMAScript 2015 (ES6).

//  EJEMPLO JS

// Clase base (superclase)
class Animal {
    constructor(nombre) {
        this.nombre = nombre; // Atributo público
    }

    // Método que puede ser utilizado por las subclases
    hacerSonido() {
        console.log(`${this.nombre} hace un sonido.`);
    }
}

// Clase derivada: Perro
class Perro extends Animal {
    // Constructor de la clase derivada
    constructor(nombre) {
        super(nombre); // Llama al constructor de la clase base
    }

    // Sobrescribimos el método hacerSonido
    hacerSonido() {
        console.log(`${this.nombre} ladra.`);
    }
}

// Clase derivada: Gato
class Gato extends Animal {
    constructor(nombre) {
        super(nombre); // Llama al constructor de la clase base
    }

    // Sobrescribimos el método hacerSonido
    hacerSonido() {
        console.log(`${this.nombre} maúlla.`);
    }
}

// Ejemplo de uso
const miPerro = new Perro("Rex");
const miGato = new Gato("Miau");

miPerro.hacerSonido(); // Salida: Rex ladra.
miGato.hacerSonido();  // Salida: Miau maúlla.

/*

La herencia en JavaScript permite que una clase herede propiedades y métodos de otra clase. Esto promueve la reutilización del código y la creación de jerarquías de clases. En JavaScript, la herencia se puede implementar usando la palabra clave extends en clases, lo que es parte de la sintaxis de clases introducida en ECMAScript 2015 (ES6).

Ejemplo de Herencia en JavaScript
A continuación, se muestra un ejemplo donde se crea una clase base Animal y dos clases derivadas Perro y Gato que heredan de Animal.

javascript
Copiar código
// Clase base (superclase)
class Animal {
    constructor(nombre) {
        this.nombre = nombre; // Atributo público
    }

    // Método que puede ser utilizado por las subclases
    hacerSonido() {
        console.log(`${this.nombre} hace un sonido.`);
    }
}

// Clase derivada: Perro
class Perro extends Animal {
    // Constructor de la clase derivada
    constructor(nombre) {
        super(nombre); // Llama al constructor de la clase base
    }

    // Sobrescribimos el método hacerSonido
    hacerSonido() {
        console.log(`${this.nombre} ladra.`);
    }
}

// Clase derivada: Gato
class Gato extends Animal {
    constructor(nombre) {
        super(nombre); // Llama al constructor de la clase base
    }

    // Sobrescribimos el método hacerSonido
    hacerSonido() {
        console.log(`${this.nombre} maúlla.`);
    }
}

// Ejemplo de uso
const miPerro = new Perro("Rex");
const miGato = new Gato("Miau");

miPerro.hacerSonido(); // Salida: Rex ladra.
miGato.hacerSonido();  // Salida: Miau maúlla.
Explicación
Clase Base (Animal):

La clase Animal es la superclase que tiene un constructor que toma un nombre como parámetro.
El método hacerSonido() se define en esta clase y puede ser usado por las subclases.
Clases Derivadas (Perro y Gato):

Perro y Gato son clases que extienden de Animal.
Ambas clases llaman al constructor de Animal usando super(nombre) para inicializar el atributo nombre.
Cada clase sobrescribe el método hacerSonido() para proporcionar una implementación específica.
Ejemplo de Uso:

Se crean instancias de Perro y Gato, y se invoca el método hacerSonido(), mostrando el comportamiento específico de cada clase.
Beneficios de la Herencia en JavaScript
Reutilización de Código: Permite que las subclases reutilicen métodos y propiedades de la superclase, reduciendo la duplicación de código.
Organización: Facilita la organización del código en jerarquías claras, lo que hace que sea más fácil de entender y mantener.
Extensibilidad: Permite agregar nuevas funcionalidades o modificar comportamientos existentes en las subclases sin alterar la superclase.
Nota sobre Herencia Prototípica
JavaScript también soporta la herencia prototípica, donde las propiedades y métodos se pueden heredar a través de la cadena de prototipos. Sin embargo, la sintaxis de clases en ES6 hace que la herencia sea más clara y estructurada. Aquí tienes un ejemplo breve de herencia prototípica:
*/
// Constructor de la clase base
function Animal(nombre) {
    this.nombre = nombre;
}

// Método en el prototipo de Animal
Animal.prototype.hacerSonido = function() {
    console.log(`${this.nombre} hace un sonido.`);
};

// Constructor de la clase derivada
function Perro(nombre) {
    Animal.call(this, nombre); // Llama al constructor de Animal
}

// Establecer la herencia
Perro.prototype = Object.create(Animal.prototype);
Perro.prototype.constructor = Perro;

// Sobrescribir el método hacerSonido
Perro.prototype.hacerSonido = function() {
    console.log(`${this.nombre} ladra.`);
};

// Ejemplo de uso
const miPerro1 = new Perro("Rex");
miPerro.hacerSonido(); // Salida: Rex ladra.

//--------------------------------------------------------------------------------------------
//--------------------------------------    Polimorfismo    --------------------------------------
//--------------------------------------------------------------------------------------------  
/*
El polimorfismo en JavaScript es un principio de la programación orientada a objetos que permite que diferentes clases tengan métodos con el mismo nombre pero comportamientos diferentes. Esto es útil para crear estructuras flexibles y reutilizables, ya que un mismo método puede funcionar de manera distinta en cada clase derivada.

En JavaScript, el polimorfismo se logra principalmente mediante la herencia y la sobrescritura de métodos. Esto permite que el mismo método, definido en una clase base, tenga diferentes implementaciones en las clases derivadas.

Ejemplo de Polimorfismo en JavaScript
Vamos a crear una clase base Figura y dos clases derivadas Circulo y Rectangulo, cada una con un método calcularArea() que realiza cálculos específicos según el tipo de figura.
*/
// Clase base (superclase)
class Figura {
    calcularArea() {
        throw new Error("El método calcularArea() debe ser implementado en la clase derivada.");
    }
}

// Clase derivada: Círculo
class Circulo extends Figura {
    constructor(radio) {
        super();
        this.radio = radio;
    }

    calcularArea() {
        return Math.PI * Math.pow(this.radio, 2); // Área del círculo
    }
}

// Clase derivada: Rectángulo
class Rectangulo extends Figura {
    constructor(ancho, alto) {
        super();
        this.ancho = ancho;
        this.alto = alto;
    }

    calcularArea() {
        return this.ancho * this.alto; // Área del rectángulo
    }
}

// Ejemplo de uso de polimorfismo
const figuras = [
    new Circulo(5),
    new Rectangulo(4, 6)
];

figuras.forEach(figura => {
    console.log(`Área de la figura: ${figura.calcularArea()}`);
});
/*

Explicación
Clase Base (Figura):

La clase Figura define un método abstracto calcularArea(), que lanza un error si no se sobrescribe en las clases derivadas.
Clases Derivadas (Círculo y Rectángulo):

Circulo y Rectangulo heredan de Figura.
Ambas clases implementan el método calcularArea() de manera distinta, calculando el área según su forma geométrica.
Polimorfismo:

En el arreglo figuras, se guardan instancias de Circulo y Rectangulo.
Al iterar sobre el arreglo, se llama al método calcularArea() de cada figura. Gracias al polimorfismo, cada clase ejecuta su propia versión de calcularArea()*/
/*
Beneficios de la POO
    Modularidad:
        Facilita la organización del código en módulos y la colaboración entre desarrolladores.
        
    Reutilización: 
        Gracias a la herencia, puedes reutilizar código y reducir redundancias.

    Mantenibilidad: 
        Al estructurar el código en torno a objetos, es más fácil localizar y corregir errores.

    Extensibilidad: 
        Facilita la adición de nuevas funcionalidades sin afectar al código existente.

*/
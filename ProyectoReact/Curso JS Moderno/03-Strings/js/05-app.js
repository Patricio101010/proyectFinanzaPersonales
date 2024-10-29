const producto7 = "Monitor 20 pulgadas";

// .reemplace para reemplazar
console.log(producto7); 
console.log(producto7.replace('pulgadas','"')); 
console.log(producto7.replace('Monitor','Monitor curvo')); 

// .slice para cortar
console.log(producto7.slice(0,10)); 
console.log(producto7.slice(8)); 
console.log(producto7.slice(2,1)); 

// alternativa slice
console.log(producto7.substring(0,10)); 
console.log(producto7.substring(8)); 
console.log(producto7.substring(2,1)); 


const usuario ="Juan";
console.log(usuario.substring(0,1));
console.log(usuario.charAt(9)); 
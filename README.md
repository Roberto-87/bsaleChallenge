
# Hi, I'm Roberto! 👋 

🚀 I'm a full stack developer 
## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://portfolio-basic-roberto-ochoa.vercel.app/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/roberto-ochoa-dev/)


# Bsale Challenge- API de Simulación de Check-in Automático 
La API de Simulación de Check-in Automático de Andes Airlines es una API REST que proporciona un único endpoint para consultar el ID de un vuelo y obtener la simulación de un proceso de check-in automático para los pasajeros de la aerolínea.

## Objetivo
El objetivo de esta tarea es crear una API REST que brinde la funcionalidad de consultar el check-in de pasajeros para un vuelo específico. La API debe contar con un solo endpoint que permita realizar esta consulta.

La implementación de la API puede realizarse utilizando cualquier lenguaje de programación y/o framework de preferencia. Además, se proporcionará una base de datos de solo lectura que contiene toda la información necesaria para la simulación.

Es importante tener en cuenta que el servidor está configurado para abortar las conexiones inactivas que superen los 5 segundos. Por lo tanto, se requerirá implementar un control de reconexión para mantener la conexión activa durante la simulación del check-in.




## Solución
Se buscó mantener el desarrollo modularizado entre la ruta y los controladores para una mejor organización y escalabilidad del código.

El proceso de simulación de check-in automático se lleva a cabo mediante la asignación de asientos a los pasajeros. Para ello, se sigue un enfoque basado en dos criterios:

1- Ubicación de menores de 18 años junto a adultos con el mismo purchaseId: Se busca agrupar a los pasajeros menores de 18 años con adultos que compartan el mismo ID de compra (purchaseId). Esto permite garantizar que los menores estén cerca de sus acompañantes adultos durante el vuelo.

2- Ubicación cercana de adultos con el mismo purchaseId: Una vez asignados los grupos de pasajeros menores de 18 años con adultos, se busca ubicar a los adultos con el mismo purchaseId en asientos cercanos entre sí. Esto facilita la interacción y comunicación entre los pasajeros que viajan juntos.

Mediante este enfoque de asignación de asientos, se busca optimizar la experiencia de viaje de los pasajeros y mejorar su comodidad durante el vuelo.
## Installation

Clonar el proyecto

```bash
 $ git clone https://github.com/Roberto-87/bsaleChallenge.git
```
Ir al directorio del proyecto

```bash
 $ cd challenge-bsale
```
Instalar las dependencias
```bash
 $ npm install
```
Levantar el servidor local
```bash
 $ npm start
```
## Environment Variables
Para poder correr este proyecto, tendrás que agregar las siguientes credenciales al archivo .env

`HOST`

`USER`

`PASSWORD`

`DATABASE`



Ir a la ruta 
```bash
 http://localhost:3001/flights/1/passengers
```

## Tech Stack


 **Server:** Node, Express, railway


## Uso
Una vez que la API esté configurada y en funcionamiento, puedes utilizar el siguiente endpoint para realizar consultas:

Método: GET

Endpoint: /flights/:flightId/passengers


Parámetros de la solicitud
flightId (obligatorio): El ID del vuelo para el cual se desea simular el check-in automático de los pasajeros.
Ejemplos de solicitud
Puedes realizar consultas a la API utilizando la siguiente estructura de URL:

https://bsalechallenge-production.up.railway.app/flights/:flightId/passengers

Reemplaza :flightId con el ID numérico correspondiente al vuelo que deseas consultar. Por ejemplo:

-Consultar el check-in automático para el vuelo con ID 1:

```bash
 $ GET /flights/1/passengers
```

-Consultar el check-in automático para el vuelo con ID 2:

```bash
 $ GET /flights/2/passengers
```
-Consultar el check-in automático para el vuelo con ID 3:
```bash
 $ GET /flights/3/passengers
```
Respuesta
La API responderá con una estructura de respuesta en el siguiente formato:

## Respuesta exitosa:

```bash
 {
  "code": 200,
  "data": {
    "flightId": 3,
    "takeoffDateTime": 1688766182,
    "takeoffAirport": "Aeropuerto El Tepual, Chile",
    "landingDateTime": 1688772962,
    "landingAirport": "Aeropuerto Internacional Arturo Merino Benitez, Chile",
    "airplaneId": 2,
    "passengers": [
      {
        "passengerId": 74,
        "dni": "734821209",
        "name": "Ana",
        "age": 36,
        "country": "México",
        "boardingPassId": 289,
        "purchaseId": 6,
        "seatTypeId": 1,
        "seatId": 161
      },
      ...
    ]
  }
}

```

## Error:
```bash
{
  "code": 404,
  "data": { }
}
```
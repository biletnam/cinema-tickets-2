# Cinema tickets

## Development

This project uses Eslint with the standart configuration.

## Running

```
git clone https://github.com/xella/cinema-tickets.git
npm install
```

Then you need to seed the database with `npm run seed`. 
And  run `node index.js`.

Don't forget to run mongoDB.
Ajust the connection settings in `database-connection.js`.

## Testing
Run `npm test`.

## API Documentation

Can be found here: https://cinematickets.docs.apiary.io/

## Features

- The application lists seats in the theater that customers can choose.
- There are two categories of seats with different prices.
- A customer can pick a seat and that seat is reserved for 3 minutes for the customer until they book it.
- A customer can book the selected seat by paying its designated price.
- Once a seat is reserved/booked, no other customer can reserve/book it.
- Each customer initially has the same amount of funds.
- Users and Seats created by seed.

## TODO

- A customer can only reserve/book one seat.
- There are some missing tests, especially 3 minutes gap before booking is not covered.
- Cinema halls can be created out of the seats.
- More categories of seats can be added.
- A user profile can be created, that will make reservation and booking process more friendly. There will be no need to send user id as a parameter.
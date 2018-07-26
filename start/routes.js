'use strict';


const Route = use('Route');

Route.get('/', ({ request }) => {
  return { greeting: 'Hello world in JSON' };
});
Route.get('/home/airports','AirportController.index');
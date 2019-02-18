'use strict';
const Route = use('Route');

Route.get('/', 'HomeController.index');
Route.post('/sendContact','HomeController.contact');
Route.any('*','HomeController.index');


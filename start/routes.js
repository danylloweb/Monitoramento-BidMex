'use strict';


const Route = use('Route');

Route.get('/', ({ request }) => {
  return { greeting: 'Hello world in JSON' };
});

Route.post('/oauth/token','AuthController.authenticate');
Route.get('/test/buscador','BuscaAereoController.index').middleware(['auth']);
Route.get('/test/crawler','CrawlerController.index').middleware(['auth']);
Route.post('/user/register','AuthController.register').middleware(['auth']);

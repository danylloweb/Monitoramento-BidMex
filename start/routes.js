'use strict';


const Route = use('Route');

Route.get('/', ({ request }) => {
  return { greeting: 'Hello world in JSON' };
});
Route.get('/test/buscador','BuscaAereoController.index');
Route.get('/test/crawler','CrawlerController.index');
Route.get('/test/user','BuscaAereoController.createIssue');
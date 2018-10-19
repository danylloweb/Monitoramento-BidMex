'use strict';
const Route = use('Route');


Route.get('/', ({ view }) => {
  return view.render('home')
});

Route.post('/oauth/token','AuthController.authenticate');
Route.get('/oauth/revoke-token','AuthController.revokeToken').middleware(['auth']);
Route.get('/oauth/revoke-tokens-all','AuthController.revokeAllTokens').middleware(['auth']);
Route.get('/buscaaereo/back-end','BuscaAereoController.GatewayBuscador').middleware(['auth']);
Route.get('/buscaaereo/Manager','BuscaAereoController.GatewayManager').middleware(['auth']);
Route.get('/crawler','CrawlerController.index').middleware(['auth']);
Route.get('/crm','CrmController.index').middleware(['auth']);
Route.get('/financial','FinanceiraController.index').middleware(['auth']);
Route.post('/user/register','AuthController.register').middleware(['auth']);
Route.get('/user/logged','BuscaAereoController.usersLoggedIn').middleware(['auth']);
Route.get('/user/lastLogin/:id','BuscaAereoController.lastLogin').middleware(['auth']);

Route.any('*', ({ view }) => view.render('home'));
'use strict';
const Route = use('Route');


Route.get('/', ({ view }) => {
  console.log('request');
  return view.render('home')
});
// Auth provider
Route.post('/user/register','AuthController.register');
Route.post('/oauth/token','AuthController.authenticate');
Route.get('/oauth/revoke-token','AuthController.revokeToken').middleware(['auth']);
Route.get('/oauth/revoke-tokens-all','AuthController.revokeAllTokens').middleware(['auth']);
// Teste de funcionamento 
Route.get('/buscaaereo/back-end','BuscaAereoController.GatewayBuscador').middleware(['auth']);
Route.get('/buscaaereo/Manager','BuscaAereoController.GatewayManager').middleware(['auth']);
Route.get('/crawler','CrawlerController.index').middleware(['auth']);
Route.get('/crm','CrmController.index').middleware(['auth']);
Route.get('/financial','FinanceiraController.index').middleware(['auth']);
// Usuarios logados 
Route.get('/users/logged','BuscaAereoController.usersLoggedIn').middleware(['auth']);
Route.get('/user/getLastLogin','BuscaAereoController.lastLogin').middleware(['auth']);
// ApiGateway
Route.post('/issues/store','IssueController.store').middleware(['auth']);
Route.get('/issues','IssueController.index').middleware(['auth']);
Route.get('/issuesByEmissionId','IssueController.issuesByEmission').middleware(['auth']);
// Direto no busca
Route.get('/lateOps','EmissionController.index').middleware(['auth']);
Route.get('/lateOpsFinancial','EmissionController.index').middleware(['auth']);
Route.get('/dashboards/search-count','EmissionController.index').middleware(['auth']);
Route.get('/dashboards/op-count','EmissionController.index').middleware(['auth']);
Route.get('/companies','EmissionController.index').middleware(['auth']);

Route.any('*', ({ view }) => view.render('home'));
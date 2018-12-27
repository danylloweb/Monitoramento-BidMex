'use strict';
const Route = use('Route');


Route.get('/', ({ view }) => {
  console.log('request');
  return view.render('home')
});
// Auth provider
Route.post('/user/register','AuthController.register').middleware(['auth']);
Route.get('/users','AuthController.users').middleware(['auth']);
Route.post('/admit/occurrence','OccurrenceController.admitOccurrence').middleware(['auth']);
Route.post('/oauth/token','AuthController.authenticate');
Route.get('/oauth/revoke-token','AuthController.revokeToken').middleware(['auth']);
Route.get('/oauth/revoke-tokens-all','AuthController.revokeAllTokens').middleware(['auth']);
// Teste de funcionamento 
Route.get('/buscaaereo/back-end','BuscaAereoController.GatewayBuscador');
Route.get('/buscaaereo/Manager','BuscaAereoController.GatewayManager');
Route.get('/crawler','CrawlerController.index');
Route.get('/crm','CrmController.index');
Route.get('/financial','FinanceiraController.index');
// Usuarios logados 
Route.get('/users/logged','BuscaAereoController.usersLoggedIn');
Route.get('/user/getLastLogin','BuscaAereoController.lastLogin');

Route.post('/issues/store','IssueController.store');
Route.post('/occurrence/store','OccurrenceController.store');
Route.post('/occurrence/updateStatus','OccurrenceController.updateStatus');
Route.get('/occurrences','OccurrenceController.index');
Route.get('/issues','IssueController.index');
Route.get('/issuesByEmissionId','IssueController.issuesByEmission');
// Direto no busca
<<<<<<< HEAD
Route.get('/firstOpAgency','EmissionController.index');
Route.get('/lateOps','EmissionController.index');
Route.get('/lateOpsFinancial','EmissionController.index');
Route.get('/dashboards/search-count','EmissionController.index');
Route.get('/dashboards/op-count','EmissionController.index');
Route.get('/companies','EmissionController.index');
Route.get('/averageEmissionTime','EmissionController.index');
Route.get('/jira','OccurrenceController.getJira');
Route.put('/companies/emission-status/:id','EmissionController.updateStatus');

Route.any('*', ({ view }) => view.render('home'));
=======
Route.get('/lateOps','EmissionController.index').middleware(['auth']);
Route.get('/lateOpsFinancial','EmissionController.index').middleware(['auth']);
Route.get('/dashboards/search-count','EmissionController.index').middleware(['auth']);
Route.get('/dashboards/op-count','EmissionController.index').middleware(['auth']);
Route.get('/companies','EmissionController.index').middleware(['auth']);
Route.get('/averageEmissionTime','EmissionController.index').middleware(['auth']);
// Testando Front-End
Route.get('/front-tests/buscaaereo','FrontTestsController.testBuscaAereo').middleware(['auth']);
Route.any('*', ({ view }) => view.render('home'));
>>>>>>> cd51e43becf06210bf05b3d00893225c12f4c1c3

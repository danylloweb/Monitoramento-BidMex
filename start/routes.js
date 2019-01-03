'use strict';
const Route = use('Route');

Route.get('/', ({ view }) => { return view.render('home') });
// Auth provider
Route.post('/user/register','AuthController.register').middleware(['auth']);
Route.get('/users','AuthController.users').middleware(['auth']);
Route.post('/admit/occurrence','OccurrenceController.admitOccurrence').middleware(['auth']);
Route.post('/oauth/token','AuthController.authenticate');
Route.get('/oauth/revoke-token','AuthController.revokeToken').middleware(['auth']);
Route.get('/oauth/revoke-tokens-all','AuthController.revokeAllTokens').middleware(['auth']);
// Teste de funcionamento 
Route.get('/buscaaereo/back-end','ApigatewayController.GatewayBuscador');
Route.get('/buscaaereo/Manager','ApigatewayController.GatewayManager');
Route.get('/crawler','CrawlerController.index');
Route.get('/providers/report-status','CrmController.index');
Route.get('/crm','ApigatewayController.GatewayBuscador');
Route.get('/financial','FinanceiraController.index');
// Usuarios logados 
Route.get('/users/logged','ApigatewayController.usersLoggedIn');
Route.get('/user/getLastLogin','ApigatewayController.lastLogin');

Route.post('/issues/store','IssueController.store');
Route.post('/agencyLogStatus/store','AgencyLogStatusController.store').middleware(['auth']);
Route.get('/agencyLogStatus','AgencyLogStatusController.index').middleware(['auth']);
Route.post('/occurrence/store','OccurrenceController.store');
Route.post('/occurrence/updateStatus','OccurrenceController.updateStatus');
Route.get('/occurrences','OccurrenceController.index');
Route.get('/issues','IssueController.index');
Route.get('/issuesByEmissionId','IssueController.issuesByEmission');
// Direto no busca
Route.get('/firstOpAgency','BuscaaereoController.index');
Route.get('/ops/send/:id','BuscaaereoController.index');
Route.get('/lateOps','BuscaaereoController.index');
Route.get('/lateOpsFinancial','BuscaaereoController.index');
Route.get('/dashboards/search-count','BuscaaereoController.index');
Route.get('/dashboards/op-count','BuscaaereoController.index');
Route.get('/companies','BuscaaereoController.index');
Route.get('/goals','BuscaaereoController.index');
Route.get('/averageEmissionTime','BuscaaereoController.index');
Route.get('/jira','OccurrenceController.getJira');
Route.put('/companies/emission-status/:id','BuscaaereoController.updateStatus');
Route.get('/front-tests/buscaaereo','FrontTestsController.testBuscaAereo').middleware(['auth']);
Route.any('*', ({ view }) => view.render('home'));


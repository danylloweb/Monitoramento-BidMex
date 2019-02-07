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
Route.post('/issues/store','IssueController.store');
Route.post('/occurrence/store','OccurrenceController.store');
Route.post('/occurrence/updateStatus','OccurrenceController.updateStatus');
Route.get('/occurrences','OccurrenceController.index');
Route.get('/issues','IssueController.index');
Route.get('/jira','OccurrenceController.getJira');
Route.get('/front-tests/buscaaereo','FrontTestsController.testBuscaAereo').middleware(['auth']);
Route.any('*', ({ view }) => view.render('home'));


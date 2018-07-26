'use strict';
const client = use('request-promise');
/**
 * Resourceful controller for interacting with airports
 */
class AirportController {

  /**
   * Show a list of all airports.
   * GET airports
   */
  async index ({ response }) {

    try{
        const body = await client({
          url: 'https://gateway.buscaaereo.com.br/api/home/airports',
          headers: {
            Accept:'application/json',
            Authorization:'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImIyY2U5NjdiMzNlNTc3M2JlYzc3NWVhYzBjNmRiOTJhYjM2NmMxODU2MDk1OTkwZTM0OTU4MzdhMGNmNjJjMGFiOTZiMjYyMGEzY2ZmYmQ3In0.eyJhdWQiOiIxNiIsImp0aSI6ImIyY2U5NjdiMzNlNTc3M2JlYzc3NWVhYzBjNmRiOTJhYjM2NmMxODU2MDk1OTkwZTM0OTU4MzdhMGNmNjJjMGFiOTZiMjYyMGEzY2ZmYmQ3IiwiaWF0IjoxNTMyNjI2MjMwLCJuYmYiOjE1MzI2MjYyMzAsImV4cCI6MTUzMjY1NTAzMCwic3ViIjoiMTkxMiIsInNjb3BlcyI6WyIqIl19.j-utqrmJ7_tDYhPV39kDQxX8asBlVD848rcdY44JtVdcB5U-0csXkWkq0is4vMHyWeCbfZPQBcu4tpxy0jXkplSa5Gz_ccQFtVt6ssFy2S1_bNojvP0FzLI26Pm0YVuF5S7baDuM_Ppt029wf-qQjMAOuUN7hcmx84rK71nQwIOLudPRole7DxOvzFBk3BSXItBslIQkik5ngUrt5On5G8yI55MbF9KzZDUKnDAxBgs-WNFmw6bBuv5XyZi1OJ-jTZrhJy83V361doM00DonnKFuVxcMJKCUrs-VEk1InSxTRPyhVE_szWsgjTMjX8zXHGVcQQ25CeGSY4NOENdHtSVUFx_eSGH4pvfBXWskUVDnomRGBIs4jhowhgI-E4pfvKeG3lpXDOfZ6y9SqoKysCgeVLaJOwWTGLjdqaR1v9Y25DN3Ckw7xyZuuA5_RTdrpA4-QDN9eS942z2NAuXnCdEznaN-hKtTqTuObDrL1Z8tnrtfyiAXdgpc63iQ7N5aeRwzLrTeQia2EvnxpizUKzB9GpZPdPuXH9wqLoFiuMb6aTN5HkzqoOZc38PiELv4Jir5KpkGw4VoCEopmJYGhpmGYJwbuYc-QSGSg3sKgHfAmlPgwkif8PXCXZC3bAGJnPluqSLCFF3YA1EXze5EYX3iEpzK6fgFAiJSPZfr7ZA'
          },
          method: 'GET'
        });
        return response.json(body);

    }catch(e){
        return response.status(400).json({error: true});
    }
  }

}

module.exports = AirportController;

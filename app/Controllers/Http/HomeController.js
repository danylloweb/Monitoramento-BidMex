'use strict';
const View    = use('View');
const Contact = use('App/Models/Contact');
const Cache   = use('Cache');
class HomeController {


    async index(){
        return await Cache.remember('home', 500, async() => {
        const resume_keo = "Roteador wireless 300 Mbps";
        const brand_keo = "Keo";
        const brand_tenda = "Tenda";
        const link_tenda = "https://www.tendacn.com/en/product/n301.html";
        const link_keo = "http://www.keo.com.br/produtos/roteador-klr-301";
        const resume_tenda = "Wireless N300 Easy Setup Router N301";
        const description_keo = "O roteador Wi-Fi KLR 301 fornece uma solução completa para redes domésticas. Com ele é possível compartilhar o acesso à internet com diversos dispositivos emuma rede sem fio. Sua instalação e gerenciamento podem ser feitos através dainterface web, de forma rápida e fácil.";
        const description_tenda = "O N301 Wireless N300 Easy Setup Router foi projetado para ser configurado com mais facilidade para o usuário doméstico. Ele está em conformidade com IEEE802.11n, oferece velocidades sem fio de até 300Mbps, tornando-o perfeito para atividades da Web cotidianas, como e-mail, bate-papo, streaming de vídeos, jogos on-line e muito mais.";

        const cards = [
            { name: "Keo KLR 301", src: '/images/KLR_301_front.png', resume: resume_keo, description: description_keo, link: link_keo, brand: brand_keo },
            { name: "Keo KLR 301", src: '/images/KLR_301_lat_dir.png', resume: resume_keo, description: description_keo, link: link_keo, brand: brand_keo },
            { name: "Keo KLR 301", src: '/images/KLR_301_persp_dir.png', resume: resume_keo, description: description_keo, link: link_keo, brand: brand_keo },
            { name: "Keo KLR 301", src: '/images/KLR_301_persp_esq.png', resume: resume_keo, description: description_keo, link: link_keo, brand: brand_keo },
            { name: "Tenda N301", src: '/images/71i4mQAUgXL._SY550_.jpg', resume: resume_tenda, description: description_tenda, link: link_tenda, brand: brand_tenda },
            { name: "Tenda N301", src: '/images/150_0_20180409132719.jpg', resume: resume_tenda, description: description_tenda, link: link_tenda, brand: brand_tenda },
            { name: "Tenda N301", src: '/images/6494690_20f4d090-93d4-490d-a91c-2ce5d408d68a.jpg', resume: resume_tenda, description: description_tenda, link: link_tenda, brand: brand_tenda },
            { name: "Tenda N301", src: '/images/verso-roteador-tenda-wireless-n301-branco.jpg', resume: resume_tenda, description: description_tenda, link: link_tenda, brand: brand_tenda }
        ];
            return View.render('home',{cards:cards});
        });

    }

    /**
     *
     * @param request
     * @param response
     * @returns {*}
     */
    async contact({request, response}){

        let data = request.only([
            'email',
            'message',
            'name',
            'phone',
            'subject'
        ]);
        const contact = await Contact.create(data);
        return response.json(contact);

    }
}

module.exports = HomeController;

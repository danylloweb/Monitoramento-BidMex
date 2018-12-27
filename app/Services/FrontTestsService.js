const Env            = use('Env');
const moment         = use('moment');
const _              = use('lodash');
const puppeteer      = use('puppeteer');
const URL_BUSCA      = Env.get('URL_BUSCA', 'https://buscaaereo.com.br/#/');
const EMAIL_BUSCA    = Env.get('EMAIL_BUSCA', 'danilopedrosa@mangue3.com');
const PASSWORD_BUSCA = Env.get('PASSWORD_BUSCA', 'lourivaldoviado');


class FrontTestsService {

    constructor() {
        this.config = {
            after_15_days: false,
            loops: 1,
            round_trip: true,
            companies: {
                avianca: true,
                tam: true,
                gol: true,
                azul: true
            }
        };
    }

    /**
     *
     * @param page
     * @returns {Promise<void>}
     */
    async byPassHeadlessDetection(page) {

        // Burlas test de webdriver
        await page.evaluateOnNewDocument(() => {
            Object.defineProperty(navigator, 'webdriver', {
                get: () => false
            });
        });

        // Burlar teste de chrome
        await page.evaluateOnNewDocument(() => {
            window.chrome = {
                runtime: {}
            };
        });

        // Burlar teste de permissões
        await page.evaluateOnNewDocument(() => {
            const originalQuery = window.navigator.permissions.query;
            window.navigator.permissions.__proto__.query = parameters =>
                parameters.name === 'notifications'
                    ? Promise.resolve({state: Notification.permission})
                    : originalQuery(parameters);

            const oldCall = Function.prototype.call;

            function call() {
                return oldCall.apply(this, arguments);
            }

            Function.prototype.call = call;

            const nativeToStringFunctionString = Error.toString().replace(/Error/g, "toString");
            const oldToString = Function.prototype.toString;

            function functionToString() {
                if (this === window.navigator.permissions.query) {
                    return "function query() { [native code] }";
                }
                if (this === functionToString) {
                    return nativeToStringFunctionString;
                }
                return oldCall.call(oldToString, this);
            }

            Function.prototype.toString = functionToString;
        });

        // Burlar teste de tamanho de plugins
        await page.evaluateOnNewDocument(() => {
            // Sobreescreve a propriedade `plugins` , para usar  um getter personalizado.
            Object.defineProperty(navigator, 'plugins', {
                // So precisa ter `length > 0`
                get: () => [1, 2, 3, 4, 5]
            });
        });

        // Burlar teste de  Linguagem.
        await page.evaluateOnNewDocument(() => {
            // Sobreescreve a propriedade `plugins` , para usar  um getter personalizado.
            Object.defineProperty(navigator, 'languages', {
                get: () => ['en-US', 'en']
            });
        });

        // Burlar teste de iframe
        await page.evaluateOnNewDocument(() => {
            Object.defineProperty(HTMLIFrameElement.prototype, 'contentWindow', {
                get: function () {
                    return window;
                }
            });
        });

        // Burlar teste toString, ( quebra console.debug() )
        await page.evaluateOnNewDocument(() => {
            window.console.debug = () => {
                return null;
            };
        });
    };


    /**
     *
     * @param page
     * @returns {Promise<void>}
     */
    async go(page) {
        console.log('Entrou go');
        await page.goto(URL_BUSCA);
    };

    /**
     *
     * @param page
     * @returns {Promise<void>}
     */
    async login(page) {
        console.log('Entrou login');
        await page.click('div.button-enter button.btn-defaut');
        await page.type('input[type="email"]', EMAIL_BUSCA);
        await page.type('input[type="password"]', PASSWORD_BUSCA);
        await page.click('div.action-login button.b-btn.b-btn-default.btn-block');
    };


    /**
     *
     * @param page
     * @returns {Promise<void>}
     */
    async openSearch(page) {
        console.log('Entrou openSearch');
        await page.waitFor(1000);
        await page.waitForSelector('#banner-home');
        //go to search page
        await page.evaluate(() => {
            const elements = Array.from(document.querySelectorAll('a')).filter(a => /BUSCAR PASSAGENS/.test(a.innerText));
            elements[0].className += "btn-busca-nightmare";
        });
        await page.click('.btn-busca-nightmare')
    };


    /**
     *
     * @param page
     * @param after_15_days
     * @param companies
     * @returns {Promise<void>}
     */
    async search(page, after_15_days, companies) {
        console.log('entrou search');
        const date_starting = after_15_days ? 16 : 1;
        const date_back = after_15_days ? 18 : 3;

        await page.waitFor(4000);
        await page.type('fieldset.origin-destination.col-xs-12 > label:nth-child(1) > div > div > input', 'REC');
        await page.waitForSelector('fieldset.origin-destination.col-xs-12 > label:nth-child(1) > div > div > ul > li:nth-child(1)');
        await page.click('fieldset.origin-destination.col-xs-12 > label:nth-child(1) > div > div > ul > li:nth-child(1)');
        await page.waitFor(200);
        await page.type('fieldset.origin-destination.col-xs-12 > label:nth-child(2) > div > div > input', 'SAO');
        await page.waitForSelector('fieldset.origin-destination.col-xs-12 > label:nth-child(2) > div > div > ul > li:nth-child(1)');
        await page.click('fieldset.origin-destination.col-xs-12 > label:nth-child(2) > div > div > ul > li:nth-child(1)');
        await page.type('#date_starting', moment().add(date_starting, 'day').format('DD/MM/YYYY'));
        await page.type('#date_back', moment().add(date_back, 'days').format('DD/MM/YYYY'));
        await _.forEach(companies, async (value, company) => {
            !value && await page.click(`.logo-${company}`);

        });
        await page.waitFor(200);
        await page.click('#btn-buscar-voos');
        await page.waitFor(1000);
        await page.click('#close-modal-azul');
    };


    /**
     *
     * @param page
     * @param type
     * @returns {Promise<void>}
     */
    async findFLight(page, type) {
        await page.waitForSelector('.numero-voo');

        return await page.evaluate(($type) => {
            const selector = `#tab-${$type} > div:nth-child(3) > div > div > div:nth-child(1) > input[type=radio]`;
            return document.querySelector(selector).id;

        }, type);

    };


    /**
     *
     * @param page
     * @param round_trip
     * @returns {Promise<void>}
     */
    async selectFlight(page, round_trip) {
        console.log('Entrou selectFlight');
        await page.click(`#${await this.findFLight(page, 'ida')}`);
        if (round_trip) {
            await page.click('#tabs > li:nth-child(2) > a');
            await page.click(`#${await this.findFLight(page, 'volta')}`);
        }

    };


    /**
     *
     * @param page
     * @returns {Promise<void>}
     */
    async confirmFlights(page) {
        console.log('Entrou confirmFlights');
        await page.click('#btn-opcoes > div > div > button');
    };


    /**
     *
     * @param page
     * @returns {Promise<void>}
     */
    async confirmTerms(page) {
        console.log('Entrou confirmTerms');
        await page.waitForSelector('#modal-conditional > div > div.modal-footer > div > button.btn.btn-success');
        await page.click('#modal-conditional > div > div.modal-footer > div > button.btn.btn-success');

    };

    /**
     *
     * @param page
     * @param config
     * @returns {Promise<void>}
     */
    async basicTests(page, config) {
        await this.go(page);
        await this.login(page);
        // await openSearch(page);
        await this.search(page, config.after_15_days, config.companies);
        await this.selectFlight(page, config.round_trip);
        await this.confirmFlights(page);
        await this.confirmTerms(page);
    };


    /**
     *
     * @param page
     * @returns {Promise<void>}
     */
    async setCoupon(page) {
        const accordeon = '#root > div > div:nth-child(2) > content > div > div > div > div > div > div > div.animated.fadeInLeft > div:nth-child(1) > div > div.panel-heading.panel-heading-divider.form-title';
        await page.waitForSelector(accordeon);
        await page.click(accordeon);
        await page.type('#coupon-input', 'UGCGKCVG');

    };

    /**
     *
     * @returns {Promise<void>}
     * @constructor
     */
    async run() {
        console.log('entrou no run');
        const browser = await puppeteer.launch({headless: true});
        const page = (await browser.pages())[0];
        await page.setViewport({width: 1000, height: 800});
        await page.setDefaultNavigationTimeout(100 * 1000);
        await this.basicTests(page, this.config);
        await browser.close()
    };

}

module.exports = FrontTestsService;

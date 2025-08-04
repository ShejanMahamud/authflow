'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">consolelog documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-f8410eb3636c7bc98897616ceaae60f71150f2aa327b154abc149a9a11cc57c17dd366cf4e1207537b213772801ef526a07a39fb221b9134ad9c83d31b286f51"' : 'data-bs-target="#xs-controllers-links-module-AppModule-f8410eb3636c7bc98897616ceaae60f71150f2aa327b154abc149a9a11cc57c17dd366cf4e1207537b213772801ef526a07a39fb221b9134ad9c83d31b286f51"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-f8410eb3636c7bc98897616ceaae60f71150f2aa327b154abc149a9a11cc57c17dd366cf4e1207537b213772801ef526a07a39fb221b9134ad9c83d31b286f51"' :
                                            'id="xs-controllers-links-module-AppModule-f8410eb3636c7bc98897616ceaae60f71150f2aa327b154abc149a9a11cc57c17dd366cf4e1207537b213772801ef526a07a39fb221b9134ad9c83d31b286f51"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-4aa73c5d437607347b9aa149d116bcb1010bb9d549d7348d61085e2fb7df135f7d50cd1517c8461f6f8105cfc17edf6100d160e2987532e4de6d685b9b7f82a9"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-4aa73c5d437607347b9aa149d116bcb1010bb9d549d7348d61085e2fb7df135f7d50cd1517c8461f6f8105cfc17edf6100d160e2987532e4de6d685b9b7f82a9"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-4aa73c5d437607347b9aa149d116bcb1010bb9d549d7348d61085e2fb7df135f7d50cd1517c8461f6f8105cfc17edf6100d160e2987532e4de6d685b9b7f82a9"' :
                                            'id="xs-controllers-links-module-AuthModule-4aa73c5d437607347b9aa149d116bcb1010bb9d549d7348d61085e2fb7df135f7d50cd1517c8461f6f8105cfc17edf6100d160e2987532e4de6d685b9b7f82a9"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-4aa73c5d437607347b9aa149d116bcb1010bb9d549d7348d61085e2fb7df135f7d50cd1517c8461f6f8105cfc17edf6100d160e2987532e4de6d685b9b7f82a9"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-4aa73c5d437607347b9aa149d116bcb1010bb9d549d7348d61085e2fb7df135f7d50cd1517c8461f6f8105cfc17edf6100d160e2987532e4de6d685b9b7f82a9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-4aa73c5d437607347b9aa149d116bcb1010bb9d549d7348d61085e2fb7df135f7d50cd1517c8461f6f8105cfc17edf6100d160e2987532e4de6d685b9b7f82a9"' :
                                        'id="xs-injectables-links-module-AuthModule-4aa73c5d437607347b9aa149d116bcb1010bb9d549d7348d61085e2fb7df135f7d50cd1517c8461f6f8105cfc17edf6100d160e2987532e4de6d685b9b7f82a9"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GithubStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GithubStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GoogleStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GoogleStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtAccessStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtAccessStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtRefreshStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtRefreshStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MailModule.html" data-type="entity-link" >MailModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MailModule-0561fe808342073ebc37f3a347cfd39afecf7e40d30fbc56141a88ac33d91a1accfeac939d2c07653b0811caa57ac13ebc5fc9706be7e1485fbc29a34bbb663c"' : 'data-bs-target="#xs-injectables-links-module-MailModule-0561fe808342073ebc37f3a347cfd39afecf7e40d30fbc56141a88ac33d91a1accfeac939d2c07653b0811caa57ac13ebc5fc9706be7e1485fbc29a34bbb663c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MailModule-0561fe808342073ebc37f3a347cfd39afecf7e40d30fbc56141a88ac33d91a1accfeac939d2c07653b0811caa57ac13ebc5fc9706be7e1485fbc29a34bbb663c"' :
                                        'id="xs-injectables-links-module-MailModule-0561fe808342073ebc37f3a347cfd39afecf7e40d30fbc56141a88ac33d91a1accfeac939d2c07653b0811caa57ac13ebc5fc9706be7e1485fbc29a34bbb663c"' }>
                                        <li class="link">
                                            <a href="injectables/MailService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PrismaModule.html" data-type="entity-link" >PrismaModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PrismaModule-36c53f74bb6d8f0a451f53d23ed4388d54fba43d7d39e25a326d1e2aa0000dc19ecfddd62a9f6446b540ba92e86e1d48c0cd4c3e436b6f77146a89d6df37ec3a"' : 'data-bs-target="#xs-injectables-links-module-PrismaModule-36c53f74bb6d8f0a451f53d23ed4388d54fba43d7d39e25a326d1e2aa0000dc19ecfddd62a9f6446b540ba92e86e1d48c0cd4c3e436b6f77146a89d6df37ec3a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PrismaModule-36c53f74bb6d8f0a451f53d23ed4388d54fba43d7d39e25a326d1e2aa0000dc19ecfddd62a9f6446b540ba92e86e1d48c0cd4c3e436b6f77146a89d6df37ec3a"' :
                                        'id="xs-injectables-links-module-PrismaModule-36c53f74bb6d8f0a451f53d23ed4388d54fba43d7d39e25a326d1e2aa0000dc19ecfddd62a9f6446b540ba92e86e1d48c0cd4c3e436b6f77146a89d6df37ec3a"' }>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/QueueModule.html" data-type="entity-link" >QueueModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/TaskModule.html" data-type="entity-link" >TaskModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TaskModule-d7c121758c6356ac0595ff1cab3e7c12743cf97b0cf5a757111f6586791ba334c395bcc125d4b589bb97871cd3e9c436ebeacd69090428a8d4fc594f00a695c5"' : 'data-bs-target="#xs-injectables-links-module-TaskModule-d7c121758c6356ac0595ff1cab3e7c12743cf97b0cf5a757111f6586791ba334c395bcc125d4b589bb97871cd3e9c436ebeacd69090428a8d4fc594f00a695c5"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TaskModule-d7c121758c6356ac0595ff1cab3e7c12743cf97b0cf5a757111f6586791ba334c395bcc125d4b589bb97871cd3e9c436ebeacd69090428a8d4fc594f00a695c5"' :
                                        'id="xs-injectables-links-module-TaskModule-d7c121758c6356ac0595ff1cab3e7c12743cf97b0cf5a757111f6586791ba334c395bcc125d4b589bb97871cd3e9c436ebeacd69090428a8d4fc594f00a695c5"' }>
                                        <li class="link">
                                            <a href="injectables/TaskService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TaskService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UploadModule.html" data-type="entity-link" >UploadModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UploadModule-848a0e020420b4f9ce4783b19ea5ef49d66911972009b1e32f6301d5e68c87158ce8b8cdb6f995b4aa3da94ab9e7a7881b1ea61047e1b73746c50bf5e1812c2f"' : 'data-bs-target="#xs-injectables-links-module-UploadModule-848a0e020420b4f9ce4783b19ea5ef49d66911972009b1e32f6301d5e68c87158ce8b8cdb6f995b4aa3da94ab9e7a7881b1ea61047e1b73746c50bf5e1812c2f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UploadModule-848a0e020420b4f9ce4783b19ea5ef49d66911972009b1e32f6301d5e68c87158ce8b8cdb6f995b4aa3da94ab9e7a7881b1ea61047e1b73746c50bf5e1812c2f"' :
                                        'id="xs-injectables-links-module-UploadModule-848a0e020420b4f9ce4783b19ea5ef49d66911972009b1e32f6301d5e68c87158ce8b8cdb6f995b4aa3da94ab9e7a7881b1ea61047e1b73746c50bf5e1812c2f"' }>
                                        <li class="link">
                                            <a href="injectables/UploadService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UploadService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AccountVerifyDto.html" data-type="entity-link" >AccountVerifyDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/AuthTokensDto.html" data-type="entity-link" >AuthTokensDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ChangePasswordDto.html" data-type="entity-link" >ChangePasswordDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ErrorFieldDto.html" data-type="entity-link" >ErrorFieldDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ErrorMetaDto.html" data-type="entity-link" >ErrorMetaDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ErrorResponseDto.html" data-type="entity-link" >ErrorResponseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ForgetPasswordDto.html" data-type="entity-link" >ForgetPasswordDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GenericSuccessResponseDto.html" data-type="entity-link" >GenericSuccessResponseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GithubLoginDto.html" data-type="entity-link" >GithubLoginDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GoogleLoginDto.html" data-type="entity-link" >GoogleLoginDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginDto.html" data-type="entity-link" >LoginDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginResponseDto.html" data-type="entity-link" >LoginResponseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LogoutDto.html" data-type="entity-link" >LogoutDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/MailProcessor.html" data-type="entity-link" >MailProcessor</a>
                            </li>
                            <li class="link">
                                <a href="classes/RefreshTokenDto.html" data-type="entity-link" >RefreshTokenDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RefreshTokenResponseDto.html" data-type="entity-link" >RefreshTokenResponseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterResponseDto.html" data-type="entity-link" >RegisterResponseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterUserDto.html" data-type="entity-link" >RegisterUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResetPasswordDto.html" data-type="entity-link" >ResetPasswordDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResponseException.html" data-type="entity-link" >ResponseException</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResponseInterceptor.html" data-type="entity-link" >ResponseInterceptor</a>
                            </li>
                            <li class="link">
                                <a href="classes/SocialLoginResponseDto.html" data-type="entity-link" >SocialLoginResponseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UploadProcessor.html" data-type="entity-link" >UploadProcessor</a>
                            </li>
                            <li class="link">
                                <a href="classes/Util.html" data-type="entity-link" >Util</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GithubStrategy.html" data-type="entity-link" >GithubStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GoogleStrategy.html" data-type="entity-link" >GoogleStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAccessStrategy.html" data-type="entity-link" >JwtAccessStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtRefreshStrategy.html" data-type="entity-link" >JwtRefreshStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MailService.html" data-type="entity-link" >MailService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PrismaService.html" data-type="entity-link" >PrismaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TaskService.html" data-type="entity-link" >TaskService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UploadService.html" data-type="entity-link" >UploadService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/IJwtPayload.html" data-type="entity-link" >IJwtPayload</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});
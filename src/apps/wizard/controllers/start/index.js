import loading from 'components/loading/loading';
import globalize from 'lib/globalize';
import toast from 'components/toast/toast';
import { ServerConnections } from 'lib/jellyfin-apiclient';
import Dashboard from 'utils/dashboard';
import dom from 'utils/dom';
import { selectSetupLanguage } from 'mutti/locale';

import 'elements/emby-button/emby-button';
import 'elements/emby-select/emby-select';

function loadPage(page, systemInfo, config, languageOptions) {
    const serverNameElem = page.querySelector('#txtServerName');
    serverNameElem.value = config.ServerName || systemInfo.ServerName;

    const languageElem = page.querySelector('#selectLocalizationLanguage');
    languageElem.innerHTML = languageOptions.map(function (l) {
        return '<option value="' + l.Value + '">' + l.Name + '</option>';
    }).join('');
    languageElem.value = selectSetupLanguage(languageOptions, globalize.getCurrentLocale(), config.UICulture);

    loading.hide();
}

function save(page) {
    loading.show();
    const apiClient = ServerConnections.currentApiClient();
    apiClient.getJSON(apiClient.getUrl('Startup/Configuration')).then(function (config) {
        config.ServerName = page.querySelector('#txtServerName').value;
        config.UICulture = page.querySelector('#selectLocalizationLanguage').value;

        return apiClient.ajax({
            type: 'POST',
            data: JSON.stringify(config),
            url: apiClient.getUrl('Startup/Configuration'),
            contentType: 'application/json'
        }).then(function () {
            Dashboard.navigate('wizard/user');
        });
    }).catch(() => {
        loading.hide();
        toast(globalize.translate('ErrorDefault'));
    });
}

function onSubmit(e) {
    e.preventDefault();
    save(dom.parentWithClass(this, 'page'));
}

export default function (view) {
    view.querySelector('.wizardStartForm').addEventListener('submit', onSubmit);

    view.addEventListener('viewshow', function () {
        document.querySelector('.skinHeader').classList.add('noHomeButtonHeader');
        loading.show();
        const page = this;
        const apiClient = ServerConnections.currentApiClient();

        Promise.all([
            apiClient.getPublicSystemInfo(),
            apiClient.getJSON(apiClient.getUrl('Startup/Configuration')),
            apiClient.getJSON(apiClient.getUrl('Localization/Options'))
        ]).then(([ systemInfo, config, languageOptions ]) => {
            loadPage(page, systemInfo, config, languageOptions);
        }).catch(() => {
            loading.hide();
            toast(globalize.translate('ErrorDefault'));
        });
    });

    view.addEventListener('viewhide', function () {
        document.querySelector('.skinHeader').classList.remove('noHomeButtonHeader');
    });
}

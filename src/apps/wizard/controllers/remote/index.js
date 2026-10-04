import loading from 'components/loading/loading';
import toast from 'components/toast/toast';
import globalize from 'lib/globalize';
import { ServerConnections } from 'lib/jellyfin-apiclient';
import Dashboard from 'utils/dashboard';

import 'elements/emby-checkbox/emby-checkbox';
import 'elements/emby-button/emby-button';
import 'elements/emby-select/emby-select';

function save() {
    loading.show();
    const apiClient = ServerConnections.currentApiClient();
    const config = {
        EnableRemoteAccess: false
    };

    apiClient.ajax({
        type: 'POST',
        data: JSON.stringify(config),
        url: apiClient.getUrl('Startup/RemoteAccess'),
        contentType: 'application/json'
    }).then(function () {
        loading.hide();
        navigateToNextPage();
    }).catch(() => {
        loading.hide();
        toast(globalize.translate('ErrorDefault'));
    });
}

function navigateToNextPage() {
    Dashboard.navigate('wizard/finish');
}

function onSubmit(e) {
    save();
    e.preventDefault();
    return false;
}

export default function (view) {
    view.querySelector('.wizardSettingsForm').addEventListener('submit', onSubmit);
    view.addEventListener('viewshow', function () {
        document.querySelector('.skinHeader').classList.add('noHomeButtonHeader');
    });
    view.addEventListener('viewhide', function () {
        document.querySelector('.skinHeader').classList.remove('noHomeButtonHeader');
    });
}

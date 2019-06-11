$(document).ready(function () {
    restoreOptions();
    // clearStorage();

    $('#saveButton').on('click', function () {

        save();

        window.close();

        if ($('#reload').is(':checked')) {
            chrome.tabs.query({active: true, currentWindow: true}, function (arrayOfTabs) {
                const code = 'window.location.reload();';
                chrome.tabs.executeScript(arrayOfTabs[0].id, {code: code});
            });
        }
    });
});


function save() {
    // First save "Sort by Recent" checkbox state
    if ($('#sort').is(':checked')) {
        chrome.storage.local.set({'sort_by_recent': 1});
    }
    else {
        chrome.storage.local.set({'sort_by_recent': 0});
    }

    // Then save all keywords
    let keywords = [];
    $('#container input').each(function () {
        if ($(this).is(':checked') && !keywords.includes($(this).val())) {
            keywords.push($(this).val());
        }
    });

    const customKeywords = $('#customKeywords').val();
    const customKeywordsArray = customKeywords.split(',')
        .filter(function (el) {
            return el.length !== 0
        })
        .map(function (e) {
            return e.trim();
        });

    if (customKeywords.length > 0) {
        keywords = keywords.concat(customKeywordsArray);
    }
    chrome.storage.local.set({'custom_keywords': customKeywords});

    chrome.storage.local.set({'keywords': keywords.join()});

}

function restoreOptions() {
    chrome.storage.local.get('sort_by_recent', function (result) {
        $('#sort').prop('checked', result.sort_by_recent);
    });

    chrome.storage.local.get('keywords', function (result) {
        let keywords = [];

        if (result.keywords) {
            keywords = result.keywords.split(',');
            $('#container input').each(function () {
                if (keywords.includes($(this).val())) {
                    $(this).prop('checked', true);
                }
            })
        }

    });

    chrome.storage.local.get('custom_keywords', function (result) {
        if (result.custom_keywords !== undefined) {
            $('#customKeywords').val(result.custom_keywords);
        }
    });
}

/*function clearStorage() {
    chrome.storage.local.clear(function () {
        const error = chrome.runtime.lastError;
        if (error) {
            console.error(error);
        }
    });
}*/
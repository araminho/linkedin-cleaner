$(document).ready(function () {
    restoreOptions();
    // clearStorage();
    $('#sort').on('change', function () {
        if ($(this).is(':checked')) {
            chrome.storage.local.set({'sort_by_recent': 1});
        }
        else {
            chrome.storage.local.set({'sort_by_recent': 0});
        }
    });

    $('#container input').on('change', function () {
        saveElementState(this);
    });

    /*$('#customKeywords').on('blur', function () {
        const customKeywords = $(this).text().split(',');
    });*/

    $('#okButton').on('click', function () {
        window.close();
        // alert('Please reload the page, so the changes take effect');
    });
});

function saveElementState(el) {
    if ($(el).is(':checked')) {
        addKeyword($(el).val());
    }
    else {
        removeKeyword($(el).val());
    }
}

function addKeyword(keyword) {
    chrome.storage.local.get('keywords', function (result) {
        let keywords = [];
        if (result.keywords) {
            keywords = result.keywords.split(',');
        }
        else {
            console.log("Storage is empty!");
        }

        console.log("Keywords before adding");
        console.log(keywords);
        if (!keywords.includes(keyword)) {
            keywords.push(keyword);
        }
        console.log("Keywords after adding");
        console.log(keywords);
        chrome.storage.local.set({'keywords': keywords.join()});
    });

}

function removeKeyword(keyword) {
    chrome.storage.local.get('keywords', function (result) {
        let keywords = [];
        if (result) {
            keywords = result.keywords.split(',');
        }

        console.log("Keywords before removing");
        console.log(keywords);
        for (let i = 0; i < keywords.length; i++) {
            if (keywords[i] === keyword) {
                keywords.splice(i, 1);
            }
        }
        console.log("Keywords after removing");
        console.log(keywords);
        chrome.storage.local.set({'keywords': keywords.join()});
    });

}

function restoreOptions() {
    chrome.storage.local.get('keywords', function (result) {
        let keywords = [];

        if (result.keywords) {
            keywords = result.keywords.split(',');
            console.log("Keywords on page load");
            console.log(keywords);
            $('#container input').each(function () {
                // console.log($(this).val());
                if (keywords.includes($(this).val())) {
                    $(this).prop('checked', true);
                }
            })
        }

    });

    chrome.storage.local.get('sort_by_recent', function (result) {
        console.log("Sort by recent");
        console.log(result.sort_by_recent);
        $('#sort').prop('checked', result.sort_by_recent);

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
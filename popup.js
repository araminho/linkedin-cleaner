$(document).ready(function () {
    restoreOptions();

    $('#container input').on('change', function () {
        saveElementState(this);
    });

    $('#okButton').on('click', function () {
        window.close();
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
        if (result) {
            keywords = result.keywords;
        }
        else {
            console.log("Storage is empty!");
        }

        if (!keywords.includes(keyword)) {
            keywords.push(keyword);
        }
        //console.log(keywords);
        chrome.storage.local.set({'keywords': keywords});
    });

}

function removeKeyword(keyword) {
    chrome.storage.local.get('keywords', function (result) {
        let keywords = [];
        if (result) {
            keywords = result.keywords;
        }
        else {
            console.log("Storage is empty!");
        }

        for (let i = 0; i < keywords.length; i++) {
            if (keywords[i] === keyword) {
                keywords.splice(i, 1);
            }
        }

        chrome.storage.local.set({'keywords': keywords});
    });

}

function restoreOptions() {
    chrome.storage.local.get('keywords', function (result) {
        let keywords = [];
        if (result) {
            keywords = result.keywords;
        }
        $('#container input').each(function () {
            console.log($(this).val());
            if (keywords.includes($(this).val())) {
                $(this).prop('checked', true);
            }
        })
    });
}
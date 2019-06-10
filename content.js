$(document).ready(function () {
    chrome.storage.local.get('keywords', function (result) {
        let keywords = [];
        if (result) {
            keywords = result.keywords.split(',');

            // Hide posts containing keywords
            if (keywords.length > 0) {
                setInterval(function () {
                    $('.relative.ember-view').each(function () {
                        let me = $(this);
                        for (let i = 0; i < keywords.length; i++) {
                            if (me.html().includes(keywords[i])) {
                                me.css('display', 'none');
                            }
                        }
                    });
                }, 1000);
            }
        }

    });

    chrome.storage.local.get('sort_by_recent', function (result) {
        if (result.sort_by_recent) {
            // Switch to Recent news
            $('.sort-dropdown__text-container').click();
            $('.sort-dropdown__list-item button.t-12').last().click();
        }
    });
});

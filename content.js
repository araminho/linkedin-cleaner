$(document).ready(function () {
    chrome.storage.local.get('keywords', function (result) {
        let keywords = [];
        if (result && result.keywords) {
            keywords = result.keywords.split(',');

            // Hide posts containing keywords
            if (keywords.length > 0) {
                setInterval(function () {
                    let displayingPosts = 0;
                    const allPosts = $('.relative.ember-view:not([data-id])');
                    allPosts.each(function () {
                        const me = $(this);
                        let postIsBlocked = false;
                        for (let i = 0; i < keywords.length; i++) {
                            if (keywords[i].length && me.html().includes(keywords[i])) {
                                me.css('display', 'none');
                                postIsBlocked = true;
                            }
                        }
                        if (postIsBlocked === false) {
                            displayingPosts++;
                        }
                    });

                    // Handling the case when almost all posts are blocked and the page doesn't scroll to load more
                    // Usually 2 posts are enough to fill the height of the page

                    if (displayingPosts < 2) {
                        allPosts.last().css('display', 'block');
                        displayingPosts ++;
                    }
                    if (displayingPosts < 2) {
                        allPosts.first().css('display', 'block');
                        displayingPosts ++;
                    }
                }, 1000);
            }
        }

    });

    chrome.storage.local.get('sort_by_recent', function (result) {
        if (result.sort_by_recent) {
            // Switch to Recent news
            $('artdeco-dropdown-trigger .display-flex').click();

            $('artdeco-dropdown-item').each(function () {
                let value = $(this).html().trim();
                if (value.includes("Recent")) {
                    $(this).click();
                    $('artdeco-dropdown-trigger .display-flex').click();
                }
            })
        }
    });
});

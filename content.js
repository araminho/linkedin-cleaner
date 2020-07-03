$(document).ready(function () {
    chrome.storage.local.get('keywords', function (result) {
        let keywords = [];
        if (result && result.keywords) {
            keywords = result.keywords.split(',');

            // Hide posts containing keywords
            if (keywords.length > 0) {
                setInterval(function () {
                    let displayingPosts = 0;
                    const allPosts = $('div.relative.ember-view').filter(function() {
                        return this.classList[2] == null;
                    });
                    allPosts.each(function () {
                        const me = $(this);
                        let postIsBlocked = false;
                        for (let i = 0; i < keywords.length; i++) {
                            if (keywords[i].length && me.html().includes(keywords[i])) {
                                me.css('display', 'none');
                                postIsBlocked = true;
                                break;
                            }
                        }
                        if (postIsBlocked === false) {
                            displayingPosts++;
                        }
                    });

                    // Handling the case when almost all posts are blocked and the page doesn't scroll to load more
                    // Usually 2 posts are enough to fill the height of the page

                    if (displayingPosts < 10) {
                        allPosts.last().css('display', 'block');
                        displayingPosts ++;
                    }
                    if (displayingPosts < 10) {
                        allPosts.first().css('display', 'block');
                        displayingPosts ++;
                    }

                }, 1000);
            }
        }

    });

    chrome.storage.local.get('sort_by_recent', function (result) {
        if (result.sort_by_recent) {
            // TODO not working
            // Switch to Recent news
            $('.artdeco-dropdown__trigger .display-flex').click();

            setTimeout(function () {
                $('.artdeco-dropdown__item').each(function () {
                    let value = $(this).html().trim();
                    if (value.includes("Recent")) {
                        $(this).click();
                        $('.artdeco-dropdown__trigger .display-flex').click();
                    }
                })
            }, 600);


        }
    });
});

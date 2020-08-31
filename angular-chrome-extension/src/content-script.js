// Since we cannot pass messages from popup to content script directly as
// well as the loading issue if we try, a straight forward solution
// is to use storage, where we can keep the values and let the content
// script query the same.
chrome.storage.local.get('current_credentials', function (credentials) {
    if (credentials.current_credentials) {
        debugger;
        // alert('Items is valid: ' +  JSON.stringify(credentials));
        // algorithm to detect the form fields and filling user name and password.
        var password = $('input:password');
        if (password.length > 0) {
            password.val(credentials.current_credentials.password);
            var inputs = $('input');
            var ind = inputs.index(password);
            var username = inputs.eq(ind - 1);
            username.val(credentials.current_credentials.userName);
        }
        // clear from storage if password is filled
        chrome.storage.local.remove('current_credentials');
    }
});
document.addEventListener('DOMContentLoaded', function() {

  shortenCurrentURL();

  /**
  Grabs the current URL and sends a POST to the sau.pe URL Shrtnr app.
  On success, the returned shortened url is copied to the clipboard.
  */
  function shortenCurrentURL() {
    chrome.tabs.getSelected(null, function(tab) {
      var url = "http://sau.pe/shrtnr/api/";
      var data = {
        "requested_url": tab.url
      };
      $.ajax({
        type: "POST",
        url: url,
        data: data,
        crossDomain: true,
        success: function(data) {
            copyToClipboard('http://sau.pe/' + data + '/');
            $('h1').html('Copied to Clipboard!');
        },
        error: function(data) {
          $('h1').html('ERROR! <small><small><small>Unable to shorten URL</small></small></small>');
        }
      });

      // Close the popup message.
      setTimeout(function() {
        window.close();
      }, 3000);

    });
  }

  /**
  Copies the given text to the user's clipboard.
  Based on this Gist: https://gist.github.com/joeperrin-gists/8814825
  */
  function copyToClipboard(text) {
    // Add an element to the dom, make it editable so we can select it.
    var copyDiv = document.createElement('div');
    copyDiv.contentEditable = true;
    document.body.appendChild(copyDiv);
    // Set the new element's text to the text we want to copy.
    copyDiv.innerHTML = text;
    copyDiv.unselectable = "off";
    // Focus on the element and use the execCommands to select and copy.
    copyDiv.focus();
    document.execCommand('SelectAll');
    document.execCommand("Copy", false, null);
    // Remove the element from the dom now that we have the text copied.
    document.body.removeChild(copyDiv);
    // alert('Copied!');
  }

}, false);

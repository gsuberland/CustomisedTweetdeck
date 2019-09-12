// ==UserScript==
// @name         TweetDeck Preview Image Resolution Enhancer
// @namespace    https://github.com/gsuberland
// @description  Loads images in the feed with an alternative resolution, instead of the default 360x360 previews. Just change the ":medium" below if you want a different value.
// @version      1
// @grant        none
// @run-at       document-idle
// @include      https://tweetdeck.twitter.com/*
// ==/UserScript==

var shim_bestUnifiedImageVariant = function(e,t)
{
  try
  {
    return this.entity.media_url_https + ":medium"; /* medium is approx 900x900px */
  }
  catch (err)
  {
    window.alert("GreaseMonkey TweetDeck Preview Image Resolution Enhancer threw an exception. See console for details.");
    console.log(err);
  }
};

// export the shim function to the window context
var shim_bestUnifiedImageVariant_EXPORT = exportFunction(shim_bestUnifiedImageVariant, unsafeWindow, { defineAs: 'shim_bestUnifiedImageVariant' });

// assign the original function to a backup property
unsafeWindow.TD.services.TwitterMedia.prototype.bestUnifiedImageVariant_ORIG = unsafeWindow.TD.services.TwitterMedia.prototype.bestUnifiedImageVariant;
// assign the shim function to a _SHIM suffix property (for debugging)
unsafeWindow.TD.services.TwitterMedia.prototype.bestUnifiedImageVariant_SHIM = shim_bestUnifiedImageVariant_EXPORT;
// assign the shim function to the original property
unsafeWindow.TD.services.TwitterMedia.prototype.bestUnifiedImageVariant = unsafeWindow.TD.services.TwitterMedia.prototype.bestUnifiedImageVariant_SHIM;

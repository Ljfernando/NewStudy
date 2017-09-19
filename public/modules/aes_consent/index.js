(function() {

  init();

  function init() {
    experimentr.hold();

    d3.select('#consentYes').on('click', validate);

  }

  function validate() {
    if (d3.select('#consentYes').property("checked", true)) {
    	experimentr.release();
    } else {
    	experimentr.hold();
    }
  }

}());

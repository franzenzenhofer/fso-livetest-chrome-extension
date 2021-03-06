function(page, callback){
  //if this rule does not deliver anything back, we fail silently 
  //as it's just information response
  var that = this;
  //configuration no longer necessary if global API key is set
  var key = '%GOOGLEAPIKEY_PSI_NEW%'; //<-- add your API key here https://developers.google.com/speed/docs/insights/v5/get-started 
  const globals = that.getGlobals();
  if(!globals.variables.google_page_speed_insights_key)
  {
    if(key==='%'+'GOOGLEAPIKEY_PSI_NEW%'){
    callback(that.createResult('SPEED', '<b>New</b> "Page Speed Insights v5 desktop" rule not yet enabled! Set <a href="https://developers.google.com/speed/docs/insights/v5/get-started" target="_blank">Google API Key</a> in <a href="'+that.getGlobals().rulesUrl+'" target="_blank">Settings</a>.', "warning"));
    return;
    }
  }
  else
  {
    key = globals.variables.google_page_speed_insights_key;
  }
  var strategy = 'mobile';
  var url = page.getURL('first');
  var type = 'info';
  var fcp_color = 'lightgreen';
  var fid_color = 'lightgreen';
  var psi ='https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url='+encodeURIComponent(url)+'&strategy='+strategy+'&key='+key;

  fetch(psi)
  .then(
    function(response) {
      if (response.status !== 200) {
        callback();
        //callback(that.createResult('SPEED', 'No Page Speed Insights v5 Mobile <a href="https://developers.google.com/web/tools/lighthouse/audits/first-contentful-paint" target="_blank"> and <a href="https://developers.google.com/web/updates/2018/05/first-input-delay" target="_blank">FID</a> data. (Response Status '+response.status+' '+response.text+')', "warning"));
        return;
      }
      response.json().then(function(data) {
        if (data.loadingExperience.hasOwnProperty('metrics')){
          var first_contentful_paint_data=data.loadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS.percentile;
          var first_input_delay_data=data.loadingExperience.metrics.FIRST_INPUT_DELAY_MS.percentile;
          
          var first_contentful_paint_score=data.loadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS.category;
          var first_input_delay_score=data.loadingExperience.metrics.FIRST_INPUT_DELAY_MS.category;
        } else {
          callback();
          //callback(that.createResult('SPEED', 'No Page Speed Insights v5 Mobile <a href="https://developers.google.com/web/tools/lighthouse/audits/first-contentful-paint" target="_blank"> and <a href="https://developers.google.com/web/updates/2018/05/first-input-delay" target="_blank">FID</a> data.', "warning"));
          return;
        }

        if(first_contentful_paint_data > 1000) {
          fcp_color = "orange";
        }
        if(first_contentful_paint_data > 2500) {
          fcp_color = "red";
          type="warning";
        }

        if(first_input_delay_data > 50) {
          fid_color = "orange";
        }
        if(first_input_delay_data > 250) {
          fid_color = "red";
          type="warning";
        }

        callback(that.createResult(
          'SPEED', 
          'First Contentful Paint (<a href="https://developers.google.com/web/tools/lighthouse/audits/first-contentful-paint" target="_blank">FCP</a>): <span style="background-color:'+fcp_color+';font-weight:bold;">&nbsp;'+first_contentful_paint_data+'&nbsp;</span> <span style="background-color:'+fcp_color+';font-weight:bold;">&nbsp;'+first_contentful_paint_score+'&nbsp;</span> - First Input Delay (<a href="https://developers.google.com/web/updates/2018/05/first-input-delay" target="_blank">FID</a>): <span style="background-color:'+fid_color+';font-weight:bold;">&nbsp;'+first_input_delay_data+'&nbsp;</span> <span style="background-color:'+fid_color+';font-weight:bold;">&nbsp;'+first_input_delay_score+'&nbsp;</span> <a href="https://developers.google.com/speed/pagespeed/insights/?hl=en&url='+url+'" target="_blank">Page Speed Insights</a>', type, "Mobile"));
      });
    }
  )
  .catch(function(err) {
    callback(); return;
    //callback(that.createResult('SPEED', 'No Page Speed Insights v5 Mobile <a href="https://developers.google.com/web/tools/lighthouse/audits/first-contentful-paint" target="_blank"> and <a href="https://developers.google.com/web/updates/2018/05/first-input-delay" target="_blank">FID</a> data. '+err+' <a href="https://developers.google.com/speed/pagespeed/insights/?hl=en&url='+url+'" target="_blank">Page Speed Insights</a>', "warning"));
  });

  //callback(this.createResult('test', "async test", "warning"));
  //return this.waitForAsync();
  //return('async');
}
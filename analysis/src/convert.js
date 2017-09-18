var j2c    = require('json2csv')
  , fs     = require('fs')
  , file   = process.argv[2]
  , _      = require('underscore')
  , fields = [ // EDIT THESE
      //'workerId',
      'postId',
      // 'primingType',
      // 'valenceDiff',
      // 'time_diff_experiment',
      'age',
      'sex',
      'degree',
      'job',
      'comfort',
      'usage',
      'exlFam',
      'tblFam',
      'mplFam',
      'ggpFam',
      'baseRFam',
      't1a_clicks',
      't1a_startTime',
      't1a_endTime',
      't1a_timeDiff',
      't1a_class',
      't1a_xPErr',
      't1a_yPErr',
      't2a_clicks',
      't2a_startTime',
      't2a_endTime',
      't2a_timeDiff',
      't2a_density',
      't2a_xMax',
      't2a_xMin',
      't2a_yMax',
      't2a_yMin'

    ]
  , data

fs.readFile(file, 'utf8', function (err, data) {
  if (err) console.log(err)

  data = JSON.parse(data)

  // filters any undefined data (it makes R scripting easier)
  data = filterUndefined(data)

  // use 'debug' for your workerId when testing experiments,
  //   comment out if you want to analyze data from yourself
  data = filterDebug(data)

  convert( data )
})

function convert(d) {
  var params = {
    data: d,
    fields: fields
  }
  j2c(params, function(err, csv) {
    if (err) console.log(err)
    console.log(csv)
  })
}

function filterUndefined (arr) {
  return _.filter(arr, function(row) {
    return _.every(fields, function(f) { return row[f] })
  })
}

function filterDebug (arr) {
  return _.filter(arr, function(row) {
    return row.workerId !== 'debug'
  })
}

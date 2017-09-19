var j2c    = require('json2csv')
  , fs     = require('fs')
  , file   = process.argv[2]
  , _      = require('underscore')
  , fields = [ // EDIT THESE
      'postId',
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
      'pref1Rank1',
      'pref1Rank2',
      'pref1Rank3',
      'pref1Rank4',
      'pref1Rank5',
      'pref2Rank1',
      'pref2Rank2',
      'pref2Rank3',
      'pref2Rank4',
      'pref2Rank5',
      'es1_tool',
      'es2_tool',
      'es3_tool',
      'es4_tool',
      'es5_tool',

      'es1_xPErr',
      'es1_yPErr',

      'es2_xPErr',
      'es2_yPErr',

      'es3_xPErr',
      'es3_yPErr',

      'es4_xPErr',
      'es4_yPErr',

      'es5_xPErr',
      'es5_yPErr',

      'el1_xPErr',
      'el1_yPErr',

      'el2_xPErr',
      'el2_yPErr',

      'el3_xPErr',
      'el3_yPErr',

      'el4_xPErr',
      'el4_yPErr',

      'el5_xPErr',
      'el5_yPErr',

      'hs1_xPErr',
      'hs1_yPErr',

      'hs2_xPErr',
      'hs2_yPErr',

      'hs3_xPErr',
      'hs3_yPErr',

      'hs4_xPErr',
      'hs4_yPErr',

      'hs5_xPErr',
      'hs5_yPErr',

      'hl1_xPErr',
      'hl1_yPErr',

      'hl2_xPErr',
      'hl2_yPErr',

      'hl3_xPErr',
      'hl3_yPErr',

      'hl4_xPErr',
      'hl4_yPErr',

      'hl5_xPErr',
      'hl5_yPErr',


    ]
  , data

// console.log(fields)
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

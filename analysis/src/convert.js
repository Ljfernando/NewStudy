var j2c    = require('json2csv')
  , fs     = require('fs')
  , file   = process.argv[2]
  , _      = require('underscore')
  , fields = [ // EDIT THESE
      "pre1A_avgDist",
      "pre1A_diff",
      "pre1A_intercept",
      "pre1A_slope",
      "pre1B_avgDist",
      "pre1B_diff",
      "pre1B_intercept",
      "pre1B_slope",
      "pre1C_avgDist",
      "pre1C_diff",
      "pre1C_intercept",
      "pre1C_slope",
      "pre1D_avgDist",
      "pre1D_diff",
      "pre1D_intercept",
      "pre1D_slope",
      "pre2A_avgDist",
      "pre2A_diff",
      "pre2A_intercept",
      "pre2A_slope",
      "pre2B_avgDist",
      "pre2B_diff",
      "pre2B_intercept",
      "pre2B_slope",
      "pre2C_avgDist",
      "pre2C_diff",
      "pre2C_intercept",
      "pre2C_slope",
      "pre2D_avgDist",
      "pre2D_diff",
      "pre2D_intercept",
      "pre2D_slope",
      "pre3A_avgDist",
      "pre3A_diff",
      "pre3A_intercept",
      "pre3A_slope",
      "pre3B_avgDist",
      "pre3B_diff",
      "pre3B_intercept",
      "pre3B_slope",
      "pre3C_avgDist",
      "pre3C_diff",
      "pre3C_intercept",
      "pre3C_slope",
      "pre3D_avgDist",
      "pre3D_diff",
      "pre3D_intercept",
      "pre3D_slope",
      "pre4A_avgDist",
      "pre4A_diff",
      "pre4A_intercept",
      "pre4A_slope",
      "pre4B_avgDist",
      "pre4B_diff",
      "pre4B_intercept",
      "pre4B_slope",
      "pre4C_avgDist",
      "pre4C_diff",
      "pre4C_intercept",
      "pre4C_slope",
      "pre4D_avgDist",
      "pre4D_diff",
      "pre4D_intercept",
      "pre4D_slope",
      "pre5A_avgDist",
      "pre5A_diff",
      "pre5A_intercept",
      "pre5A_slope",
      "pre5B_avgDist",
      "pre5B_diff",
      "pre5B_intercept",
      "pre5B_slope",
      "pre5C_avgDist",
      "pre5C_diff",
      "pre5C_intercept",
      "pre5C_slope",
      "pre5D_avgDist",
      "pre5D_diff",
      "pre5D_intercept",
      "pre5D_slope",
      "pre6A_avgDist",
      "pre6A_diff",
      "pre6A_intercept",
      "pre6A_slope",
      "pre6B_avgDist",
      "pre6B_diff",
      "pre6B_intercept",
      "pre6B_slope",
      "pre6C_avgDist",
      "pre6C_diff",
      "pre6C_intercept",
      "pre6C_slope",
      "pre6D_avgDist",
      "pre6D_diff",
      "pre6D_intercept",
      "pre6D_slope",
      "pre7A_avgDist",
      "pre7A_diff",
      "pre7A_intercept",
      "pre7A_slope",
      "pre7B_avgDist",
      "pre7B_diff",
      "pre7B_intercept",
      "pre7B_slope",
      "pre7C_avgDist",
      "pre7C_diff",
      "pre7C_intercept",
      "pre7C_slope",
      "pre7D_avgDist",
      "pre7D_diff",
      "pre7D_intercept",
      "pre7D_slope",
      "pre8A_avgDist",
      "pre8A_diff",
      "pre8A_intercept",
      "pre8A_slope",
      "pre8B_avgDist",
      "pre8B_diff",
      "pre8B_intercept",
      "pre8B_slope",
      "pre8C_avgDist",
      "pre8C_diff",
      "pre8C_intercept",
      "pre8C_slope",
      "pre8D_avgDist",
      "pre8D_diff",
      "pre8D_intercept",
      "pre8D_slope",
      "pre9A_avgDist",
      "pre9A_diff",
      "pre9A_intercept",
      "pre9A_slope",
      "pre9B_avgDist",
      "pre9B_diff",
      "pre9B_intercept",
      "pre9B_slope",
      "pre9C_avgDist",
      "pre9C_diff",
      "pre9C_intercept",
      "pre9C_slope",
      "pre9D_avgDist",
      "pre9D_diff",
      "pre9D_intercept",
      "pre9D_slope",
      "pre10A_avgDist",
      "pre10A_diff",
      "pre10A_intercept",
      "pre10A_slope",
      "pre10B_avgDist",
      "pre10B_diff",
      "pre10B_intercept",
      "pre10B_slope",
      "pre10C_avgDist",
      "pre10C_diff",
      "pre10C_intercept",
      "pre10C_slope",
      "pre10D_avgDist",
      "pre10D_diff",
      "pre10D_intercept",
      "pre10D_slope",
      "pre11A_avgDist",
      "pre11A_diff",
      "pre11A_intercept",
      "pre11A_slope",
      "pre11B_avgDist",
      "pre11B_diff",
      "pre11B_intercept",
      "pre11B_slope",
      "pre11C_avgDist",
      "pre11C_diff",
      "pre11C_intercept",
      "pre11C_slope",
      "pre11D_avgDist",
      "pre11D_diff",
      "pre11D_intercept",
      "pre11D_slope",
      "pre12A_avgDist",
      "pre12A_diff",
      "pre12A_intercept",
      "pre12A_slope",
      "pre12B_avgDist",
      "pre12B_diff",
      "pre12B_intercept",
      "pre12B_slope",
      "pre12C_avgDist",
      "pre12C_diff",
      "pre12C_intercept",
      "pre12C_slope",
      "pre12D_avgDist",
      "pre12D_diff",
      "pre12D_intercept",
      "pre12D_slope",
      "pre13A_avgDist",
      "pre13A_diff",
      "pre13A_intercept",
      "pre13A_slope",
      "pre13B_avgDist",
      "pre13B_diff",
      "pre13B_intercept",
      "pre13B_slope",
      "pre13C_avgDist",
      "pre13C_diff",
      "pre13C_intercept",
      "pre13C_slope",
      "pre13D_avgDist",
      "pre13D_diff",
      "pre13D_intercept",
      "pre13D_slope",
      "pre14A_avgDist",
      "pre14A_diff",
      "pre14A_intercept",
      "pre14A_slope",
      "pre14B_avgDist",
      "pre14B_diff",
      "pre14B_intercept",
      "pre14B_slope",
      "pre14C_avgDist",
      "pre14C_diff",
      "pre14C_intercept",
      "pre14C_slope",
      "pre14D_avgDist",
      "pre14D_diff",
      "pre14D_intercept",
      "pre14D_slope",
      "pre15A_avgDist",
      "pre15A_diff",
      "pre15A_intercept",
      "pre15A_slope",
      "pre15B_avgDist",
      "pre15B_diff",
      "pre15B_intercept",
      "pre15B_slope",
      "pre15C_avgDist",
      "pre15C_diff",
      "pre15C_intercept",
      "pre15C_slope",
      "pre15D_avgDist",
      "pre15D_diff",
      "pre15D_intercept",
      "pre15D_slope",
      "pre16A_avgDist",
      "pre16A_diff",
      "pre16A_intercept",
      "pre16A_slope",
      "pre16B_avgDist",
      "pre16B_diff",
      "pre16B_intercept",
      "pre16B_slope",
      "pre16C_avgDist",
      "pre16C_diff",
      "pre16C_intercept",
      "pre16C_slope",
      "pre16D_avgDist",
      "pre16D_diff",
      "pre16D_intercept",
      "pre16D_slope",
      "pre17A_avgDist",
      "pre17A_diff",
      "pre17A_intercept",
      "pre17A_slope",
      "pre17B_avgDist",
      "pre17B_diff",
      "pre17B_intercept",
      "pre17B_slope",
      "pre17C_avgDist",
      "pre17C_diff",
      "pre17C_intercept",
      "pre17C_slope",
      "pre17D_avgDist",
      "pre17D_diff",
      "pre17D_intercept",
      "pre17D_slope",
      "pre18A_avgDist",
      "pre18A_diff",
      "pre18A_intercept",
      "pre18A_slope",
      "pre18B_avgDist",
      "pre18B_diff",
      "pre18B_intercept",
      "pre18B_slope",
      "pre18C_avgDist",
      "pre18C_diff",
      "pre18C_intercept",
      "pre18C_slope",
      "pre18D_avgDist",
      "pre18D_diff",
      "pre18D_intercept",
      "pre18D_slope",
      "pre19A_avgDist",
      "pre19A_diff",
      "pre19A_intercept",
      "pre19A_slope",
      "pre19B_avgDist",
      "pre19B_diff",
      "pre19B_intercept",
      "pre19B_slope",
      "pre19C_avgDist",
      "pre19C_diff",
      "pre19C_intercept",
      "pre19C_slope",
      "pre19D_avgDist",
      "pre19D_diff",
      "pre19D_intercept",
      "pre19D_slope",
      "pre20A_avgDist",
      "pre20A_diff",
      "pre20A_intercept",
      "pre20A_slope",
      "pre20B_avgDist",
      "pre20B_diff",
      "pre20B_intercept",
      "pre20B_slope",
      "pre20C_avgDist",
      "pre20C_diff",
      "pre20C_intercept",
      "pre20C_slope",
      "pre20D_avgDist",
      "pre20D_diff",
      "pre20D_intercept",
      "pre20D_slope",
      "pre21A_avgDist",
      "pre21A_diff",
      "pre21A_intercept",
      "pre21A_slope",
      "pre21B_avgDist",
      "pre21B_diff",
      "pre21B_intercept",
      "pre21B_slope",
      "pre21C_avgDist",
      "pre21C_diff",
      "pre21C_intercept",
      "pre21C_slope",
      "pre21D_avgDist",
      "pre21D_diff",
      "pre21D_intercept",
      "pre21D_slope",
      "pre22A_avgDist",
      "pre22A_diff",
      "pre22A_intercept",
      "pre22A_slope",
      "pre22B_avgDist",
      "pre22B_diff",
      "pre22B_intercept",
      "pre22B_slope",
      "pre22C_avgDist",
      "pre22C_diff",
      "pre22C_intercept",
      "pre22C_slope",
      "pre22D_avgDist",
      "pre22D_diff",
      "pre22D_intercept",
      "pre22D_slope",
      "pre23A_avgDist",
      "pre23A_diff",
      "pre23A_intercept",
      "pre23A_slope",
      "pre23B_avgDist",
      "pre23B_diff",
      "pre23B_intercept",
      "pre23B_slope",
      "pre23C_avgDist",
      "pre23C_diff",
      "pre23C_intercept",
      "pre23C_slope",
      "pre23D_avgDist",
      "pre23D_diff",
      "pre23D_intercept",
      "pre23D_slope",
      "pre24A_avgDist",
      "pre24A_diff",
      "pre24A_intercept",
      "pre24A_slope",
      "pre24B_avgDist",
      "pre24B_diff",
      "pre24B_intercept",
      "pre24B_slope",
      "pre24C_avgDist",
      "pre24C_diff",
      "pre24C_intercept",
      "pre24C_slope",
      "pre24D_avgDist",
      "pre24D_diff",
      "pre24D_intercept",
      "pre24D_slope",
      "pre25A_avgDist",
      "pre25A_diff",
      "pre25A_intercept",
      "pre25A_slope",
      "pre25B_avgDist",
      "pre25B_diff",
      "pre25B_intercept",
      "pre25B_slope",
      "pre25C_avgDist",
      "pre25C_diff",
      "pre25C_intercept",
      "pre25C_slope",
      "pre25D_avgDist",
      "pre25D_diff",
      "pre25D_intercept",
      "pre25D_slope",
      "pre26A_avgDist",
      "pre26A_diff",
      "pre26A_intercept",
      "pre26A_slope",
      "pre26B_avgDist",
      "pre26B_diff",
      "pre26B_intercept",
      "pre26B_slope",
      "pre26C_avgDist",
      "pre26C_diff",
      "pre26C_intercept",
      "pre26C_slope",
      "pre26D_avgDist",
      "pre26D_diff",
      "pre26D_intercept",
      "pre26D_slope",
      "pre27A_avgDist",
      "pre27A_diff",
      "pre27A_intercept",
      "pre27A_slope",
      "pre27B_avgDist",
      "pre27B_diff",
      "pre27B_intercept",
      "pre27B_slope",
      "pre27C_avgDist",
      "pre27C_diff",
      "pre27C_intercept",
      "pre27C_slope",
      "pre27D_avgDist",
      "pre27D_diff",
      "pre27D_intercept",
      "pre27D_slope",
      "pre28A_avgDist",
      // "pre28A_diff", // For some reason this column isn't recorded...
      "pre28A_intercept",
      "pre28A_slope",
      "pre28B_avgDist",
      "pre28B_diff",
      "pre28B_intercept",
      "pre28B_slope",
      "pre28C_avgDist",
      "pre28C_diff",
      "pre28C_intercept",
      "pre28C_slope",
      "pre28D_avgDist",
      "pre28D_diff",
      "pre28D_intercept",
      "pre28D_slope",
      "pre29A_avgDist",
      "pre29A_diff",
      "pre29A_intercept",
      "pre29A_slope",
      "pre29B_avgDist",
      "pre29B_diff",
      "pre29B_intercept",
      "pre29B_slope",
      "pre29C_avgDist",
      "pre29C_diff",
      "pre29C_intercept",
      "pre29C_slope",
      "pre29D_avgDist",
      "pre29D_diff",
      "pre29D_intercept",
      "pre29D_slope",
      "pre30A_avgDist",
      "pre30A_diff",
      "pre30A_intercept",
      "pre30A_slope",
      "pre30B_avgDist",
      "pre30B_diff",
      "pre30B_intercept",
      "pre30B_slope",
      "pre30C_avgDist",
      "pre30C_diff",
      "pre30C_intercept",
      "pre30C_slope",
      "pre30D_avgDist",
      "pre30D_diff",
      "pre30D_intercept",
      "pre30D_slope",
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

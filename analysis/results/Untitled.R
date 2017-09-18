setwd("/Users/lancefernando/Desktop/Research/VGLResearch/splom-studies/analysis/results")
install.packages("rjson")
library(rjson)
json_file <- fromJSON(file = "data.json")

json_file <- lapply(json_file, function(x) {
  x[sapply(x, is.null)] <- NA
  unlist(x)
})

test <- do.call("rbind", json_file)

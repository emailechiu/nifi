#!/usr/bin/env Rscript

require(jsonlite)
a<-read.table("stdin",sep=",",fill=T,header=T)
toJSON(a)

#!/usr/bin/env Rscript
# Function to get the counts - slots with traffic, bad slots, slots with poor sigQ, etc.

# kjain : 12/15/16
getCounts <- function(c,threshPkts,threshPktsLow,threshSI,threshBadSI,threshBadHI,threshPoorSigQ,threshReasonFraction,threshBadHourCount,threshBadHourFraction,threshBadHourFractionLow,threshNumDays,debug=0)
{
	rS=NULL;
	c1=c[c[,26]>=threshPkts | c[,11] >= threshSI, ];
	c2=c[c[,26]>=threshPktsLow, ];

	if(debug>1) {write.table(c1,file="usefulSlots.dat",col.names=F,row.names=F,append=T);}
	countTotal=length(c[,1]);
	countLow=length(c2[,1]);
	count=length(c1[,1]);
	countBadHr=0;
	countPoorSigQ=0;
	countHighDelay=0;
	countHighLoss=0;
	countCongestion=0;
	countSlowDevice=0;
	label=-1;
	reason=c(0,0,0,0,0);
	if(count>0){
 	  for (j in seq(1:count)) {
	  #	print(c1[j,c(1:2,23:28,31,33:38,41)]);
	     if ((c1[j,7]+c1[j,8] >threshBadSI) | (c1[j,12] <= threshBadHI))
	     {
		countBadHr=countBadHr+1;

		if (c1[j,24]>0 & c1[j,24] <= threshPoorSigQ)
		{
			countPoorSigQ=countPoorSigQ+1;
		}
		else
		{
			if (c1[j,16]/sum(c1[j,16:19]) >= threshReasonFraction)
			{
				countHighDelay=countHighDelay+1;
			}
			if (c1[j,17]/sum(c1[j,16:19]) >= threshReasonFraction)
			{
				countHighLoss=countHighLoss+1;
			}
			if (c1[j,18]/sum(c1[j,16:19]) >= threshReasonFraction)
			{
				countCongestion=countCongestion+1;
			}
			if (c1[j,19]/sum(c1[j,16:19]) >= threshReasonFraction)
			{
				countSlowDevice=countSlowDevice+1;
			}
		}
	     }
	  }
	  # Summarize
	  if(countBadHr > threshBadHourCount & countBadHr/count > threshBadHourFraction) {
		label=1; # Significant Bad SI
		if(countPoorSigQ > threshBadHourCount & countPoorSigQ/count > threshBadHourFraction) {
			#label=label+1e5;
			reason[1]=1;
		}
		if(countHighDelay > threshBadHourCount & countHighDelay/count > threshBadHourFraction) {
			reason[2]=1;
		}
		if(countHighLoss > threshBadHourCount & countHighLoss/count > threshBadHourFraction) {
			reason[3]=1;
		}
		if(countCongestion > threshBadHourCount & countCongestion/count > threshBadHourFraction) {
			reason[4]=1;
		}
		if(countSlowDevice > threshBadHourCount & countSlowDevice/count > threshBadHourFraction) {
			reason[5]=1;
		}
	  } else if(countBadHr > threshBadHourCount & countBadHr/count > threshBadHourFractionLow) {
		label=2; # Some Bad SI
	  } else if (countLow > threshBadHourCount) {
		label=0; # No significant bad LAN slots
	  } else {
		label=-1; # Not enough samples
	  }
	} else if (countLow > threshBadHourCount & countLow > threshNumDays) {
		label=0;
	}
rS=c(label,reason,countTotal,countLow,count,countBadHr,countPoorSigQ,countHighDelay,countHighLoss,countCongestion,countSlowDevice);
}
# Algorithm to determine the Per Device Health based on the diagnostic logs - using Layer 4 stats + Signal Quality / RSSI
# (Mostly similar to JuDD algorithm Phase2 for HT2000W)
# (Phase 3 for JuDD and next version of this algorithm will use additional Layer-1/2 stats for more informed diagnostic)

# kjain : 12/15/16
getPerDevSummary <- function(input_file="stdin",output_file="",runDate=NULL,logDuration=14,mac=NULL,threshPkts=1e4,threshSI=10,threshBadHI=50,threshPoorSigQ=20,threshBadHourCount=2,threshBadHourFraction=0.25,threshBadHourFractionLow=0.2,debug=0)
{
#source("~/scripts/ht2000w_alpha/getPerDevCounts.R");
#threshPkts=1e4;
threshPktsLow=1e2;
#threshSI=30;
threshBadHI=50;
threshBadSI=20;
threshNumDays=1;
threshReasonFraction=0.33;
#threshBadHourCount=3;
#threshBadHourFraction=0.33;

a=read.table(input_file,sep=",",fill=T,header=T);

# Read and keep on the important columns
# Following assumes terminal software version 3.4.3.25

#cols=c(1:10,12:16,20:24,35:40)
cols=c(1:3,10:16,18:22,26:30,41:46)
# 1-3,10-12: Record.Type, StartTime, StopTime, Device Status, Device MAC, Device Name
# 13-16,18-19: Bad SI, Marginal Bad SI, Marginal Good SI, Good SI, Total SI, Health Indicator
# 20-22: IWU<1,=1,>1
# 26-30: High Delay, High Loss, Congestion, Slow Device, SRTT
# 35-40: Device Mode, Tx PHY Rate, Px PHY Rate, SigQ, Tx Error Rate, Rx Error Rate

a1=a[a[,1]=="Hourly",cols]; # Retrieve only important columns for hourly logs

# Append column for number of samples
a1[,26]=as.numeric(a1[,13])+as.numeric(a1[,14])+as.numeric(a1[,15]);


# Append column to convert end-time to unix timestamp for filtering based on log duration input
a1[,27]=as.numeric(as.POSIXct(as.character(a1[,3]), format="%m/%d/%Y %H:%M:%S"))
len=length(a1[,1]);
#print(len);

# Sort by time
a1=a1[order(a1[,27]),];
#write.table(a1,file="test.dat",col.names=T);

if(is.null(runDate)) { # If not specified
	runDate=a1[len,27]; # Pick the last date
} else {
	runDate=as.numeric(as.POSIXct(runDate, format="%m/%d/%Y %H")) ## Input date must be in MM/DD/YYYY HH format
}

# Truncate to only days specified by logDuration (in Days)
a1=a1[a1[,27]>=runDate-logDuration*24*3600 & a1[,27] <= runDate+3600,];
len=length(a1[,1]);
#print(len);

# Reuse column 27 as unix timestamp no longer needed
a1[,27]=as.numeric(t(unlist(strsplit(as.character(a1[,2]),"/")))[1,seq(1:len)*3-2]); # Start date (MM)
a1[,28]=as.numeric(t(unlist(strsplit(as.character(a1[,2]),"/")))[1,seq(1:len)*3-1]); # Start date (DD)
a1[,29]=as.numeric(t(unlist(strsplit(as.character(a1[,2]),"[:\ ]",perl=T)))[1,seq(1:len)*4-2]); # Start hour
a1[,30]=as.numeric(t(unlist(strsplit(as.character(a1[,3]),"[:\ ]",perl=T)))[1,seq(1:len)*4-2]); # End hour

# Assumes duplicate records discarded before this step
# Handle two-hour log timestamps scenario
#for(i in seq(1:(len-1))+1){ # Ignore the first as it cannot be corrected
#	if(as.numeric(a1[i,30])-as.numeric(a1[i,29])>1) {
#		print(c("Incorrect TimeStamps",i));
#		if((a1[i,29]==a1[i-1,29]) && (as.numeric(a1[i,30])-as.numeric(a1[i-1,30])==1) && a1[i,29]==a1[i-1,29]){ # Known-bug - double counting in 2-hour log
#			print(c("Two hour difference",a1[i,29:30]));
			#a1[i,29]=a1[i-1,30];
			#a1[i,19:25]=a1[i,19:25]-a1[i-1,19:25]; # Subtract Pkts and Sample Intervals which are double counted
			#a1[i,32:37]=a1[i,32:37]-a1[i-1,32:37]; # Same for v6
			#a1[i,30]=round(sum(a1[i,24:25])*100/sum(a1[i,22:25])); # Recalculate the health indicator
			#if(is.nan(a1[i,30])) {a1[i,30]=100;}	# If divide by 0
			#a1[i,42]=round(sum(a1[i,36:37])*100/sum(a1[i,34:37])); # Same for v6
			#if(is.nan(a1[i,42])) {a1[i,42]=100;}
			#print(c("i",i));
#		}
#	}
#}
# Re-calculate Total SI
#a1[,11]=as.numeric(a1[,7])+as.numeric(a1[,8])+as.numeric(a1[,9])+as.numeric(a1[,10]); # Total Sample Intervals
a1[,11]=a1[,7]+a1[,8]+a1[,9]+a1[,10]; # Total Sample Intervals
a1[,12]=floor((a1[,9]+a1[,10])*100/a1[,11]); # Total Sample Intervals

for (i in 1:length(a1[,12])) {
	if (is.na(a1[i,12])) {
		a1[i,12]=100;
	}
}

if(debug>1){write.table(a1,file="intermediate_logs.dat",col.names=T);}

# Headers for JuDD tool logs
#if(debug){print(c("Index","SAN","Type-Date/Hour","Date/Hour","flag","total slots","non-idle slots","slots considered","slots with Bad LAN", "Bad LAN slots due to slow device","Slots with slow device"));}
# Flag 0 - no problem, 1 - many bad LAN hours, 2- some bad LAN hours, 3 - slow device
# Using flags for different date and hours, pin-point -> bad route, bad location, slow device or reason unknown

if(is.null(mac)) {
	mac=names(sort(table(a1[,5]),decreasing=T));
	#mac=unique(a1[,5]);
}

headers=c("ID","DT","TAG","NumberofDaysDeviceConnected","MACAddr","DevName","OutputLabel","PoorSignalQuality","HighDelay","HighLoss","Congestion","SlowDevice","TotalHours","NonIdleHours","HoursWithSignificantTraffic","BadHours","HoursWithPoorSigQ","HoursWithHighDelay","HoursWithHighLoss","HoursWithCongestion","HoursWithSlowDevice","ListofDaysWithBadLink","ListofTimeofDayWithBadLink");
write.table(headers,file=output_file,append=F,col.names=F,row.names=F,sep=",",eol=",");
write.table("",file=output_file,append=T,col.names=F,row.names=F,sep=",",eol="\n" );

for(m in mac) {
	rS_day="d"; # Result summary for each date
	rS_hour="h"; # Result summary for each hour
	rS_all=NULL; # Result summary for all data
	numDates=0;

	c=a1[grepl(m,a1[,5]),];
	#c=a1[a1[,5]==m,];
	#print(c(m,unique(c[,5])));
	# Get summary by date (24 hour history)
	for(j in unique(c[,28]))
	{
		#print(j);
		c1=c[c[,28]==j,]; # Log for jth date only
		#print(c1);
		count=length(c1[,1]);
		if(count>0)
		{ # Can give different thresholds or have a multiplying factor - different for "Date"/"Hour"/"All" type
			rS=getCounts(c1,threshPkts,threshPktsLow,threshSI,threshBadSI,threshBadHI,threshPoorSigQ,threshReasonFraction,threshBadHourCount,threshBadHourFraction,threshBadHourFractionLow,threshNumDays,debug-1);
			#rS=1;
			if(rS[1]==1) {
				rS_day=paste(rS_day,j,sep=":");
			}
			numDates=numDates+1;
		} else {break;}
	}

	# Get summary by time of the day (Eg: between 3-4 for all the days)
	for(j in seq(1:24))
	{
		c1=c[c[,29]==j-1 & c[,30]==j%%24,]; # Log for only jth hour of the day (in UTC)
		count=length(c1[,1]);
		if(count>0)
		{ # Can give different thresholds or have a multiplying factor - different for "Date"/"Hour"/"All" type
			rS=getCounts(c1,threshPkts,threshPktsLow,threshSI,threshBadSI,threshBadHI,threshPoorSigQ,threshReasonFraction,threshBadHourCount,threshBadHourFraction,threshBadHourFractionLow,threshNumDays,debug-1);
			#rS=1;
			if(rS[1]==1) {
				rS_hour=paste(rS_hour,j,sep=":");
			}
		} else {break;}
	}

	# Get overall history (all days and hours)
	count=length(c[,1]);
	#print(count);
	if(count>0) # Just in case all the filtering leaves no records
	{
		# Can give different thresholds or have a multiplying factor - different for "Date"/"Hour"/"All" type
		#rS=getCounts(c,threshPkts,threshPktsLow,threshSI,threshBadSI,threshBadHI,threshWUFull,threshWUDiff,threshBadHourCount,threshBadHourFraction,threshBadHourFractionLow,debug-1);
		rS=getCounts(c,threshPkts,threshPktsLow,threshSI,threshBadSI,threshBadHI,threshPoorSigQ,threshReasonFraction,threshBadHourCount,threshBadHourFraction,threshBadHourFractionLow,threshNumDays,debug-1);
		#rS=m; # MAC address
		rS_all=c(input_file,as.character(c[count,2]),'wifi',numDates,as.character(c[1,5]),as.character(c[1,6]),rS,rS_day,rS_hour);
		#rS_all=c(input_file,runDate,logDuration,numDates,m,as.character(c[1,6]),rS,rS_day,rS_hour);
		#if(debug)
		#{
		#	print(c(i,as.character(c[1,2]),"All","NA",rS));
		#}
	} else {
		# print(c("Warning: 0 count for mac",m));
		rS_all=c(numDates,0*seq(1:7),rS_day,rS_hour);
	}
	# Give summary

	#if(debug){print(rS_all);}
	write.table(rS_all,file=output_file,append=T,col.names=F,row.names=F,sep=",",eol=",");
	write.table("",file=output_file,append=T,col.names=F,row.names=F,sep=",",eol="\n" );
	rS_all;
}}
getPerDevSummary()


#!/usr/bin/python

# Krishna Samavedam - 26oct2016 - Initial WiFi Diag File Manipulation
# I take in the Diag file and split it into two seperate files

# Modifications by kjain - 12/13/16
#   <>_overall.csv - First file only stores the relevant LAN Diag logs (overall, not per device) 
#   <>_wifi.csv - Second one with Collated WiFi Device Stats

import sys
import string


def parse_diag():
    #print(in_file)
    #file_prefix=string.split(in_file, '.')[0]
    #out_file='overall.csv'
    #out_file_wifi=file_prefix+'_wifi.csv'
    #print file_prefix , out_file, out_file_wifi

    #out_fd = open(out_file, 'w')
    #sys.stdout = open(out_file_wifi, 'w')

    with sys.stdin as fd:
        h = string.split(fd.readline(), ',')
        dev_num_idx = h.index('Device Number')
        dev_col_st = dev_num_idx + 1
        dev_col_end = h.index('Device1 Status') # one after the last entry, for counting easily 
        dev_col_cnt = dev_col_end - dev_col_st
        #out_fd.write(','.join(h[421:dev_num_idx]) + '\n')
	col=(0,1,2,3,4,420,421,427,523,525,529,531,533,535,539,541,543,545,547,549,551,553,555,557,559,561,563,565,567,568,569,571,575,577,579,581,585,587,591,593,595,597,599,601,603,605,607,609,611,613,614,615,617,621,623,625,627,631,633,635,637,638,641,643,645,647,649,651,653,655,657,659,660,661,663,667,669,671,673,677,679,681,683,685,687,689,691,693,695,697,699,701,703,705,706,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721)
        #out_fd.write(','.join([h[i] for i in col]) + '\n')
        # First 3 cols + Overall WiFi conditions
	cols=(0,1,2,709,712,713,715,718,719)
        sys.stdout.write(','.join(h[i] for i in cols) + ',' )
        # Wifi Dev Cols
        sys.stdout.write(','.join(h[dev_col_st:dev_col_end]).replace("Device0","Device") + '\n')
        
        for l in fd:
            r = string.split(l, ',')
            #out_fd.write(','.join(r[421:dev_num_idx]) + '\n')
            #out_fd.write(','.join([r[i] for i in col]) + '\n')
            # for each of the devices, copy the line into new file
            for d in range(int(r[dev_num_idx])): 
                dev_col_st_tmp = dev_col_st + dev_col_cnt * d
                dev_col_end_tmp = dev_col_end + dev_col_cnt * d
                sys.stdout.write(','.join(r[i] for i in cols) + ',' + ','.join(r[dev_col_st_tmp:dev_col_end_tmp]) + '\n')
            
    #out_fd.close()
    sys.stdout.close()

def main():
    #if len(sys.argv) != 2:
    #    print 'USAGE: ' + sys.argv[0] + ' <diag file>'
    #    sys.exit(-1)
    
    #in_file=sys.argv[1]
    parse_diag()



if __name__ == "__main__":
    main()


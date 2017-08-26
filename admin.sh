# Git managmenet
export GIT_DIR=.mygit
export GIT_WORK_TREE=.
git add getPerDev.sh diag_short.sh csv2json.sh putwifi index.html app.js sdtnifi sdtlogin admin.sh conf/flow.xml.gz mymongo.js kafka*
git remote add origin https://github.com/emailechiu/nifi.git
git config --global user.name emailechiu
git config --global user.email emailechiu@gmail.com
git push -u origin master

# install R-dev
subscription-manager repos --enable rhel-6-server-optional-rpms
yum install texinfo-tex
rpm -ivh http://mirror.unl.edu/epel/6/x86_64/epel-release-6-8.noarch.rpm
yum install R-devel


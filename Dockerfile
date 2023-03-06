#FROM node:8.2
FROM ubuntu:20.04
ENV TERM linux

COPY password.txt/ /password.txt 
COPY sequelize-server/ /home/admin/sequelize-server 
COPY postgresql.conf /var/lib/postgresql/data/postgresql.conf 
EXPOSE 4000 
EXPOSE 22 

RUN apt-get update -y
RUN apt-get upgrade -y 

ENV NODE_VERSION=16.13.0
RUN apt-get install -y curl
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"
RUN node --version
RUN npm --version

RUN echo 'debconf debconf/frontend select Noninteractive' | debconf-set-selections \
&& useradd -ms /bin/bash admin \
&& chpasswd </password.txt \ 
&& rm /password.txt

RUN apt-get install -y  \
gnupg 
RUN apt-get install -y  \
postgresql-common \
postgresql
RUN apt-get install -y  \
apt-transport-https  
RUN apt-get install -y  \
lsb-release  
RUN apt-get install -y  \
nodejs 
RUN apt-get install -y  \
openssh-server 
RUN apt-get install -y  \
vim 
RUN apt-get install -y  \
wget 
#RUN yes | /bin/bash /usr/share/postgresql-common/pgdg/apt.postgresql.org.sh 
#RUN echo "deb https://packagecloud.io/timescale/timescaledb/ubuntu/ $(lsb_release -c -s) main" | tee /etc/apt/sources.list.d/timescaledb.list \
#&& wget --quiet -O - http://packagecloud.io/timescale/timescaledb/gpgkey | apt-key add - 
#============ ubuntu 21.10 and later ==============
# RUN wget --quiet -O - https://packagecloud.io/timescale/timescaledb/gpgkey | gpg --dearmor -o /etc/apt/trusted.gpg.d/timescaledb.gpg
# =================================================
#RUN curl -s https://packagecloud.io/install/repositories/timescale/timescaledb/script.deb.sh | bash
# RUN apt-get install -y  \
# timescaledb-2-postgresql-14 
# RUN apt-get install -y  \
# timescaledb-2-loader-postgresql-14 
RUN apt-get install -y  \
postgresql-client 
# RUN apt-get install -y \
# npm 
RUN touch /home/admin/start.sh \
&& chmod +x /home/admin/start.sh \
&& echo "#!/bin/bash" > /home/admin/start.sh \
&&  echo "service postgresql stop" >> /home/admin/start.sh \
&&  echo "service postgresql start" >> /home/admin/start.sh \
&&  echo "echo 'octopus' | su -c 'service ssh start'" >> /home/admin/start.sh \
&&  echo ". /home/admin/init.sh" >> /home/admin/start.sh \
&& echo "/usr/bin/node /home/admin/sequelize-server/index.js" >> /home/admin/start.sh \
&& touch /home/admin/create_database.sql \
&& chmod +x /home/admin/create_database.sql \



&& echo "CREATE TABLE IF NOT EXISTS           			\
cbwTurnsTable (                               			\
id INTEGER NOT NULL AUTO_INCREMENT,           			\
time TIMESTAMP NOT NULL,                      			\
assetID INTEGER NOT NULL, 	              			\
exitingProductID INTEGER,	              			\
enteringProductID INTEGER,	              			\
PRIMARY KEY(id) 	                      			\
) AUTO_INCREMENT=1;" >> /home/admin/create_database.sql        			\
&& echo "CREATE TABLE IF NOT EXISTS           			\
eventSourceTable (                            			\
id INTEGER NOT NULL AUTO_INCREMENT, 	      			\
macAddress VARCHAR (25) NOT NULL,	      			\
assetID INTEGER NOT NULL, 	              			\
weightedSum FLOAT4 NOT NULL,                  			\
PRIMARY KEY(id) 	              			\
) AUTO_INCREMENT=1;" >> /home/admin/create_database.sql        			\
&& echo "CREATE TABLE IF NOT EXISTS           			\
sensorEventTable (                            			\
id INTEGER NOT NULL AUTO_INCREMENT,			\
time TIMESTAMP NOT NULL,                      			\
eventSourceID INTEGER NOT NULL, 	      			\
assetID INTEGER NOT NULL, 	              			\
employeeID INTEGER NOT NULL, 	              			\
weightedSum FLOAT4 NOT NULL, 	              			\
productID INTEGER NOT NULL, 	              			\
PRIMARY KEY(id) 	      			\
) AUTO_INCREMENT=1;" >> /home/admin/create_database.sql        			\
&& echo "CREATE TABLE IF NOT EXISTS           			\
coachingMomentTable (                         			\
id INTEGER NOT NULL AUTO_INCREMENT,			\
time TIMESTAMP NOT NULL,                      			\
employeeID INTEGER NOT NULL, 	              			\
managerID INTEGER NOT NULL, 	              			\
note VARCHAR (300) NOT NULL, 	              			\
PRIMARY KEY(id) 	              			\
) AUTO_INCREMENT=1;" >> /home/admin/create_database.sql        			\
&& echo "CREATE TABLE IF NOT EXISTS           			\
productTable (                                			\
id INTEGER NOT NULL AUTO_INCREMENT, 	              			\
productName VARCHAR (50) NOT NULL, 	      			\
weight FLOAT4 NOT NULL, 	              			\
PRIMARY KEY(id) 	                      			\
) AUTO_INCREMENT=1;" >> /home/admin/create_database.sql        			\
&& echo "CREATE TABLE IF NOT EXISTS           			\
machineStatusTable (                          			\
id INTEGER NOT NULL AUTO_INCREMENT,			\
assetID INTEGER NOT NULL, 	              			\
time TIMESTAMP NOT NULL,                      			\
status VARCHAR (30) NOT NULL, 	              			\
productID INTEGER NOT NULL, 	              			\
PRIMARY KEY(id) 	              			\
) AUTO_INCREMENT=1;" >> /home/admin/create_database.sql        			\
&& echo "CREATE TABLE IF NOT EXISTS           			\
resourceUsageTable (                          			\
id INTEGER NOT NULL AUTO_INCREMENT,			\
meterID INTEGER NOT NULL, 	              			\
time TIMESTAMP NOT NULL,                      			\
usageIncrement FLOAT4 NOT NULL, 	      			\
unit VARCHAR (10) NOT NULL, 	              			\
type VARCHAR (30) NOT NULL,  	              			\
assetID INTEGER NOT NULL, 	              			\
PRIMARY KEY(id) 	              			\
) AUTO_INCREMENT=1;" >> /home/admin/create_database.sql        			\
&& echo "CREATE TABLE IF NOT EXISTS           			\
meterTable (                                  			\
id INTEGER NOT NULL AUTO_INCREMENT, 	              			\
usageIncrement FLOAT4 NOT NULL, 	      			\
unit VARCHAR (10) NOT NULL, 	              			\
type VARCHAR (30) NOT NULL,  	              			\
assetID INTEGER NOT NULL, 	              			\
PRIMARY KEY(id) 	                      			\
) AUTO_INCREMENT=1;" >> /home/admin/create_database.sql        			\
&& echo "CREATE TABLE IF NOT EXISTS           			\
assetTable (                                  			\
id INTEGER NOT NULL AUTO_INCREMENT, 	              			\
assetName VARCHAR (50) NOT NULL, 	      			\
status VARCHAR (50) NOT NULL, 	              			\
PRIMARY KEY(id) 	                      			\
) AUTO_INCREMENT=1;" >> /home/admin/create_database.sql        			\
&& echo "CREATE TABLE IF NOT EXISTS           			\
employeeTable (                               			\
id INTEGER NOT NULL AUTO_INCREMENT, 	              			\
employeeName VARCHAR (50) NOT NULL, 	      			\
PRIMARY KEY(id) 	              			\
) AUTO_INCREMENT=1;" >> /home/admin/create_database.sql        			\
&& echo "CREATE TABLE IF NOT EXISTS           			\
locationTable (                               			\
id INTEGER NOT NULL AUTO_INCREMENT,			\
time TIMESTAMP NOT NULL,                      			\
employeeID INTEGER NOT NULL, 	              			\
assetID INTEGER NOT NULL, 	              			\
productID INTEGER, 	                      			\
PRIMARY KEY(id) 	              			\
) AUTO_INCREMENT=1;" >> /home/admin/create_database.sql        			\
&& touch /home/admin/init.sh \
&& chmod +x /home/admin/init.sh \
&& echo "#!/bin/bash" > /home/admin/init.sh \
&& echo " echo 'create database example;' | psql " >> /home/admin/init.sh \
&& echo " echo \"create user admin with password 'octopus';\" | psql " >> /home/admin/init.sh  \
&& echo "psql \"host=localhost port=5432 dbname=example user=admin password=octopus\" -f \"/home/admin/create_database.sql\"" >> /home/admin/init.sh

# ============ reloacted to bash script start.sh ============
#WORKDIR "/home/admin/sequelize-server"
#RUN npm install
# ============ reloacted to bash script start.sh ============

#RUN npm  
# && timescaledb-tune --quiet --yes 

USER postgres
ENTRYPOINT /home/admin/start.sh 

FROM ubuntu:20.04
ENV TERM linux

COPY password.txt/ /password.txt 
COPY sequelize-server/ /home/admin/sequelize-server 
COPY postgresql.conf /var/lib/postgresql/data/postgresql.conf 
EXPOSE 4000 
EXPOSE 22 

RUN echo 'debconf debconf/frontend select Noninteractive' | debconf-set-selections \
&& useradd -ms /bin/bash admin \
&& chpasswd </password.txt \ 
&& rm /password.txt

RUN apt-get update && apt-get install -y \
gnupg \
postgresql-common \
apt-transport-https \ 
lsb-release \ 
nodejs \
openssh-server \
vim \
wget \
&& yes | /bin/bash /usr/share/postgresql-common/pgdg/apt.postgresql.org.sh \
&& echo "deb https://packagecloud.io/timescale/timescaledb/ubuntu/ $(lsb_release -c -s) main" | tee /etc/apt/sources.list.d/timescaledb.list \
&& wget --quiet -O - https://packagecloud.io/timescale/timescaledb/gpgkey | apt-key add - 
#============ ubuntu 21.10 and later ==============
#RUN wget --quiet -O - https://packagecloud.io/timescale/timescaledb/gpgkey | gpg --dearmor -o /etc/apt/trusted.gpg.d/timescaledb.gpg

RUN apt-get update -y && apt-get install -y \
timescaledb-2-postgresql-12='2.6.0*' \
timescaledb-2-loader-postgresql-12='2.6.0*' \
postgresql-client \
npm 
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
&& echo "CREATE TABLE IF NOT EXISTS           \
cbwTurnsTable (                               \
time TIMESTAMP NOT NULL,                      \
assetKey INTEGER NOT NULL, 	              \
exitingProductID INTEGER NOT NULL,	      \
enteringProductID INTEGER NOT NULL,	      \
PRIMARY KEY(time, assetKey) 	              \
);" >> /home/admin/create_database.sql        \
&& echo "CREATE TABLE IF NOT EXISTS           \
eventSourceTable (                            \
macAddress VARCHAR (25) NOT NULL,	      \
eventSourceID INTEGER NOT NULL, 	      \
assetKey INTEGER NOT NULL, 	              \
weightedSum FLOAT4 NOT NULL,                  \
PRIMARY KEY(macAddress) 	              \
);" >> /home/admin/create_database.sql        \
&& echo "CREATE TABLE IF NOT EXISTS           \
sensorEventTable (                            \
time TIMESTAMP NOT NULL,                      \
eventSourceID INTEGER NOT NULL, 	      \
assetKey INTEGER NOT NULL, 	              \
employeeID INTEGER NOT NULL, 	              \
weightedSum FLOAT4 NOT NULL, 	              \
productID INTEGER NOT NULL, 	              \
PRIMARY KEY(time, eventSourceID) 	      \
);" >> /home/admin/create_database.sql        \
&& echo "CREATE TABLE IF NOT EXISTS           \
coachingMomentTable (                         \
time TIMESTAMP NOT NULL,                      \
employeeID INTEGER NOT NULL, 	              \
managerID INTEGER NOT NULL, 	              \
note VARCHAR (300) NOT NULL, 	              \
PRIMARY KEY(time, employeeID) 	              \
);" >> /home/admin/create_database.sql        \
&& echo "CREATE TABLE IF NOT EXISTS           \
productTable (                                \
productID INTEGER NOT NULL, 	              \
productName VARCHAR (50) NOT NULL, 	      \
weight FLOAT4 NOT NULL, 	              \
PRIMARY KEY(productID) 	                      \
);" >> /home/admin/create_database.sql        \
&& echo "CREATE TABLE IF NOT EXISTS           \
machineStatusTable (                          \
assetKey INTEGER NOT NULL, 	              \
time TIMESTAMP NOT NULL,                      \
status VARCHAR (30) NOT NULL, 	              \
productID INTEGER NOT NULL, 	              \
PRIMARY KEY(assetKey, time) 	              \
);" >> /home/admin/create_database.sql        \
&& echo "CREATE TABLE IF NOT EXISTS           \
resourceUsageTable (                          \
meterID INTEGER NOT NULL, 	              \
time TIMESTAMP NOT NULL,                      \
usageIncrement FLOAT4 NOT NULL, 	      \
unit VARCHAR (10) NOT NULL, 	              \
type VARCHAR (30) NOT NULL,  	              \
assetKey INTEGER NOT NULL, 	              \
PRIMARY KEY(meterID, time) 	              \
);" >> /home/admin/create_database.sql        \
&& echo "CREATE TABLE IF NOT EXISTS           \
meterTable (                                  \
meterID INTEGER NOT NULL, 	              \
usageIncrement FLOAT4 NOT NULL, 	      \
unit VARCHAR (10) NOT NULL, 	              \
type VARCHAR (30) NOT NULL,  	              \
assetKey INTEGER NOT NULL, 	              \
PRIMARY KEY(meterID) 	                      \
);" >> /home/admin/create_database.sql        \
&& echo "CREATE TABLE IF NOT EXISTS           \
assetTable (                                  \
assetKey INTEGER NOT NULL, 	              \
assetName VARCHAR (50) NOT NULL, 	      \
status VARCHAR (50) NOT NULL, 	              \
PRIMARY KEY(assetKey) 	                      \
);" >> /home/admin/create_database.sql        \
&& echo "CREATE TABLE IF NOT EXISTS           \
employeeTable (                               \
employeeID INTEGER NOT NULL, 	              \
employeeName VARCHAR (50) NOT NULL, 	      \
PRIMARY KEY(employeeID) 	              \
);" >> /home/admin/create_database.sql        \
&& echo "CREATE TABLE IF NOT EXISTS           \
locationTable (                               \
time TIMESTAMP NOT NULL,                      \
employeeID INTEGER NOT NULL, 	              \
assetKey INTEGER NOT NULL, 	              \
productID INTEGER, 	                      \
PRIMARY KEY(time, employeeID) 	              \
);" >> /home/admin/create_database.sql        \
&& touch /home/admin/init.sh \
&& chmod +x /home/admin/init.sh \
&& echo "#!/bin/bash" > /home/admin/init.sh \
&& echo " echo 'create database example;' | psql " >> /home/admin/init.sh \
&& echo " echo \"create user admin with password 'octopus';\" | psql " >> /home/admin/init.sh  \
&& echo "psql \"host=localhost port=5432 dbname=example user=admin password=octopus\" -f \"/home/admin/create_database.sql\"" >> /home/admin/init.sh

WORKDIR "/home/admin/sequelize-server"
RUN npm i && \
timescaledb-tune --quiet --yes 

USER postgres
ENTRYPOINT /home/admin/start.sh 

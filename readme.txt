test react1
-----------
Dans une fenetre DOS
npm start

build react1
------------
Dans une fenetre DOS
npm run build


installer apache (PI)
----------------
npm

nginx docker (PI)
------------
docker build -t marcprj_nginx .
docker run -t --rm -p 85:85  -d --name marcprj_nginx_container -it marcprj_nginx


Build de l'appli react (WINDOWS):
---------------------
dans package.json mettre la ligne suivante:
    "proxy": "http://localhost:8686"
    Ce sera le RootURI des requete Backend Node

Mettre l'appli a dispo dans apache(PI):
--------------------------------------
dans E:\nodeproject\react1
executer : npm run build

copier le contenu du repertoire build dans:
    pi@raspberrypi:/var/www/html

relancer apache
    ps -ef | grep apache2

    # service apache2 start
    # service apache2 stop


Test
----
Browser: http://89.156.182.174:85/service/marc/
box: 89.156.182.174:85
raspberry:85 sur nginx =reroute sur => proxy_pass http://192.168.0.37:80/;
apache:80 (dans /var/www/html) resultat du build react








http://raspberrypi:80/service/marc/
http://89.156.182.174:85/service/marc/



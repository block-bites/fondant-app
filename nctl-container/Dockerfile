FROM makesoftware/casper-nctl:latest

RUN sudo pip install flask flask_shell2http

COPY app.py .
copy run.sh .

EXPOSE 4000

CMD flask run -p 4000 --host 0.0.0.0 && /bin/bash -c source /home/casper/restart.sh

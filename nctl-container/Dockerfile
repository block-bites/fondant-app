FROM makesoftware/casper-nctl:latest

RUN sudo pip install flask flask_shell2http

COPY app.py .
COPY run.sh .

EXPOSE 4000
EXPOSE 11101

CMD flask run -p 4000 --host 0.0.0.0

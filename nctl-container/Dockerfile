FROM makesoftware/casper-nctl:v155

RUN sudo pip install flask 

COPY app.py .
COPY run.sh .

EXPOSE 4000

CMD flask run -p 4000 --host 0.0.0.0

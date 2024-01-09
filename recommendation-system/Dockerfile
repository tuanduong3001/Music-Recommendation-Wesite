FROM python:3.10.2

WORKDIR /usr/src/app

COPY lib.txt ./

RUN pip install --no-cache-dir -r lib.txt
RUN pip install numpy

COPY . .

EXPOSE 8000

CMD ["python3", "main.py"]

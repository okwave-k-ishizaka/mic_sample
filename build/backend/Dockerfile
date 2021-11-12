FROM python:3.9-alpine3.13
WORKDIR /var/www
COPY ./src/backend/requirements.txt ./
RUN pip install -r requirements.txt

EXPOSE 8080

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080","--reload"]

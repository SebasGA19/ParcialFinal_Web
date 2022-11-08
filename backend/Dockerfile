FROM python:3.10-alpine

WORKDIR /backend
COPY . .
RUN pip install --no-cache-dir -r requirements.txt
CMD flask --app main.py run --host=0.0.0.0 --port=5000
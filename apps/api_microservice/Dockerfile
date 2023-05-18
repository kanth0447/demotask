FROM python:3

# Creating Application directory where all files residing here
RUN mkdir -p /usr/src/app

# Setting Home Directory for container
WORKDIR /usr/src/app

# Installing python dependencies
COPY requirements.txt /usr/src/app/
RUN pip install --no-cache-dir -r requirements.txt

# Copying src code to Container
COPY . /usr/src/app

# Application Environment variables
#ENV APP_ENV development
ENV PORT 5000

# Exposing Ports
EXPOSE $PORT

# Running Python Application
CMD ["python" , "api.py"]

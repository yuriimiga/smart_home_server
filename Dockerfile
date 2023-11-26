FROM node:buster
RUN mkdir ./app
COPY . ./app/
RUN git clone https://github.com/Yulchik14/smart_home_project.git
WORKDIR /smart_home_project
RUN npm install
RUN npm run build
WORKDIR /app
RUN npm install
RUN npx prisma generate
WORKDIR /
RUN rm -fdr /app/public/*
RUN cp -r /smart_home_project/dist/* /app/public/
RUN rm -fdr /smart_home_project
WORKDIR /app
EXPOSE 3000/tcp
CMD npm start
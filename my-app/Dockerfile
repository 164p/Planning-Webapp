#Use an official Node runtime as a parent image
FROM node:18-alpine

#Set the working directory to /app
WORKDIR /my-app

#Copy the package.json and package-lock.json files to the container
COPY package*.json ./

#Install dependencies
RUN NODE_ENV=development npm install

#Copy the rest of the application code to the container
COPY . .
COPY tailwind.config.ts ./dist/static/css/

#Build the frontend
RUN npx prisma generate
RUN npx prisma db push
RUN npm run build


ENV HOST 0.0.0.0

#Expose the port that the application will listen on
EXPOSE 3000

#Start the frontend
CMD ["npm", "run", "start"]
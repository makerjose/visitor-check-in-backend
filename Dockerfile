FROM node:18-alpine

# Create app directory
WORKDIR /vms-backend

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --omit=dev

# Bundle app source
COPY . .

# Set environment variables
ENV JWT_SECRET_KEY = "MySecretKey"
ENV MONGODB_URI = mongodb+srv://josemakerdeng:9aaK4zKs2by4xTTX@cluster0.nw2o7lz.mongodb.net/?retryWrites=true&w=majority
ENV EMAIL_PASSWORD = 'aghc wfpv padg couk'

EXPOSE 5000
CMD [ "npm", "start" ]

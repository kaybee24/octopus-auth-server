import express from "express"
import "dotenv/config"
import connectToDB from "./models/index"
import cookieParser from "cookie-parser"
import cors from "cors"
import messageRouter from "./routes/Message"
import userRouter from "./routes/User"
import * as jwt from "./utilities/jwt"
import chalk from "chalk"
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgC5DZqT9zZ1dpeTOsO3jzJQXPi15FN2U",
  authDomain: "octopus-eco.firebaseapp.com",
  projectId: "octopus-eco",
  storageBucket: "octopus-eco.appspot.com",
  messagingSenderId: "810917542018",
  appId: "1:810917542018:web:a80a278b1fbb7b3dec9c9b"
};

const api = initializeApp(firebaseConfig);
const db = getFirestore(api);

// Get a list of cities from your database
async function getCities(db) {
  const citiesCol = collection(db, 'cities');
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map(doc => doc.data());
  return cityList;
}

const app = express()
const PORT = process.env.PORT || 8080

// MIDDLEWARES 
app.use(cookieParser());
app.use((req, res, next) => {
  console.log(chalk.blue(req.method), chalk.white(req.url))
  next()
})

app.use(express.json())
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}
))
app.use(jwt.decodeToken)

// AUTHENTICATION
app.use("/users", userRouter)

// SIMPLE CRUD EXAMPLE
app.use("/messages", messageRouter)

connectToDB().then(() => {
  app.listen(PORT, () => console.log(chalk.green(`LISTENING ON PORT ${PORT} (http://localhost:${PORT})`)))
})

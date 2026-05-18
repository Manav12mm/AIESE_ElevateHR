
const mongoose = require('mongoose');

const MONGO_URI = "mongodb+srv://manav2428cseai920_db_user:cMciJXUe2Dv0GKm0@esekey1.jpjsgrh.mongodb.net/?appName=ESEKEY1";

const employeeSchema = new mongoose.Schema({
    name: String,
    email: String,
    department: String,
    performanceScore: Number,
    experience: Number
}, { collection: 'employees' });

const Employee = mongoose.models.Employee || mongoose.model('Employee', employeeSchema);

async function run() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB!");
        const employees = await Employee.find({});
        console.log("--- EMPLOYEES IN DATABASE ---");
        console.log(JSON.stringify(employees, null, 2));
        process.exit(0);
    } catch (e) {
        console.error("Connection failed:", e);
        process.exit(1);
    }
}
run();

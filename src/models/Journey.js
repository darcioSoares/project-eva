const mongoose = require('mongoose');

const JourneySchema = new mongoose.Schema(
  {
    activity: { type: String, required: true },
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    email_employee: { type: String, required: true }, // 
    startDate: { type: Date, required: true }, //  
    completedAt: { type: Date, default: null }, // 
  },
  { timestamps: true }
);

module.exports = mongoose.model('Journey', JourneySchema);

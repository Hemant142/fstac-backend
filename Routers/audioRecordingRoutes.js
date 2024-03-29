const express = require("express");
const AudioRecording = require("../Models/Recording");
const audioRouter = express.Router();

// Get all audio recordings with pagination
audioRouter.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Current page number
    const limit = parseInt(req.query.limit) || 10; // Number of recordings per page
    const skip = (page - 1) * limit; // Number of recordings to skip

    const audioRecordings = await AudioRecording.find().skip(skip).limit(limit);
    const totalRecordings = await AudioRecording.countDocuments();

    const totalPages = Math.ceil(totalRecordings / limit);

    res.status(200).json({
      currentPage: page,
      totalPages: totalPages,
      totalRecordings: totalRecordings,
      audioRecordings: audioRecordings
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch audio recordings", error: error.message });
  }
});

// Create a new audio recording
audioRouter.post("/", async (req, res) => {
  const { name, url, duration } = req.body;
  const newRecording = new AudioRecording({
    name,
    url,
    duration,
  });

  try {
    const savedRecording = await newRecording.save();
    res.status(201).json(savedRecording);
  } catch (error) {
    res.status(400).json({ message: "Failed to create audio recording", error: error.message });
  }
});

// Update an audio recording
audioRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const recording = await AudioRecording.findByIdAndUpdate(id, { name }, { new: true });
    if (!recording) return res.status(404).json({ message: "Recording not found" });
    
    res.json(recording);
  } catch (error) {
    res.status(500).json({ message: "Failed to update audio recording", error: error.message });
  }
});

// Delete an audio recording
audioRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRecording = await AudioRecording.findByIdAndDelete(id);
    if (!deletedRecording) return res.status(404).json({ message: "Recording not found" });
    
    res.json({ message: "Recording deleted", deletedRecording });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete audio recording", error: error.message });
  }
});

module.exports = audioRouter;

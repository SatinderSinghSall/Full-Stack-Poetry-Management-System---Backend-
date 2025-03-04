const Poem = require("../models/Poem");

// Add Poem (Admin Only)
const addPoem = async (req, res) => {
  const { title, content, author } = req.body;

  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied, Admins only" });
  }

  try {
    const poem = new Poem({
      title,
      content,
      author,
      addedBy: req.user._id, // Admin who added it
    });

    const savedPoem = await poem.save();
    res.status(201).json(savedPoem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Poems
const getPoems = async (req, res) => {
  try {
    const poems = await Poem.find().sort({ createdAt: -1 });
    res.json(poems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Poem by ID
const getPoemById = async (req, res) => {
  try {
    const poem = await Poem.findById(req.params.id);
    if (!poem) return res.status(404).json({ message: "Poem not found" });

    res.json(poem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addPoem, getPoems, getPoemById };

const express = require("express");
const pool = require("../db");
const router = express.Router();

// Middleware to parse JSON
router.use(express.json());

// Get all students
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM students");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get student by ID
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM students WHERE Person_Id = ?", [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: "Student not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create new student
router.post("/", async (req, res) => {
  try {
    const { Name, Email, Occupation } = req.body;
    const [result] = await pool.query(
      "INSERT INTO students (Name, Email, Occupation) VALUES (?, ?, ?)",
      [Name, Email, Occupation]
    );
    res.status(201).json({ Person_Id: result.insertId, Name, Email, Occupation });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update student
router.put("/:id", async (req, res) => {
  try {
    const { Name, Email, Occupation } = req.body;
    const [result] = await pool.query(
      "UPDATE students SET Name = ?, Email = ?, Occupation = ? WHERE Person_Id = ?",
      [Name, Email, Occupation, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: "Student not found" });
    res.json({ Person_Id: Number(req.params.id), Name, Email, Occupation });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete student
router.delete("/:id", async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM students WHERE Person_Id = ?", [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: "Student not found" });
    res.json({ message: "Student deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

// If you want to run standalone locally for testing (optional)
if (require.main === module) {
  const app = express();
  app.use("/api/students", router);
  const PORT = 3000;
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

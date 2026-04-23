const router = require("express").Router();
const Item = require("../models/Item");
const auth = require("../middleware/auth");

// 🔹 CREATE ITEM (Protected)
router.post("/", auth, async (req, res) => {
  try {
    const item = new Item({
      ...req.body,
      user: req.user.id
    });

    await item.save();
    res.json(item);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// 🔹 GET ALL ITEMS (Latest first)
router.get("/", async (req, res) => {
  try {
    const items = await Item.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 }); // latest first

    res.json(items);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// 🔍 SEARCH ITEMS (title + category)
router.get("/search", async (req, res) => {
  try {
    const q = req.query.q || "";

    const items = await Item.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { category: { $regex: q, $options: "i" } }
      ]
    });

    res.json(items);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// 🔄 UPDATE ITEM (Only Owner)
router.put("/:id", auth, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) return res.status(404).send("Item not found");

    if (item.user.toString() !== req.user.id)
      return res.status(403).send("Not allowed");

    const updated = await Item.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// 🔁 QUICK STATUS CHANGE (lost ↔ found)
router.patch("/:id/status", auth, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) return res.status(404).send("Item not found");

    if (item.user.toString() !== req.user.id)
      return res.status(403).send("Not allowed");

    // toggle status
    item.type = item.type === "lost" ? "found" : "lost";

    await item.save();

    res.json(item);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// 🔹 DELETE ITEM (Only Owner)
router.delete("/:id", auth, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) return res.status(404).send("Item not found");

    if (item.user.toString() !== req.user.id)
      return res.status(403).send("Not allowed");

    await item.deleteOne();
    res.send("Item Deleted");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
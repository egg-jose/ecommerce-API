const Category = require('./model');
const { validateData } = require('./validation');

exports.create = async (req, res) => {
  const { error } = validateData(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  if (!req.admin) return res.status(401).send('Access denied');

  const category = new Category(req.body);
  try {
    const savedCategory = await category.save();
    res.send(savedCategory);
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

exports.index = async (req, res) => {
  try {
    const allCategory = await Category.find({});
    res.send(allCategory);
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

exports.find = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    res.send(category);
  } catch (err) {
    res.status(404).send({ error: err });
  }
};

exports.update = async (req, res) => {
  const { error } = validateData(req.body, true);
  if (error) return res.status(400).send(error.details[0].message);

  if (!req.admin) return res.status(401).send('Access denied');

  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body);
    res.status(202).send(category);
  } catch (err) {
    res.status(404).send({ error: err });
  }
};

exports.destroy = async (req, res) => {
  if (!req.admin) return res.status(401).send('Access denied');

  try {
    const category = await Category.findByIdAndRemove(req.params.id);
    res.status(202).send(category);
  } catch (err) {
    res.status(404).send({ error: err });
  }
};
